export interface GenericResponse {
  statusCode: number;
  message: string;
  info: string;
  data?: any[] | Record<string, any>;
}
