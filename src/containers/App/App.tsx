import React, {useState, useEffect, useRef, useMemo} from "react";
import WebFont from "webfontloader";
import {gsap} from "gsap";

import HeroSpace from "components/HeroSpace";
import BreathSpace from "components/BreathSpace";
import SetupBreath from "components/SetupBreath";

import "styles/main.scss";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import styles from "./App.module.scss";

import {SettingsType, Settings} from "utils/types";

WebFont.load({
  google: {
    families: ["Montserrat:400,600,700"],
  },
});

const App: React.FC = () => {
  const [isConfigOpen, setConfig] = useState(false);
  const [isStarted, setIsStarted] = useState(true);
  const [settings, setSettings] = useState<SettingsType>({
    inhaleTime: 5,
    holdInhaleTime: 5,
    exhaleTime: 5,
    holdExhaleTime: 5,
    time: "05:00",
  });

  const appContainer = useRef(null);
  const timeline = useMemo(
    () =>
      gsap.timeline({
        paused: true,
        reversed: false,
      }),
    [],
  );

  useEffect(() => {
    // timeline.to(appContainer.current, {
    //   translateY: "-100vh",
    //   duration: 1,
    //   ease: "power3.inOut",
    // });
  }, [timeline]);

  useEffect(() => {
    isStarted && !isConfigOpen ? timeline.play() : timeline.reverse();
  }, [isStarted, isConfigOpen, timeline]);

  const setBreathingSettings = (settings: Settings) => {
    setSettings(settings);
  };

  const startBreathing = () => {
    setIsStarted(true);
  };

  const stopBreathing = () => {
    setIsStarted(false);
    setSettings({});
  };

  const openConfigOpen = () => {
    setConfig(true);
  };

  const closeConfigOpen = () => {
    setConfig(false);
  };

  return (
    <div
      ref={appContainer}
      style={{transform: "translateY(-100vh)"}}
      className={styles["App"]}
    >
      <HeroSpace openConfigOpen={openConfigOpen} />
      <BreathSpace
        isStarted={isStarted}
        settings={settings}
        stopBreathing={stopBreathing}
      />
      <SetupBreath
        isConfigOpen={isConfigOpen}
        closeConfigOpen={closeConfigOpen}
        startBreathing={startBreathing}
        setBreathingSettings={setBreathingSettings}
      />
    </div>
  );
};

export default App;
