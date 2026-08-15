import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '../footer';

describe('Footer', () => {
  it('renders footer with links', () => {
    render(<Footer />);

    // Footer should have product links
    expect(screen.getByText(/networking/i)).toBeInTheDocument();
    expect(screen.getByText(/servers/i)).toBeInTheDocument();
  });

  it('renders company section', () => {
    render(<Footer />);

    expect(screen.getByText(/about channelfirst/i)).toBeInTheDocument();
    expect(screen.getByText(/our brands/i)).toBeInTheDocument();
  });

  it('renders support section', () => {
    render(<Footer />);

    expect(screen.getByText(/support centre/i)).toBeInTheDocument();
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });

  it('renders reseller section', () => {
    render(<Footer />);

    expect(screen.getByText(/reseller portal/i)).toBeInTheDocument();
    expect(screen.getByText(/register as reseller/i)).toBeInTheDocument();
  });

  it('renders footer with social links', () => {
    render(<Footer />);

    // Footer should have social media links
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});
