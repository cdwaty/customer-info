const { useState, useEffect } = React;

const CustomerApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerAPI.getCustomers();
      setCustomers(data);
      setError(null);
    } catch (err) {
      setError('Failed to load customers');
      console.error('Error loading customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

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

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedCustomerId) {
        await customerAPI.updateCustomer(selectedCustomerId, formData);
      } else {
        await customerAPI.createCustomer(formData);
      }
      await loadCustomers();
      setTimeout(() => {
        setCurrentPage('dashboard');
        setSelectedCustomerId(null);
      }, 2000);
    } catch (err) {
      console.error('Error saving customer:', err);
      alert('Failed to save customer');
    }
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setSelectedCustomerId(null);
  };

  if (loading) {
    return React.createElement('div', { className: 'flex justify-center items-center min-h-screen' },
      React.createElement('div', { className: 'text-lg' }, 'Loading...')
    );
  }

  if (error) {
    return React.createElement('div', { className: 'flex justify-center items-center min-h-screen' },
      React.createElement('div', { className: 'text-red-600' }, error)
    );
  }

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

// Initialize app with config
const initApp = async () => {
  if (window.initializeApp) {
    await window.initializeApp();
  }
  const { createRoot } = ReactDOM;
  const root = createRoot(document.getElementById('root'));
  root.render(React.createElement(CustomerApp));
};

// Start the app
initApp();