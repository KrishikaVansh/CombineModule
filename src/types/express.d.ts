import "express";

declare global {
  namespace Express {
    interface Request {
      apiKey?: {
        permissions: string[];
        
      };
    }
  }
}

export {};