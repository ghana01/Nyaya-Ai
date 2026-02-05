import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Right } from '../models/Right';

dotenv.config();

const seedData = [
  // Women Rights
  {
    title: 'Protection from Domestic Violence',
    category: 'women',
    description: 'The Protection of Women from Domestic Violence Act, 2005 provides protection to women from physical, sexual, verbal, emotional, and economic abuse in domestic relationships. This includes wife, live-in partner, sister, mother, or any woman living in shared household.',
    lawReference: 'Protection of Women from Domestic Violence Act, 2005',
    icon: '🛡️',
    keyPoints: [
      'Right to reside in shared household',
      'Protection orders against abuser',
      'Monetary relief for expenses',
      'Custody orders for children',
      'Compensation for injuries',
      'Free legal aid available',
    ],
    relatedLaws: [
      'Section 498A IPC - Cruelty by husband or relatives',
      'Dowry Prohibition Act, 1961',
      'Hindu Marriage Act, 1955',
    ],
    helplineNumbers: [
      { name: 'Women Helpline', number: '181' },
      { name: 'NCW Helpline', number: '7827-170-170' },
    ],
  },
  {
    title: 'Sexual Harassment at Workplace',
    category: 'women',
    description: 'The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 mandates every organization with 10+ employees to constitute an Internal Complaints Committee (ICC) and provide a safe working environment.',
    lawReference: 'Sexual Harassment of Women at Workplace Act, 2013 (POSH Act)',
    icon: '🏢',
    keyPoints: [
      'Right to file complaint within 3 months',
      'Inquiry must be completed in 90 days',
      'Confidentiality is mandatory',
      'No retaliation against complainant',
      'Right to transfer or leave during inquiry',
      'Compensation from respondent',
    ],
    relatedLaws: [
      'Vishaka Guidelines (1997)',
      'Section 354A IPC - Sexual harassment',
      'Section 509 IPC - Word, gesture or act to insult modesty',
    ],
    helplineNumbers: [
      { name: 'Women Helpline', number: '181' },
      { name: 'SHe-Box Portal', number: 'shebox.nic.in' },
    ],
  },
  {
    title: 'Maternity Benefits',
    category: 'women',
    description: 'The Maternity Benefit Act provides 26 weeks of paid maternity leave for first two children (12 weeks for third child onwards). Also includes provisions for work from home, crèche facility, and protection from dismissal.',
    lawReference: 'Maternity Benefit Act, 1961 (Amended 2017)',
    icon: '👶',
    keyPoints: [
      '26 weeks paid leave for first two children',
      '12 weeks for third child onwards',
      '12 weeks for adopting/commissioning mothers',
      'Crèche facility mandatory (50+ employees)',
      'Work from home option after leave',
      'Cannot be dismissed during pregnancy',
    ],
    relatedLaws: [
      'Employees State Insurance Act, 1948',
      'Code on Social Security, 2020',
    ],
    helplineNumbers: [
      { name: 'Labour Commissioner', number: 'Varies by state' },
    ],
  },
  {
    title: 'Equal Pay for Equal Work',
    category: 'women',
    description: 'The Equal Remuneration Act mandates equal pay for men and women for same work or work of similar nature. Discrimination in recruitment and service conditions on grounds of sex is prohibited.',
    lawReference: 'Equal Remuneration Act, 1976',
    icon: '💰',
    keyPoints: [
      'Equal pay for same or similar work',
      'No discrimination in recruitment',
      'No discrimination in promotions',
      'No discrimination in training',
      'Complaint to Labour Commissioner',
      'Penalty for non-compliance',
    ],
    relatedLaws: [
      'Article 39(d) of Constitution',
      'Code on Wages, 2019',
    ],
    helplineNumbers: [],
  },

  // Cybercrime Rights
  {
    title: 'Protection Against Cyber Stalking',
    category: 'cybercrime',
    description: 'Cyber stalking through emails, social media, or any electronic communication is a punishable offense. Victims can file complaints online through the National Cyber Crime Reporting Portal.',
    lawReference: 'Section 354D IPC & IT Act, 2000',
    icon: '🔒',
    keyPoints: [
      'Stalking includes monitoring online activity',
      'Repeatedly contacting despite disinterest',
      'Publishing obscene material about victim',
      'Punishment up to 3 years + fine',
      'File complaint on cybercrime.gov.in',
      'Preserve evidence (screenshots, messages)',
    ],
    relatedLaws: [
      'Section 66A IT Act (struck down but related)',
      'Section 67 IT Act - Publishing obscene material',
      'Section 354D IPC - Stalking',
    ],
    helplineNumbers: [
      { name: 'Cybercrime Helpline', number: '1930' },
      { name: 'Cyber Portal', number: 'cybercrime.gov.in' },
    ],
  },
  {
    title: 'Online Financial Fraud Protection',
    category: 'cybercrime',
    description: 'Victims of online banking fraud, UPI fraud, credit card fraud, or phishing attacks can report and potentially recover money if reported within the "Golden Hour" (first few hours of fraud).',
    lawReference: 'IT Act, 2000 & RBI Guidelines',
    icon: '💳',
    keyPoints: [
      'Report within 3 days for zero liability',
      'Call bank immediately to block card/account',
      'File complaint on cybercrime.gov.in',
      'Report to RBI if bank does not respond',
      'Zero liability if reported within 3 days',
      'Partial liability for 4-7 days delay',
    ],
    relatedLaws: [
      'Section 66C IT Act - Identity theft',
      'Section 66D IT Act - Cheating by personation',
      'Section 420 IPC - Cheating',
    ],
    helplineNumbers: [
      { name: 'Cybercrime Helpline', number: '1930' },
      { name: 'RBI Ombudsman', number: 'cms.rbi.org.in' },
    ],
  },
  {
    title: 'Data Privacy Rights',
    category: 'cybercrime',
    description: 'Under the Digital Personal Data Protection Act, 2023, individuals have the right to access, correct, and erase their personal data. Organizations must obtain consent before collecting data.',
    lawReference: 'Digital Personal Data Protection Act, 2023',
    icon: '🔐',
    keyPoints: [
      'Right to access your personal data',
      'Right to correction of inaccurate data',
      'Right to erasure of data',
      'Right to withdraw consent',
      'Right to grievance redressal',
      'Organizations must notify data breaches',
    ],
    relatedLaws: [
      'Section 43A IT Act - Compensation for data breach',
      'Section 72A IT Act - Disclosure of information',
      'Article 21 - Right to Privacy (Puttaswamy judgment)',
    ],
    helplineNumbers: [
      { name: 'Data Protection Board', number: 'To be established' },
    ],
  },

  // Arrest Rights
  {
    title: 'Right to Know Grounds of Arrest',
    category: 'arrest',
    description: 'Under Article 22(1) of the Constitution, every person arrested must be informed of the grounds of arrest immediately. Police cannot arrest without giving reasons.',
    lawReference: 'Article 22(1) of Constitution & Section 50 CrPC',
    icon: '📋',
    keyPoints: [
      'Must be told reason for arrest immediately',
      'Must be shown arrest warrant (if any)',
      'Arrest memo must be prepared',
      'Time and date of arrest must be recorded',
      'One witness should sign arrest memo',
      'Family member to be informed',
    ],
    relatedLaws: [
      'D.K. Basu Guidelines (1997)',
      'Section 41 CrPC - When police may arrest',
      'Section 41A CrPC - Notice of appearance',
    ],
    helplineNumbers: [
      { name: 'Legal Aid Helpline', number: '15100' },
      { name: 'NALSA', number: 'nalsa.gov.in' },
    ],
  },
  {
    title: 'Right to Legal Counsel',
    category: 'arrest',
    description: 'Every arrested person has the right to consult a lawyer of their choice. If they cannot afford one, free legal aid must be provided by the state under Article 39A.',
    lawReference: 'Article 22(1) Constitution & Section 41D CrPC',
    icon: '👨‍⚖️',
    keyPoints: [
      'Right to consult lawyer immediately',
      'Police must inform about this right',
      'Free legal aid if cannot afford lawyer',
      'Lawyer can be present during questioning',
      'Can contact District Legal Services Authority',
      'Cannot be denied access to lawyer',
    ],
    relatedLaws: [
      'Article 39A - Free legal aid',
      'Legal Services Authority Act, 1987',
      'Section 303 CrPC - Right to defense counsel',
    ],
    helplineNumbers: [
      { name: 'Legal Aid Helpline', number: '15100' },
      { name: 'NALSA', number: '011-23385256' },
    ],
  },
  {
    title: 'Right Against Self-Incrimination',
    category: 'arrest',
    description: 'No person accused of an offense can be compelled to be a witness against themselves. Confessions made to police are not admissible as evidence.',
    lawReference: 'Article 20(3) of Constitution',
    icon: '🤐',
    keyPoints: [
      'Cannot be forced to confess',
      'Cannot be tortured for confession',
      'Confessions to police not admissible',
      'Only confessions to Magistrate are valid',
      'Right to remain silent',
      'Narco analysis requires consent',
    ],
    relatedLaws: [
      'Section 25 Indian Evidence Act',
      'Section 26 Indian Evidence Act',
      'Selvi vs State of Karnataka (2010)',
    ],
    helplineNumbers: [
      { name: 'Human Rights Commission', number: 'nhrc.nic.in' },
    ],
  },
  {
    title: 'Right to be Produced Before Magistrate',
    category: 'arrest',
    description: 'Every arrested person must be produced before a Magistrate within 24 hours of arrest (excluding travel time). Detention beyond this without Magistrate order is illegal.',
    lawReference: 'Article 22(2) Constitution & Section 57 CrPC',
    icon: '⏰',
    keyPoints: [
      'Must be produced within 24 hours',
      'Travel time excluded from 24 hours',
      'Magistrate must be nearest available',
      'Detention beyond 24 hours is illegal',
      'Can apply for bail before Magistrate',
      'Magistrate can order medical examination',
    ],
    relatedLaws: [
      'Section 56 CrPC - Person arrested to be taken before Magistrate',
      'Section 167 CrPC - Remand provisions',
    ],
    helplineNumbers: [
      { name: 'Legal Aid', number: '15100' },
    ],
  },

  // Consumer Rights
  {
    title: 'Right to Product Information',
    category: 'consumer',
    description: 'Every consumer has the right to be informed about quality, quantity, potency, purity, standard, and price of goods or services. Products must have proper labeling.',
    lawReference: 'Consumer Protection Act, 2019',
    icon: 'ℹ️',
    keyPoints: [
      'Right to know product ingredients',
      'Manufacturing and expiry dates mandatory',
      'MRP must be displayed',
      'Net weight/quantity must be mentioned',
      'Country of origin required',
      'Misleading ads are punishable',
    ],
    relatedLaws: [
      'Legal Metrology Act, 2009',
      'Food Safety and Standards Act, 2006',
      'Bureau of Indian Standards Act, 2016',
    ],
    helplineNumbers: [
      { name: 'Consumer Helpline', number: '1915' },
      { name: 'NCH Portal', number: 'consumerhelpline.gov.in' },
    ],
  },
  {
    title: 'Right to Seek Redressal',
    category: 'consumer',
    description: 'Consumers can file complaints against unfair trade practices or defective goods/services. Consumer forums provide quick and inexpensive dispute resolution.',
    lawReference: 'Consumer Protection Act, 2019',
    icon: '⚖️',
    keyPoints: [
      'File complaint within 2 years of cause',
      'District Forum: Claims up to ₹1 crore',
      'State Commission: ₹1-10 crore',
      'National Commission: Above ₹10 crore',
      'Can file online via e-Daakhil',
      'No lawyer required for filing',
    ],
    relatedLaws: [
      'Consumer Protection Rules, 2020',
      'E-Commerce Rules, 2020',
    ],
    helplineNumbers: [
      { name: 'Consumer Helpline', number: '1915' },
      { name: 'e-Daakhil Portal', number: 'edaakhil.nic.in' },
    ],
  },
  {
    title: 'E-Commerce Consumer Rights',
    category: 'consumer',
    description: 'Online shoppers have specific rights including return policy disclosure, genuine product delivery, and protection against fake reviews. E-commerce platforms are liable for seller actions.',
    lawReference: 'Consumer Protection (E-Commerce) Rules, 2020',
    icon: '🛒',
    keyPoints: [
      'Return/refund policy must be clear',
      'Country of origin must be displayed',
      'No cancellation charges if seller delays',
      'Genuine products must be delivered',
      'Fake reviews are prohibited',
      'Platform liable for seller misconduct',
    ],
    relatedLaws: [
      'Consumer Protection Act, 2019',
      'IT Act, 2000',
      'Legal Metrology (Packaged Commodities) Rules',
    ],
    helplineNumbers: [
      { name: 'Consumer Helpline', number: '1915' },
    ],
  },

  // Tenant Rights
  {
    title: 'Right Against Arbitrary Eviction',
    category: 'tenant',
    description: 'Tenants cannot be evicted without following due process of law. Landlords must give proper notice and obtain court order for eviction. Self-help eviction is illegal.',
    lawReference: 'Model Tenancy Act, 2021 & State Rent Control Acts',
    icon: '🏠',
    keyPoints: [
      'Written notice required before eviction',
      'Court order needed for eviction',
      'Self-help eviction is illegal',
      'Cannot cut water/electricity for eviction',
      'Lock-out without notice is illegal',
      'Police cannot evict without court order',
    ],
    relatedLaws: [
      'State Rent Control Acts',
      'Transfer of Property Act, 1882',
      'Model Tenancy Act, 2021',
    ],
    helplineNumbers: [
      { name: 'Rent Authority', number: 'Varies by state' },
    ],
  },
  {
    title: 'Right to Essential Services',
    category: 'tenant',
    description: 'Landlords cannot disconnect essential services like water, electricity, or sanitation to force eviction. Such actions are punishable under rent control laws.',
    lawReference: 'State Rent Control Acts',
    icon: '💡',
    keyPoints: [
      'Water supply cannot be cut',
      'Electricity cannot be disconnected',
      'Common areas must be accessible',
      'Sanitation must be maintained',
      'Can complain to Rent Authority',
      'Landlord can be penalized',
    ],
    relatedLaws: [
      'Model Tenancy Act, 2021',
      'State Rent Control Acts',
      'Section 441 IPC - Criminal trespass',
    ],
    helplineNumbers: [
      { name: 'Police', number: '100' },
    ],
  },
  {
    title: 'Security Deposit Rights',
    category: 'tenant',
    description: 'Security deposit is refundable and should be returned within a specified period after vacating. Landlord can only deduct for damages beyond normal wear and tear.',
    lawReference: 'Model Tenancy Act, 2021',
    icon: '💰',
    keyPoints: [
      'Deposit limited to 2 months rent (Model Act)',
      'Must be refunded within 1 month of vacating',
      'Only actual damages can be deducted',
      'Normal wear and tear not deductible',
      'Get receipt for deposit paid',
      'Written agreement is important',
    ],
    relatedLaws: [
      'State Rent Control Acts',
      'Indian Contract Act, 1872',
      'Transfer of Property Act, 1882',
    ],
    helplineNumbers: [
      { name: 'Rent Authority', number: 'Varies by state' },
      { name: 'Consumer Forum', number: '1915' },
    ],
  },
];

const seedDatabase = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nyayaai';
    
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Right.deleteMany({});
    console.log('Cleared existing rights data');

    // Insert seed data
    const result = await Right.insertMany(seedData);
    console.log(`✅ Seeded ${result.length} rights successfully`);

    // Show category counts
    const categoryCounts = await Right.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    console.log('\nCategory breakdown:');
    categoryCounts.forEach((c) => {
      console.log(`  - ${c._id}: ${c.count} rights`);
    });

    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
