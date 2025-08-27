const CustomerDashboard = ({ onViewDetails, onAddCustomer, customers }) => {
  const customerList = customers || [];

  const getStatusClass = (status) => {
    if (status === 'Verified') return 'bg-green-100 text-green-800';
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getInitials = (firstName, lastName) => {
    return firstName.charAt(0) + lastName.charAt(0);
  };

  const colors = ['blue', 'green', 'purple', 'pink', 'orange'];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">Customer Dashboard</h1>
              <p className="text-gray-600">Manage and view customer information</p>
            </div>
            <button
              onClick={onAddCustomer}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
              </svg>
              Add New Customer
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer List</h2>
            {customerList.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No customers found. Add your first customer to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">City/Town</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Date Added</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerList.map((customer, index) => (
                      <tr key={customer.id} className="border-b border-gray-100 hover:bg-white transition-colors duration-150">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 bg-${colors[index % colors.length]}-500 rounded-full flex items-center justify-center text-white font-medium text-sm mr-3`}>
                              {getInitials(customer.firstName, customer.lastName)}
                            </div>
                            <span className="font-medium text-gray-900">{customer.firstName} {customer.lastName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{customer.city}</td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {new Date(customer.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => onViewDetails(customer.id)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

