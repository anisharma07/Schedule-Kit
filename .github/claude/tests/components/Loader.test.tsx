import React from 'react';
import { render } from '@testing-library/react-native';
import Loader from '../../src/components/Loader';

describe('Loader', () => {
  it('renders correctly with default props', () => {
    const { toJSON } = render(<Loader />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with custom size', () => {
    const { toJSON } = render(<Loader size="small" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with custom color', () => {
    const { toJSON } = render(<Loader color="#FF0000" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with both custom size and color', () => {
    const { toJSON } = render(<Loader size={50} color="#00FF00" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with large size', () => {
    const { toJSON } = render(<Loader size="large" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with numeric size', () => {
    const { toJSON } = render(<Loader size={30} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('applies correct container styles', () => {
    const { getByTestId } = render(<Loader />);
    const container = getByTestId('loader-container');
    
    expect(container.props.style).toMatchObject({
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    });
  });

  it('passes props correctly to ActivityIndicator', () => {
    const { getByTestId } = render(<Loader size="small" color="#BLUE" />);
    const activityIndicator = getByTestId('activity-indicator');
    
    expect(activityIndicator.props.size).toBe('small');
    expect(activityIndicator.props.color).toBe('#BLUE');
  });
});