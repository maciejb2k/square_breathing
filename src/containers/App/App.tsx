import React from "react";
import WebFont from "webfontloader";

import Home from "containers/Home";

import "styles/main.scss";
import "bootstrap/dist/css/bootstrap-grid.min.css";

WebFont.load({
  google: {
    families: ["Montserrat:400,600,700"],
  },
});

const App: React.FC = () => {
  return (
    <div className="App">
      <Home />
    </div>
  );
};

export default App;
