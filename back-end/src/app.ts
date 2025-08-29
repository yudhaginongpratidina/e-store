import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

import corsOrigin from '@/config/cors-origin';

import AuthMiddleware from "@/middleware/auth-middleware";
import ErrorMiddlewar from "@/middleware/error-middleware";
import NotFoundMiddleware from "@/middleware/not-found-middleware";

import AuthController from "@/controller/auth-controller";

const app = express();

app.use(cors({
    origin: corsOrigin,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/auth/token", AuthController.refreshToken);
app.post("/auth/register", AuthController.register);
app.post("/auth/login", AuthController.login);
app.post("/auth/logout", AuthController.logout);

app.use(ErrorMiddlewar);
app.use(NotFoundMiddleware);

export default app;