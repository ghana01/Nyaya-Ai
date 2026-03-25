import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { SavedCase } from '../models/SavedCase';
import { ResearchHistory } from '../models/ResearchHistory';
import { DraftHistory } from '../models/DraftHistory';
import { Case } from '../models/Case';
import { analyzeCaseWithAI } from '../services/geminiService';
import { scrapeIndianKanoon } from '../services/indianKanoonService';

// ──────────────────────────────────────────────────
// POST /api/lawyer/research
// ──────────────────────────────────────────────────
export const researchCase = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { query } = req.body;
    if (!query || !query.trim()) {
      res.status(400).json({ success: false, error: 'Query is required' });
      return;
    }

    // Extract keywords for tag matching
    const keywords = query
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w: string) => w.length > 3);

    // Get AI analysis
    const aiResult = await analyzeCaseWithAI(query.trim(), keywords);

    // Generate suggested arguments based on legal principles
    const suggestedArguments = aiResult.legalPrinciples.map(
      (principle: string) => `Argued on the basis of: ${principle}`
    );

    // Save to history
    await ResearchHistory.create({
      userId: req.user!._id.toString(),
      query: query.trim(),
      summary: aiResult.summary,
      legalPrinciples: aiResult.legalPrinciples,
      suggestedArguments,
      similarTopics: aiResult.similarTopics,
    });

    // Fetch similar cases based on AI topics and keywords
    const searchTerms = [...aiResult.similarTopics, ...keywords].join(' ');
    let similarCases = await Case.find({ $text: { $search: searchTerms } }).limit(4).lean();

    // Hybrid fallback for similar cases
    if (similarCases.length < 2) {
      const externals = await scrapeIndianKanoon(searchTerms);
      if (externals.length > 0) {
        const existingTitles = new Set(similarCases.map((r: any) => r.title.toLowerCase()));
        const newExternals = externals.filter((c: any) => !existingTitles.has(c.title.toLowerCase()));
        
        const docsToInsert = newExternals.map((c: any) => ({
          ...c,
          year: new Date().getFullYear(),
          source: 'external',
          tags: aiResult.similarTopics,
          judgement: 'Full judgement available on Indian Kanoon',
        }));

        if (docsToInsert.length > 0) {
          const inserted = await Case.insertMany(docsToInsert);
          // @ts-ignore
          similarCases = [...similarCases, ...inserted.map(d => d.toObject())];
        }
      }
    }

    res.status(200).json({
      success: true,
      data: {
        query: query.trim(),
        summary: aiResult.summary,
        legalPrinciples: aiResult.legalPrinciples,
        similarTopics: aiResult.similarTopics,
        suggestedArguments,
        similarCases: similarCases.slice(0, 4),
      },
    });
  } catch (error) {
    console.error('Research error:', error);
    res.status(500).json({ success: false, error: 'Failed to perform case research' });
  }
};

// ──────────────────────────────────────────────────
// POST /api/lawyer/draft
// ──────────────────────────────────────────────────

const DRAFT_TEMPLATES: Record<string, (data: Record<string, string>) => string> = {
  'legal-notice': (d) => `
LEGAL NOTICE

Date: ${d.date || new Date().toLocaleDateString('en-IN')}

To,
${d.recipientName || '[Recipient Name]'}
${d.recipientAddress || '[Recipient Address]'}

Subject: ${d.subject || 'Legal Notice'}

Dear Sir/Madam,

Under instructions from and on behalf of my client, ${d.clientName || '[Client Name]'}, ${d.clientAddress || '[Client Address]'}, I serve upon you the following legal notice:

${d.facts || '[State facts of the matter]'}

LEGAL POSITION:
${d.legalBasis || '[Legal sections and provisions applicable]'}

DEMAND:
${d.demand || '[State your demand clearly]'}

In the event of your failure to comply with the above demand within ${d.deadline || '15 days'} from the receipt of this notice, my client shall be constrained to initiate appropriate legal proceedings against you at your risk, cost, and consequences.

This notice is issued without prejudice to the rights and remedies of my client.

${d.lawyerName || '[Advocate Name]'}
Advocate
${d.barCouncilNumber || '[Bar Council No.]'}
${d.lawyerAddress || '[Advocate Address]'}
${d.lawyerPhone || '[Phone]'}
`.trim(),

  'written-statement': (d) => `
IN THE COURT OF ${d.courtName || '[Court Name]'}

${d.caseType || 'Civil Suit'} No. ${d.caseNumber || '___/____'}

${d.plaintiffName || '[Plaintiff Name]'} ………… Plaintiff
Vs.
${d.defendantName || '[Defendant Name]'} ………… Defendant

WRITTEN STATEMENT ON BEHALF OF THE DEFENDANT

MOST RESPECTFULLY SHOWETH:

PRELIMINARY OBJECTIONS:
${d.preliminaryObjections || '1. [State preliminary objections]'}

PARA-WISE REPLY:
${d.paraWiseReply || '1. [Reply to each paragraph of the plaint]'}

ADDITIONAL FACTS:
${d.additionalFacts || '[State additional facts not covered in the plaint]'}

PRAYER:
It is, therefore, most respectfully prayed that this Hon'ble Court may be pleased to:
${d.prayer || '(a) Dismiss the suit of the plaintiff with costs.\n(b) Pass any other order deemed fit and proper.'}

VERIFICATION:
I, ${d.defendantName || '[Defendant Name]'}, the defendant above-named, do hereby verify that the contents of the above written statement are true and correct to the best of my knowledge and belief.

Verified at ${d.place || '[Place]'} on ${d.date || new Date().toLocaleDateString('en-IN')}

${d.defendantName || '[Defendant]'}
Through
${d.lawyerName || '[Advocate Name]'}
Advocate
`.trim(),

  'affidavit': (d) => `
AFFIDAVIT

I, ${d.deponentName || '[Deponent Name]'}, aged about ${d.age || '___'} years, ${d.occupation || '[Occupation]'}, residing at ${d.address || '[Address]'}, do hereby solemnly affirm and state on oath as follows:

1. That I am the ${d.relationship || 'deponent'} in the above matter and I am competent to swear this affidavit.

2. That the facts stated herein are true to my personal knowledge and I believe them to be true.

${d.statements || '3. [State facts paragraph by paragraph]'}

VERIFICATION:
I, ${d.deponentName || '[Deponent Name]'}, the deponent above-named, do hereby verify that the contents of this affidavit are true and correct to the best of my knowledge and belief and nothing material has been concealed therefrom.

Verified at ${d.place || '[Place]'} on this ${d.date || new Date().toLocaleDateString('en-IN')}.

DEPONENT

BEFORE ME
NOTARY PUBLIC / OATH COMMISSIONER
`.trim(),

  'petition-draft': (d) => `
IN THE HON'BLE ${d.courtName || '[Court Name]'}

${d.petitionType || 'WRIT PETITION (CIVIL)'} No. _____ of ${new Date().getFullYear()}

IN THE MATTER OF:
${d.petitionerName || '[Petitioner Name]'} ………… Petitioner
Vs.
${d.respondentName || '[Respondent Name]'} ………… Respondent

PETITION UNDER ${d.legalProvision || 'Article 226/227 of the Constitution of India'}

TO,
THE HON'BLE CHIEF JUSTICE AND OTHER COMPANION JUDGES OF THE HON'BLE ${d.courtName || '[Court Name]'}

MOST RESPECTFULLY SHOWETH:

1. FACTS OF THE CASE:
${d.facts || '[Detailed facts of the case]'}

2. GROUNDS:
${d.grounds || '[Legal grounds for the petition]'}

3. CAUSE OF ACTION:
${d.causeOfAction || '[When and how the cause of action arose]'}

4. JURISDICTION:
${d.jurisdiction || 'This Hon\'ble Court has jurisdiction to entertain and try the present petition.'}

5. NO OTHER REMEDY:
${d.noOtherRemedy || 'The petitioner has no other efficacious alternative remedy except to approach this Hon\'ble Court.'}

PRAYER:
In the light of the above facts, it is most respectfully prayed that this Hon'ble Court may graciously be pleased to:
${d.prayer || '(a) Issue a writ of [appropriate writ]\n(b) Pass any other order as deemed fit'}

AND FOR THIS ACT OF KINDNESS, THE PETITIONER SHALL EVER PRAY.

PETITIONER
Through
${d.lawyerName || '[Advocate Name]'}
Advocate
${d.barCouncilNumber || '[Bar Council Enrollment No.]'}
`.trim(),
};

export const generateDraft = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { type, formData } = req.body;

    if (!type || !DRAFT_TEMPLATES[type]) {
      res.status(400).json({
        success: false,
        error: `Invalid draft type. Available: ${Object.keys(DRAFT_TEMPLATES).join(', ')}`,
      });
      return;
    }

    const content = DRAFT_TEMPLATES[type](formData || {});

    // Save to history
    await DraftHistory.create({
      userId: req.user!._id.toString(),
      type,
      title: `${DRAFT_TEMPLATES[type].name || type} - ${new Date().toLocaleDateString('en-IN')}`,
      formData: formData || {},
      content,
    });

    res.status(200).json({
      success: true,
      data: {
        type,
        content,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Draft generation error:', error);
    res.status(500).json({ success: false, error: 'Failed to generate draft' });
  }
};

// ──────────────────────────────────────────────────
// POST /api/lawyer/save-case
// ──────────────────────────────────────────────────
export const saveCase = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { caseTitle, notes, tags, court, year, citation } = req.body;

    if (!caseTitle || !caseTitle.trim()) {
      res.status(400).json({ success: false, error: 'Case title is required' });
      return;
    }

    const savedCase = await SavedCase.create({
      userId: req.user!._id.toString(),
      caseTitle: caseTitle.trim(),
      notes: notes || '',
      tags: tags || [],
      court,
      year,
      citation,
    });

    res.status(201).json({ success: true, data: savedCase });
  } catch (error) {
    console.error('Save case error:', error);
    res.status(500).json({ success: false, error: 'Failed to save case' });
  }
};

// ──────────────────────────────────────────────────
// GET /api/lawyer/saved-cases
// ──────────────────────────────────────────────────
export const getSavedCases = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const tag = req.query.tag as string;

    const filter: Record<string, unknown> = { userId: req.user!._id.toString() };
    if (tag) filter.tags = tag;

    const [cases, total] = await Promise.all([
      SavedCase.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      SavedCase.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: {
        cases,
        total,
        page,
        limit,
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    console.error('Get saved cases error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch saved cases' });
  }
};

// ──────────────────────────────────────────────────
// PUT /api/lawyer/saved-cases/:id
// ──────────────────────────────────────────────────
export const updateSavedCase = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { caseTitle, notes, tags } = req.body;

    const savedCase = await SavedCase.findOneAndUpdate(
      { _id: id, userId: req.user!._id.toString() },
      { caseTitle, notes, tags },
      { new: true }
    );

    if (!savedCase) {
      res.status(404).json({ success: false, error: 'Case not found' });
      return;
    }

    res.status(200).json({ success: true, data: savedCase });
  } catch (error) {
    console.error('Update saved case error:', error);
    res.status(500).json({ success: false, error: 'Failed to update case' });
  }
};

// ──────────────────────────────────────────────────
// DELETE /api/lawyer/saved-cases/:id
// ──────────────────────────────────────────────────
export const deleteSavedCase = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await SavedCase.findOneAndDelete({ _id: id, userId: req.user!._id.toString() });

    if (!result) {
      res.status(404).json({ success: false, error: 'Case not found' });
      return;
    }

    res.status(200).json({ success: true, data: { message: 'Case deleted successfully' } });
  } catch (error) {
    console.error('Delete saved case error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete case' });
  }
};

// ──────────────────────────────────────────────────
// GET /api/lawyer/search
// ──────────────────────────────────────────────────
export const advancedSearch = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { keywords, court, year, section } = req.query;

    // Build search query
    const query: Record<string, unknown> = {};

    if (keywords) {
      query.$text = { $search: keywords as string };
    }

    if (court) {
      query.court = { $regex: court as string, $options: 'i' };
    }

    if (year) {
      query.year = parseInt(year as string);
    }

    if (section) {
      query.tags = { $regex: section as string, $options: 'i' };
    }

    // Search in the Local Case collection
    let results = await Case.find(query).sort({ year: -1 }).lean();

    // Hybrid logic: If < 5 results and we have keywords, fetch external
    if (results.length < 5 && keywords) {
      const externalCases = await scrapeIndianKanoon(keywords as string);
      
      if (externalCases.length > 0) {
        // Filter duplicates by title
        const existingTitles = new Set(results.map((r: any) => r.title.toLowerCase()));
        const newExternals = externalCases.filter((c: any) => !existingTitles.has(c.title.toLowerCase()));

        // Cache new externals into local DB
        const docsToInsert = newExternals.map((c: any) => ({
          ...c,
          year: new Date().getFullYear(),
          source: 'external',
          tags: [keywords as string],
          judgement: 'Full judgement available on Indian Kanoon',
        }));

        if (docsToInsert.length > 0) {
          const inserted = await Case.insertMany(docsToInsert);
          // @ts-ignore
          results = [...results, ...inserted.map(d => d.toObject())];
        }
      }
    }

    res.status(200).json({
      success: true,
      data: {
        results,
        total: results.length,
        filters: { keywords, court, year, section },
      },
    });
  } catch (error) {
    console.error('Advanced search error:', error);
    res.status(500).json({ success: false, error: 'Failed to perform search' });
  }
};

// ──────────────────────────────────────────────────
// GET /api/lawyer/draft-types
// ──────────────────────────────────────────────────
export const getDraftTypes = async (_req: AuthRequest, res: Response): Promise<void> => {
  res.status(200).json({
    success: true,
    data: {
      types: [
        { value: 'legal-notice', label: 'Legal Notice', icon: '📜', description: 'Formal notice to opposing party' },
        { value: 'written-statement', label: 'Written Statement', icon: '📝', description: 'Court defense document' },
        { value: 'affidavit', label: 'Affidavit', icon: '📋', description: 'Sworn statement of facts' },
        { value: 'petition-draft', label: 'Petition Draft', icon: '⚖️', description: 'Court petition/PIL draft' },
      ],
    },
  });
};
