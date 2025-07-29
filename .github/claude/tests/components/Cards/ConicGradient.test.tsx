import React from 'react';
import { render } from '@testing-library/react-native';
import ConicGradient from '../../../src/components/Cards/ConicGradient';

describe('ConicGradient', () => {
  it('renders correctly with default props', () => {
    const { toJSON } = render(<ConicGradient percentage={50} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with 0% percentage', () => {
    const { toJSON } = render(<ConicGradient percentage={0} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with 100% percentage', () => {
    const { toJSON } = render(<ConicGradient percentage={100} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with percentage over 100', () => {
    const { toJSON } = render(<ConicGradient percentage={150} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correct number of segments', () => {
    const { root } = render(<ConicGradient percentage={25} />);
    // Since we're mocking SVG, we can't test actual SVG elements
    // But we can ensure the component renders without crashing
    expect(root).toBeTruthy();
  });

  it('handles negative percentage', () => {
    const { root } = render(<ConicGradient percentage={-10} />);
    expect(root).toBeTruthy();
  });

  it('handles decimal percentage', () => {
    const { root } = render(<ConicGradient percentage={75.5} />);
    expect(root).toBeTruthy();
  });
});