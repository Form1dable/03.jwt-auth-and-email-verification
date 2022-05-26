declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: number;
        MONGO_URI: string;
        SECRET_KEY: string;
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
    }
}
