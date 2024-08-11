import { GenericApiError, ValidationError, UnknownError } from './errors';

describe('GenericApiError', () => {
    it('should create an instance with the correct message and status', () => {
        const error = new GenericApiError('Test message', {
            status: 404
    });
        expect(error.message).toBe('Test message');
        expect(error.status).toBe(404);
        expect(error.name).toBe('GenericError');
    });
});

describe('ValidationError', () => {
    it('should create an instance with the correct message', () => {
        const error = new ValidationError('Validation failed');
        expect(error.message).toBe('Validation failed');
        expect(error.name).toBe('ValidationError');
    });
});

describe('UnknownError', () => {
    it('should create an instance with the correct message', () => {
        const error = new UnknownError('Unknown error occurred');
        expect(error.message).toBe('Unknown error occurred');
        expect(error.name).toBe('UnknownError');
    });
});