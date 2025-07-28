import React from 'react';
import {render} from '@testing-library/react-native';
import Loader from '../../src/components/Loader';

describe('Loader', () => {
  it('renders correctly with default props', () => {
    const {getByTestId} = render(<Loader />);
    const loader = getByTestId('activity-indicator');
    
    expect(loader).toBeTruthy();
    expect(loader.props.size).toBe('large');
    expect(loader.props.color).toBe('#007bff');
  });

  it('renders with custom size', () => {
    const {getByTestId} = render(<Loader size="small" />);
    const loader = getByTestId('activity-indicator');
    
    expect(loader.props.size).toBe('small');
  });

  it('renders with custom color', () => {
    const {getByTestId} = render(<Loader color="#ff0000" />);
    const loader = getByTestId('activity-indicator');
    
    expect(loader.props.color).toBe('#ff0000');
  });

  it('renders with numeric size', () => {
    const {getByTestId} = render(<Loader size={50} />);
    const loader = getByTestId('activity-indicator');
    
    expect(loader.props.size).toBe(50);
  });

  it('has correct container styling', () => {
    const {getByTestId} = render(<Loader />);
    const container = getByTestId('loader-container');
    
    expect(container.props.style).toEqual(
      expect.objectContaining({
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      })
    );
  });
});