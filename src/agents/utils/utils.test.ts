import { GenericApiError, UnknownError } from '../errors/errors';
import { handleGenericResponses } from './utils';

describe('handleGenericResponses', () => {
    it('should return JSON response when response is OK', async () => {
        const mockResponse = {
            ok: true,
            status: 200,
            json: jest.fn().mockResolvedValue({ data: 'test' })
        } as unknown as Response;

        const result = await handleGenericResponses(mockResponse);
        expect(result).toEqual({ data: 'test' });
    });

    it('should call custom handler when custom handler for status code is provided', async () => {
        const mockResponse = {
            ok: false,
            status: 400
        } as unknown as Response;

        const customHandler = jest.fn().mockResolvedValue('custom handler called');
        const customHandlers = {
            400: customHandler
        };

        const result = await handleGenericResponses(mockResponse, customHandlers);
        expect(customHandler).toHaveBeenCalledWith(mockResponse);
        expect(result).toBe('custom handler called');
    });

    it('should return GenericApiError for status code 400', async () => {
        const mockResponse = {
            ok: false,
            status: 400
        } as unknown as Response;

        const result = await handleGenericResponses(mockResponse);
        expect(result).toBeInstanceOf(GenericApiError);
        expect(result.message).toBe('Bad Request');
    });

    it('should return GenericApiError for status code 401', async () => {
        const mockResponse = {
            ok: false,
            status: 401
        } as unknown as Response;

        const result = await handleGenericResponses(mockResponse);
        expect(result).toBeInstanceOf(GenericApiError);
        expect(result.message).toBe('Unauthorized');
    });

    it('should return GenericApiError for status code 403', async () => {
        const mockResponse = {
            ok: false,
            status: 403
        } as unknown as Response;

        const result = await handleGenericResponses(mockResponse);
        expect(result).toBeInstanceOf(GenericApiError);
        expect(result.message).toBe('Forbidden');
    });

    it('should return GenericApiError for status code 404', async () => {
        const mockResponse = {
            ok: false,
            status: 404
        } as unknown as Response;

        const result = await handleGenericResponses(mockResponse);
        expect(result).toBeInstanceOf(GenericApiError);
        expect(result.message).toBe('Not Found');
    });

    it('should return GenericApiError for status code 500', async () => {
        const mockResponse = {
            ok: false,
            status: 500
        } as unknown as Response;

        const result = await handleGenericResponses(mockResponse);
        expect(result).toBeInstanceOf(GenericApiError);
        expect(result.message).toBe('Internal Server Error');
    });

    it('should return UnknownError for any other status code', async () => {
        const mockResponse = {
            ok: false,
            status: 418
        } as unknown as Response;

        const result = await handleGenericResponses(mockResponse);
        expect(result).toBeInstanceOf(UnknownError);
        expect(result.message).toBe('An unknown error occurred');
    });
});