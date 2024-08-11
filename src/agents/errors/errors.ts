export class GenericApiError extends Error {
        status: number;
    
        constructor(
            message: string,
            data: {
                status: number;
            }
        ) {
            super(message);
            this.name = 'GenericError';
            this.status = data.status;
        }
}

export class ValidationError extends Error {

    constructor(
        message: string 
    ) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class UnknownError extends Error {
    constructor(
        message: string
    ) {
        super(message);
        this.name = 'UnknownError';
    }
}


export type ApiError = GenericApiError | ValidationError | UnknownError;