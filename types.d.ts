// types.d.ts

// Extend the Express Response interface
declare namespace Express {
  export interface Response {
    cookie(name: string, value: any, options?: any): Response;
  }
}




