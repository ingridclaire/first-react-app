import { render, screen} from '@testing-library/react';
import TodoList from '../components/TodoList';

test('TodoList renders static AddNewTodoItem component', () => {
    render(<TodoList />);
    const textElement = screen.getByText(/Add/i);
    expect(textElement).toBeInTheDocument();
});