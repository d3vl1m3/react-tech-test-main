import { render, screen, fireEvent } from '@testing-library/react';
import Search, { SearchProps } from './Search';

afterAll(() => {
    jest.clearAllMocks();
})

const setup = (overrides?: Partial<SearchProps>) => {
    const mockHandleSearch = jest.fn();
    render(<Search fetchPosts={mockHandleSearch} {...overrides} />);
    return mockHandleSearch;
}

afterEach(() => {
    // reset the URL
    window.history.pushState({}, '', '/');
})

describe('Search Component', () => {

    test('updates input value correctly', () => {
        setup();
        const input = screen.getByPlaceholderText('Search by title');
        fireEvent.change(input, { target: { value: 'Test' } });
        expect(input).toHaveValue('Test');
    });

    test('updates URL with correct query parameter', () => {
        setup();
        const input = screen.getByPlaceholderText('Search by title');
        fireEvent.change(input, { target: { value: 'Test' } });
        expect(window.location.search).toBe('?title_like=Test');
    });

    test('calls handleSearch with correct value after timeout', () => {
        const mockHandleSearch = jest.fn();
        setup({
            fetchPosts: mockHandleSearch,
        });
        jest.useFakeTimers();
        const input = screen.getByPlaceholderText('Search by title');
        fireEvent.change(input, { target: { value: 'Test' } });
        jest.advanceTimersByTime(500);
        expect(mockHandleSearch).toHaveBeenCalledWith({title_like: 'Test'});
        jest.useRealTimers();
    });

    test('does not call handleSearch if input value changes before timeout', () => {
        const mockHandleSearch = jest.fn();
        setup({
            fetchPosts: mockHandleSearch,
        });
        
        jest.useFakeTimers();
        const input = screen.getByPlaceholderText('Search by title');
        fireEvent.change(input, { target: { value: 'Test' } });
        fireEvent.change(input, { target: { value: 'Test2' } });
        jest.advanceTimersByTime(400);
        expect(mockHandleSearch).not.toHaveBeenCalled();
        jest.useRealTimers();
    })

    test('when loading, input is disabled', () => {
        setup({
            isLoading: true,
        });
        const input = screen.getByPlaceholderText('Search by title');
        expect(input).toBeDisabled();
    })

    test('when a query param exists in the URL on mount, it is set as the input value', () => {
        Object.defineProperty(window, 'location', {
            value: {
                search: '?q=FooBarQuery',
            },
            writable: true,
        });

        setup();
        const input = screen.getByPlaceholderText('Search by title');
        expect(input).toHaveValue('FooBarQuery');
    });
});