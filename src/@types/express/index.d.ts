declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_KEY: string;
    PORT: string;
    MAIL_HOST: string;
    MAIL_PORT: string;
    MAIL_USER: string;
    MAIL_PASS: string;
    MAIL_NAME: string;
    MAIL_FROM: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_PASS: string;
  }
}
