import { GenericApiError, UnknownError } from '../errors/errors';

// Function to handle generic responses with custom error handlers
export const handleGenericResponses = async (response: Response, customHandlers: { [key: number]: (response: Response) => Promise<void> } = {}) => {
    // if there is a custom handler for the status code
    if (customHandlers[response.status]) {
        return customHandlers[response.status](response);
    }

    // if the response is ok, return the json
    if (response.ok && response.status.toString().startsWith('2')) {
        return await response.json();
    }

    // convert the non-200 status codes to errors
    switch (response.status) {
        case 400:
            return new GenericApiError('Bad Request', {
                status: response.status
            });
        case 401:
            return new GenericApiError('Unauthorized', {
                status: response.status
            });
        case 403:
            return new GenericApiError('Forbidden', {
                status: response.status
            });
        case 404:
            return new GenericApiError('Not Found', {
                status: response.status
            });
        case 500:
            return new GenericApiError('Internal Server Error', {
                status: response.status
            });
        default:
            return new UnknownError('An unknown error occurred');
    }
}