import React, {useEffect, useState, useRef} from "react";
import {gsap} from "gsap";

import styles from "./HeroSpace.module.scss";

const HeroSpace: React.FC = () => {
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
      <main className={styles["HeroSpace"]} ref={heroSpaceRef}>
        <section className={styles["HeroSection"]}>
          <img
            className={styles["HeroSection-logo"]}
            src="/images/Logo.png"
            alt="logo"
            ref={logoRef}
          />
          <button
            className={styles["HeroSection-button"]}
            ref={buttonRef}
            onClick={() => timeline.reverse()}
          >
            Begin Breathing
          </button>
        </section>
      </main>
    </>
  );
};

export default HeroSpace;
