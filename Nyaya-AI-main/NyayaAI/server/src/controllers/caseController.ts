import { Request, Response } from 'express';
import { Case } from '../models/Case';
import { UserActivity } from '../models/UserActivity';
import { analyzeCaseWithAI } from '../services/geminiService';

// Extract keywords from query for tag matching
const extractKeywords = (query: string): string[] => {
  const stopWords = new Set([
    'a', 'an', 'the', 'is', 'it', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or', 'but',
    'what', 'how', 'when', 'where', 'who', 'which', 'case', 'about', 'tell', 'me', 'my',
    'i', 'want', 'know', 'explain', 'please', 'can', 'you', 'with', 'this', 'that',
  ]);
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));
};

// POST /api/case/analyze
export const analyzeCase = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query, userId } = req.body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      res.status(400).json({ success: false, error: 'Query is required' });
      return;
    }

    const keywords = extractKeywords(query);

    // Find cases with matching tags
    const matchedCases = await Case.find({
      tags: { $in: keywords },
    })
      .limit(6)
      .select('title court year summary legalPrinciples tags citation');

    const similarCaseTags = [...new Set(matchedCases.flatMap((c) => c.tags))].slice(0, 10);

    // Get AI analysis
    const aiAnalysis = await analyzeCaseWithAI(query, similarCaseTags);

    const analysisResult = {
      query: query.trim(),
      summary: aiAnalysis.summary,
      legalPrinciples: aiAnalysis.legalPrinciples,
      similarTopics: aiAnalysis.similarTopics,
      relatedCases: matchedCases.map((c) => ({
        id: c._id,
        title: c.title,
        court: c.court,
        year: c.year,
        summary: c.summary.substring(0, 200) + (c.summary.length > 200 ? '...' : ''),
        legalPrinciples: c.legalPrinciples.slice(0, 3),
        tags: c.tags,
        citation: c.citation,
      })),
    };

    // Log activity
    const actUserId = userId || 'anonymous';
    UserActivity.create({
      userId: actUserId,
      type: 'case_search',
      query: query.trim(),
      response: aiAnalysis.summary,
      metadata: { legalPrinciples: aiAnalysis.legalPrinciples, matchedCasesCount: matchedCases.length },
    }).catch((err) => console.error('Activity log error:', err));

    res.status(200).json({ success: true, data: analysisResult });
  } catch (error) {
    console.error('Case analysis error:', error);
    res.status(500).json({ success: false, error: 'Failed to analyze case. Please try again.' });
  }
};

// GET /api/case/similar?tag=
export const getSimilarCases = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tag, limit = '10' } = req.query;

    if (!tag || typeof tag !== 'string') {
      res.status(400).json({ success: false, error: 'Tag parameter is required' });
      return;
    }

    const cases = await Case.find({
      tags: { $in: [tag.toLowerCase()] },
    })
      .limit(Math.min(Number(limit), 20))
      .select('title court year summary legalPrinciples tags citation')
      .sort({ year: -1 });

    res.status(200).json({
      success: true,
      data: {
        tag,
        count: cases.length,
        cases: cases.map((c) => ({
          id: c._id,
          title: c.title,
          court: c.court,
          year: c.year,
          summary: c.summary.substring(0, 300) + (c.summary.length > 300 ? '...' : ''),
          legalPrinciples: c.legalPrinciples,
          tags: c.tags,
          citation: c.citation,
        })),
      },
    });
  } catch (error) {
    console.error('Similar cases error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch similar cases' });
  }
};

// GET /api/case/all - List all seeded cases
export const getAllCases = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '12' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [cases, total] = await Promise.all([
      Case.find()
        .select('title court year summary legalPrinciples tags citation')
        .sort({ year: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Case.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: { cases, total, page: Number(page), limit: Number(limit) },
    });
  } catch (error) {
    console.error('Get all cases error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch cases' });
  }
};
