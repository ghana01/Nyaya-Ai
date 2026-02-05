import { Request, Response } from 'express';
import { Law } from '../models/Law';

// Get all laws (grouped by act)
export const getAllLaws = async (req: Request, res: Response): Promise<void> => {
  try {
    const { act } = req.query;

    let query: any = { isActive: true };
    
    if (act) {
      query.actName = act;
    }

    const laws = await Law.find(query)
      .select('actName actShortName section title explanation punishment category')
      .sort({ actName: 1, section: 1 });

    // Group by act
    const grouped = laws.reduce((acc: Record<string, any>, law) => {
      const actKey = law.actName;
      if (!acc[actKey]) {
        acc[actKey] = {
          actName: law.actName,
          actShortName: law.actShortName,
          sections: [],
        };
      }
      acc[actKey].sections.push({
        _id: law._id,
        section: law.section,
        title: law.title,
        explanation: law.explanation,
        punishment: law.punishment,
        category: law.category,
      });
      return acc;
    }, {});

    // Get unique acts for sidebar
    const acts = await Law.distinct('actName', { isActive: true });

    res.status(200).json({
      success: true,
      data: {
        laws,
        grouped: Object.values(grouped),
        acts,
        count: laws.length,
      },
    });
  } catch (error) {
    console.error('Get laws error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve laws',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Search laws
export const searchLaws = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string' || q.trim().length < 2) {
      res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters',
      });
      return;
    }

    const searchQuery = q.trim();

    // Try text search first
    let laws = await Law.find({
      $text: { $search: searchQuery },
      isActive: true,
    })
      .select('actName actShortName section title explanation punishment category')
      .sort({ score: { $meta: 'textScore' } })
      .limit(50);

    // If no results, try regex search
    if (laws.length === 0) {
      const regex = new RegExp(searchQuery, 'i');
      laws = await Law.find({
        isActive: true,
        $or: [
          { actName: regex },
          { title: regex },
          { section: regex },
          { explanation: regex },
          { keywords: regex },
        ],
      })
        .select('actName actShortName section title explanation punishment category')
        .limit(50);
    }

    res.status(200).json({
      success: true,
      data: {
        laws,
        query: searchQuery,
        count: laws.length,
      },
    });
  } catch (error) {
    console.error('Search laws error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search laws',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get single law by ID
export const getLawById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const law = await Law.findById(id);

    if (!law) {
      res.status(404).json({
        success: false,
        message: 'Law not found',
      });
      return;
    }

    // Get related sections from same act
    const relatedSections = await Law.find({
      actName: law.actName,
      _id: { $ne: id },
      isActive: true,
    })
      .select('section title')
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        law,
        relatedSections,
      },
    });
  } catch (error) {
    console.error('Get law by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve law',
    });
  }
};

// Explain law with AI (mock response)
export const explainLaw = async (req: Request, res: Response): Promise<void> => {
  try {
    const { section, title, explanation } = req.body;

    if (!section || !title) {
      res.status(400).json({
        success: false,
        message: 'Section and title are required',
      });
      return;
    }

    // Mock AI explanation - simplified for civilians
    const simplifiedExplanation = generateSimplifiedExplanation(section, title, explanation);

    res.status(200).json({
      success: true,
      data: {
        originalSection: section,
        originalTitle: title,
        simplifiedExplanation,
        disclaimer: 'This is a simplified explanation for educational purposes. Please consult a lawyer for specific legal advice.',
      },
    });
  } catch (error) {
    console.error('Explain law error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate explanation',
    });
  }
};

// Generate simplified explanation (mock AI response)
function generateSimplifiedExplanation(section: string, title: string, explanation: string): string {
  const sectionLower = section.toLowerCase();
  const titleLower = title.toLowerCase();

  // Context-based simplified responses
  if (titleLower.includes('theft') || sectionLower.includes('379')) {
    return `**What is this law about?**\n\nThis law deals with theft - when someone takes your belongings without your permission.\n\n**In simple terms:**\n- If someone takes your property without asking\n- And they intend to keep it for themselves\n- That's considered theft under this law\n\n**What you should know:**\n- Taking someone's phone, wallet, or any item without permission is theft\n- Even if you plan to return it later, taking without permission can be theft\n- The owner must not have given consent\n\n**What to do if you're a victim:**\n1. File an FIR at the nearest police station\n2. List all stolen items with approximate value\n3. Provide any evidence (CCTV footage, witnesses)`;
  }

  if (titleLower.includes('murder') || sectionLower.includes('302')) {
    return `**What is this law about?**\n\nThis is one of the most serious offenses - it deals with intentionally causing someone's death.\n\n**In simple terms:**\n- If someone deliberately kills another person\n- Or does something knowing it will likely cause death\n- This law applies\n\n**Important to understand:**\n- There must be intention to cause death\n- This is different from accidental death\n- The punishment is very severe\n\n**Self-defense exception:**\nIf you cause death while protecting yourself or others from immediate danger, it may be considered self-defense (covered under different sections).`;
  }

  if (titleLower.includes('cheating') || sectionLower.includes('420')) {
    return `**What is this law about?**\n\nThe famous "420" - this law protects you from fraud and cheating.\n\n**In simple terms:**\n- If someone tricks you into giving money or property\n- Using false promises or lies\n- That's cheating under this law\n\n**Common examples:**\n- Fake job offers asking for "registration fees"\n- Investment schemes promising unrealistic returns\n- Online shopping frauds where you pay but get nothing\n- Fake lottery/prize winning calls\n\n**How to protect yourself:**\n1. Never share OTP or bank details\n2. Verify before transferring money\n3. If it sounds too good to be true, it probably is\n\n**If you're cheated:**\nFile complaint at cybercrime.gov.in or call 1930`;
  }

  if (titleLower.includes('assault') || titleLower.includes('hurt')) {
    return `**What is this law about?**\n\nThis law protects you from physical harm caused by others.\n\n**In simple terms:**\n- If someone intentionally hurts you physically\n- Causes injury, pain, or disease\n- This law applies\n\n**Types of hurt:**\n- Simple hurt: Minor injuries that heal quickly\n- Grievous hurt: Serious injuries like broken bones, permanent damage\n\n**What counts as assault:**\n- Slapping, punching, hitting\n- Throwing objects at someone\n- Any act causing bodily pain\n\n**What to do if assaulted:**\n1. Get medical help first\n2. Get a medical report/certificate\n3. File FIR with the medical report\n4. Note down witness details`;
  }

  if (titleLower.includes('defamation')) {
    return `**What is this law about?**\n\nThis law protects your reputation from false statements made by others.\n\n**In simple terms:**\n- If someone spreads false information about you\n- That damages your reputation in society\n- You can take legal action\n\n**What counts as defamation:**\n- False statements (spoken = slander, written = libel)\n- Shared with others (not just said to you)\n- Damages your reputation\n\n**What doesn't count:**\n- True statements (truth is a defense)\n- Fair criticism of public figures\n- Opinions clearly stated as opinions\n\n**Your options:**\n- Send a legal notice demanding apology\n- File a civil case for compensation\n- File criminal complaint in serious cases`;
  }

  if (titleLower.includes('dowry') || titleLower.includes('cruelty')) {
    return `**What is this law about?**\n\nThis law protects married women from harassment and cruelty by husband or in-laws.\n\n**In simple terms:**\n- Demanding money/gifts after marriage is illegal\n- Physical or mental torture is a crime\n- Women have strong legal protections\n\n**What counts as cruelty:**\n- Demanding more dowry\n- Verbal abuse and taunts\n- Physical violence\n- Forcing to leave the house\n- Not providing food, medicine, basic needs\n\n**What to do:**\n1. Call Women Helpline: 181\n2. File complaint at Women's Cell\n3. Seek protection under Domestic Violence Act\n4. You can stay in your matrimonial home\n\n**Remember:** You don't need witnesses to file a complaint`;
  }

  // Default generic explanation
  return `**Understanding ${title}**\n\n**What this section covers:**\n${explanation}\n\n**Why this law exists:**\nThis law is designed to protect citizens and maintain order in society. It clearly defines what is considered an offense and the consequences.\n\n**Key points to remember:**\n- The law applies equally to everyone\n- Both the act and intention matter\n- There are legal remedies available for victims\n\n**If you need help:**\n- Consult a lawyer for specific advice\n- Call Legal Aid Helpline: 15100\n- Visit your nearest District Legal Services Authority for free legal help\n\n*This is a simplified explanation. Legal provisions may have exceptions and specific conditions that a lawyer can explain better.*`;
}
