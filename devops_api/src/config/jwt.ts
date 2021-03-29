import { registerAs } from '@nestjs/config';

export default registerAs('JWT', () => ({
  secretKey: process.env.JWT_SECRET_KEY || 'devops',
  expiresIn: process.env.JWT_EXPIRESIN || '24h',
}));
