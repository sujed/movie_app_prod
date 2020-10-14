import React from 'react';
import { Link } from 'react-router-dom';

const ServerError = ({
  handleClick,
  errorDetails = { text: 'No details.', errorCode: 0 },
}) => {
  return (
    <div className="text-center mt-5">
      <h3 className="text-danger">Something went wrong.</h3>
      <p>{errorDetails.text}</p>
      <h1 className="mt-3">{errorDetails.errorCode}</h1>
      {errorDetails.errorCode === 500 && (
        <div className="mt-3">
          <button onClick={handleClick} className="btn btn-success">
            Reload
          </button>
        </div>
      )}
      {errorDetails.errorCode === 429 && (
        <div className="mt-3">
          <button onClick={handleClick} className="btn btn-success">
            Reload
          </button>
        </div>
      )}
      {errorDetails.errorCode === 404 && (
        <div className="mt-3">
          <Link to="/">
            <button className="btn btn-success">Back to movies</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ServerError;
