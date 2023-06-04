import express from 'express';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const PORT = 6000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Generate OTP
const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

// Store generated OTPs for verification
const otps: { [email: string]: string } = {};
console.log("===============",otps)
app.use(express.json());

// Endpoint for user signup
app.post('/signup', async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();

  // Store OTP for verification
  otps[email] = otp;
console.log("************",otps[email])
  // Send OTP to user's email
  const msg = {
    to: email,
    from: 'pacifiquenyiringango1998@gmail.com', // Replace with your email address
    subject: 'OTP Verification',
    text: `Your OTP for signup is ${otp}`,
  };
console.log("@@@@@@@@@@@@",msg)
  try {
    await sgMail.send(msg);
    res.send('OTP sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send OTP');
  }
});


// Endpoint for OTP verification
app.post('/verify', (req, res) => {
  const { email, otp } = req.body;
console.log("!!!!!!!!!!!!",req.body)
console.log("qqqqqqqqqqqqqqq",otps[email])
  // Check if OTP matches
  if (otps[email] === otp) {
    delete otps[email];
    res.send('OTP verification successful');
  } else {
    res.status(401).send('Invalid OTP');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
