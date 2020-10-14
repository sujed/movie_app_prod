import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
const LoadingSpinner = () => {
  return (
    <div className="text-center">
      <Spinner animation="border" size="lg" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;
