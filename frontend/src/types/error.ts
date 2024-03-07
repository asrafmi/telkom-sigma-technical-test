export interface DataErrorProps {
  status: number;
  message: string;
  errors: any;
}
export interface ResponseErrorProps {
  data: DataErrorProps;
}
export interface ErrorProps {
  response: ResponseErrorProps;
}
