declare module "cors" {
  import { RequestHandler } from "express";

  export interface CorsOptions {
    origin?:
      | string
      | string[]
      | ((req: any, callback: (err: any, allow: boolean) => void) => void);
    methods?: string | string[];
    allowedHeaders?: string | string[];
    exposedHeaders?: string | string[];
    credentials?: boolean;
    maxAge?: number;
    preflightContinue?: boolean;
    optionsSuccessStatus?: number;
  }

  export function cors(options?: CorsOptions): RequestHandler;
  export default cors;
}
