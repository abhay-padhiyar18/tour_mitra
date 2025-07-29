import React from 'react';

import './LoadingSpinner.css'; // Ensure you have the correct CSS for the spinner

const LoadingSpinner = props => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
