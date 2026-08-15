import React from 'react';
import { render, screen } from '@testing-library/react';
import { UtilityBar } from '../utility-bar';

describe('UtilityBar', () => {
  it('renders phone number', () => {
    render(<UtilityBar />);

    expect(screen.getByText(/03-2780 8888/i)).toBeInTheDocument();
  });

  it('renders email', () => {
    render(<UtilityBar />);

    expect(screen.getByText(/sales@channelfirst.com.my/i)).toBeInTheDocument();
  });

  it('renders track order link', () => {
    render(<UtilityBar />);

    expect(screen.getByText(/track order/i)).toBeInTheDocument();
  });
});
