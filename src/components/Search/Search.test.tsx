import { render, screen, fireEvent } from '@testing-library/react';
import Search, { SearchProps } from './Search';

afterAll(() => {
    jest.clearAllMocks();
})

const setup = (overrides?: Partial<SearchProps>) => {
    const mockHandleSearch = jest.fn();
    render(<Search handleSearch={mockHandleSearch} {...overrides} />);
    return mockHandleSearch;
}

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
        expect(window.location.search).toBe('?q=Test');
    });

    test('calls handleSearch with correct value after timeout', () => {
        const mockHandleSearch = jest.fn();
        setup({
            handleSearch: mockHandleSearch,
        });
        jest.useFakeTimers();
        const input = screen.getByPlaceholderText('Search by title');
        fireEvent.change(input, { target: { value: 'Test' } });
        jest.advanceTimersByTime(500);
        expect(mockHandleSearch).toHaveBeenCalledWith('Test');
        jest.useRealTimers();
    });

    test('does not call handleSearch if input value changes before timeout', () => {
        const mockHandleSearch = jest.fn();
        setup({
            handleSearch: mockHandleSearch,
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
});