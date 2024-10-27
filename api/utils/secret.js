import dotenv from "dotenv";

// dotenv configuration

dotenv.config();

// make secret keys

/**
 *  SERVER PORT
 */

const PORT = process.env.PORT || 6060;

/**
 *  MONGODB URL
 */

const MONGODB_URL = process.env.MONGO_URL;

/**
 *   ACCESS TOKEN SECRET & ACCESS TOKEN EXPIRE IN
 */

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN;

/**
 *   JSON WEB TOKEN SECRET
 */

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET_EXPIRES_IN = process.env.JWT_SECRET_EXPIRES_IN;

/**
 *   MAIL URL SECRET
 */

const MAIL_URL = process.env.MAIL_URL;

/**
 *   EMAIL HOST
 */

const EMAIL_HOST = process.env.EMAIL_HOST;

/**
 *   EMAIL PORT
 */

const EMAIL_PORT = process.env.EMAIL_PORT;

/**
 *   EMAIL USER
 */

const EMAIL_USER = process.env.EMAIL_USER;

/**
 *   EMAIL PASS
 */

const EMAIL_PASS = process.env.EMAIL_PASS;

/**
 *   APP ENV
 */

const APP_ENV = process.env.APP_ENV;

// export secret keys

export {
  PORT,
  MONGODB_URL,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  JWT_SECRET,
  JWT_SECRET_EXPIRES_IN,
  MAIL_URL,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  APP_ENV,
};
