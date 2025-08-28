const API_BASE_URL = 'http://localhost:3001/api';

const api = {
  // Get all customers
  getCustomers: async () => {
    const response = await fetch(`${API_BASE_URL}/customers`);
    if (!response.ok) throw new Error('Failed to fetch customers');
    return response.json();
  },

  // Get customer by ID
  getCustomer: async (id) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`);
    if (!response.ok) throw new Error('Failed to fetch customer');
    return response.json();
  },

  // Create customer
  createCustomer: async (customerData) => {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData)
    });
    if (!response.ok) throw new Error('Failed to create customer');
    return response.json();
  },

  // Update customer
  updateCustomer: async (id, customerData) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData)
    });
    if (!response.ok) throw new Error('Failed to update customer');
    return response.json();
  },

  // Delete customer
  deleteCustomer: async (id) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete customer');
    return response.json();
  },

  // Get customer documents
  getCustomerDocuments: async (customerId) => {
    const response = await fetch(`${API_BASE_URL}/customers/${customerId}/documents`);
    if (!response.ok) throw new Error('Failed to fetch documents');
    return response.json();
  },

  // Save document metadata
  saveDocumentMetadata: async (customerId, documentData) => {
    const response = await fetch(`${API_BASE_URL}/customers/${customerId}/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(documentData)
    });
    if (!response.ok) throw new Error('Failed to save document metadata');
    return response.json();
  },

  // Delete document
  deleteDocument: async (customerId, documentId) => {
    const response = await fetch(`${API_BASE_URL}/customers/${customerId}/documents/${documentId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete document');
    return response.json();
  }
};

window.customerAPI = api;