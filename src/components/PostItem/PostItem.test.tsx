import { render, screen, fireEvent } from '@testing-library/react';
import PostItem from './PostItem';

describe('PostItem Component', () => {
    const mockPost = {
        id: 1,
        title: 'Test Title',
        body: 'Test Body',
    };

    const mockOnRemove = jest.fn();

    beforeEach(() => {
        render(<PostItem post={mockPost} onRemove={mockOnRemove} />);
    });

    test('renders post title and body', () => {
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Body')).toBeInTheDocument();
    });
 
    test('calls onRemove with correct id when remove button is clicked', () => {
        fireEvent.click(screen.getByText('Remove'));
        expect(mockOnRemove).toHaveBeenCalledWith(mockPost.id);
    });
});