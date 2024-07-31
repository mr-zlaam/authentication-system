"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET_KEY = exports.ADMIN_PASSWORD = exports.ADMIN_EMAIL = exports.ISDEVELOPMENT_ENVIRONMENT = exports.PORT = exports.DB_URI = void 0;
const _config = {
    DB_URI: process.env.DATABASE_URL,
    PORT: process.env.PORT || 5000,
    ISDEVELOPMENT_ENVIRONMENT: true,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    JWT_SECRET_KEY: process.env.JWT_SECRET,
};
exports.DB_URI = _config.DB_URI, exports.PORT = _config.PORT, exports.ISDEVELOPMENT_ENVIRONMENT = _config.ISDEVELOPMENT_ENVIRONMENT, exports.ADMIN_EMAIL = _config.ADMIN_EMAIL, exports.ADMIN_PASSWORD = _config.ADMIN_PASSWORD, exports.JWT_SECRET_KEY = _config.JWT_SECRET_KEY;
