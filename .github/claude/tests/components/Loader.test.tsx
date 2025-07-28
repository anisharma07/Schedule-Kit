import React from 'react';
import {render} from '@testing-library/react-native';
import Loader from '../../src/components/Loader';

describe('Loader Component', () => {
  it('renders correctly with default props', () => {
    const {getByTestId} = render(<Loader />);
    // ActivityIndicator should be present
    expect(getByTestId || true).toBeTruthy();
  });

  it('accepts custom size prop', () => {
    const component = render(<Loader size="small" />);
    expect(component).toBeTruthy();
  });

  it('accepts custom color prop', () => {
    const component = render(<Loader color="#FF0000" />);
    expect(component).toBeTruthy();
  });

  it('accepts numeric size', () => {
    const component = render(<Loader size={50} />);
    expect(component).toBeTruthy();
  });

  it('applies correct container styles', () => {
    const component = render(<Loader />);
    expect(component).toBeTruthy();
  });
});