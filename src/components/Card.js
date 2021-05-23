import React, { useState } from "react";
import { Spinner } from "reactstrap";

const Card = () => {
  return (
    <div className="d-flex justify-content-center mt-3">
      <Spinner style={{ width: "3rem", height: "3rem" }} />
    </div>
  );
};

export default Card;
