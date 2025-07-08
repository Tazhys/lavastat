export interface ErrorResponse {
    timestamp: number;
    status: number;
    error: string;
    message: string;
    path: string;
    trace?: string;
}