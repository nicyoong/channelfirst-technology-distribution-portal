import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../error-boundary';

// Test component that throws different types of errors
function ThrowingComponent({ errorMessage = 'Test error' }) {
  throw new Error(errorMessage);
}

// Test component that throws without message
function ErrorWithoutMessage() {
  throw new Error();
}

describe('ErrorBoundary - Edge Cases and Security', () => {
  it('handles Error objects without messages', () => {
    render(
      <ErrorBoundary>
        <ErrorWithoutMessage />
      </ErrorBoundary>
    );

    // Should show default message, not crash
    expect(screen.getByText(/an unexpected error occurred/i)).toBeInTheDocument();
    expect(screen.queryByText(/undefined/i)).not.toBeInTheDocument();
  });

  it('handles Error objects with special characters in message', () => {
    const specialMessage = 'Error: <script>alert("xss")</script>';
    
    render(
      <ErrorBoundary>
        <ThrowingComponent errorMessage={specialMessage} />
      </ErrorBoundary>
    );

    // Should escape HTML - the text should be visible as text, not rendered as HTML
    expect(screen.getByText(/Error: <script>alert\("xss"\)<\/script>/i)).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('handles very long error messages', () => {
    const longMessage = 'A'.repeat(10000);
    
    render(
      <ErrorBoundary>
        <ThrowingComponent errorMessage={longMessage} />
      </ErrorBoundary>
    );

    // Should handle gracefully without crashing
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('handles null error message', () => {
    function NullMessageComponent() {
      throw Object.assign(new Error(), { message: null });
    }

    render(
      <ErrorBoundary>
        <NullMessageComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/an unexpected error occurred/i)).toBeInTheDocument();
  });

  it('handles undefined error message', () => {
    function UndefinedMessageComponent() {
      throw Object.assign(new Error(), { message: undefined });
    }

    render(
      <ErrorBoundary>
        <UndefinedMessageComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/an unexpected error occurred/i)).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div data-testid="custom-fallback">Custom Error Message</div>}>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.getByText('Custom Error Message')).toBeInTheDocument();
  });

  it('calls console.error when error occurs', () => {
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(mockConsoleError).toHaveBeenCalledTimes(2);
    expect(mockConsoleError).toHaveBeenCalledWith(
      expect.stringContaining('[ErrorBoundary]'),
      expect.any(String)
    );

    mockConsoleError.mockRestore();
  });

  it('handles errors in nested error boundaries', () => {
    function InnerBoundary() {
      return (
        <ErrorBoundary>
          <ThrowingComponent errorMessage="Inner error" />
        </ErrorBoundary>
      );
    }

    function OuterBoundary() {
      return (
        <ErrorBoundary>
          <InnerBoundary />
        </ErrorBoundary>
      );
    }

    render(<OuterBoundary />);

    // Should show inner boundary's error, not outer's
    expect(screen.getByText(/inner error/i)).toBeInTheDocument();
  });

  it('does not interfere with React error handling for non-boundary errors', () => {
    function UnhandledError() {
      throw new Error('Unhandled');
    }

    // Errors outside boundary should still propagate
    expect(() => {
      render(<UnhandledError />);
    }).toThrow('Unhandled');
  });
});
