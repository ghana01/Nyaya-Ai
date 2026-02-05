import { Request, Response } from 'express';
import { ChatMessage } from '../models/ChatMessage';
import { v4 as uuidv4 } from 'uuid';

// Mock AI responses based on keywords
const getMockAIResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();

  if (message.includes('fir') || message.includes('police')) {
    return `**Filing an FIR (First Information Report)**

An FIR is the first step in the criminal justice process. Here's what you need to know:

1. **Where to file**: Visit the police station having jurisdiction over the place where the offense occurred.

2. **Zero FIR**: If the correct jurisdiction is unknown, you can file a Zero FIR at any police station. It will be transferred to the appropriate station.

3. **Your rights**:
   - Police cannot refuse to register an FIR for cognizable offenses
   - You are entitled to a free copy of the FIR
   - You can file a complaint with the Superintendent of Police if refused

4. **Required information**:
   - Date, time, and place of the incident
   - Description of the offense
   - Names of witnesses (if any)
   - Details of the accused (if known)

Would you like more specific information about any aspect of filing an FIR?`;
  }

  if (message.includes('divorce') || message.includes('marriage')) {
    return `**Divorce Laws in India**

India has different divorce laws based on religion:

**Hindu Marriage Act, 1955** (for Hindus, Buddhists, Jains, Sikhs):
- Mutual consent divorce (Section 13B)
- Contested divorce on grounds like cruelty, desertion, adultery

**Types of Divorce**:
1. **Mutual Consent**: Both parties agree; 6-18 months cooling period
2. **Contested**: One party files; can take 2-5 years

**Grounds for Divorce**:
- Cruelty (mental or physical)
- Desertion for 2+ years
- Adultery
- Conversion to another religion
- Mental disorder
- Incurable disease

Do you want details about maintenance, child custody, or the divorce procedure?`;
  }

  if (message.includes('consumer') || message.includes('complaint') || message.includes('refund')) {
    return `**Consumer Rights & Complaint Process**

Under the Consumer Protection Act, 2019, you have the following rights:

**Your Rights**:
- Right to Safety
- Right to Information
- Right to Choose
- Right to be Heard
- Right to Seek Redressal

**How to File a Consumer Complaint**:

1. **Online**: Visit consumerhelpline.gov.in or the e-Daakhil portal
2. **Offline**: Submit written complaint to Consumer Forum

**Where to File** (based on claim value):
- Up to ₹1 crore: District Commission
- ₹1-10 crore: State Commission
- Above ₹10 crore: National Commission

**Required Documents**:
- Purchase invoice/receipt
- Warranty card
- Correspondence with seller
- Evidence of defect/deficiency

Would you like help drafting a consumer complaint?`;
  }

  if (message.includes('arrest') || message.includes('rights') || message.includes('detained')) {
    return `**Your Rights During Arrest**

The Constitution of India and CrPC provide important protections:

**Fundamental Rights**:

1. **Right to Know Grounds of Arrest** (Article 22(1))
   - Police must inform you why you're being arrested

2. **Right to Legal Counsel** (Article 22(1))
   - You can consult a lawyer of your choice
   - If you can't afford one, free legal aid is available

3. **Right to be Produced Before Magistrate** (Article 22(2))
   - Within 24 hours of arrest (excluding travel time)

4. **Right Against Self-Incrimination** (Article 20(3))
   - You cannot be forced to confess

5. **Right to Inform Family/Friend**
   - Police must inform someone of your arrest

**Remember**:
- Remain calm and cooperate
- Do not sign any blank papers
- Ask for a copy of the arrest memo

Do you need information about bail or legal aid services?`;
  }

  if (message.includes('property') || message.includes('land') || message.includes('registration')) {
    return `**Property Laws in India**

Here's an overview of property-related legal matters:

**Property Registration**:
- Mandatory under Registration Act, 1908
- Done at Sub-Registrar's office
- Stamp duty varies by state (4-8%)

**Documents Required**:
- Sale deed/agreement
- Title documents
- Encumbrance certificate
- Property tax receipts
- ID proofs of parties

**Due Diligence Before Buying**:
1. Verify title documents (last 30 years)
2. Check encumbrance certificate
3. Verify approved building plan
4. Confirm no pending litigation
5. Check property tax payments

**Common Issues**:
- Title disputes
- Unauthorized construction
- Encroachment
- Inheritance disputes

Would you like specific guidance on property transfer, inheritance, or dispute resolution?`;
  }

  if (message.includes('rti') || message.includes('information')) {
    return `**Right to Information (RTI) Act, 2005**

RTI empowers citizens to seek information from public authorities.

**How to File RTI**:

1. **Online**: rtionline.gov.in (for central govt)
2. **Offline**: Written application to PIO

**Application Requirements**:
- Address it to Public Information Officer (PIO)
- Pay ₹10 fee (₹2 for BPL)
- Be specific about information needed
- No need to give reasons

**Timeline**:
- Response within 30 days
- 48 hours for life/liberty matters
- First Appeal: Within 30 days
- Second Appeal: To Information Commission

**What You Can Ask**:
- Government records, documents
- Inspection of works
- Certified copies

**Exemptions** (Section 8):
- National security matters
- Personal information
- Cabinet papers

Need help drafting an RTI application?`;
  }

  // Default response
  return `Thank you for your question about "${userMessage}".

I'm NyayaAI, your AI legal assistant for Indian law. I can help you with:

📋 **Legal Information**:
- Criminal law (FIR, arrest rights, bail)
- Family law (divorce, maintenance, custody)
- Property law (registration, disputes)
- Consumer rights and complaints
- RTI applications
- Labor and employment law

⚠️ **Important Disclaimer**:
I provide legal information for educational purposes. This is not legal advice. For specific legal matters, please consult a qualified advocate.

Could you please provide more details about your legal query? For example:
- What specific situation are you facing?
- Which area of law is this related to?
- What outcome are you hoping for?

I'm here to help you understand your rights and options under Indian law.`;
};

// Chat with AI
export const chatWithAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, sessionId, userId } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Message is required and must be a string',
      });
      return;
    }

    // Generate session ID if not provided
    const chatSessionId = sessionId || uuidv4();
    const chatUserId = userId || 'anonymous-' + uuidv4().slice(0, 8);

    // Save user message to database
    const userMessage = await ChatMessage.create({
      userId: chatUserId,
      sessionId: chatSessionId,
      message: message.trim(),
      role: 'user',
      timestamp: new Date(),
    });

    // Generate mock AI response
    const aiResponseText = getMockAIResponse(message);

    // Save AI response to database
    const aiMessage = await ChatMessage.create({
      userId: chatUserId,
      sessionId: chatSessionId,
      message: aiResponseText,
      role: 'ai',
      timestamp: new Date(),
    });

    res.status(200).json({
      success: true,
      data: {
        sessionId: chatSessionId,
        userId: chatUserId,
        userMessage: {
          id: userMessage._id,
          message: userMessage.message,
          role: userMessage.role,
          timestamp: userMessage.timestamp,
        },
        aiResponse: {
          id: aiMessage._id,
          message: aiMessage.message,
          role: aiMessage.role,
          timestamp: aiMessage.timestamp,
        },
      },
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process chat message',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get chat history
export const getChatHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req.params;
    const { limit = 50, before } = req.query;

    if (!sessionId) {
      res.status(400).json({
        success: false,
        message: 'Session ID is required',
      });
      return;
    }

    const query: any = { sessionId };
    if (before) {
      query.timestamp = { $lt: new Date(before as string) };
    }

    const messages = await ChatMessage.find(query)
      .sort({ timestamp: 1 })
      .limit(Number(limit))
      .select('message role timestamp');

    res.status(200).json({
      success: true,
      data: {
        sessionId,
        messages,
        count: messages.length,
      },
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve chat history',
    });
  }
};

// Get user's chat sessions
export const getUserSessions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const sessions = await ChatMessage.aggregate([
      { $match: { userId } },
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: '$sessionId',
          lastMessage: { $first: '$message' },
          lastTimestamp: { $first: '$timestamp' },
          messageCount: { $sum: 1 },
        },
      },
      { $sort: { lastTimestamp: -1 } },
      { $limit: 20 },
    ]);

    res.status(200).json({
      success: true,
      data: {
        userId,
        sessions: sessions.map((s) => ({
          sessionId: s._id,
          preview: s.lastMessage.substring(0, 100) + (s.lastMessage.length > 100 ? '...' : ''),
          lastActivity: s.lastTimestamp,
          messageCount: s.messageCount,
        })),
      },
    });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user sessions',
    });
  }
};

// Delete chat session
export const deleteSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req.params;

    const result = await ChatMessage.deleteMany({ sessionId });

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} messages`,
    });
  } catch (error) {
    console.error('Delete session error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete session',
    });
  }
};
