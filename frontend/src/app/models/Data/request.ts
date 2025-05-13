export interface CustomRequest {
    requestId?: number;
    requestType?: string;
    requestDetails?: string;
    createdDate?: Date | string;
    createdUserId?: number;
    modifiedDate?: Date | string;
    modifiedUserId?: number;
  }