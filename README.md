# Customer Information API

## Setup

1. Install PostgreSQL and create database:
```sql
CREATE DATABASE customer_info;
```

2. Update `application.properties` with your database credentials

3. Start the Spring Boot API:
```bash
cd api
./mvnw spring-boot:run
```

Or on Windows:
```bash
mvnw.cmd spring-boot:run
```

## API Endpoints

- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

## Usage in React

Include `api.js` in your HTML and use:
```javascript
// Create customer
const customer = await customerAPI.createCustomer(formData);

// Update customer
const updated = await customerAPI.updateCustomer(id, formData);

// Get all customers
const customers = await customerAPI.getCustomers();
```