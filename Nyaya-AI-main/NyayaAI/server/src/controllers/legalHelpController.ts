import { Request, Response } from 'express';

interface LegalHelpInput {
  problemType: 'fraud' | 'harassment' | 'landlord' | 'job' | 'domestic_violence' | 'consumer' | 'property';
  description?: string;
}

interface LegalHelpResponse {
  problemType: string;
  title: string;
  steps: string[];
  laws: string[];
  nextActions: string[];
  urgencyLevel: 'high' | 'medium' | 'low';
  helplineNumbers?: string[];
}

const legalHelpTree: Record<string, LegalHelpResponse> = {
  fraud: {
    problemType: 'fraud',
    title: 'Financial Fraud / Cyber Fraud',
    urgencyLevel: 'high',
    steps: [
      'Immediately report to your bank to freeze the transaction or reverse it',
      'File a complaint on the National Cyber Crime portal: cybercrime.gov.in',
      'Visit your nearest police station and file an FIR under IPC Section 420 (Cheating)',
      'Collect all evidence: screenshots, transaction records, messages, emails',
      'Contact your state\'s Economic Offences Wing (EOW) for large-scale fraud',
      'File a complaint with RBI if it involves a regulated financial entity',
      'Consult a lawyer to initiate civil proceedings for recovery of money',
    ],
    laws: [
      'IPC Section 420 – Cheating and dishonestly inducing delivery of property',
      'IT Act 2000, Section 66C – Identity theft',
      'IT Act 2000, Section 66D – Cheating by personation using computer resources',
      'IPC Section 406 – Criminal breach of trust',
      'IPC Section 467/468 – Forgery',
    ],
    nextActions: [
      'Call 1930 (National Cyber Crime Helpline) immediately',
      'Preserve all digital evidence before clearing data',
      'Consult a lawyer specializing in cyber crime or financial fraud',
      'File complaint at consumerhelpline.gov.in if an e-commerce fraud',
    ],
    helplineNumbers: ['1930 – Cyber Crime Helpline', '14440 – RBI Financial Fraud'],
  },
  harassment: {
    problemType: 'harassment',
    title: 'Harassment (Workplace / Sexual / Online)',
    urgencyLevel: 'high',
    steps: [
      'Document every incident with dates, times, witnesses, and screenshots',
      'If workplace harassment: file a complaint with the Internal Complaints Committee (ICC)',
      'If no ICC exists: file with the Local Complaints Committee (LCC) of your district',
      'File an FIR at your nearest police station',
      'For sexual harassment: Refer to POSH Act complaint mechanism',
      'Seek a Protection Order from the Magistrate under Protection of Women from Domestic Violence Act if applicable',
      'Consult a lawyer for civil remedy (damages) alongside criminal action',
    ],
    laws: [
      'Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act)',
      'IPC Section 354A – Sexual harassment',
      'IPC Section 509 – Word, gesture or act intended to insult the modesty of a woman',
      'IT Act 2000, Section 66A/67 – Online harassment and obscene content',
      'Protection of Women from Domestic Violence Act, 2005',
    ],
    nextActions: [
      'Contact National Commission for Women: ncw.nic.in or call 7827170170',
      'Seek immediate safety if physically threatened',
      'File complaint with local police Women\'s Help Desk',
      'Consult a lawyer for Protection Orders',
    ],
    helplineNumbers: ['181 – Women Helpline (All India)', '7827170170 – National Commission for Women', '100 – Police'],
  },
  landlord: {
    problemType: 'landlord',
    title: 'Landlord / Tenant Dispute',
    urgencyLevel: 'medium',
    steps: [
      'Review your rent agreement carefully for terms and conditions',
      'Send a legal notice to the landlord via registered post documenting your grievance',
      'File a complaint with the Rent Control Authority in your city/state',
      'For illegal eviction: file an FIR for wrongful confinement (IPC 341/342)',
      'Approach the Rent Court or Civil Court for rent-related disputes',
      'If deposit not returned: file a consumer complaint or civil suit for recovery',
      'Mediation through Lok Adalat is available for speedy resolution',
    ],
    laws: [
      'Transfer of Property Act, 1882',
      'State-specific Rent Control Acts (Delhi Rent Control Act, Maharashtra Rent Control Act, etc.)',
      'IPC Section 441 – Criminal trespass (for illegal eviction)',
      'IPC Section 503 – Criminal intimidation',
      'Consumer Protection Act, 2019 (for housing society disputes)',
    ],
    nextActions: [
      'Consult a civil lawyer specializing in property disputes',
      'Approach Lok Adalat for quick mediation',
      'Contact your District Legal Services Authority (DLSA) for free legal aid',
      'File RTI to check property ownership records',
    ],
    helplineNumbers: ['15100 – NALSA Legal Aid Helpline'],
  },
  job: {
    problemType: 'job',
    title: 'Employment / Labour Dispute',
    urgencyLevel: 'medium',
    steps: [
      'Document all incidents of unfair treatment, wrongful termination, or non-payment',
      'Send a written complaint to your HR department first',
      'File a complaint with the Labour Commissioner of your state',
      'For wrongful termination: file an Industrial Dispute under the Industrial Disputes Act',
      'For non-payment of wages: file with the Labour Court under Payment of Wages Act',
      'File an EPF complaint at epfindia.gov.in if provident fund is withheld',
      'Approach Employees\' State Insurance Corporation (ESIC) for ESI related grievances',
    ],
    laws: [
      'Industrial Disputes Act, 1947',
      'Payment of Wages Act, 1936',
      'Employees Provident Fund and Miscellaneous Provisions Act, 1952',
      'Minimum Wages Act, 1948',
      'Factories Act, 1948',
      'The Code on Wages, 2019',
    ],
    nextActions: [
      'Contact your state Labour Department',
      'File online at shramsuvidha.gov.in',
      'Consult a labour law specialist',
      'Approach the Labour Court if amicable resolution fails',
    ],
    helplineNumbers: ['14567 – Labour Helpline', '1800-11-2015 – EPFO Helpline'],
  },
  domestic_violence: {
    problemType: 'domestic_violence',
    title: 'Domestic Violence',
    urgencyLevel: 'high',
    steps: [
      'Move to a safe place immediately if you are in immediate danger',
      'Call 112 for immediate police assistance',
      'Contact a Protection Officer appointed under the DV Act in your area',
      'File an Application for Protection Order before a Magistrate',
      'File an FIR under IPC Section 498A (cruelty by husband or his relatives)',
      'Seek shelter at a government or NGO-run shelter home',
      'Apply for Maintenance under Section 125 CrPC',
      'Consult a lawyer for Residence Orders and Maintenance',
    ],
    laws: [
      'Protection of Women from Domestic Violence Act, 2005',
      'IPC Section 498A – Cruelty by husband or relatives',
      'IPC Section 304B – Dowry death',
      'Dowry Prohibition Act, 1961',
      'Hindu Marriage Act, 1955 (for divorce proceedings)',
    ],
    nextActions: [
      'Call 181 Women Helpline immediately',
      'Contact nearest One Stop Centre (Sakhi Centre)',
      'File for Protection Order as first legal step',
      'Seek free legal aid from District Legal Services Authority',
    ],
    helplineNumbers: ['181 – Women Helpline', '112 – Emergency', '1091 – Women in Distress'],
  },
  consumer: {
    problemType: 'consumer',
    title: 'Consumer Rights / Product Defect',
    urgencyLevel: 'low',
    steps: [
      'Collect all purchase documents: invoice, warranty card, delivery receipt',
      'Send a written complaint to the seller/company with a 15-day deadline for resolution',
      'File a complaint on the National Consumer Helpline: consumerhelpline.gov.in',
      'File online complaint on e-Daakhil portal: edaakhil.nic.in',
      'Visit District Consumer Disputes Redressal Commission for claims up to ₹1 crore',
      'State Commission for ₹1 crore to ₹10 crore',
      'National Commission for claims above ₹10 crore',
    ],
    laws: [
      'Consumer Protection Act, 2019',
      'Consumer Protection (E-Commerce) Rules, 2020',
      'BIS Act, 2016 (for product quality standards)',
      'Legal Metrology Act, 2009 (for weights and measures)',
    ],
    nextActions: [
      'Call 1915 – National Consumer Helpline',
      'File on e-Daakhil portal for quick online disposal',
      'Seek mediation through Consumer Mediation Cell',
      'Consult a consumer lawyer if claim exceeds ₹10 lakh',
    ],
    helplineNumbers: ['1915 – National Consumer Helpline', '1800-11-4000 – TRAI (Telecom Complaints)'],
  },
  property: {
    problemType: 'property',
    title: 'Property Dispute / Land Dispute',
    urgencyLevel: 'medium',
    steps: [
      'Gather all original property documents: sale deed, title deed, mutation records',
      'Verify property records at the Sub-Registrar\'s office',
      'Obtain Encumbrance Certificate to check for pending dues/mortgage',
      'Send a legal notice to the disputing party via a lawyer',
      'File a Civil Suit for declaration of title or possession in Civil Court',
      'File FIR if the other party has committed forgery or criminal trespass',
      'Approach Revenue Court for agricultural land disputes',
      'Lok Adalat is available for pre-litigation settlement',
    ],
    laws: [
      'Transfer of Property Act, 1882',
      'Registration Act, 1908',
      'Limitation Act, 1963',
      'Specific Relief Act, 1963',
      'IPC Section 447 – Criminal trespass',
      'IPC Section 467, 468 – Forgery of property documents',
    ],
    nextActions: [
      'Consult a civil/property lawyer immediately',
      'Get a thorough title search done by a lawyer',
      'Apply for stay order from court if facing illegal eviction',
      'Contact District Legal Services Authority for free legal aid',
    ],
    helplineNumbers: ['15100 – NALSA Legal Aid Helpline'],
  },
};

// POST /api/legal-help
export const getLegalHelp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { problemType, description } = req.body as LegalHelpInput;

    if (!problemType) {
      res.status(400).json({
        success: false,
        error: 'problemType is required',
      });
      return;
    }

    const validTypes = Object.keys(legalHelpTree);
    if (!validTypes.includes(problemType)) {
      res.status(400).json({
        success: false,
        error: `problemType must be one of: ${validTypes.join(', ')}`,
      });
      return;
    }

    const helpData = legalHelpTree[problemType];

    res.status(200).json({
      success: true,
      data: {
        ...helpData,
        description: description || null,
        disclaimer:
          'This information is for general guidance only. Please consult a qualified advocate for specific legal advice tailored to your situation.',
      },
    });
  } catch (error) {
    console.error('Legal help error:', error);
    res.status(500).json({ success: false, error: 'Failed to generate legal guidance' });
  }
};

// GET /api/legal-help/types - List available problem types
export const getLegalHelpTypes = async (req: Request, res: Response): Promise<void> => {
  const types = [
    { value: 'fraud', label: 'Financial Fraud / Cyber Fraud', icon: '🔐', urgency: 'high' },
    { value: 'harassment', label: 'Harassment (Workplace / Sexual / Online)', icon: '🛡️', urgency: 'high' },
    { value: 'domestic_violence', label: 'Domestic Violence', icon: '🏠', urgency: 'high' },
    { value: 'landlord', label: 'Landlord / Tenant Dispute', icon: '🏢', urgency: 'medium' },
    { value: 'job', label: 'Employment / Labour Dispute', icon: '💼', urgency: 'medium' },
    { value: 'property', label: 'Property / Land Dispute', icon: '📋', urgency: 'medium' },
    { value: 'consumer', label: 'Consumer Rights / Product Issue', icon: '🛒', urgency: 'low' },
  ];

  res.status(200).json({ success: true, data: { types } });
};
