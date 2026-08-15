import React from 'react';
import { render, screen } from '@testing-library/react';
import { motion, useReducedMotion } from 'framer-motion';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => {
      const { whileInView, ...restProps } = props;
      return <div className={className} {...restProps}>{children}</div>;
    },
    ul: ({ children, className, ...props }: any) => {
      const { whileInView, ...restProps } = props;
      return <ul className={className} {...restProps}>{children}</ul>;
    },
    li: ({ children, className, ...props }: any) => {
      const { whileInView, ...restProps } = props;
      return <li className={className} {...restProps}>{children}</li>;
    },
  },
  useReducedMotion: jest.fn(),
  useScroll: jest.fn(() => ({ scrollYProgress: { get: () => 0 } })),
  useTransform: jest.fn(() => 0),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.unmock('../motion-wrap');
import { MotionWrapper, StaggerContainer, FadeIn, ScaleIn } from '../motion-wrap';

describe('MotionWrap - Edge Cases and Accessibility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('respects prefers-reduced-motion preference', () => {
    (useReducedMotion as jest.Mock).mockReturnValue(true);

    render(
      <MotionWrapper>
        <div data-testid="content">Content</div>
      </MotionWrapper>
    );

    // Should render plain div without motion props
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('applies motion animations when motion is not reduced', () => {
    (useReducedMotion as jest.Mock).mockReturnValue(false);

    render(
      <MotionWrapper>
        <div data-testid="content">Content</div>
      </MotionWrapper>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('handles StaggerContainer with reduced motion', () => {
    (useReducedMotion as jest.Mock).mockReturnValue(true);

    render(
      <StaggerContainer>
        <span>Item 1</span>
        <span>Item 2</span>
      </StaggerContainer>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('handles FadeIn with custom delay', () => {
    (useReducedMotion as jest.Mock).mockReturnValue(false);

    render(
      <FadeIn delay={1.5}>
        <div data-testid="delayed">Delayed</div>
      </FadeIn>
    );

    expect(screen.getByTestId('delayed')).toBeInTheDocument();
  });

  it('handles ScaleIn with custom duration', () => {
    (useReducedMotion as jest.Mock).mockReturnValue(false);

    render(
      <ScaleIn duration={2}>
        <div data-testid="scaled">Scaled</div>
      </ScaleIn>
    );

    expect(screen.getByTestId('scaled')).toBeInTheDocument();
  });

  it('applies custom className to MotionWrapper', () => {
    render(
      <MotionWrapper className="custom-class">
        <div>Content</div>
      </MotionWrapper>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('handles empty children', () => {
    render(
      <MotionWrapper>
        {/* Empty children */}
      </MotionWrapper>
    );

    // Should not crash with empty children
    expect(screen.queryByText(/content/i)).not.toBeInTheDocument();
  });

  it('handles multiple children in StaggerContainer', () => {
    render(
      <StaggerContainer gap={0.2}>
        <span>First</span>
        <span>Second</span>
        <span>Third</span>
        <span>Fourth</span>
      </StaggerContainer>
    );

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
    expect(screen.getByText('Fourth')).toBeInTheDocument();
  });
});
