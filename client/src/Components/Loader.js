import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <div className="loader_main">
      <div className="loader">
        <Spinner animation="border" variant="primary" />
      </div>
    </div>
  );
};

export default Loader;
