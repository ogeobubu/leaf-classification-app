declare module 'swagger-ui-express' {
    import { RequestHandler } from 'express';
  
    export function serve(): RequestHandler;
    export function setup(doc: any, options?: any): RequestHandler;
  }