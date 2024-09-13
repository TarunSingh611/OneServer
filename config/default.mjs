const secrets = {
	USER_NAME: process.env.USER_NAME,
	DB_PASS: process.env.DB_PASS,
	MONGO_URL: process.env.MONGO_URL,
	DB_NAME: process.env.DB_NAME,
	PORT: process.env.PORT,
	JWT_SECRET: process.env.JWT_SECRET,
	VALID_API_KEYS: process.env.VALID_API_KEYS,
	EXCLUDED_ROUTES: process.env.EXCLUDED_ROUTES,
	EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
	EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
	EMAIL_SERVER: process.env.EMAIL_SERVER,
	EMAIL_NAME: process.env.EMAIL_NAME,
	ORIGIN_URL: process.env.ORIGIN_URL,
	EMAIL_PORT: process.env.EMAIL_PORT,
    MONGO_URI_FULL: process.env.MONGO_URI_FULL,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT
};

export default secrets;