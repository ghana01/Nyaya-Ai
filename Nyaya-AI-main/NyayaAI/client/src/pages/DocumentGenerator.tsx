import React, { useState } from 'react';
import { 
  FileText, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  Eye, 
  Check,
  AlertCircle,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { 
  DocumentType, 
  documentTypeInfo, 
  documentFormConfigs, 
  generateDocument, 
  downloadDocumentAsPDF,
  FormField 
} from '../services/documentsService';

const DocumentGenerator: React.FC = () => {
  const [selectedType, setSelectedType] = useState<DocumentType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  const documentTypes = Object.entries(documentTypeInfo) as [DocumentType, typeof documentTypeInfo[DocumentType]][];
  const currentConfig = selectedType ? documentFormConfigs[selectedType] : null;
  const currentStepData = currentConfig?.steps[currentStep];
  const totalSteps = currentConfig?.steps.length || 0;

  const handleTypeSelect = (type: DocumentType) => {
    setSelectedType(type);
    setCurrentStep(0);
    setFormData({});
    setGeneratedContent(null);
    setError('');
  };

  const handleBack = () => {
    if (generatedContent) {
      setGeneratedContent(null);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setSelectedType(null);
      setFormData({});
    }
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleGenerate = async () => {
    if (!selectedType) return;
    
    setIsGenerating(true);
    setError('');

    try {
      const result = await generateDocument(selectedType, formData);
      setGeneratedContent(result.content);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate document. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedContent || !selectedType) return;
    const filename = `${documentTypeInfo[selectedType].name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}`;
    downloadDocumentAsPDF(generatedContent, filename);
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
          />
        );
      case 'select':
        return (
          <select
            id={field.name}
            name={field.name}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
          >
            <option value="">Select an option</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              id={field.name}
              name={field.name}
              checked={!!value}
              onChange={(e) => handleInputChange(field.name, e.target.checked)}
              className="h-5 w-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-gray-700">Yes</span>
          </label>
        );
      default:
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        );
    }
  };

  // Type Selection Screen
  if (!selectedType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Legal Document Generator
            </h1>
            <p className="text-xl text-gray-600">
              Generate professional legal documents in minutes. Select the type of document you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {documentTypes.map(([type, info]) => (
              <button
                key={type}
                onClick={() => handleTypeSelect(type)}
                className="bg-white rounded-xl p-6 text-left shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-primary-500 group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{info.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {info.name}
                    </h3>
                    <p className="text-gray-600 mt-1">{info.description}</p>
                    <div className="mt-4 flex items-center text-primary-600 font-medium">
                      <span>Start generating</span>
                      <ChevronRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2">📝 How it works</h3>
            <ol className="text-blue-800 space-y-2">
              <li>1. Select the type of document you need</li>
              <li>2. Fill in the required information step by step</li>
              <li>3. Preview your document in real-time</li>
              <li>4. Download the generated document</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  // Generated Document View
  if (generatedContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Edit</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Download Document</span>
            </button>
          </div>

          {/* Document Preview */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b">
              <span className="text-3xl">{documentTypeInfo[selectedType].icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {documentTypeInfo[selectedType].name}
                </h2>
                <p className="text-gray-500">Generated on {new Date().toLocaleDateString('en-IN')}</p>
              </div>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed bg-gray-50 p-6 rounded-lg max-h-[70vh] overflow-y-auto">
              {generatedContent}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  // Step Form View
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{documentTypeInfo[selectedType].icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {documentTypeInfo[selectedType].name}
              </h1>
              <p className="text-gray-500">Step {currentStep + 1} of {totalSteps}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            {currentConfig?.steps.map((_step, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                    idx < currentStep
                      ? 'bg-green-500 text-white'
                      : idx === currentStep
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {idx < currentStep ? <Check className="h-4 w-4" /> : idx + 1}
                </div>
                {idx < totalSteps - 1 && (
                  <div
                    className={`flex-1 h-1 rounded ${
                      idx < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            {currentConfig?.steps.map((step, idx) => (
              <span key={idx} className={idx === currentStep ? 'text-primary-600 font-medium' : ''}>
                {step.title}
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Panel */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {currentStepData?.title}
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-5">
              {currentStepData?.fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Previous</span>
              </button>

              {currentStep < totalSteps - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="h-5 w-5" />
                      <span>Generate Document</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Live Preview Panel */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary-600" />
                Live Preview
              </h2>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="text-sm text-primary-600 hover:underline"
              >
                {showPreview ? 'Hide' : 'Show'}
              </button>
            </div>

            {showPreview && (
              <div className="bg-gray-50 rounded-lg p-4 max-h-[60vh] overflow-y-auto">
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="text-center font-bold text-lg mb-4">
                    {documentTypeInfo[selectedType].name.toUpperCase()}
                  </p>
                  
                  {/* Show filled data */}
                  {Object.entries(formData).map(([key, value]) => {
                    if (!value) return null;
                    const fieldLabel = currentConfig?.steps
                      .flatMap(s => s.fields)
                      .find(f => f.name === key)?.label || key;
                    return (
                      <div key={key} className="border-b border-gray-200 pb-2">
                        <span className="font-medium text-gray-700">{fieldLabel}:</span>
                        <span className="ml-2 text-gray-900">
                          {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                        </span>
                      </div>
                    );
                  })}

                  {Object.keys(formData).length === 0 && (
                    <p className="text-center text-gray-400 py-8">
                      Start filling the form to see a preview of your document
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentGenerator;
