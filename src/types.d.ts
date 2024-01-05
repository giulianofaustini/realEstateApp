declare namespace Express {
    export interface Response {
      cookie(name: string, value: any, options?: any): Response;
    }
  }
  