import { ErrorResponse } from '../types';

export class LavalinkError extends Error {
    public status: number;
    public path: string;
    public timestamp: number;
    public trace?: string;

    constructor(error: ErrorResponse) {
        super(error.message);
        this.name = 'LavalinkError';
        this.status = error.status;
        this.path = error.path;
        this.timestamp = error.timestamp;
        this.trace = error.trace;
    }
}