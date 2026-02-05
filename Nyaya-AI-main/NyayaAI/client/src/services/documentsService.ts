import axios from 'axios';
import { getToken } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Axios instance with optional auth
const apiAxios = axios.create({
  baseURL: API_URL,
});

apiAxios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types
export type DocumentType = 'police-complaint' | 'fir-draft' | 'rti-application' | 'consumer-complaint';

export interface DocumentTypeInfo {
  id: DocumentType;
  name: string;
  description: string;
  icon: string;
  fields: string[];
}

export interface GeneratedDocument {
  id: string;
  documentType: DocumentType;
  title: string;
  content: string;
  createdAt: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'time' | 'select' | 'checkbox' | 'email' | 'tel' | 'number';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  step?: number;
}

// Form configurations for each document type
export const documentFormConfigs: Record<DocumentType, { steps: { title: string; fields: FormField[] }[] }> = {
  'police-complaint': {
    steps: [
      {
        title: 'Your Details',
        fields: [
          { name: 'complainantName', label: 'Full Name', type: 'text', placeholder: 'Enter your full name', required: true },
          { name: 'guardianName', label: "Father's/Husband's Name", type: 'text', placeholder: "Enter father's/husband's name" },
          { name: 'age', label: 'Age', type: 'number', placeholder: 'Your age', required: true },
          { name: 'address', label: 'Complete Address', type: 'textarea', placeholder: 'Enter your complete address', required: true },
          { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Your phone number', required: true },
          { name: 'email', label: 'Email', type: 'email', placeholder: 'Your email address' },
        ],
      },
      {
        title: 'Police Station Details',
        fields: [
          { name: 'policeStation', label: 'Police Station Name', type: 'text', placeholder: 'Name of the police station', required: true },
          { name: 'district', label: 'District', type: 'text', placeholder: 'District name', required: true },
          { name: 'state', label: 'State', type: 'text', placeholder: 'State name', required: true },
        ],
      },
      {
        title: 'Incident Details',
        fields: [
          { name: 'subject', label: 'Complaint Subject', type: 'text', placeholder: 'Brief subject of complaint', required: true },
          { name: 'incidentDate', label: 'Date of Incident', type: 'date', required: true },
          { name: 'incidentTime', label: 'Time of Incident', type: 'time' },
          { name: 'incidentPlace', label: 'Place of Incident', type: 'text', placeholder: 'Where did the incident occur?', required: true },
          { name: 'incidentDescription', label: 'Description of Incident', type: 'textarea', placeholder: 'Describe what happened in detail...', required: true },
        ],
      },
      {
        title: 'Accused & Evidence',
        fields: [
          { name: 'accusedName', label: 'Name of Accused (if known)', type: 'text', placeholder: 'Name of the accused person' },
          { name: 'accusedAddress', label: 'Address of Accused (if known)', type: 'textarea', placeholder: 'Address of the accused' },
          { name: 'accusedDescription', label: 'Physical Description', type: 'textarea', placeholder: 'Describe physical appearance if name unknown' },
          { name: 'witnesses', label: 'Witness Details', type: 'textarea', placeholder: 'Names and addresses of witnesses' },
          { name: 'evidence', label: 'Evidence Available', type: 'textarea', placeholder: 'List documents, photos, videos, etc.' },
          { name: 'losses', label: 'Losses/Damages', type: 'textarea', placeholder: 'Details of property lost or damages' },
        ],
      },
    ],
  },
  'fir-draft': {
    steps: [
      {
        title: 'Complainant Information',
        fields: [
          { name: 'complainantName', label: 'Full Name', type: 'text', placeholder: 'Your full legal name', required: true },
          { name: 'guardianName', label: "Father's/Husband's Name", type: 'text', placeholder: "Father's/Husband's name", required: true },
          { name: 'age', label: 'Age', type: 'number', placeholder: 'Your age', required: true },
          { name: 'occupation', label: 'Occupation', type: 'text', placeholder: 'Your occupation', required: true },
          { name: 'address', label: 'Complete Address', type: 'textarea', placeholder: 'Your complete residential address', required: true },
          { name: 'phone', label: 'Contact Number', type: 'tel', placeholder: 'Your phone number', required: true },
          { name: 'district', label: 'District', type: 'text', placeholder: 'District name', required: true },
        ],
      },
      {
        title: 'Incident Information',
        fields: [
          { name: 'incidentDate', label: 'Date of Occurrence', type: 'date', required: true },
          { name: 'incidentTime', label: 'Time of Occurrence', type: 'time', required: true },
          { name: 'incidentPlace', label: 'Place of Occurrence', type: 'text', placeholder: 'Exact location of incident', required: true },
          { name: 'offenceType', label: 'Type of Offence', type: 'text', placeholder: 'E.g., Theft, Assault, Fraud', required: true },
          { name: 'sections', label: 'Applicable IPC Sections (if known)', type: 'text', placeholder: 'E.g., Section 420, 379' },
          { name: 'incidentDescription', label: 'Detailed Description', type: 'textarea', placeholder: 'Describe what happened, how, and who was involved...', required: true },
        ],
      },
      {
        title: 'Accused Details',
        fields: [
          { name: 'accusedName', label: 'Name of Accused', type: 'text', placeholder: 'If known' },
          { name: 'accusedAddress', label: 'Address of Accused', type: 'textarea', placeholder: 'If known' },
          { name: 'accusedDescription', label: 'Physical Description', type: 'textarea', placeholder: 'Height, build, complexion, identifying marks' },
        ],
      },
      {
        title: 'Property & Witnesses',
        fields: [
          { name: 'propertyDescription', label: 'Property Details (if applicable)', type: 'textarea', placeholder: 'Description of stolen/damaged property' },
          { name: 'propertyValue', label: 'Estimated Value (Rs.)', type: 'number', placeholder: 'Estimated value' },
          { name: 'witnesses', label: 'Witness Information', type: 'textarea', placeholder: 'Name, address, and contact of witnesses' },
          { name: 'evidence', label: 'Documents/Evidence', type: 'textarea', placeholder: 'List supporting documents and evidence' },
        ],
      },
    ],
  },
  'rti-application': {
    steps: [
      {
        title: 'Applicant Details',
        fields: [
          { name: 'applicantName', label: 'Full Name', type: 'text', placeholder: 'Your full name', required: true },
          { name: 'address', label: 'Complete Address', type: 'textarea', placeholder: 'Your postal address', required: true },
          { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Contact number', required: true },
          { name: 'email', label: 'Email Address', type: 'email', placeholder: 'Your email' },
          { name: 'place', label: 'Place', type: 'text', placeholder: 'City/Town name', required: true },
        ],
      },
      {
        title: 'Department Details',
        fields: [
          { name: 'department', label: 'Department/Office Name', type: 'text', placeholder: 'Name of government department', required: true },
          { name: 'departmentAddress', label: 'Department Address', type: 'textarea', placeholder: 'Complete address of the department', required: true },
        ],
      },
      {
        title: 'Information Required',
        fields: [
          { name: 'informationSought', label: 'Information Sought', type: 'textarea', placeholder: 'List all the information you need in numbered points...', required: true },
          { name: 'timePeriod', label: 'Time Period', type: 'text', placeholder: 'Specify the time period for which information is required' },
          { name: 'format', label: 'Preferred Format', type: 'select', options: [
            { value: 'Photocopy of documents', label: 'Photocopy of Documents' },
            { value: 'Inspection of records', label: 'Inspection of Records' },
            { value: 'Certified copies', label: 'Certified Copies' },
            { value: 'Electronic format (CD/Email)', label: 'Electronic Format' },
          ]},
        ],
      },
      {
        title: 'Payment Details',
        fields: [
          { name: 'paymentMode', label: 'Payment Mode', type: 'select', options: [
            { value: 'by Indian Postal Order', label: 'Indian Postal Order' },
            { value: 'by Demand Draft', label: 'Demand Draft' },
            { value: 'by Cash', label: 'Cash' },
            { value: 'Online Payment', label: 'Online Payment' },
          ], required: true },
          { name: 'paymentDetails', label: 'IPO/DD Number (if applicable)', type: 'text', placeholder: 'IPO/DD number and date' },
          { name: 'isBPL', label: 'BPL Category (Fee Exemption)', type: 'checkbox' },
        ],
      },
    ],
  },
  'consumer-complaint': {
    steps: [
      {
        title: 'Complainant Details',
        fields: [
          { name: 'complainantName', label: 'Full Name', type: 'text', placeholder: 'Your full legal name', required: true },
          { name: 'guardianName', label: "Father's/Husband's Name", type: 'text', placeholder: "Father's/Husband's name" },
          { name: 'age', label: 'Age', type: 'number', placeholder: 'Your age', required: true },
          { name: 'occupation', label: 'Occupation', type: 'text', placeholder: 'Your occupation' },
          { name: 'address', label: 'Complete Address', type: 'textarea', placeholder: 'Your residential address', required: true },
          { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Contact number', required: true },
          { name: 'email', label: 'Email', type: 'email', placeholder: 'Your email address' },
          { name: 'district', label: 'District', type: 'text', placeholder: 'District name', required: true },
          { name: 'state', label: 'State', type: 'text', placeholder: 'State name', required: true },
          { name: 'place', label: 'Place', type: 'text', placeholder: 'City/Town', required: true },
        ],
      },
      {
        title: 'Opposite Party Details',
        fields: [
          { name: 'oppositePartyName', label: 'Company/Seller Name', type: 'text', placeholder: 'Name of the company or seller', required: true },
          { name: 'oppositePartyAddress', label: 'Complete Address', type: 'textarea', placeholder: 'Address of the opposite party', required: true },
        ],
      },
      {
        title: 'Complaint Details',
        fields: [
          { name: 'productService', label: 'Product/Service', type: 'text', placeholder: 'What product or service was purchased?', required: true },
          { name: 'facts', label: 'Facts of the Case', type: 'textarea', placeholder: 'Describe what happened - purchase date, what was promised, what went wrong...', required: true },
          { name: 'deficiency', label: 'Defect/Deficiency', type: 'textarea', placeholder: 'Describe the specific defect or deficiency in detail', required: true },
          { name: 'attempts', label: 'Resolution Attempts', type: 'textarea', placeholder: 'What attempts did you make to resolve this?' },
          { name: 'losses', label: 'Loss/Damage Suffered', type: 'textarea', placeholder: 'Describe the loss or damage you suffered' },
          { name: 'causeOfActionDate', label: 'Date When Problem Arose', type: 'date', required: true },
        ],
      },
      {
        title: 'Relief Sought',
        fields: [
          { name: 'refundAmount', label: 'Refund Amount (Rs.)', type: 'number', placeholder: 'Cost of product/service' },
          { name: 'compensationAmount', label: 'Compensation Amount (Rs.)', type: 'number', placeholder: 'For mental agony and harassment' },
          { name: 'litigationCost', label: 'Litigation Cost (Rs.)', type: 'number', placeholder: 'Legal fees and court costs' },
          { name: 'otherRelief', label: 'Other Relief', type: 'textarea', placeholder: 'Any other relief you are seeking' },
          { name: 'documents', label: 'List of Documents', type: 'textarea', placeholder: 'List all documents you are attaching as evidence' },
        ],
      },
    ],
  },
};

// API calls
export const getDocumentTypes = async (): Promise<DocumentTypeInfo[]> => {
  const response = await apiAxios.get('/documents/types');
  return response.data.data;
};

export const generateDocument = async (
  documentType: DocumentType,
  formData: Record<string, any>,
  title?: string
): Promise<GeneratedDocument> => {
  const response = await apiAxios.post('/documents/generate', {
    documentType,
    formData,
    title,
  });
  return response.data.data;
};

export const getUserDocuments = async () => {
  const response = await apiAxios.get('/documents/my-documents');
  return response.data.data;
};

export const getDocumentById = async (id: string) => {
  const response = await apiAxios.get(`/documents/${id}`);
  return response.data.data;
};

// Document type display info
export const documentTypeInfo: Record<DocumentType, { name: string; icon: string; color: string; description: string }> = {
  'police-complaint': {
    name: 'Police Complaint',
    icon: '🚔',
    color: 'bg-red-500',
    description: 'File a written complaint to the police station for any crime or incident',
  },
  'fir-draft': {
    name: 'FIR Draft',
    icon: '📋',
    color: 'bg-orange-500',
    description: 'Draft a First Information Report to be submitted at the police station',
  },
  'rti-application': {
    name: 'RTI Application',
    icon: '📝',
    color: 'bg-blue-500',
    description: 'Request information from government departments under RTI Act, 2005',
  },
  'consumer-complaint': {
    name: 'Consumer Complaint',
    icon: '🛒',
    color: 'bg-green-500',
    description: 'File complaint against defective products or deficient services',
  },
};

// Helper to generate mock PDF download
export const downloadDocumentAsPDF = (content: string, filename: string): void => {
  // Create a blob with the text content
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  // Create download link
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
