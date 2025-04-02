import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('should include the ErrorBoundary component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('layout-container')).toBeInTheDocument();
  });

  it('should include the AuthProvider and ModalProvider', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('should render the AppRoutes component', () => {
    const { getByText } = render(<App />);
    expect(getByText(/mynews/i)).toBeInTheDocument();
  });
});
