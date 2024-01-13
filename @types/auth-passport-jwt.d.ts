declare module 'auth-passport-jwt' {
  import { Application, RequestHandler } from 'express';

  // Define types for your functions
  export function initPassportAuth(app: Application, secretKey: string): void;

  export function createServer(): Application;

  export function generateToken(
    payload: object,
    secretKey: string,
    expiresIn?: string
  ): string;

  export function verifyToken(token: string, secretKey: string): object | null;

  // Export types for middleware functions (if needed)
  export const middleware1: RequestHandler;
  export const middleware2: RequestHandler;
}
