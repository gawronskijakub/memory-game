import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="Footer">
      <p className="Copyright">
        &copy;{" "}
        <a className="Copyright__Link" href="https://github.com/gawronskijakub">
          Jakub Gawronski
        </a>{" "}
        | with ❤️ and{" "}
        <a className="Copyright__Link" href="https://create-react-app.dev/">
          create-react-app
        </a>{" "}
        | Under the MIT License
      </p>
    </footer>
  );
};

export default Footer;
