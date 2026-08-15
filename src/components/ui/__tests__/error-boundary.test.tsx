import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../error-boundary';

// Helper component that throws an error
function ThrowingComponent() {
  throw new Error('Test error');
}

// Helper component that renders successfully
function WorkingComponent() {
  return <div data-testid="working">Working component</div>;
}

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('working')).toBeInTheDocument();
  });

  it('shows fallback UI when child throws during render', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
    expect(screen.getByText(/try again/i)).toBeInTheDocument();
  });

  it('shows custom fallback when provided as React node', () => {
    render(
      <ErrorBoundary fallback={<div data-testid="custom-fallback">Custom Error</div>}>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.getByText('Custom Error')).toBeInTheDocument();
  });

  it('calls console.error when error occurs', () => {
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    // console.error is called multiple times (once for the error, once for component stack)
    expect(mockConsoleError).toHaveBeenCalledTimes(2);

    mockConsoleError.mockRestore();
  });

  it('renders fallback with default error message when error has no message', () => {
    function ErrorWithNoMessage() {
      throw new Error();
    }

    render(
      <ErrorBoundary>
        <ErrorWithNoMessage />
      </ErrorBoundary>
    );

    expect(screen.getByText(/an unexpected error occurred/i)).toBeInTheDocument();
  });

  it('handles nested error boundaries', () => {
    function InnerBoundary() {
      return (
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );
    }

    render(
      <ErrorBoundary>
        <InnerBoundary />
      </ErrorBoundary>
    );

    // Inner boundary should catch the error
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
