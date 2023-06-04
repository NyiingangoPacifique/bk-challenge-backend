import jwt from 'jsonwebtoken';

export const generateResetToken = (): string => {
  const secret = process.env.JWT_SECRET || '';
  const expiration = '1h'; // Token expiration time, e.g., 1 hour

  // Generate the token
  const token = jwt.sign({}, secret, { expiresIn: expiration });

  return token;
};

export const getResetPasswordLink = (resetToken: string): string => {
  // TODO: Replace the URL with your frontend's password reset page URL
  const resetLink = `http://example.com/reset-password/${resetToken}`;

  return resetLink;
};
