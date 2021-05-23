import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  FormGroup,
  Label,
  Spinner,
} from "reactstrap";
import { AiOutlineSearch } from "react-icons/ai";

const Header = ({ handleSubmit, query }) => {
  return (
    <>
      <ToastContainer />

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
            <FormGroup style={{ marginRight: 50 }}>
              <Label for="maxResults">Max Results</Label>
              <Input
                type="number"
                id="maxResults"
                placeholder="Max Results"
                value={maxResults}
                onChange={(e) => setMaxResults(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="ml-5">
              <Label for="startIndex">Start Index</Label>
              <Input
                type="number"
                id="startIndex"
                placeholder="Start Index"
                value={startIndex}
                onChange={(e) => setStartIndex(e.target.value)}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
