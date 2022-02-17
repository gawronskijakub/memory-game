import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="Footer">
      <p className="Copyright">
        <a className="Copyright__Link" href="https://github.com/gawronskijakub">
          Jakub Gawronski
        </a>
        <span className="Copyright__Text"> | 2022</span>
      </p>
    </footer>
  );
};

export default Footer;
