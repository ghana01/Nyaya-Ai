import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Law } from '../models/Law';

dotenv.config();

const seedData = [
  // Indian Penal Code (IPC)
  {
    actName: 'Indian Penal Code, 1860',
    actShortName: 'IPC',
    section: 'Section 302',
    title: 'Punishment for Murder',
    explanation: 'Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.',
    punishment: 'Death or Imprisonment for life + Fine',
    keywords: ['murder', 'killing', 'death', 'homicide'],
    category: 'criminal',
  },
  {
    actName: 'Indian Penal Code, 1860',
    actShortName: 'IPC',
    section: 'Section 304',
    title: 'Punishment for Culpable Homicide not amounting to Murder',
    explanation: 'If the act is done with intention of causing death, or causing such bodily injury as is likely to cause death - imprisonment for life, or imprisonment up to 10 years + fine. If done with knowledge that it is likely to cause death - imprisonment up to 10 years + fine.',
    punishment: 'Imprisonment for life or up to 10 years + Fine',
    keywords: ['culpable homicide', 'manslaughter', 'unintentional killing'],
    category: 'criminal',
  },
  {
    actName: 'Indian Penal Code, 1860',
    actShortName: 'IPC',
    section: 'Section 307',
    title: 'Attempt to Murder',
    explanation: 'Whoever does any act with intention or knowledge that if the act caused death, it would be guilty of murder, shall be punished with imprisonment up to 10 years + fine. If hurt is caused, imprisonment for life or up to 10 years + fine.',
    punishment: 'Imprisonment up to 10 years + Fine; if hurt caused: Life or up to 10 years + Fine',
    keywords: ['attempt murder', 'trying to kill', 'attempted homicide'],
    category: 'criminal',
  },
  {
    actName: 'Indian Penal Code, 1860',
    actShortName: 'IPC',
    section: 'Section 376',
    title: 'Punishment for Rape',
    explanation: 'Whoever commits rape shall be punished with rigorous imprisonment for a term not less than 10 years but may extend to imprisonment for life, and shall also be liable to fine.',
    punishment: 'Rigorous Imprisonment minimum 10 years to Life + Fine',
    keywords: ['rape', 'sexual assault', 'sexual violence'],
    category: 'criminal',
  },
  {
    actName: 'Indian Penal Code, 1860',
    actShortName: 'IPC',
    section: 'Section 379',
    title: 'Punishment for Theft',
    explanation: 'Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.',
    punishment: 'Imprisonment up to 3 years, or Fine, or Both',
    keywords: ['theft', 'stealing', 'robbery', 'stolen property'],
    category: 'criminal',
  },
  {
    actName: 'Indian Penal Code, 1860',
    actShortName: 'IPC',
    section: 'Section 380',
    title: 'Theft in Dwelling House',
    explanation: 'Whoever commits theft in any building, tent or vessel used as a human dwelling, or for custody of property, shall be punished with imprisonment up to 7 years + fine.',
    punishment: 'Imprisonment up to 7 years + Fine',
    keywords: ['house theft', 'burglary', 'home robbery', 'break-in'],
    category: 'criminal',
  },
  {
    actName: 'Indian Penal Code, 1860',
    actShortName: 'IPC',
    section: 'Section 390',
    title: 'Robbery',
    explanation: 'When theft is robbery: If the offender causes or attempts to cause death, hurt, or wrongful restraint, or puts any person in fear of instant death, hurt, or restraint while committing theft, it becomes robbery.',
    punishment: 'Rigorous Imprisonment up to 10 years + Fine (Section 392)',
    keywords: ['robbery', 'dacoity', 'armed theft', 'violent theft'],
    category: 'criminal',
  },
  {
    actName: 'Indian Penal Code, 1860',
    actShortName: 'IPC',
    section: 'Section 420',
    title: 'Cheating and Dishonestly Inducing Delivery of Property',
    explanation: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property, or to make, alter or destroy any valuable security, shall be punished with imprisonment up to 7 years + fine.',
    punishment: 'Imprisonment up to 7 years + Fine',
    keywords: ['cheating', 'fraud', 'scam', 'deception', '420'],
    category: 'criminal',
  },
  {
    actName: 'Indian Penal Code, 1860',
    actShortName: 'IPC',
    section: 'Section 498A',
    title: 'Cruelty by Husband or Relatives',
    explanation: 'Whoever, being the husband or relative of the husband of a woman, subjects her to cruelty shall be punished with imprisonment up to 3 years + fine. Cruelty includes harassment for dowry and mental/physical torture.',
    punishment: 'Imprisonment up to 3 years + Fine',
    keywords: ['dowry', 'cruelty', 'domestic violence', 'harassment', 'matrimonial'],
    category: 'criminal',
  },
  {
    actName: 'Indian Penal Code, 1860',
    actShortName: 'IPC',
    section: 'Section 354',
    title: 'Assault or Criminal Force to Woman with Intent to Outrage Modesty',
    explanation: 'Whoever assaults or uses criminal force to any woman, intending to outrage or knowing it to be likely that he will thereby outrage her modesty, shall be punished with imprisonment from 1 to 5 years + fine.',
    punishment: 'Imprisonment 1 to 5 years + Fine',
    keywords: ['molestation', 'outraging modesty', 'sexual harassment', 'eve teasing'],
    category: 'criminal',
  },
  {
    actName: 'Indian Penal Code, 1860',
    actShortName: 'IPC',
    section: 'Section 323',
    title: 'Punishment for Voluntarily Causing Hurt',
    explanation: 'Whoever voluntarily causes hurt shall be punished with imprisonment up to 1 year, or fine up to Rs. 1000, or both.',
    punishment: 'Imprisonment up to 1 year, or Fine up to Rs. 1000, or Both',
    keywords: ['hurt', 'injury', 'assault', 'beating', 'physical harm'],
    category: 'criminal',
  },
  {
    actName: 'Indian Penal Code, 1860',
    actShortName: 'IPC',
    section: 'Section 324',
    title: 'Voluntarily Causing Hurt by Dangerous Weapons',
    explanation: 'Whoever voluntarily causes hurt by means of any instrument for shooting, stabbing or cutting, or any instrument used as a weapon of offence which is likely to cause death, shall be punished with imprisonment up to 3 years, or fine, or both.',
    punishment: 'Imprisonment up to 3 years, or Fine, or Both',
    keywords: ['weapon', 'knife', 'dangerous weapon', 'stabbing', 'armed assault'],
    category: 'criminal',
  },
  {
    actName: 'Indian Penal Code, 1860',
    actShortName: 'IPC',
    section: 'Section 499',
    title: 'Defamation',
    explanation: 'Whoever by words, signs, visible representations, makes or publishes any imputation concerning any person, intending to harm the reputation of such person, is said to defame that person.',
    punishment: 'Simple Imprisonment up to 2 years, or Fine, or Both (Section 500)',
    keywords: ['defamation', 'libel', 'slander', 'reputation', 'false statement'],
    category: 'criminal',
  },
  {
    actName: 'Indian Penal Code, 1860',
    actShortName: 'IPC',
    section: 'Section 506',
    title: 'Criminal Intimidation',
    explanation: 'Whoever threatens another with any injury to person, reputation or property with intent to cause alarm or to compel that person to do any act against their will, commits criminal intimidation.',
    punishment: 'Imprisonment up to 2 years, or Fine, or Both; if threat of death/grievous hurt: up to 7 years',
    keywords: ['threat', 'intimidation', 'blackmail', 'menace', 'threatening'],
    category: 'criminal',
  },

  // IT Act
  {
    actName: 'Information Technology Act, 2000',
    actShortName: 'IT Act',
    section: 'Section 66',
    title: 'Computer Related Offences',
    explanation: 'If any person dishonestly or fraudulently does any act referred to in section 43 (hacking, data theft, virus introduction), he shall be punishable with imprisonment up to 3 years or fine up to Rs. 5 lakhs or both.',
    punishment: 'Imprisonment up to 3 years or Fine up to Rs. 5 lakhs or Both',
    keywords: ['hacking', 'cyber crime', 'computer offense', 'data theft'],
    category: 'cyber',
  },
  {
    actName: 'Information Technology Act, 2000',
    actShortName: 'IT Act',
    section: 'Section 66C',
    title: 'Identity Theft',
    explanation: 'Whoever fraudulently or dishonestly uses the electronic signature, password or any other unique identification feature of any other person, shall be punished with imprisonment up to 3 years and fine up to Rs. 1 lakh.',
    punishment: 'Imprisonment up to 3 years + Fine up to Rs. 1 lakh',
    keywords: ['identity theft', 'password theft', 'impersonation', 'fraud'],
    category: 'cyber',
  },
  {
    actName: 'Information Technology Act, 2000',
    actShortName: 'IT Act',
    section: 'Section 66D',
    title: 'Cheating by Personation using Computer Resource',
    explanation: 'Whoever by means of any communication device or computer resource cheats by personation, shall be punished with imprisonment up to 3 years and fine up to Rs. 1 lakh.',
    punishment: 'Imprisonment up to 3 years + Fine up to Rs. 1 lakh',
    keywords: ['online fraud', 'phishing', 'impersonation', 'cyber cheating'],
    category: 'cyber',
  },
  {
    actName: 'Information Technology Act, 2000',
    actShortName: 'IT Act',
    section: 'Section 67',
    title: 'Publishing Obscene Material in Electronic Form',
    explanation: 'Whoever publishes or transmits obscene material in electronic form shall be punished with imprisonment up to 3 years and fine up to Rs. 5 lakhs on first conviction. For subsequent convictions, up to 5 years + Rs. 10 lakhs.',
    punishment: 'First conviction: 3 years + Rs. 5 lakhs; Subsequent: 5 years + Rs. 10 lakhs',
    keywords: ['obscene content', 'pornography', 'explicit material', 'indecent content'],
    category: 'cyber',
  },
  {
    actName: 'Information Technology Act, 2000',
    actShortName: 'IT Act',
    section: 'Section 67A',
    title: 'Publishing Sexually Explicit Material',
    explanation: 'Whoever publishes or transmits material containing sexually explicit act in electronic form shall be punished with imprisonment up to 5 years and fine up to Rs. 10 lakhs on first conviction.',
    punishment: 'First conviction: 5 years + Rs. 10 lakhs; Subsequent: 7 years + Rs. 10 lakhs',
    keywords: ['sexually explicit', 'adult content', 'pornography distribution'],
    category: 'cyber',
  },

  // Consumer Protection Act
  {
    actName: 'Consumer Protection Act, 2019',
    actShortName: 'CPA',
    section: 'Section 2(7)',
    title: 'Definition of Consumer',
    explanation: 'Consumer means any person who buys goods for a consideration or hires/avails services for a consideration. It includes offline and online transactions, and also covers telecom, housing construction, and banking services.',
    punishment: 'N/A - Definitional Section',
    keywords: ['consumer', 'buyer', 'customer', 'purchaser'],
    category: 'consumer',
  },
  {
    actName: 'Consumer Protection Act, 2019',
    actShortName: 'CPA',
    section: 'Section 2(47)',
    title: 'Unfair Trade Practice',
    explanation: 'Includes false representation about quality, sponsorship, price, uses of goods/services; publishing misleading advertisements; bait and switch selling; not issuing bill/receipt.',
    punishment: 'Compensation + Injunction + Penalties as per Consumer Commission orders',
    keywords: ['unfair trade', 'false advertising', 'misleading', 'deceptive practice'],
    category: 'consumer',
  },
  {
    actName: 'Consumer Protection Act, 2019',
    actShortName: 'CPA',
    section: 'Section 34-37',
    title: 'District Consumer Disputes Redressal Commission',
    explanation: 'District Commission has jurisdiction over complaints where value of goods/services does not exceed Rs. 1 crore. Complaints can be filed in the district where the opposite party resides/works or where the cause of action arose.',
    punishment: 'N/A - Jurisdictional Section; Commission can order refund, replacement, compensation',
    keywords: ['consumer forum', 'district commission', 'complaint', 'consumer court'],
    category: 'consumer',
  },

  // Motor Vehicles Act
  {
    actName: 'Motor Vehicles Act, 1988',
    actShortName: 'MV Act',
    section: 'Section 185',
    title: 'Driving by Drunken Persons or by Persons Under the Influence of Drugs',
    explanation: 'Whoever drives a motor vehicle while having alcohol in blood exceeding 30mg per 100ml of blood, or while under the influence of drugs, shall be punishable for first offense with imprisonment up to 6 months and/or fine up to Rs. 10,000.',
    punishment: 'First offense: 6 months and/or Rs. 10,000; Repeat offense: 2 years and/or Rs. 15,000',
    keywords: ['drunk driving', 'dui', 'alcohol driving', 'intoxicated driving'],
    category: 'criminal',
  },
  {
    actName: 'Motor Vehicles Act, 1988',
    actShortName: 'MV Act',
    section: 'Section 184',
    title: 'Driving Dangerously',
    explanation: 'Whoever drives a motor vehicle at a speed or in a manner dangerous to public shall be punishable for first offense with imprisonment up to 1 year and/or fine up to Rs. 5,000. For second offense: up to 2 years and/or fine up to Rs. 10,000.',
    punishment: 'First offense: 1 year and/or Rs. 5,000; Second: 2 years and/or Rs. 10,000',
    keywords: ['rash driving', 'dangerous driving', 'reckless driving', 'speeding'],
    category: 'criminal',
  },
  {
    actName: 'Motor Vehicles Act, 1988',
    actShortName: 'MV Act',
    section: 'Section 177',
    title: 'General Provision for Punishment of Offences',
    explanation: 'Whoever contravenes any provision of this Act or rules for which no specific penalty is provided shall be punishable with fine up to Rs. 500 for first offense and up to Rs. 1,500 for subsequent offenses.',
    punishment: 'Fine up to Rs. 500 (first); Rs. 1,500 (subsequent)',
    keywords: ['traffic violation', 'traffic rules', 'traffic offense'],
    category: 'criminal',
  },

  // Domestic Violence Act
  {
    actName: 'Protection of Women from Domestic Violence Act, 2005',
    actShortName: 'DV Act',
    section: 'Section 3',
    title: 'Definition of Domestic Violence',
    explanation: 'Domestic violence includes any act, omission or conduct that harms, injures or endangers the aggrieved person. It includes physical abuse, sexual abuse, verbal and emotional abuse, and economic abuse.',
    punishment: 'N/A - Definitional Section',
    keywords: ['domestic violence', 'abuse', 'matrimonial cruelty', 'wife beating'],
    category: 'family',
  },
  {
    actName: 'Protection of Women from Domestic Violence Act, 2005',
    actShortName: 'DV Act',
    section: 'Section 18',
    title: 'Protection Orders',
    explanation: 'The Magistrate may pass a protection order prohibiting the respondent from committing domestic violence, entering workplace or school of aggrieved, attempting to communicate, and any other act specified.',
    punishment: 'Breach of protection order: Imprisonment up to 1 year and/or fine up to Rs. 20,000',
    keywords: ['protection order', 'restraining order', 'safety order'],
    category: 'family',
  },
  {
    actName: 'Protection of Women from Domestic Violence Act, 2005',
    actShortName: 'DV Act',
    section: 'Section 19',
    title: 'Residence Orders',
    explanation: 'The Magistrate may pass residence orders restraining the respondent from dispossessing or disturbing possession of the aggrieved from the shared household, regardless of whether the respondent has any legal or equitable interest in it.',
    punishment: 'Breach of residence order: Imprisonment up to 1 year and/or fine up to Rs. 20,000',
    keywords: ['residence order', 'shared household', 'right to residence'],
    category: 'family',
  },

  // POCSO Act
  {
    actName: 'Protection of Children from Sexual Offences Act, 2012',
    actShortName: 'POCSO',
    section: 'Section 4',
    title: 'Punishment for Penetrative Sexual Assault',
    explanation: 'Whoever commits penetrative sexual assault on a child shall be punished with imprisonment not less than 10 years but may extend to imprisonment for life, and shall also be liable to fine.',
    punishment: 'Minimum 10 years to Life Imprisonment + Fine',
    keywords: ['child abuse', 'sexual assault', 'minor abuse', 'child protection'],
    category: 'criminal',
  },
  {
    actName: 'Protection of Children from Sexual Offences Act, 2012',
    actShortName: 'POCSO',
    section: 'Section 7',
    title: 'Sexual Assault',
    explanation: 'Whoever with sexual intent touches the vagina, penis, anus or breast of the child or makes the child touch such body parts of himself or any other person, or does any other act with sexual intent involving physical contact without penetration.',
    punishment: 'Imprisonment 3 to 5 years + Fine',
    keywords: ['sexual assault child', 'molestation child', 'child sexual abuse'],
    category: 'criminal',
  },

  // RTI Act
  {
    actName: 'Right to Information Act, 2005',
    actShortName: 'RTI Act',
    section: 'Section 3',
    title: 'Right to Information',
    explanation: 'All citizens shall have the right to information subject to the provisions of this Act.',
    punishment: 'N/A - Rights Section',
    keywords: ['rti', 'right to information', 'public information', 'transparency'],
    category: 'constitutional',
  },
  {
    actName: 'Right to Information Act, 2005',
    actShortName: 'RTI Act',
    section: 'Section 7',
    title: 'Disposal of Request',
    explanation: 'The PIO shall provide information within 30 days of receipt of request. If life or liberty is involved, information shall be provided within 48 hours. If third party is involved, 40 days.',
    punishment: 'PIO liable for penalty up to Rs. 25,000 for not providing information without reasonable cause',
    keywords: ['rti response', 'information request', 'pio', 'time limit'],
    category: 'constitutional',
  },

  // Hindu Marriage Act
  {
    actName: 'Hindu Marriage Act, 1955',
    actShortName: 'HMA',
    section: 'Section 13',
    title: 'Divorce',
    explanation: 'Either party can file for divorce on grounds including: adultery, cruelty, desertion for 2+ years, conversion to another religion, unsoundness of mind, venereal disease, renunciation of world, and not being heard of as being alive for 7 years.',
    punishment: 'N/A - Civil Remedy Section',
    keywords: ['divorce', 'dissolution of marriage', 'separation', 'matrimonial'],
    category: 'family',
  },
  {
    actName: 'Hindu Marriage Act, 1955',
    actShortName: 'HMA',
    section: 'Section 13B',
    title: 'Divorce by Mutual Consent',
    explanation: 'If both husband and wife have been living separately for 1 year or more and have mutually agreed to dissolve the marriage, they may present a petition for divorce. Court grants decree after 6-18 months cooling period.',
    punishment: 'N/A - Civil Remedy Section',
    keywords: ['mutual divorce', 'consensual divorce', 'mutual consent'],
    category: 'family',
  },
  {
    actName: 'Hindu Marriage Act, 1955',
    actShortName: 'HMA',
    section: 'Section 24',
    title: 'Maintenance Pendente Lite and Expenses of Proceedings',
    explanation: 'During matrimonial proceedings, the spouse with insufficient independent income can claim maintenance from the other spouse for their support and for expenses of the proceedings.',
    punishment: 'N/A - Civil Remedy Section',
    keywords: ['interim maintenance', 'alimony', 'maintenance during case'],
    category: 'family',
  },
];

const seedDatabase = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nyayaai';
    
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Law.deleteMany({});
    console.log('Cleared existing laws data');

    // Insert seed data
    const result = await Law.insertMany(seedData);
    console.log(`✅ Seeded ${result.length} laws successfully`);

    // Show act counts
    const actCounts = await Law.aggregate([
      { $group: { _id: '$actName', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    console.log('\nActs breakdown:');
    actCounts.forEach((a) => {
      console.log(`  - ${a._id}: ${a.count} sections`);
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
