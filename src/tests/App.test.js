import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders app title: Todoifier', () => {
  render(<App />);
  const textElement = screen.getByText(/Todoifier/i);
  expect(textElement).toBeInTheDocument();
});
