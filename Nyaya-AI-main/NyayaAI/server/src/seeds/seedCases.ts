import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import { Case } from '../models/Case';

const cases = [
  {
    title: 'Kesavananda Bharati v. State of Kerala',
    court: 'Supreme Court',
    year: 1973,
    citation: 'AIR 1973 SC 1461',
    summary:
      'One of the most landmark judgements in Indian constitutional history. The Supreme Court ruled that while Parliament has wide powers to amend the Constitution under Article 368, it cannot alter or destroy the "basic structure" of the Constitution. This case arose from a dispute over land reforms and the right to property.',
    judgement:
      'The Supreme Court by a 13-judge bench (7:6 majority) held that Parliament can amend any part of the Constitution but cannot alter its basic structure or essential features. The basic structure doctrine was established, protecting fundamental constitutional principles.',
    legalPrinciples: [
      'Basic Structure Doctrine of the Constitution',
      'Limits on Parliamentary power to amend the Constitution',
      'Separation of Powers',
      'Judicial Review',
      'Rule of Law',
    ],
    tags: ['constitution', 'amendment', 'basic structure', 'fundamental rights', 'parliament', 'article 368'],
  },
  {
    title: 'Maneka Gandhi v. Union of India',
    court: 'Supreme Court',
    year: 1978,
    citation: 'AIR 1978 SC 597',
    summary:
      'Maneka Gandhi\'s passport was impounded by the Government without giving any reason. She challenged this action as violating her fundamental rights under Articles 14, 19, and 21 of the Constitution. This case expanded the scope of Article 21 (Right to Life) dramatically.',
    judgement:
      'The Supreme Court held that the right to travel abroad is a fundamental right under Article 21. More importantly, it ruled that any law affecting personal liberty must be fair, just and reasonable – not merely a procedure prescribed by law. Article 21 must be read with Articles 14 and 19.',
    legalPrinciples: [
      'Expanded scope of Right to Life (Article 21)',
      'Procedure established by law must be just, fair and reasonable',
      'Inter-relationship between Articles 14, 19 and 21',
      'Due process of law',
      'Natural Justice',
    ],
    tags: ['fundamental rights', 'article 21', 'right to life', 'passport', 'personal liberty', 'due process'],
  },
  {
    title: 'Vishaka v. State of Rajasthan',
    court: 'Supreme Court',
    year: 1997,
    citation: 'AIR 1997 SC 3011',
    summary:
      'After Bhanwari Devi, a social worker in Rajasthan, was gang-raped for preventing a child marriage, Vishaka and several other women\'s rights groups filed a Public Interest Litigation. The case led to landmark guidelines against sexual harassment at workplace.',
    judgement:
      'The Supreme Court laid down the "Vishaka Guidelines" making it mandatory for all employers to provide a safe working environment. Courts declared sexual harassment at workplace as a violation of fundamental rights under Articles 14, 15, and 21. These guidelines later led to the POSH Act 2013.',
    legalPrinciples: [
      'Sexual harassment at workplace is a fundamental rights violation',
      'Employer\'s duty to provide safe working environment',
      'Gender equality in workplace (Article 15)',
      'Right to dignity as part of Right to Life (Article 21)',
      'PIL (Public Interest Litigation) as tool for rights enforcement',
    ],
    tags: ['sexual harassment', 'workplace', 'women rights', 'POSH', 'fundamental rights', 'PIL', 'gender equality'],
  },
  {
    title: 'Shah Bano Case (Mohd. Ahmed Khan v. Shah Bano Begum)',
    court: 'Supreme Court',
    year: 1985,
    citation: 'AIR 1985 SC 945',
    summary:
      'Shah Bano, a 62-year-old Muslim woman, was divorced by her husband after 43 years of marriage through triple talaq. She claimed maintenance under Section 125 CrPC. Her husband argued that Muslim Personal Law exempted him from paying maintenance beyond the iddat period.',
    judgement:
      'The Supreme Court held that Section 125 CrPC applies to all citizens regardless of religion, and Shah Bano was entitled to maintenance. The Court also observed that a Uniform Civil Code (Article 44) was desirable. This judgment was controversial and led to the Muslim Women (Protection of Rights on Divorce) Act, 1986.',
    legalPrinciples: [
      'Maintenance rights under Section 125 CrPC applicable to all religions',
      'Secular law prevails over personal law in criminal procedure matters',
      'Right to maintenance as part of right to life with dignity',
      'Uniform Civil Code (Article 44) – Directive Principle',
    ],
    tags: ['maintenance', 'divorce', 'muslim personal law', 'section 125 CrPC', 'women rights', 'uniform civil code'],
  },
  {
    title: 'Indra Sawhney v. Union of India (Mandal Commission Case)',
    court: 'Supreme Court',
    year: 1992,
    citation: 'AIR 1993 SC 477',
    summary:
      'After the Government implemented the Mandal Commission recommendations providing 27% reservation for OBCs (Other Backward Classes) in central government jobs, it was challenged. The case examined the constitutional validity of reservations.',
    judgement:
      'The Supreme Court upheld 27% OBC reservation but capped total reservations at 50% (except in extraordinary circumstances). It excluded the "creamy layer" of OBCs. Reservations in promotions were struck down (later amended by Constitution).',
    legalPrinciples: [
      '50% ceiling on total reservations (Articles 14, 16)',
      'Exclusion of creamy layer from reservation benefits',
      'Reservations in promotion not covered under Article 16(4)',
      'Backward class determination criteria',
      'Equality of opportunity (Article 16)',
    ],
    tags: ['reservation', 'OBC', 'affirmative action', 'mandal commission', 'article 16', 'equality', 'creamy layer'],
  },
  {
    title: 'D.K. Basu v. State of West Bengal',
    court: 'Supreme Court',
    year: 1997,
    citation: 'AIR 1997 SC 610',
    summary:
      'D.K. Basu, Executive Chairman of Legal Aid Services West Bengal, wrote a letter to the Supreme Court drawing attention to custodial deaths and torture in lock-ups. The Supreme Court treated it as a writ petition and examined the issue of police brutality and custodial violence.',
    judgement:
      'The Supreme Court issued comprehensive guidelines on arrest, detention, and interrogation to prevent custodial torture and deaths. These guidelines are now known as "D.K. Basu Guidelines" and are mandatory for all police officials.',
    legalPrinciples: [
      'Right against custodial torture (Article 21)',
      'Mandatory arrest guidelines for police officers',
      'Right to be informed of grounds of arrest (Article 22)',
      'Right of arrested person to have family informed',
      'Right to legal counsel during interrogation',
    ],
    tags: ['arrest', 'custody', 'police', 'torture', 'fundamental rights', 'article 21', 'article 22', 'FIR'],
  },
  {
    title: 'Shreya Singhal v. Union of India',
    court: 'Supreme Court',
    year: 2015,
    citation: 'AIR 2015 SC 1523',
    summary:
      'Two women were arrested for posting on Facebook questioning the shutdown of Mumbai after the death of Bal Thackeray. The arrest was made under Section 66A of the IT Act, which criminalized sending offensive messages online. The constitutional validity of Section 66A was challenged.',
    judgement:
      'The Supreme Court struck down Section 66A of the IT Act as unconstitutional for being vague, overbroad, and violating freedom of speech and expression under Article 19(1)(a). The Court distinguished between "advocacy" and "incitement." Sections 69A and 79 were upheld with safeguards.',
    legalPrinciples: [
      'Freedom of speech and expression online (Article 19(1)(a))',
      'Vagueness doctrine in criminal law',
      'Distinction between advocacy and incitement to violence',
      'Reasonable restrictions on free speech (Article 19(2))',
      'Internet as a platform for free speech',
    ],
    tags: ['freedom of speech', 'IT Act', 'section 66A', 'internet', 'social media', 'fundamental rights', 'article 19'],
  },
  {
    title: 'Navtej Singh Johar v. Union of India',
    court: 'Supreme Court',
    year: 2018,
    citation: '(2018) 10 SCC 1',
    summary:
      'A batch of petitions challenged Section 377 of the IPC which criminalized "carnal intercourse against the order of nature," effectively criminalizing consensual same-sex relationships between adults. The challenge was on grounds of violation of fundamental rights.',
    judgement:
      'The Supreme Court unanimously struck down Section 377 to the extent it criminalized consensual sexual acts between adults in private. It held that sexual orientation is a part of identity and is protected under Articles 14, 15, 19, and 21.',
    legalPrinciples: [
      'Right to dignity and autonomy (Article 21)',
      'Non-discrimination based on sexual orientation (Article 15)',
      'Privacy as a fundamental right',
      'Reading down of penal provisions inconsistent with Constitution',
      'Constitutional morality over social morality',
    ],
    tags: ['LGBTQ', 'section 377', 'IPC', 'sexuality', 'privacy', 'dignity', 'fundamental rights', 'discrimination'],
  },
  {
    title: 'Justice K.S. Puttaswamy v. Union of India (Aadhaar Privacy Case)',
    court: 'Supreme Court',
    year: 2017,
    citation: '(2017) 10 SCC 1',
    summary:
      'Former judge K.S. Puttaswamy challenged the Aadhaar biometric identity programme, arguing it violated the right to privacy. The Government claimed there was no fundamental right to privacy. This 9-judge Constitution Bench examined whether privacy is a fundamental right.',
    judgement:
      'The Supreme Court unanimously declared that the Right to Privacy is a fundamental right under Article 21 of the Constitution. The Court overruled earlier decisions (M.P. Sharma and Kharak Singh) which had held otherwise. Privacy includes informational privacy, bodily integrity, and personal autonomy.',
    legalPrinciples: [
      'Right to Privacy as a Fundamental Right (Article 21)',
      'Informational self-determination',
      'Bodily integrity and personal autonomy',
      'Data protection principles',
      'Consent as basis for data collection',
    ],
    tags: ['privacy', 'aadhaar', 'biometric', 'data protection', 'fundamental rights', 'article 21', 'surveillance'],
  },
  {
    title: 'Shayara Bano v. Union of India (Triple Talaq Case)',
    court: 'Supreme Court',
    year: 2017,
    citation: '(2017) 9 SCC 1',
    summary:
      'Shayara Bano was divorced by her husband through instantaneous triple talaq (talaq-e-biddat) after 15 years of marriage. She challenged the practice as unconstitutional. The case examined whether Islamic personal law practice of triple talaq violates fundamental rights.',
    judgement:
      'The Supreme Court by a 3:2 majority declared instant triple talaq (talaq-e-biddat) unconstitutional and void. The majority held it manifestly arbitrary and violative of Article 14. This led to the Muslim Women (Protection of Rights on Marriage) Act, 2019 criminalizing triple talaq.',
    legalPrinciples: [
      'Manifestly arbitrary practice violates Article 14 (Equality)',
      'Gender equality and non-discrimination (Articles 14, 15)',
      'Personal law subject to constitutional scrutiny',
      'Right to dignity in marriage (Article 21)',
    ],
    tags: ['triple talaq', 'Muslim personal law', 'divorce', 'women rights', 'article 14', 'equality', 'marriage'],
  },
  {
    title: 'Olga Tellis v. Bombay Municipal Corporation',
    court: 'Supreme Court',
    year: 1985,
    citation: 'AIR 1986 SC 180',
    summary:
      'Pavement dwellers in Bombay challenged their eviction from pavements. The Bombay Municipal Corporation planned to evict them without providing alternative accommodation. The court examined whether the right to livelihood falls within Article 21.',
    judgement:
      'The Supreme Court held that the right to livelihood is included in the right to life (Article 21). Evicting pavement dwellers without following due process and without providing alternative accommodation violates Article 21. Natural justice (hearing) must precede eviction.',
    legalPrinciples: [
      'Right to livelihood as part of Right to Life (Article 21)',
      'Due process before eviction',
      'Natural justice in administrative action',
      'Socio-economic rights as fundamental rights',
    ],
    tags: ['eviction', 'right to livelihood', 'article 21', 'housing', 'slum', 'due process', 'natural justice'],
  },
  {
    title: 'MC Mehta v. Union of India (Ganga Pollution Case)',
    court: 'Supreme Court',
    year: 1987,
    citation: 'AIR 1988 SC 1037',
    summary:
      'M.C. Mehta filed a PIL for the closure of tanneries and other industries polluting the Ganga river near Kanpur. The case became seminal for environmental law in India and the role of courts in enforcing environmental rights.',
    judgement:
      'The Supreme Court ordered closure of polluting tanneries and directed them to set up effluent treatment plants. It held that the right to live in a clean environment is part of Article 21. The State has an obligation to protect the environment. Established the "Absolute Liability" principle for hazardous industries.',
    legalPrinciples: [
      'Right to clean environment as part of Article 21',
      'Absolute liability for hazardous industries',
      'Polluter Pays Principle',
      'PIL as tool for environmental enforcement',
      'State\'s duty to protect environment (Article 48A)',
    ],
    tags: ['environment', 'pollution', 'PIL', 'Ganga', 'article 21', 'absolute liability', 'tanneries', 'clean water'],
  },
];

const seedCases = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nyayaai';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing cases
    await Case.deleteMany({});
    console.log('🗑️  Cleared existing cases');

    // Insert new cases
    const inserted = await Case.insertMany(cases);
    console.log(`✅ Seeded ${inserted.length} landmark Indian cases`);

    // List seeded cases
    inserted.forEach((c, i) => {
      console.log(`  ${i + 1}. ${c.title} (${c.year})`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed. Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedCases();
