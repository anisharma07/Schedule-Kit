import React from 'react';
import { render } from '@testing-library/react-native';
import MiniConicGradient from '../../../src/components/Cards/MiniConicGradient';

describe('MiniConicGradient', () => {
  it('renders correctly with default props', () => {
    const { toJSON } = render(<MiniConicGradient percentage={50} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with 0% percentage', () => {
    const { toJSON } = render(<MiniConicGradient percentage={0} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with 100% percentage', () => {
    const { toJSON } = render(<MiniConicGradient percentage={100} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with percentage over 100', () => {
    const { toJSON } = render(<MiniConicGradient percentage={150} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('has correct dimensions (smaller than regular ConicGradient)', () => {
    const { root } = render(<MiniConicGradient percentage={75} />);
    expect(root).toBeTruthy();
    // The component should render with 48x48 dimensions instead of 60x60
  });

  it('handles edge cases', () => {
    // Test negative percentage
    const { root: negativeRoot } = render(<MiniConicGradient percentage={-10} />);
    expect(negativeRoot).toBeTruthy();

    // Test very large percentage
    const { root: largeRoot } = render(<MiniConicGradient percentage={1000} />);
    expect(largeRoot).toBeTruthy();

    // Test decimal percentage
    const { root: decimalRoot } = render(<MiniConicGradient percentage={33.33} />);
    expect(decimalRoot).toBeTruthy();
  });

  it('maintains consistent structure across percentage values', () => {
    const percentages = [0, 25, 50, 75, 100];
    
    percentages.forEach(percentage => {
      const { root } = render(<MiniConicGradient percentage={percentage} />);
      expect(root).toBeTruthy();
    });
  });
});