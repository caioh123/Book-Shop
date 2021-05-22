import React, { useState, useEffect } from "react";

import "../App.css";
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  FormGroup,
  Label,
} from "reactstrap";
import { AiOutlineSearch } from "react-icons/ai";

const Header = () => {
  const [maxResults, setMaxResults] = useState(10);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
  };

  return (
    <div className="main-image d-flex justify-content-center align-items-center flex-column">
      <div className="filter"></div>
      <h1 className="display-2 text-center text-white mb-3 filter-title">
        Riachuelo books
      </h1>
      <div style={{ width: "60%", zIndex: 2 }}>
        <InputGroup size="lg" className="mb-3">
          <Input
            placeholder="Book Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <InputGroupAddon addonType="append">
            <Button
              style={{ height: 50 }}
              color="secondary"
              onClick={handleSubmit}
            >
              <AiOutlineSearch size={20} />
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <div className="d-flex text-white justify-content-center">
          <FormGroup className="d-flex justify-content-center flex-column align-items-center ml-5">
            <Label
              style={{ fontSize: 20 }}
              for="maxResults"
              value={maxResults}
              onChange={(event) => setMaxResults(event.target.value)}
            >
              Max Results
            </Label>
            <Input type="number" id="maxResults" placeholder="Max Results" />
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default Header;
