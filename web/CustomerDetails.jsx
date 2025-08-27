const { useState } = React;

const CustomerDetails = ({ customerId, onClose, onEdit, customers }) => {
  const customer = customers.find(c => c.id === customerId);
  
  if (!customer) {
    return React.createElement('div', { className: 'flex justify-center items-center min-h-screen' },
      React.createElement('div', { className: 'text-red-600' }, 'Customer not found')
    );
  }

  const uploadDocument = () => {
    const fileInput = document.getElementById('documentUpload');
    const file = fileInput.files[0];
    
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.');
      return;
    }
    
    console.log('Uploading file:', file.name);
    alert(`Document "${file.name}" uploaded successfully!`);
    fileInput.value = '';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Customer Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Personal Information</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Full Name</label>
                  <p className="text-gray-900 font-medium">{customer.firstName} {customer.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                  <p className="text-gray-900">{new Date(customer.dateOfBirth).toLocaleDateString('en-AU', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Date Added</label>
                  <p className="text-gray-900">{new Date(customer.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Contact Information</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email Address</label>
                  <p className="text-gray-900">{customer.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                  <p className="text-gray-900">{customer.phoneNumber}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Address Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900 font-medium">{customer.streetAddress}</p>
                {customer.suburb && <p className="text-gray-700">{customer.suburb}</p>}
                <p className="text-gray-700">{customer.city} {customer.postCode}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Documents</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="mb-4">
                  <label htmlFor="documentUpload" className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      id="documentUpload"
                      name="documentUpload"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <button
                      onClick={uploadDocument}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
                    >
                      Upload
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Documents:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-white p-3 rounded border">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                        <span className="text-sm text-gray-700">ID_Document.pdf</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Dec 15, 2024</span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                        <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-white p-3 rounded border">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span className="text-sm text-gray-700">Proof_of_Address.jpg</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Dec 14, 2024</span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                        <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
              >
                Close
              </button>
              <button
                onClick={() => onEdit(customer.id)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Edit Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

