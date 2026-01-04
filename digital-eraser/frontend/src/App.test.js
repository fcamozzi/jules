import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home - Welcome to the Digital Eraser/i);
  expect(linkElement).toBeInTheDocument();
});
