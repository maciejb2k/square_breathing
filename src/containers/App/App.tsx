import React, {useState} from "react";
import WebFont from "webfontloader";

import HeroSpace from "components/HeroSpace";
import BreathSpace from "components/BreathSpace";
import SetupBreath from "components/SetupBreath";

import "styles/main.scss";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import styles from "./App.module.scss";

WebFont.load({
  google: {
    families: ["Montserrat:400,600,700"],
  },
});

const App: React.FC = () => {
  const [isConfigOpen, setConfig] = useState(false);

  const openConfigOpen = () => {
    setConfig(true);
  };

  const closeConfigOpen = () => {
    setConfig(false);
  };

  return (
    <div className={styles["App"]}>
      <HeroSpace openConfigOpen={openConfigOpen} />
      <BreathSpace />
      <SetupBreath
        isConfigOpen={isConfigOpen}
        closeConfigOpen={closeConfigOpen}
      />
    </div>
  );
};

export default App;
