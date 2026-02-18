const pool = require('../config/db');

// Validation helper
const validateSubmission = (name, phone, email) => {
  const errors = [];

  // Name validation
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    errors.push('Name must contain only letters and spaces');
  }

  // Phone validation (basic format check)
  const cleanPhone = phone ? phone.replace(/[\s\-\+]/g, '') : '';
  
  if (!cleanPhone) {
    errors.push('Phone number is required');
  } else if (!/^[0-9]+$/.test(cleanPhone)) {
    errors.push('Phone number must contain only digits');
  } else if (cleanPhone.length < 10) {
    errors.push(`Phone number must be 10 digits (you entered ${cleanPhone.length})`);
  } else if (cleanPhone.length > 10) {
    errors.push(`Phone number must be exactly 10 digits (you entered ${cleanPhone.length})`);
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Invalid email format');
  }

  return errors;
};

// Submit form data
const submitForm = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    // Validate input
    const validationErrors = validateSubmission(name, phone, email);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    // Insert into database
    const query = `
      INSERT INTO submissions (name, phone, email)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    const values = [name.trim(), phone.trim(), email.trim()];
    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    
    // Handle duplicate email
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

module.exports = { submitForm };
