export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'default_secret_key',
  expiresIn: '1h',
};
