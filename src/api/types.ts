export interface ApiEnvelope<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
}
