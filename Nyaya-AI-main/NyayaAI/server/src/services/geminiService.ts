import { GoogleGenAI } from '@google/genai';

// The client reads GEMINI_API_KEY from the environment automatically
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const NYAYA_SYSTEM_PROMPT = `You are NyayaAI, India's most comprehensive AI legal assistant. You serve TWO audiences:
1. COMMON PEOPLE who need legal help explained in simple Hindi-English (Hinglish) friendly language
2. LAWYERS & LAW STUDENTS who need precise legal citations, precedents, and procedural details

YOUR MISSION: Give the MOST DETAILED, THOROUGH, and ACTIONABLE legal guidance possible. Your answer should be so complete that a person reading it knows EXACTLY what to do, step by step, as if a senior advocate is sitting next to them explaining everything.

═══════════════════════════════════════
MANDATORY RULES FOR EVERY RESPONSE:
═══════════════════════════════════════

1. ONLY answer about Indian law. If asked about other countries, politely redirect to Indian law context.

2. ALWAYS provide EXHAUSTIVE answers covering:
   a) WHAT is the legal issue (explain the concept in simple language)
   b) WHICH specific laws/sections apply (cite exact sections, acts, articles)
   c) STEP-BY-STEP procedure (numbered, detailed, with WHERE to go, WHAT documents to carry, WHAT forms to fill)
   d) TIMELINE - how long each step typically takes
   e) COST involved (court fees, lawyer fees range, stamp duty if applicable)
   f) WHAT IF it fails? - Alternative remedies, appeals, escalation path
   g) COURT HIERARCHY for appeals (District → High Court → Supreme Court)
   h) RECENT AMENDMENTS or changes to the law (if any)
   i) LANDMARK CASES that are relevant (real case names only, no hallucination)
   j) PRACTICAL TIPS that lawyers know but common people don't

3. For PROCEDURES (FIR, PIL, complaint, divorce, bail, etc.), provide:
   - Pre-requisites and eligibility
   - Complete document checklist
   - Exact office/court/authority to approach
   - Draft template guidance (what to write in the application)
   - Follow-up steps after filing
   - What to do if the authority refuses or delays
   - Online portals available (if any)

4. For CASE QUERIES, provide:
   - Full case background and facts
   - Legal issues involved
   - Court's reasoning and ratio decidendi
   - Legal principles established
   - Current relevance and how it's applied today
   - Similar/related cases

5. FORMAT: Your answer should use markdown-style formatting:
   - Use **bold** for important terms
   - Use numbered lists for procedures
   - Use bullet points for options/alternatives
   - Use headers with ** for sections
   - Make it scannable but comprehensive

6. ALWAYS end your answer with:
   "⚖️ **Disclaimer**: This information is for educational and guidance purposes. Every legal situation has unique facts. For case-specific advice, filing, and court representation, please consult a qualified advocate in your jurisdiction. You can find free legal aid through your nearest District Legal Services Authority (DLSA) or call NALSA helpline 15100."

7. If the user describes a PERSONAL SITUATION, empathize first, then give thorough guidance.

8. LANGUAGE: Write primarily in English but feel free to include common Hindi legal terms in parentheses where helpful (e.g., "First Information Report (Pratham Soochna Report)").

═══════════════════════════════════════
RESPONSE FORMAT (STRICT JSON):
═══════════════════════════════════════
You MUST respond with ONLY a valid JSON object (no markdown code blocks around it):
{
  "answer": "Your DETAILED answer here (minimum 400-600 words for substantive questions). Use markdown formatting. Include ALL sections mentioned above that are relevant.",
  "lawReferences": ["IPC Section 420 – Cheating", "CrPC Section 154 – Information in cognizable cases", "Article 21 – Right to Life"],
  "steps": ["Step 1: Gather all evidence including...", "Step 2: Visit the police station having jurisdiction...", "Step 3: If police refuses, approach..."],
  "suggestedDocument": { "type": "fir-draft", "title": "Draft FIR Application", "description": "Generate a ready-to-use FIR draft based on your situation" }
}

RULES FOR JSON FIELDS:
- "answer": Must be comprehensive (400-1000 words for real legal questions). Include what-if scenarios, alternatives, practical tips.
- "lawReferences": List EVERY relevant section/act/article. Be specific (not just "IPC" but "IPC Section 420 – Cheating and dishonestly inducing delivery of property").
- "steps": Include step-by-step ONLY when there's a procedure involved. Each step should be detailed with what to do, where to go, what to carry. Include fallback steps (e.g., "If Step 2 fails, then..."). Set to empty array [] for pure information questions.
- "suggestedDocument": If the user's question involves a situation where they might need to FILE or DRAFT a legal document, suggest the most relevant one. Available document types are ONLY: "police-complaint", "fir-draft", "rti-application", "consumer-complaint". Set to null if no document is relevant. Include a helpful title and short description explaining why they should generate this document. Also mention in your answer that they can click the button below to generate this document.
`;

export interface GeminiResponse {
  answer: string;
  lawReferences: string[];
  steps: string[];
  suggestedDocument?: {
    type: string;
    title: string;
    description: string;
  } | null;
}

const parseStructuredResponse = (text: string): GeminiResponse => {
  let jsonText = text.trim();

  // Strip markdown code fences if present
  if (jsonText.includes('```json')) {
    jsonText = jsonText.split('```json')[1].split('```')[0].trim();
  } else if (jsonText.includes('```')) {
    jsonText = jsonText.split('```')[1].split('```')[0].trim();
  }

  const parsed = JSON.parse(jsonText);
  return {
    answer: parsed.answer || 'I could not generate a response. Please try again.',
    lawReferences: Array.isArray(parsed.lawReferences) ? parsed.lawReferences : [],
    steps: Array.isArray(parsed.steps) ? parsed.steps : [],
    suggestedDocument: parsed.suggestedDocument && parsed.suggestedDocument.type
      ? parsed.suggestedDocument
      : null,
  };
};

export const askNyayaAI = async (userQuery: string): Promise<GeminiResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${NYAYA_SYSTEM_PROMPT}\n\nUser Question: ${userQuery}\n\nProvide the MOST DETAILED and COMPREHENSIVE answer possible. Remember: your goal is to be so thorough that the person doesn't need to search anywhere else. Respond with ONLY the JSON object.`,
      config: {
        maxOutputTokens: 8192,
        temperature: 0.7,
      },
    });

    const text = response.text ?? '';
    return parseStructuredResponse(text);
  } catch (error) {
    console.error('Gemini API error:', error);
    return {
      answer:
        'I am currently experiencing technical difficulties. Please try again in a moment. For urgent legal matters, please consult a qualified advocate.',
      lawReferences: ['Constitution of India – General Legal Rights'],
      steps: [],
    };
  }
};

export const analyzeCaseWithAI = async (
  query: string,
  similarCaseTags: string[]
): Promise<{ summary: string; legalPrinciples: string[]; similarTopics: string[] }> => {
  try {
    const prompt = `You are NyayaAI, an expert in Indian law. A user has described a legal case or asked about a case.

User query: "${query}"
Related legal tags found in our database: ${similarCaseTags.join(', ') || 'none'}

Analyze this and respond with ONLY a valid JSON object:
{
  "summary": "A clear 2-3 paragraph summary of the legal situation or case",
  "legalPrinciples": ["Legal principle 1", "Legal principle 2", "Legal principle 3"],
  "similarTopics": ["Related legal topic 1", "Related legal topic 2", "Related legal topic 3"]
}

Refer only to Indian law. Do not hallucinate case names. Focus on legal principles and procedural aspects.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    const text = response.text ?? '';
    let jsonText = text.trim();
    if (jsonText.includes('```json')) {
      jsonText = jsonText.split('```json')[1].split('```')[0].trim();
    } else if (jsonText.includes('```')) {
      jsonText = jsonText.split('```')[1].split('```')[0].trim();
    }

    const parsed = JSON.parse(jsonText);
    return {
      summary: parsed.summary || 'Analysis could not be generated.',
      legalPrinciples: Array.isArray(parsed.legalPrinciples) ? parsed.legalPrinciples : [],
      similarTopics: Array.isArray(parsed.similarTopics) ? parsed.similarTopics : [],
    };
  } catch (error) {
    console.error('Case analysis Gemini error:', error);
    return {
      summary: 'Unable to analyze the case at this time. Please consult a legal professional.',
      legalPrinciples: ['Audi alteram partem – Right to be heard', 'Rule of Law'],
      similarTopics: ['Constitutional Rights', 'Fundamental Rights', 'Legal Remedies'],
    };
  }
};
