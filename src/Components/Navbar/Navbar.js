import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./../Home/Home";
import WorkSheet from "./../workSheet/WorkSheet";
import styled from "styled-components";

const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: #7dc5f1;
  padding: 20px;
`;
const StyledLink = styled(Link)`
  color: Black;
  font-weight: bold;
  text-decoration: none;
`;

const Navbar = () => {
  return (
    <div>
      <Nav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/WorkSheet">WorkSheet</StyledLink>
      </Nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/WorkSheet" element={<WorkSheet />} />
      </Routes>
    </div>
  );
};

export default Navbar;
