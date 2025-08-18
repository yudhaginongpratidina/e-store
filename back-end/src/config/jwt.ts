import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import crypto from "crypto";
import "dotenv/config";

interface UserPayload {
    id?: string | number;
    verified?: boolean;
    [key: string]: string | number | boolean | undefined;
}

interface DecodedToken extends JwtPayload {
    id: string | number;
    verified: boolean;
    type: "access" | "refresh";
    iat: number;
    jti: string;
    iss: string;
    aud: string;
}

interface GeneratedTokens {
    access_token: string;
    refresh_token: string;
    expires_in: string;
}

interface AccessTokenOnly {
    access_token: string;
    expires_in: string;
}

const JWT_CONFIG = {
    ACCESS_TOKEN_EXPIRY: "60m",
    REFRESH_TOKEN_EXPIRY: "7d",
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET ?? "",
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET ?? "",
    ALGORITHM: "HS256" as jwt.Algorithm,
    ISSUER: process.env.JWT_ISSUER ?? "your-app-name",
    AUDIENCE: process.env.JWT_AUDIENCE ?? "your-app-users",
};

const validateEnvVars = (): void => {
    const requiredVars = ["JWT_ACCESS_TOKEN_SECRET", "JWT_REFRESH_TOKEN_SECRET"];
    const missing = requiredVars.filter((varName) => !process.env[varName]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }

    if (JWT_CONFIG.JWT_ACCESS_TOKEN_SECRET.length < 32) {
        throw new Error("JWT_ACCESS_TOKEN_SECRET must be at least 32 characters long");
    }

    if (JWT_CONFIG.JWT_REFRESH_TOKEN_SECRET.length < 32) {
        throw new Error("JWT_REFRESH_TOKEN_SECRET must be at least 32 characters long");
    }
};

const generateJTI = (): string => {
    return crypto.randomBytes(16).toString("hex");
};

const sanitizePayload = (payload: UserPayload): UserPayload => {
    const sanitized: UserPayload = {};
    const allowedFields: (keyof UserPayload)[] = ["id", "verified"];

    for (const field of allowedFields) {
        const value = payload[field];
        if (value !== undefined && value !== null) {
            sanitized[field] = typeof value === "string" ? value.trim() : value;
        }
    }
    return sanitized;
};

export const generateToken = async (userPayload: UserPayload): Promise<GeneratedTokens> => {
    try {
        validateEnvVars();

        const sanitizedPayload = sanitizePayload(userPayload);
        const currentTime = Math.floor(Date.now() / 1000);

        if (sanitizedPayload.id === undefined) {
            throw new Error("User payload must include a valid 'id' property");
        }

        const accessTokenPayload: DecodedToken = {
            id: sanitizedPayload.id,
            verified: sanitizedPayload.verified ?? false,
            iat: currentTime,
            jti: generateJTI(),
            type: "access",
            iss: JWT_CONFIG.ISSUER,
            aud: JWT_CONFIG.AUDIENCE,
        };

        const refreshTokenPayload: DecodedToken = {
            id: sanitizedPayload.id,
            verified: sanitizedPayload.verified ?? false,
            iat: currentTime,
            jti: generateJTI(),
            type: "refresh",
            iss: JWT_CONFIG.ISSUER,
            aud: JWT_CONFIG.AUDIENCE,
        };

        const access_token = jwt.sign(accessTokenPayload, JWT_CONFIG.JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRY,
            algorithm: JWT_CONFIG.ALGORITHM,
        } as SignOptions);

        const refresh_token = jwt.sign(refreshTokenPayload, JWT_CONFIG.JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: JWT_CONFIG.REFRESH_TOKEN_EXPIRY,
            algorithm: JWT_CONFIG.ALGORITHM,
        } as SignOptions);

        return {
            access_token,
            refresh_token,
            expires_in: JWT_CONFIG.ACCESS_TOKEN_EXPIRY,
        };
    } catch (error: any) {
        throw new Error(`Token generation failed: ${error.message}`);
    }
};

export const decodeToken = async (
    token: string,
    tokenType: "access" | "refresh" = "access"
): Promise<DecodedToken> => {
    try {
        if (!token) {
            throw new Error("Token is required");
        }

        if (typeof token !== "string" || !token.includes(".")) {
            throw new Error("Invalid token format");
        }

        validateEnvVars();

        const secret =
            tokenType === "refresh"
                ? JWT_CONFIG.JWT_REFRESH_TOKEN_SECRET
                : JWT_CONFIG.JWT_ACCESS_TOKEN_SECRET;

        const decoded = jwt.verify(token, secret, {
            algorithms: [JWT_CONFIG.ALGORITHM],
            issuer: JWT_CONFIG.ISSUER,
            audience: JWT_CONFIG.AUDIENCE,
        }) as DecodedToken;

        if (decoded.type !== tokenType) {
            throw new Error(`Invalid token type. Expected ${tokenType}, got ${decoded.type}`);
        }

        return decoded;
    } catch (error: any) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error("Invalid token");
        } else if (error instanceof jwt.TokenExpiredError) {
            throw new Error("Token has expired");
        } else if (error instanceof jwt.NotBeforeError) {
            throw new Error("Token not active yet");
        } else {
            throw new Error(`Token verification failed: ${error.message}`);
        }
    }
};

export const refreshAccessToken = async (refreshToken: string): Promise<AccessTokenOnly> => {
    try {
        const decoded = await decodeToken(refreshToken, "refresh");

        const userPayload: UserPayload = { id: decoded.id, verified: decoded.verified };

        const accessTokenPayload: DecodedToken = {
            id: decoded.id,
            verified: decoded.verified,
            iat: Math.floor(Date.now() / 1000),
            jti: generateJTI(),
            type: "access",
            iss: JWT_CONFIG.ISSUER,
            aud: JWT_CONFIG.AUDIENCE,
        };

        const access_token = jwt.sign(accessTokenPayload, JWT_CONFIG.JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRY,
            algorithm: JWT_CONFIG.ALGORITHM,
        } as SignOptions);

        return {
            access_token,
            expires_in: JWT_CONFIG.ACCESS_TOKEN_EXPIRY,
        };
    } catch (error: any) {
        throw new Error(`Token refresh failed: ${error.message}`);
    }
};