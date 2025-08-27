const { useState } = React;

const CustomerApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [customers, setCustomers] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      dateOfBirth: '1985-03-15',
      streetAddress: '123 Collins Street',
      suburb: 'CBD',
      city: 'Melbourne',
      postCode: '3000',
      phoneNumber: '(555) 123-4567',
      email: 'john.smith@email.com',
      dateAdded: 'Dec 15, 2024',
      verificationStatus: 'Verified'
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      dateOfBirth: '1990-07-22',
      streetAddress: '456 George Street',
      suburb: 'The Rocks',
      city: 'Sydney',
      postCode: '2000',
      phoneNumber: '(555) 987-6543',
      email: 'sarah.j@email.com',
      dateAdded: 'Dec 14, 2024',
      verificationStatus: 'Pending'
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Wilson',
      dateOfBirth: '1978-11-08',
      streetAddress: '789 Queen Street',
      suburb: 'South Bank',
      city: 'Brisbane',
      postCode: '4000',
      phoneNumber: '(555) 456-7890',
      email: 'm.wilson@email.com',
      dateAdded: 'Dec 13, 2024',
      verificationStatus: 'Verified'
    },
    {
      id: 4,
      firstName: 'Emma',
      lastName: 'Davis',
      dateOfBirth: '1992-05-30',
      streetAddress: '321 Murray Street',
      suburb: 'Northbridge',
      city: 'Perth',
      postCode: '6000',
      phoneNumber: '(555) 321-0987',
      email: 'emma.davis@email.com',
      dateAdded: 'Dec 12, 2024',
      verificationStatus: 'Not Verified'
    },
    {
      id: 5,
      firstName: 'Alex',
      lastName: 'Brown',
      dateOfBirth: '1987-09-12',
      streetAddress: '654 King William Street',
      suburb: 'North Adelaide',
      city: 'Adelaide',
      postCode: '5000',
      phoneNumber: '(555) 654-3210',
      email: 'alex.brown@email.com',
      dateAdded: 'Dec 10, 2024',
      verificationStatus: 'Pending'
    }
  ]);

  const handleViewDetails = (customerId) => {
    setSelectedCustomerId(customerId);
    setCurrentPage('details');
  };

  const handleAddCustomer = () => {
    setSelectedCustomerId(null);
    setCurrentPage('form');
  };

  const handleEditCustomer = (customerId) => {
    setSelectedCustomerId(customerId);
    setCurrentPage('form');
  };

  const handleFormSubmit = (formData) => {
    if (selectedCustomerId) {
      // Update existing customer
      setCustomers(prev => prev.map(customer => 
        customer.id === selectedCustomerId 
          ? { ...customer, ...formData }
          : customer
      ));
    } else {
      // Add new customer
      const newCustomer = {
        id: customers.length + 1,
        ...formData,
        dateAdded: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        verificationStatus: 'Pending'
      };
      setCustomers(prev => [...prev, newCustomer]);
    }
    
    setTimeout(() => {
      setCurrentPage('dashboard');
      setSelectedCustomerId(null);
    }, 3000);
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setSelectedCustomerId(null);
  };

  if (currentPage === 'details') {
    return React.createElement(CustomerDetails, {
      customerId: selectedCustomerId,
      customers: customers,
      onClose: handleBackToDashboard,
      onEdit: handleEditCustomer
    });
  }

  if (currentPage === 'form') {
    return React.createElement(CustomerForm, {
      customerId: selectedCustomerId,
      customers: customers,
      onSubmit: handleFormSubmit,
      onCancel: handleBackToDashboard
    });
  }

  return React.createElement(CustomerDashboard, {
    customers: customers,
    onViewDetails: handleViewDetails,
    onAddCustomer: handleAddCustomer
  });
};

// Render the main app
const { createRoot } = ReactDOM;
const root = createRoot(document.getElementById('root'));
root.render(React.createElement(CustomerApp));