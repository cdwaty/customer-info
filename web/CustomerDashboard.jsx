const { useState } = React;

const CustomerDashboard = ({ onViewDetails, onAddCustomer, customers }) => {
  const defaultCustomers = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      city: 'Melbourne',
      verificationStatus: 'Verified',
      dateAdded: 'Dec 15, 2024'
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      city: 'Sydney',
      verificationStatus: 'Pending',
      dateAdded: 'Dec 14, 2024'
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Wilson',
      city: 'Brisbane',
      verificationStatus: 'Verified',
      dateAdded: 'Dec 13, 2024'
    },
    {
      id: 4,
      firstName: 'Emma',
      lastName: 'Davis',
      city: 'Perth',
      verificationStatus: 'Not Verified',
      dateAdded: 'Dec 12, 2024'
    },
    {
      id: 5,
      firstName: 'Alex',
      lastName: 'Brown',
      city: 'Adelaide',
      verificationStatus: 'Pending',
      dateAdded: 'Dec 10, 2024'
    }
  ];

  const customerList = customers || defaultCustomers;

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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">City/Town</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Verification Status</th>
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
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(customer.verificationStatus)}`}>
                          {customer.verificationStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{customer.dateAdded}</td>
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
          </div>
        </div>
      </div>
    </div>
  );
};

