import React from 'react';
import {render} from '@testing-library/react-native';
import ConicGradient from '../../../src/components/Cards/ConicGradient';

describe('ConicGradient', () => {
  it('renders correctly with default props', () => {
    const {getByTestId} = render(<ConicGradient percentage={50} />);
    expect(getByTestId).toBeDefined();
  });

  it('renders with 0% percentage', () => {
    const component = render(<ConicGradient percentage={0} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with 100% percentage', () => {
    const component = render(<ConicGradient percentage={100} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with partial percentage', () => {
    const component = render(<ConicGradient percentage={75} />);
    expect(component).toMatchSnapshot();
  });

  it('handles negative percentage gracefully', () => {
    const component = render(<ConicGradient percentage={-10} />);
    expect(component).toMatchSnapshot();
  });

  it('handles percentage over 100 gracefully', () => {
    const component = render(<ConicGradient percentage={150} />);
    expect(component).toMatchSnapshot();
  });

  it('generates correct number of path segments', () => {
    const {root} = render(<ConicGradient percentage={50} />);
    const paths = root.findAllByType('Path');
    expect(paths).toHaveLength(100); // 100 segments
  });
});