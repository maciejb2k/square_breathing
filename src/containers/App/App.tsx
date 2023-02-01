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
  const [triggerRepaint, setTriggerRepaint] = useState(false);
  const [isConfigOpen, setConfig] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [settings, setSettings] = useState<SettingsType>({
    inhaleTime: 5,
    holdInhaleTime: 5,
    exhaleTime: 5,
    holdExhaleTime: 5,
    time: "00:00",
  });

  const appContainer = useRef<HTMLDivElement>(null);

  const timeline = useMemo(
    () =>
      gsap.timeline({
        paused: true,
        reversed: false,
      }),
    [],
  );

  useEffect(() => {
    timeline.to(
      appContainer.current,
      {
        yPercent: -50,
        duration: 1,
        ease: "power3.inOut",
      },
      0,
    );
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

  // I have to use this fucking bullshit rerender method,
  // because Chromium engine is fucking retarded and persits
  // translateY inline style after refreshing, or persists that
  // state of gsap timeline. Everything works in Firefox but
  // this is just something very strange.
  // There is somewhere a bug, but I'm kinda sure that it's not
  // related to app but to Chromium.
  // I don't fucking care about that app anymore, so i'm putting
  // this ugly force redreaw.
  useEffect(() => {
    setTimeout(() => {
      setTriggerRepaint(true);
    }, 250);
  }, []);

  return (
    <div ref={appContainer} className={styles["App"]}>
      { triggerRepaint && (
        <>
          <SetupBreath
            isConfigOpen={isConfigOpen}
            closeConfigOpen={closeConfigOpen}
            startBreathing={startBreathing}
            setBreathingSettings={setBreathingSettings}
          />
          <HeroSpace openConfigOpen={openConfigOpen} />
          <BreathSpace
            isStarted={isStarted}
            settings={settings}
            stopBreathing={stopBreathing}
          />
        </>
      )}
    </div>
  );
};

export default App;
