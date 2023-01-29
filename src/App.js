import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
}
