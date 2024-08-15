import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';
import { getSearchParams } from '../../domainHooks/usePosts/usePosts';

jest.mock('../../domainHooks/usePosts/usePosts');

describe('Pagination Component', () => {
    const mockFetchPosts = jest.fn();
    const mockGetSearchParams = getSearchParams as jest.Mock;

    const renderComponent = (props = {}) => {
        const defaultProps = {
            fetchPosts: mockFetchPosts,
        };
        return render(<Pagination {...defaultProps} {...props} />);
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockGetSearchParams.mockReturnValue({ _page: '1' });
    });

    test('should update the URL and fetchPosts calls with correct params on next page', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Next'));

        expect(mockGetSearchParams).toHaveBeenCalled();
        expect(mockFetchPosts).toHaveBeenCalledWith({ _page: '2' });
        expect(window.location.search).toBe('?_page=2');
    });

    test('should update the URL and fetchPosts calls with correct params on prev page', () => {
        mockGetSearchParams.mockReturnValue({ _page: '2' });
        renderComponent();
        fireEvent.click(screen.getByText('Prev'));

        expect(mockGetSearchParams).toHaveBeenCalled();
        expect(mockFetchPosts).toHaveBeenCalledWith({ _page: '1' });
        expect(window.location.search).toBe('?_page=1');
    });

    test('Should display the Prev button when clicking Next button from page 1', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Next'));

        expect(screen.getByText('Prev')).toBeInTheDocument();
    });

    test('should remove the Prev button when navigating back to the first page', () => {
        mockGetSearchParams.mockReturnValue({ _page: '2' });
        renderComponent();
        fireEvent.click(screen.getByText('Prev'));

        expect(screen.queryByText('Prev')).not.toBeInTheDocument();
    });

    test('should not render the Prev button when currentPage is 1', () => {
        mockGetSearchParams.mockReturnValue({ _page: '1' });
        renderComponent();

        expect(screen.queryByText('Prev')).not.toBeInTheDocument();
    })
});