import React, { useState } from 'react';
import { Upload, FileText, Check, AlertCircle, X } from 'lucide-react';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  status: 'processing' | 'completed' | 'error';
  extractedData?: {
    income?: number;
    deductions?: number;
    taxCredits?: number;
  };
}

const DocumentUploader: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: 'W-2_2023.pdf',
      type: 'W-2',
      size: '1.2 MB',
      status: 'completed',
      extractedData: {
        income: 85000,
        deductions: 12000,
        taxCredits: 2500,
      },
    },
  ]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    // Simulate processing uploaded files
    Array.from(files).forEach(file => {
      const newDoc: Document = {
        id: Date.now(),
        name: file.name,
        type: guessDocumentType(file.name),
        size: formatFileSize(file.size),
        status: 'processing'
      };
      
      setDocuments(prev => [...prev, newDoc]);
      
      // Simulate processing completion
      setTimeout(() => {
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === newDoc.id 
              ? {
                  ...doc, 
                  status: 'completed',
                  extractedData: {
                    income: Math.floor(Math.random() * 100000),
                    deductions: Math.floor(Math.random() * 20000),
                    taxCredits: Math.floor(Math.random() * 5000),
                  }
                } 
              : doc
          )
        );
      }, 2000);
    });
  };

  const guessDocumentType = (filename: string): string => {
    if (filename.includes('W-2')) return 'W-2';
    if (filename.includes('1099')) return '1099';
    if (filename.includes('1040')) return '1040';
    return 'Tax Document';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const removeDocument = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-indigo-700 text-white">
        <h2 className="text-lg font-semibold">Tax Document Processing</h2>
        <p className="text-sm text-indigo-200">Upload tax documents for AI analysis</p>
      </div>

      <div className="p-6">
        {/* Upload area */}
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <Upload size={40} className="mx-auto text-indigo-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Drag and drop your tax documents
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Supports PDF, JPG, PNG (W-2, 1099, 1040, and other IRS forms)
          </p>
          <div>
            <label className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors">
              Browse Files
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </label>
          </div>
        </div>

        {/* Document list */}
        {documents.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Uploaded Documents</h3>
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documents.map((doc) => (
                    <tr key={doc.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText size={20} className="text-indigo-500 mr-2" />
                          <span className="text-sm text-gray-900">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {doc.status === 'processing' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Processing...
                          </span>
                        )}
                        {doc.status === 'completed' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check size={12} className="mr-1" /> Completed
                          </span>
                        )}
                        {doc.status === 'error' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <AlertCircle size={12} className="mr-1" /> Error
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          onClick={() => removeDocument(doc.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Extracted data */}
        {documents.some(doc => doc.status === 'completed') && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Extracted Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Total Income</h4>
                <p className="text-2xl font-bold text-gray-900">
                  ${documents
                    .filter(doc => doc.status === 'completed' && doc.extractedData?.income)
                    .reduce((sum, doc) => sum + (doc.extractedData?.income || 0), 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Total Deductions</h4>
                <p className="text-2xl font-bold text-gray-900">
                  ${documents
                    .filter(doc => doc.status === 'completed' && doc.extractedData?.deductions)
                    .reduce((sum, doc) => sum + (doc.extractedData?.deductions || 0), 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Tax Credits</h4>
                <p className="text-2xl font-bold text-gray-900">
                  ${documents
                    .filter(doc => doc.status === 'completed' && doc.extractedData?.taxCredits)
                    .reduce((sum, doc) => sum + (doc.extractedData?.taxCredits || 0), 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUploader;
