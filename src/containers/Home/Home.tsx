import React, {useEffect, useState, useRef, useMemo} from "react";
import {gsap} from "gsap";

import styles from "./Home.module.scss";

const Home: React.FC = () => {
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
          backgroundPosition: "50% -50px",
          duration: 1,
          opacity: 1,
          ease: "power1.inOut",
        })
        .to(logoRef.current, {opacity: 1, duration: 0.5}, 0.2)
        .to(buttonRef.current, {opacity: 1, duration: 0.5}, 0.2);

      timeline.play();
    }
  }, [isLoading, timeline]);

  return isLoading ? (
    <div className={styles["SpinnerWrapper"]}>
      <div className={styles["spinner"]}>
        <div className={styles["double-bounce1"]}></div>
        <div className={styles["double-bounce2"]}></div>
      </div>
    </div>
  ) : (
    <main className={styles["HeroSpace"]} ref={heroSpaceRef}>
      <section className={styles["HeroSection"]}>
        <img
          className={styles["HeroSection-logo"]}
          src="/images/Logo.png"
          alt="logo"
          ref={logoRef}
        />
        <button className={styles["HeroSection-button"]} ref={buttonRef}>
          Begin Breathing
        </button>
      </section>
    </main>
  );
};

export default Home;
