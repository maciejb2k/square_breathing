import React, {useEffect, useState} from "react";
import {gsap} from "gsap";

import styles from "./Home.module.scss";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const timeline = gsap.timeline({
      paused: true,
    });
  }, []);

  return (
    <main className={styles["HeroSpace"]}>
      <section className={styles["HeroSection"]}>
        <img
          className={styles["HeroSection-logo"]}
          src="/images/Logo.png"
          alt="logo"
        />
        <button className={styles["HeroSection-button"]}>
          Begin Breathing
        </button>
      </section>
    </main>
  );
};

export default Home;
