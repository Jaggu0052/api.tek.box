export type PORT_TYPE = 3000 | 5000 | 5200 | 5001;
export type STATUS_CODE =
  | 200
  | 201
  | 202
  | 204
  | 400
  | 401
  | 402
  | 403
  | 404
  | 409
  | 422
  | 500
  | 501
  | 502
  | 503
  | 504;

export type responseObj = {
  success: boolean;
  statusCode: STATUS_CODE;
  message: string;
  data?: any;
  page?: number;
  limit?: number;
};

export type errorResponseObj = {
  statusCode: STATUS_CODE | number;
  error: string;
  message: string | object;
  timestamp?: string;
  path?: string;
};

export type pagination = {
  id?: number;
  uuid?: string;
  limit?: number;
  skip?: number;
  search_string?: string;
};
