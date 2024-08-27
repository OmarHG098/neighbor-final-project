import React, { Component } from "react";

export const Footer = () => (
  <footer className="footer text-light py-1" style={{ position: "absolute", bottom: 0, width: "100vw" }}>
    <div className="container text-center mt-3">
      <p>Neighbors &copy; {new Date().getFullYear()} All rights reserved.</p>
    </div>
  </footer>
);
