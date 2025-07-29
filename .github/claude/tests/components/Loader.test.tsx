import React from 'react';
import { render } from '@testing-library/react-native';
import Loader from '../../src/components/Loader';

describe('Loader Component', () => {
  it('renders with default props', () => {
    const { root } = render(<Loader />);
    const activityIndicator = root.findByType('ActivityIndicator');
    
    expect(activityIndicator.props.size).toBe('large');
    expect(activityIndicator.props.color).toBe('#007bff');
  });

  it('renders with custom size prop', () => {
    const { root } = render(<Loader size="small" />);
    const activityIndicator = root.findByType('ActivityIndicator');
    
    expect(activityIndicator.props.size).toBe('small');
  });

  it('renders with custom color prop', () => {
    const { root } = render(<Loader color="#FF0000" />);
    const activityIndicator = root.findByType('ActivityIndicator');
    
    expect(activityIndicator.props.color).toBe('#FF0000');
  });

  it('renders with numeric size', () => {
    const { root } = render(<Loader size={40} />);
    const activityIndicator = root.findByType('ActivityIndicator');
    
    expect(activityIndicator.props.size).toBe(40);
  });

  it('applies correct container styles', () => {
    const { root } = render(<Loader />);
    const container = root.findByType('View');
    
    expect(container.props.style).toEqual({
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    });
  });

  it('matches snapshot', () => {
    const { toJSON } = render(<Loader />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot with custom props', () => {
    const { toJSON } = render(<Loader size="small" color="#00FF00" />);
    expect(toJSON()).toMatchSnapshot();
  });
});