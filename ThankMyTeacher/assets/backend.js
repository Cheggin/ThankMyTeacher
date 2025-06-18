// server.js - Main backend server file
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const validator = require('validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Rate limiting to prevent spam
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many emails sent from this IP, please try again later.'
});

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify email configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error('Email server connection error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Email validation and sanitization
const validateEmailInput = (data) => {
  const errors = [];

  // Validate teacher email
  if (!data.teacherEmail || !validator.isEmail(data.teacherEmail)) {
    errors.push('Invalid teacher email address');
  }

  // Validate teacher name
  if (!data.teacherName || data.teacherName.trim().length < 2) {
    errors.push('Teacher name must be at least 2 characters');
  }

  // Validate school name
  if (!data.schoolName || data.schoolName.trim().length < 2) {
    errors.push('School name must be at least 2 characters');
  }

  // Validate message
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  if (data.message && data.message.length > 2000) {
    errors.push('Message must not exceed 2000 characters');
  }

  // Validate sender name
  if (!data.senderName || data.senderName.trim().length < 2) {
    errors.push('Your name must be at least 2 characters');
  }

  return errors;
};

// Send thank you email endpoint
app.post('/api/send-thank-you', emailLimiter, async (req, res) => {
  try {
    const { teacherEmail, teacherName, schoolName, message, senderName } = req.body;

    // Validate input
    const validationErrors = validateEmailInput(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        success: false, 
        errors: validationErrors 
      });
    }

    // Sanitize input
    const sanitizedData = {
      teacherEmail: validator.normalizeEmail(teacherEmail),
      teacherName: validator.escape(teacherName.trim()),
      schoolName: validator.escape(schoolName.trim()),
      message: validator.escape(message.trim()),
      senderName: validator.escape(senderName.trim())
    };

    // Email to teacher
    const teacherMailOptions = {
      from: `"ThankMyTeacher" <${process.env.SMTP_USER}>`,
      to: sanitizedData.teacherEmail,
      subject: `You've received a thank you message from ${sanitizedData.senderName}! 💝`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FFE5E5 0%, #FFF0E6 50%, #E6F4F1 100%); padding: 30px; text-align: center; border-radius: 10px; }
            .content { background: #ffffff; padding: 30px; margin-top: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .message { background: #f9f9f9; padding: 20px; border-left: 4px solid #4ECDC4; margin: 20px 0; font-style: italic; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            h1 { color: #2D3436; }
            .emoji { font-size: 24px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="emoji">💝</span>
              <h1>You've Received a Thank You!</h1>
            </div>
            
            <div class="content">
              <p>Dear ${sanitizedData.teacherName},</p>
              
              <p>Someone special wanted to take a moment to thank you for the difference you've made in their life. Here's their message:</p>
              
              <div class="message">
                ${sanitizedData.message.replace(/\n/g, '<br>')}
              </div>
              
              <p><strong>From:</strong> ${sanitizedData.senderName}<br>
              <strong>School:</strong> ${sanitizedData.schoolName}</p>
              
              <p>Your dedication to teaching has made a lasting impact. Thank you for all that you do!</p>
            </div>
            
            <div class="footer">
              <p>This message was sent via ThankMyTeacher<br>
              <em>Spreading gratitude, one teacher at a time</em></p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        You've received a thank you message!
        
        Dear ${sanitizedData.teacherName},
        
        ${sanitizedData.message}
        
        From: ${sanitizedData.senderName}
        School: ${sanitizedData.schoolName}
        
        This message was sent via ThankMyTeacher
      `
    };

    // Send confirmation email to sender (optional)
    const senderMailOptions = {
      from: `"ThankMyTeacher" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL, // Send copy to admin
      subject: `Thank you sent to ${sanitizedData.teacherName}`,
      html: `
        <p>A thank you message was sent:</p>
        <ul>
          <li>To: ${sanitizedData.teacherName} (${sanitizedData.teacherEmail})</li>
          <li>From: ${sanitizedData.senderName}</li>
          <li>School: ${sanitizedData.schoolName}</li>
        </ul>
        <p>Message: ${sanitizedData.message}</p>
      `
    };

    // Send emails
    await transporter.sendMail(teacherMailOptions);
    await transporter.sendMail(senderMailOptions);

    res.json({ 
      success: true, 
      message: 'Thank you message sent successfully!' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});