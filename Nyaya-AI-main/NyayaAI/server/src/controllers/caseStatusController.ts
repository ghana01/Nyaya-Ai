import { Request, Response } from 'express';

// Types for case status (structured for future eCourts API integration)
interface CaseStatusRequest {
  state: string;
  district: string;
  court: string;
  caseNumber: string;
  caseType?: string;
  year?: string;
}

interface CaseParty {
  name: string;
  role: 'petitioner' | 'respondent' | 'appellant' | 'defendant';
  advocate?: string;
}

interface CaseHearing {
  date: string;
  purpose: string;
  remarks?: string;
}

interface CaseStatusResponse {
  caseNumber: string;
  caseType: string;
  filingDate: string;
  registrationDate: string;
  caseStage: string;
  courtName: string;
  judge: string;
  nextHearingDate: string;
  previousHearings: CaseHearing[];
  parties: {
    petitioners: CaseParty[];
    respondents: CaseParty[];
  };
  acts: string[];
  disposalDate?: string;
  nature?: string;
}

// Mock data generator for development
// This function will be replaced with actual eCourts API integration
const getMockCaseStatus = (request: CaseStatusRequest): CaseStatusResponse => {
  const { caseNumber, state, district, court } = request;
  
  // Generate deterministic mock data based on case number
  const hash = caseNumber.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const caseTypes = ['Civil Suit', 'Criminal Case', 'Writ Petition', 'Motor Accident Claim', 'Family Court Case', 'Consumer Complaint'];
  const stages = ['Pending', 'Under Trial', 'Arguments', 'Reserved for Judgment', 'Evidence Stage', 'Written Statement', 'Final Hearing'];
  const judges = [
    'Hon\'ble Justice A.K. Sharma',
    'Hon\'ble Justice R.S. Gupta', 
    'Hon\'ble Justice M. Venkatesh',
    'Hon\'ble Justice P.K. Singh',
    'Hon\'ble Justice S. Radhakrishnan',
  ];
  
  const petitionerNames = ['Ramesh Kumar', 'Suresh Patel', 'Anita Sharma', 'Mohammed Ali', 'Priya Singh'];
  const respondentNames = ['State of ' + state, 'Municipal Corporation', 'Insurance Company Ltd.', 'Vikram Enterprises', 'Union of India'];
  const advocateNames = ['Adv. Rajesh Mehta', 'Adv. Sunita Verma', 'Adv. K.K. Agarwal', 'Adv. Meera Nair', 'Adv. Public Prosecutor'];
  
  const purposes = ['Arguments', 'Evidence', 'Cross Examination', 'Final Arguments', 'Orders', 'Appearance'];

  // Generate next hearing date (7-45 days from now)
  const nextHearing = new Date();
  nextHearing.setDate(nextHearing.getDate() + 7 + (hash % 38));
  
  // Generate filing date (1-3 years ago)
  const filingDate = new Date();
  filingDate.setFullYear(filingDate.getFullYear() - 1 - (hash % 3));
  filingDate.setMonth(hash % 12);
  
  // Generate previous hearings
  const previousHearings: CaseHearing[] = [];
  let hearingDate = new Date();
  for (let i = 0; i < 3 + (hash % 4); i++) {
    hearingDate = new Date(hearingDate);
    hearingDate.setDate(hearingDate.getDate() - 14 - (hash % 21));
    previousHearings.push({
      date: hearingDate.toISOString().split('T')[0],
      purpose: purposes[(hash + i) % purposes.length],
      remarks: i === 0 ? 'Matter adjourned for next hearing' : undefined,
    });
  }

  return {
    caseNumber: caseNumber.toUpperCase(),
    caseType: caseTypes[hash % caseTypes.length],
    filingDate: filingDate.toISOString().split('T')[0],
    registrationDate: filingDate.toISOString().split('T')[0],
    caseStage: stages[hash % stages.length],
    courtName: `${court}, ${district}, ${state}`,
    judge: judges[hash % judges.length],
    nextHearingDate: nextHearing.toISOString().split('T')[0],
    previousHearings,
    parties: {
      petitioners: [
        {
          name: petitionerNames[hash % petitionerNames.length],
          role: 'petitioner',
          advocate: advocateNames[hash % advocateNames.length],
        },
      ],
      respondents: [
        {
          name: respondentNames[hash % respondentNames.length],
          role: 'respondent',
          advocate: advocateNames[(hash + 1) % advocateNames.length],
        },
      ],
    },
    acts: ['Indian Penal Code', 'Code of Civil Procedure'].slice(0, 1 + (hash % 2)),
    nature: 'Original Suit',
  };
};

// Future: eCourts API integration
// async function fetchFromECourtsAPI(request: CaseStatusRequest): Promise<CaseStatusResponse> {
//   const eCourtEndpoint = process.env.ECOURTS_API_URL || 'https://ecourts.gov.in/api';
//   
//   const response = await axios.post(`${eCourtEndpoint}/case-status`, {
//     state_code: request.state,
//     dist_code: request.district,
//     court_code: request.court,
//     case_no: request.caseNumber,
//   }, {
//     headers: {
//       'Authorization': `Bearer ${process.env.ECOURTS_API_KEY}`,
//     },
//   });
//   
//   return transformECourtsResponse(response.data);
// }

// Get case status
export const getCaseStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { state, district, court, caseNumber, caseType, year } = req.body;

    // Validate required fields
    if (!state || !district || !court || !caseNumber) {
      res.status(400).json({
        success: false,
        message: 'Please provide all required fields: state, district, court, caseNumber',
      });
      return;
    }

    // Validate case number format (basic validation)
    if (caseNumber.length < 3) {
      res.status(400).json({
        success: false,
        message: 'Invalid case number format',
      });
      return;
    }

    const request: CaseStatusRequest = {
      state,
      district,
      court,
      caseNumber,
      caseType,
      year,
    };

    // For now, return mock data
    // TODO: Replace with actual eCourts API call when available
    // const caseStatus = await fetchFromECourtsAPI(request);
    const caseStatus = getMockCaseStatus(request);

    res.status(200).json({
      success: true,
      message: 'Case status retrieved successfully',
      data: caseStatus,
      source: 'mock', // Will be 'ecourts' when connected to actual API
    });
  } catch (error) {
    console.error('Get case status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve case status. Please try again later.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get courts list for a district
export const getCourts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { state, district } = req.query;

    // Mock courts data - will be replaced with actual API
    const courts = [
      { id: 'district', name: 'District Court' },
      { id: 'sessions', name: 'Sessions Court' },
      { id: 'civil', name: 'Civil Court' },
      { id: 'family', name: 'Family Court' },
      { id: 'consumer', name: 'Consumer Court' },
      { id: 'labor', name: 'Labour Court' },
      { id: 'high-court', name: 'High Court' },
    ];

    res.status(200).json({
      success: true,
      data: {
        state,
        district,
        courts,
      },
    });
  } catch (error) {
    console.error('Get courts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve courts list',
    });
  }
};

// Get states and districts list
export const getLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    // Mock data for Indian states and sample districts
    const locations = {
      states: [
        {
          code: 'DL',
          name: 'Delhi',
          districts: ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'South Delhi', 'West Delhi'],
        },
        {
          code: 'MH',
          name: 'Maharashtra',
          districts: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad'],
        },
        {
          code: 'KA',
          name: 'Karnataka',
          districts: ['Bengaluru Urban', 'Bengaluru Rural', 'Mysuru', 'Mangaluru', 'Hubli-Dharwad'],
        },
        {
          code: 'TN',
          name: 'Tamil Nadu',
          districts: ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
        },
        {
          code: 'UP',
          name: 'Uttar Pradesh',
          districts: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Allahabad', 'Noida'],
        },
        {
          code: 'RJ',
          name: 'Rajasthan',
          districts: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
        },
        {
          code: 'GJ',
          name: 'Gujarat',
          districts: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
        },
        {
          code: 'WB',
          name: 'West Bengal',
          districts: ['Kolkata', 'Howrah', 'Darjeeling', 'Siliguri', 'Asansol'],
        },
        {
          code: 'KL',
          name: 'Kerala',
          districts: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam'],
        },
        {
          code: 'TS',
          name: 'Telangana',
          districts: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
        },
      ],
    };

    res.status(200).json({
      success: true,
      data: locations,
    });
  } catch (error) {
    console.error('Get locations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve locations',
    });
  }
};
