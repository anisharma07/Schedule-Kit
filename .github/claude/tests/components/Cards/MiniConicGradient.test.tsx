import React from 'react';
import {render} from '@testing-library/react-native';
import MiniConicGradient from '../../../src/components/Cards/MiniConicGradient';

describe('MiniConicGradient', () => {
  it('renders correctly with default props', () => {
    const component = render(<MiniConicGradient percentage={50} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with 0% percentage', () => {
    const component = render(<MiniConicGradient percentage={0} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with 100% percentage', () => {
    const component = render(<MiniConicGradient percentage={100} />);
    expect(component).toMatchSnapshot();
  });

  it('has correct dimensions', () => {
    const {getByTestId} = render(<MiniConicGradient percentage={50} />);
    const gradient = getByTestId('mini-gradient');
    
    expect(gradient.props.style).toEqual(
      expect.objectContaining({
        width: 48,
        height: 48,
        position: 'absolute',
      })
    );
  });

  it('generates correct number of path segments', () => {
    const {root} = render(<MiniConicGradient percentage={50} />);
    const paths = root.findAllByType('Path');
    expect(paths).toHaveLength(100); // 100 segments
  });

  it('handles edge cases gracefully', () => {
    expect(() => render(<MiniConicGradient percentage={-10} />)).not.toThrow();
    expect(() => render(<MiniConicGradient percentage={150} />)).not.toThrow();
  });
});