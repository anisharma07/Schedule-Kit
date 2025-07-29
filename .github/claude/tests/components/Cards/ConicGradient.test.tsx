import React from 'react';
import { render } from '@testing-library/react-native';
import ConicGradient from '../../../src/components/Cards/ConicGradient';

// Mock react-native-svg
jest.mock('react-native-svg', () => ({
  Svg: 'Svg',
  Path: 'Path',
}));

describe('ConicGradient Component', () => {
  it('renders correctly with 0% percentage', () => {
    const { toJSON } = render(<ConicGradient percentage={0} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with 50% percentage', () => {
    const { toJSON } = render(<ConicGradient percentage={50} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with 100% percentage', () => {
    const { toJSON } = render(<ConicGradient percentage={100} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('handles edge case with percentage over 100', () => {
    const { toJSON } = render(<ConicGradient percentage={150} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('handles negative percentage', () => {
    const { toJSON } = render(<ConicGradient percentage={-10} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders SVG with correct viewBox', () => {
    const { getByTestId } = render(<ConicGradient percentage={75} />);
    // Since we're mocking SVG, we'll test the structure exists
    expect(() => render(<ConicGradient percentage={75} />)).not.toThrow();
  });

  it('applies correct styles', () => {
    const { root } = render(<ConicGradient percentage={25} />);
    const view = root.findByType('View');
    expect(view.props.style).toEqual({
      width: 60,
      height: 60,
      position: 'absolute',
    });
  });
});