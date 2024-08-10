import { render, screen, fireEvent } from '@testing-library/react';
import Posts from './Posts';
import { type Post } from '../../components/PostItem/PostItem';

describe('Posts Component', () => {
    const mockPosts: Post[] = [
        { id: 1, title: 'Post 1', body: 'Body 1' },
        { id: 2, title: 'Post 2', body: 'Body 2' },
    ];

    const mockOnRemove = jest.fn();
    const mockHandleSearch = jest.fn();

    const renderComponent = (props = {}) => {
        const defaultProps = {
            posts: mockPosts,
            onRemove: mockOnRemove,
            handleSearch: mockHandleSearch,
            isLoading: false,
        };
        return render(<Posts {...defaultProps} {...props} />);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders Search component', () => {
        renderComponent();
        expect(screen.getByPlaceholderText('Search by title')).toBeInTheDocument();
    });

    test('displays loading message when isLoading is true', () => {
        renderComponent({ isLoading: true });
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('displays "No posts found" message when there are no posts', () => {
        renderComponent({ posts: [] });
        expect(screen.getByText('No posts found')).toBeInTheDocument();
    });

    test('renders list of posts when posts are available', () => {
        renderComponent();
        expect(screen.getByText('Post 1')).toBeInTheDocument();
        expect(screen.getByText('Post 2')).toBeInTheDocument();
    });

    test('calls onRemove with correct id when remove button is clicked', () => {
        renderComponent();
        fireEvent.click(screen.getAllByText('Remove')[0]);
        expect(mockOnRemove).toHaveBeenCalledWith(1);
    });
});