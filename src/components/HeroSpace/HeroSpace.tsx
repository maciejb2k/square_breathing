import React, {useEffect, useState, useRef} from "react";
import {gsap} from "gsap";

import styles from "./HeroSpace.module.scss";

type AppProps = {
  openConfigOpen: () => void;
};

const HeroSpace: React.FC<AppProps> = (props: AppProps) => {
  const {openConfigOpen} = props;

  const [isLoading, setIsLoading] = useState(true);

  const timeline = gsap.timeline({paused: true});
  const heroSpaceRef = useRef(null);
  const logoRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      timeline
        .to(heroSpaceRef.current, {
          duration: 1,
          opacity: 1,
          ease: "power2.inOut",
        })
        .to(logoRef.current, {opacity: 1, duration: 0.5}, 0.2)
        .to(buttonRef.current, {opacity: 1, duration: 0.6}, 0.2);

      timeline.play();
    }
  }, [isLoading, timeline]);

  return isLoading ? (
    <div className={styles["SpinnerWrapper"]}>
      <div className={styles["Spinner"]}></div>
    </div>
  ) : (
    <>
      <main
        className={styles["HeroSpace"]}
        ref={heroSpaceRef}
        style={{
          backgroundImage: `url("${process.env.PUBLIC_URL}/images/landscape.svg")`,
        }}
      >
        <section className={styles["HeroSection"]}>
          <img
            className={styles["HeroSection-logo"]}
            src={`${process.env.PUBLIC_URL}/images/Logo.png`}
            alt="logo"
            ref={logoRef}
          />
          <button
            className={styles["HeroSection-button"]}
            ref={buttonRef}
            onClick={openConfigOpen}
          >
            Begin Breathing
          </button>
        </section>
      </main>
    </>
  );
};

export default HeroSpace;
