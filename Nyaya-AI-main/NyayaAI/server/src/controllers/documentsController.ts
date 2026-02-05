import { Request, Response } from 'express';
import { GeneratedDocument } from '../models/GeneratedDocument';
import { AuthRequest } from '../middleware/auth';

// Document templates
const templates = {
  'police-complaint': (data: any) => `
POLICE COMPLAINT

To,
The Station House Officer,
${data.policeStation || '[Police Station Name]'},
${data.district || '[District]'}, ${data.state || '[State]'}

Subject: Complaint regarding ${data.subject || '[Subject]'}

Respected Sir/Madam,

I, ${data.complainantName || '[Your Name]'}, ${data.complainantRelation || 'S/o, D/o, W/o'} ${data.guardianName || '[Father/Husband Name]'}, aged ${data.age || '[Age]'} years, residing at ${data.address || '[Your Complete Address]'}, do hereby lodge this complaint and state as follows:

1. INCIDENT DETAILS:
   Date of Incident: ${data.incidentDate || '[Date]'}
   Time of Incident: ${data.incidentTime || '[Time]'}
   Place of Incident: ${data.incidentPlace || '[Location]'}

2. DESCRIPTION OF INCIDENT:
${data.incidentDescription || '[Describe what happened in detail]'}

3. ACCUSED DETAILS (if known):
   Name: ${data.accusedName || '[Name of accused if known]'}
   Address: ${data.accusedAddress || '[Address if known]'}
   Description: ${data.accusedDescription || '[Physical description if name unknown]'}

4. WITNESSES (if any):
${data.witnesses || '[Names and addresses of witnesses]'}

5. EVIDENCE:
${data.evidence || '[List any evidence - documents, photos, videos, etc.]'}

6. LOSSES/DAMAGES (if applicable):
${data.losses || '[Details of any property lost or damages suffered]'}

7. PRAYER:
I request you to kindly register an FIR against the accused person(s) and take appropriate legal action as per law. I am ready to cooperate with the investigation.

I hereby declare that the above statements are true to the best of my knowledge and belief.

Thanking you,

Yours faithfully,

____________________
${data.complainantName || '[Your Name]'}
Contact: ${data.phone || '[Phone Number]'}
Email: ${data.email || '[Email Address]'}
Date: ${new Date().toLocaleDateString('en-IN')}
Place: ${data.district || '[District]'}

Enclosures:
${data.enclosures || '1. Copy of ID Proof\n2. [List other documents]'}
`,

  'fir-draft': (data: any) => `
FIRST INFORMATION REPORT (FIR) DRAFT

(To be submitted at the Police Station)

PART I - COMPLAINANT INFORMATION

1. Complainant's Name: ${data.complainantName || '[Full Name]'}
2. Father's/Husband's Name: ${data.guardianName || '[Name]'}
3. Date of Birth/Age: ${data.age || '[Age]'} years
4. Nationality: Indian
5. Occupation: ${data.occupation || '[Occupation]'}
6. Address: ${data.address || '[Complete Address]'}
7. Contact Number: ${data.phone || '[Phone]'}

PART II - INCIDENT INFORMATION

8. Date of Occurrence: ${data.incidentDate || '[DD/MM/YYYY]'}
9. Time of Occurrence: ${data.incidentTime || '[Time]'}
10. Place of Occurrence: ${data.incidentPlace || '[Exact Location]'}
11. Type of Offence: ${data.offenceType || '[Type of Crime]'}
12. Applicable Sections: ${data.sections || '[IPC Sections if known]'}

PART III - DETAILS OF OCCURRENCE

${data.incidentDescription || '[Detailed description of the incident - What happened, How it happened, Who was involved]'}

PART IV - ACCUSED INFORMATION

13. Name of Accused: ${data.accusedName || '[If known]'}
14. Address of Accused: ${data.accusedAddress || '[If known]'}
15. Physical Description: ${data.accusedDescription || '[Height, build, complexion, any identifying marks]'}

PART V - PROPERTY DETAILS (if applicable)

16. Description of Property:
${data.propertyDescription || '[Details of stolen/damaged property]'}

17. Estimated Value: Rs. ${data.propertyValue || '[Amount]'}

PART VI - WITNESS INFORMATION

${data.witnesses || '[Name, Address, and Contact of Witnesses]'}

PART VII - DOCUMENTS/EVIDENCE

${data.evidence || '[List of supporting documents and evidence]'}

DECLARATION

I, ${data.complainantName || '[Name]'}, hereby declare that the information furnished above is true and correct to the best of my knowledge and belief. I understand that giving false information to the police is a punishable offence.

____________________
Signature of Complainant

Date: ${new Date().toLocaleDateString('en-IN')}
Place: ${data.district || '[Place]'}

Note: This is a draft FIR. The official FIR will be prepared by the Police Officer.
`,

  'rti-application': (data: any) => `
RIGHT TO INFORMATION APPLICATION
(Under Section 6 of RTI Act, 2005)

To,
The Public Information Officer,
${data.department || '[Name of Department/Office]'},
${data.departmentAddress || '[Complete Address]'}

Subject: Application seeking information under RTI Act, 2005

Sir/Madam,

I, ${data.applicantName || '[Your Name]'}, an Indian citizen, hereby request the following information under the Right to Information Act, 2005:

APPLICANT DETAILS:
Name: ${data.applicantName || '[Full Name]'}
Address: ${data.address || '[Complete Address]'}
Phone: ${data.phone || '[Contact Number]'}
Email: ${data.email || '[Email Address]'}

INFORMATION SOUGHT:

${data.informationSought || `1. [First point of information required]

2. [Second point of information required]

3. [Third point of information required]

(Add more points as needed)`}

TIME PERIOD: ${data.timePeriod || '[Specify the time period for which information is required]'}

FORMAT OF INFORMATION:
${data.format || '☐ Photocopy of documents\n☐ Inspection of records\n☐ Certified copies\n☐ In electronic format (CD/Email)'}

FEE DETAILS:
Application Fee: Rs. 10/- (${data.paymentMode || 'by Indian Postal Order/DD/Cash'})
${data.paymentDetails || '[IPO/DD Number and Date if applicable]'}

BPL CERTIFICATE: ${data.isBPL ? 'Attached (Exempted from fee)' : 'Not Applicable'}

DECLARATION:
I hereby declare that:
1. I am a citizen of India.
2. The information sought does not fall under the exempted categories under Section 8 of RTI Act.
3. The fee as prescribed has been paid.

I request you to provide the above information within 30 days as per the provisions of the RTI Act, 2005.

Thanking you,

Yours faithfully,

____________________
${data.applicantName || '[Your Name]'}
Date: ${new Date().toLocaleDateString('en-IN')}
Place: ${data.place || '[Place]'}

Enclosures:
1. Application fee of Rs. 10/- ${data.paymentMode || ''}
2. ${data.isBPL ? 'BPL Certificate' : 'Copy of ID Proof'}
${data.enclosures || ''}

Note: As per RTI Act, response should be provided within 30 days (48 hours if it concerns life or liberty).
`,

  'consumer-complaint': (data: any) => `
CONSUMER COMPLAINT

Before the District Consumer Disputes Redressal Commission
${data.district || '[District]'}, ${data.state || '[State]'}

COMPLAINT NO. _____________ OF ${new Date().getFullYear()}

IN THE MATTER OF:

${data.complainantName || '[Complainant Name]'}
${data.complainantRelation || 'S/o, D/o, W/o'} ${data.guardianName || '[Father/Husband Name]'}
Aged: ${data.age || '[Age]'} years
Occupation: ${data.occupation || '[Occupation]'}
Residing at: ${data.address || '[Complete Address]'}
Contact: ${data.phone || '[Phone]'}, ${data.email || '[Email]'}
                                                    .... COMPLAINANT

VERSUS

${data.oppositePartyName || '[Company/Seller Name]'}
${data.oppositePartyAddress || '[Complete Address of Opposite Party]'}
                                                    .... OPPOSITE PARTY

COMPLAINT UNDER SECTION 35 OF CONSUMER PROTECTION ACT, 2019

RESPECTFULLY SHOWETH:

1. INTRODUCTION:
That the Complainant is a consumer within the meaning of Consumer Protection Act, 2019, having purchased/availed ${data.productService || '[Product/Service]'} from the Opposite Party.

2. FACTS OF THE CASE:
${data.facts || `a) That on [Date], the Complainant purchased/availed [Product/Service] from the Opposite Party for a consideration of Rs. [Amount].

b) [Describe what was promised/expected]

c) [Describe what actually happened - defect/deficiency]

d) [Mention any communication with the Opposite Party]`}

3. DEFICIENCY IN SERVICE / DEFECT IN GOODS:
${data.deficiency || '[Describe the specific defect or deficiency in detail]'}

4. ATTEMPTS AT RESOLUTION:
${data.attempts || `a) The Complainant approached the Opposite Party on [Date] but no action was taken.
b) [Any other attempts made]`}

5. LOSS/DAMAGE SUFFERED:
${data.losses || '[Describe the loss or damage suffered due to the deficiency]'}

6. RELIEF CLAIMED:
The Complainant prays for the following reliefs:

a) Refund of Rs. ${data.refundAmount || '[Amount]'} being the cost of ${data.productService || '[Product/Service]'}
b) Compensation of Rs. ${data.compensationAmount || '[Amount]'} for mental agony and harassment
c) Rs. ${data.litigationCost || '[Amount]'} towards cost of litigation
d) ${data.otherRelief || 'Any other relief deemed fit by this Hon\'ble Commission'}

7. TERRITORIAL JURISDICTION:
This Hon'ble Commission has jurisdiction as:
${data.jurisdiction || 'a) The Opposite Party carries on business within this jurisdiction\nb) The cause of action arose within this jurisdiction'}

8. PECUNIARY JURISDICTION:
The total value of goods/services and compensation claimed is within the pecuniary jurisdiction of this Hon'ble Commission.

9. LIMITATION:
The cause of action arose on ${data.causeOfActionDate || '[Date]'} and hence this complaint is within the limitation period of 2 years.

10. VERIFICATION:
I, ${data.complainantName || '[Name]'}, the Complainant above named, do hereby verify that the contents of this complaint are true and correct to the best of my knowledge and belief.

PRAYER:
In view of the above, it is most respectfully prayed that this Hon'ble Commission may be pleased to:

1. Direct the Opposite Party to refund Rs. ${data.refundAmount || '[Amount]'}
2. Award compensation of Rs. ${data.compensationAmount || '[Amount]'}
3. Award litigation costs of Rs. ${data.litigationCost || '[Amount]'}
4. Pass any other order as deemed fit

And for this act of kindness, the Complainant shall ever pray.

____________________
${data.complainantName || '[Complainant Name]'}
Date: ${new Date().toLocaleDateString('en-IN')}
Place: ${data.place || '[Place]'}

VERIFICATION

I, ${data.complainantName || '[Name]'}, do hereby verify that the contents of paragraphs 1 to 9 are true to my personal knowledge and belief.

Verified at ${data.place || '[Place]'} on ${new Date().toLocaleDateString('en-IN')}.

____________________
COMPLAINANT

LIST OF DOCUMENTS:
${data.documents || `1. Copy of Invoice/Receipt
2. Copy of Product/Service Agreement
3. Photographs of defective product (if applicable)
4. Copies of correspondence with Opposite Party
5. ID Proof of Complainant`}
`,
};

// Generate document
export const generateDocument = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { documentType, formData, title } = req.body;

    // Validate document type
    const validTypes = ['police-complaint', 'fir-draft', 'rti-application', 'consumer-complaint'];
    if (!validTypes.includes(documentType)) {
      res.status(400).json({
        success: false,
        message: 'Invalid document type',
      });
      return;
    }

    if (!formData) {
      res.status(400).json({
        success: false,
        message: 'Form data is required',
      });
      return;
    }

    // Generate document content
    const templateFn = templates[documentType as keyof typeof templates];
    const generatedContent = templateFn(formData);

    // Save to database
    const document = await GeneratedDocument.create({
      userId: req.user?._id,
      documentType,
      title: title || `${documentType.replace('-', ' ').toUpperCase()} - ${new Date().toLocaleDateString('en-IN')}`,
      formData,
      generatedContent,
      status: 'draft',
    });

    res.status(201).json({
      success: true,
      message: 'Document generated successfully',
      data: {
        id: document._id,
        documentType: document.documentType,
        title: document.title,
        content: generatedContent,
        createdAt: document.createdAt,
      },
    });
  } catch (error) {
    console.error('Generate document error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate document',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get user's documents
export const getUserDocuments = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
      return;
    }

    const documents = await GeneratedDocument.find({ userId: req.user._id })
      .select('documentType title status createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve documents',
    });
  }
};

// Get document by ID
export const getDocumentById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const document = await GeneratedDocument.findById(id);

    if (!document) {
      res.status(404).json({
        success: false,
        message: 'Document not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    console.error('Get document error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve document',
    });
  }
};

// Get document types info
export const getDocumentTypes = async (req: Request, res: Response): Promise<void> => {
  try {
    const documentTypes = [
      {
        id: 'police-complaint',
        name: 'Police Complaint',
        description: 'File a written complaint to the police station',
        icon: '🚔',
        fields: ['complainantName', 'guardianName', 'age', 'address', 'phone', 'policeStation', 'district', 'state', 'subject', 'incidentDate', 'incidentTime', 'incidentPlace', 'incidentDescription', 'accusedName', 'accusedAddress', 'witnesses', 'evidence', 'losses'],
      },
      {
        id: 'fir-draft',
        name: 'FIR Draft',
        description: 'Draft a First Information Report',
        icon: '📋',
        fields: ['complainantName', 'guardianName', 'age', 'occupation', 'address', 'phone', 'incidentDate', 'incidentTime', 'incidentPlace', 'offenceType', 'incidentDescription', 'accusedName', 'accusedAddress', 'accusedDescription', 'propertyDescription', 'propertyValue', 'witnesses', 'evidence', 'district'],
      },
      {
        id: 'rti-application',
        name: 'RTI Application',
        description: 'Request information from government departments',
        icon: '📝',
        fields: ['applicantName', 'address', 'phone', 'email', 'department', 'departmentAddress', 'informationSought', 'timePeriod', 'format', 'paymentMode', 'isBPL', 'place'],
      },
      {
        id: 'consumer-complaint',
        name: 'Consumer Complaint',
        description: 'File complaint against defective products or services',
        icon: '🛒',
        fields: ['complainantName', 'guardianName', 'age', 'occupation', 'address', 'phone', 'email', 'oppositePartyName', 'oppositePartyAddress', 'productService', 'facts', 'deficiency', 'attempts', 'losses', 'refundAmount', 'compensationAmount', 'litigationCost', 'district', 'state', 'place'],
      },
    ];

    res.status(200).json({
      success: true,
      data: documentTypes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve document types',
    });
  }
};
