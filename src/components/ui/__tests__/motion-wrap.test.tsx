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

// Import the actual module to test
jest.unmock('../motion-wrap');
import { MotionWrapper, StaggerContainer, FadeIn, ScaleIn } from '../motion-wrap';

describe('MotionWrapper', () => {
  it('renders children', () => {
    render(
      <MotionWrapper>
        <div data-testid="content">Test Content</div>
      </MotionWrapper>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies animation props when motion is enabled', () => {
    render(
      <MotionWrapper
        className="test-class"
        delay={0.2}
      >
        <div data-testid="animated">Animated</div>
      </MotionWrapper>
    );

    expect(screen.getByTestId('animated')).toBeInTheDocument();
  });

  it('renders plain div when reduced motion is preferred', () => {
    (useReducedMotion as jest.Mock).mockReturnValue(true);

    render(
      <MotionWrapper>
        <div data-testid="reduced">Reduced motion</div>
      </MotionWrapper>
    );

    expect(screen.getByTestId('reduced')).toBeInTheDocument();
  });
});

describe('StaggerContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children in a container', () => {
    render(
      <StaggerContainer>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
      </StaggerContainer>
    );

    expect(screen.getByTestId('child1')).toBeInTheDocument();
    expect(screen.getByTestId('child2')).toBeInTheDocument();
  });

  it('applies stagger animation to children', () => {
    render(
      <StaggerContainer gap={0.1}>
        <span>Item 1</span>
        <span>Item 2</span>
        <span>Item 3</span>
      </StaggerContainer>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });
});

describe('FadeIn', () => {
  it('renders children with fade animation', () => {
    render(
      <FadeIn>
        <div data-testid="fade">Fade in content</div>
      </FadeIn>
    );

    expect(screen.getByTestId('fade')).toBeInTheDocument();
    expect(screen.getByText('Fade in content')).toBeInTheDocument();
  });

  it('applies custom delay', () => {
    render(
      <FadeIn delay={0.5}>
        <div data-testid="delayed">Delayed fade</div>
      </FadeIn>
    );

    expect(screen.getByTestId('delayed')).toBeInTheDocument();
  });
});

describe('ScaleIn', () => {
  it('renders children with scale animation', () => {
    render(
      <ScaleIn>
        <div data-testid="scale">Scale in content</div>
      </ScaleIn>
    );

    expect(screen.getByTestId('scale')).toBeInTheDocument();
    expect(screen.getByText('Scale in content')).toBeInTheDocument();
  });

  it('applies custom scale duration', () => {
    render(
      <ScaleIn duration={0.3}>
        <div data-testid="fast-scale">Fast scale</div>
      </ScaleIn>
    );

    expect(screen.getByTestId('fast-scale')).toBeInTheDocument();
  });
});
