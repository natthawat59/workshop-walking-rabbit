export class ApiResponse<T> {
    data?: T;
    message: string = '';
    error?: string;
    statusCode?: number;
  }
  
  export class ApiUserAuthResponse<T> {
    user?: T;
    access_token?: string = '';
    message: string = '';
    error?: string;
    statusCode?: number;
  }
  