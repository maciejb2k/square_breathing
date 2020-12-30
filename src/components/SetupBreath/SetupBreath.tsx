import React, {useEffect, useRef, useMemo} from "react";
import {gsap} from "gsap";
import classNames from "classnames";
import {useFormik} from "formik";

import {FiX} from "react-icons/fi";

import styles from "./SetupBreath.module.scss";

type AppProps = {
  isConfigOpen: boolean;
  closeConfigOpen: () => void;
};

const SetupBreath: React.FC<AppProps> = (props: AppProps) => {
  const {isConfigOpen, closeConfigOpen} = props;

  const formik = useFormik({
    initialValues: {
      inhaleTime: 5,
      holdInhaleTime: 5,
      exhaleTime: 5,
      holdExhaleTime: 5,
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const timeline = useMemo(
    () => gsap.timeline({paused: true, reversed: false}),
    [],
  );

  const setupContainer = useRef(null);
  const form = useRef(null);

  useEffect(() => {
    timeline
      .to(setupContainer.current, {display: "block", duration: 0})
      .to(setupContainer.current, {
        opacity: 1,
        height: "100vh",
        duration: 0.7,
        backdropFilter: "blur(15px)",
        ease: "power2.inOut",
      })
      .to(
        form.current,
        {
          opacity: 1,
          ease: "power2.inOut",
          duration: 0.7,
        },
        0,
      );
  }, [timeline, setupContainer, form]);

  useEffect(() => {
    isConfigOpen ? timeline.play() : timeline.reverse();
  }, [timeline, isConfigOpen]);

  return (
    <div className={styles["Setup"]} ref={setupContainer}>
      <button className={styles["Setup-close"]} onClick={closeConfigOpen}>
        <FiX />
      </button>
      <form
        ref={form}
        onSubmit={formik.handleSubmit}
        className={classNames("container", styles["Setup-container"])}
      >
        <div className={styles["Setup-left"]}>
          <h2 className={styles["Setup-title"]}>Setup Details</h2>
          <p className={styles["Setup-desc"]}>
            Choose preset from given options or adjust parameters of breathing
            to yourself.
          </p>
          <button className={styles["SetupForm-submit"]} type="submit">
            Start
          </button>
        </div>
        <div className={styles["Setup-right"]}>
          <div className={styles["SetupForm"]}>
            <div
              className={classNames(
                styles["SetupFormGroup"],
                styles["SetupFormGroup--inhale"],
              )}
            >
              <header className={styles["SetupFormGroup-header"]}>
                <label className={styles["SetupFormGroup-label"]}>
                  <span className={styles["SetupFormGroup-label--em"]}>
                    Inhale
                  </span>{" "}
                  Time
                </label>
              </header>
              <div className={styles["SetupFormGroup-content"]}>
                <input
                  id="inhaleTime"
                  className={styles["SetupFormGroup-input"]}
                  name="inhaleTime"
                  type="range"
                  min="1"
                  max="30"
                  onChange={formik.handleChange}
                  value={formik.values.inhaleTime}
                />
                <p className={styles["SetupFormGroup-value"]}>
                  <span className={styles["SetupFormGroup-seconds"]}>
                    {formik.values.inhaleTime}
                  </span>
                  s
                </p>
              </div>
            </div>
            <div
              className={classNames(
                styles["SetupFormGroup"],
                styles["SetupFormGroup--holdInhale"],
              )}
            >
              <header className={styles["SetupFormGroup-header"]}>
                <label className={styles["SetupFormGroup-label"]}>
                  Hold Inhale Time
                </label>
              </header>
              <div className={styles["SetupFormGroup-content"]}>
                <input
                  id="holdInhaleTime"
                  className={styles["SetupFormGroup-input"]}
                  name="holdInhaleTime"
                  type="range"
                  min="1"
                  max="30"
                  onChange={formik.handleChange}
                  value={formik.values.holdInhaleTime}
                />
                <p className={styles["SetupFormGroup-value"]}>
                  <span className={styles["SetupFormGroup-seconds"]}>
                    {formik.values.holdInhaleTime}
                  </span>
                  s
                </p>
              </div>
            </div>
            <div
              className={classNames(
                styles["SetupFormGroup"],
                styles["SetupFormGroup--exhale"],
              )}
            >
              <header className={styles["SetupFormGroup-header"]}>
                <label className={styles["SetupFormGroup-label"]}>
                  Exhale Time
                </label>
              </header>
              <div className={styles["SetupFormGroup-content"]}>
                <input
                  id="exhaleTime"
                  className={styles["SetupFormGroup-input"]}
                  name="exhaleTime"
                  type="range"
                  min="1"
                  max="30"
                  onChange={formik.handleChange}
                  value={formik.values.exhaleTime}
                />
                <p className={styles["SetupFormGroup-value"]}>
                  <span className={styles["SetupFormGroup-seconds"]}>
                    {formik.values.exhaleTime}
                  </span>
                  s
                </p>
              </div>
            </div>
            <div
              className={classNames(
                styles["SetupFormGroup"],
                styles["SetupFormGroup--holdExhale"],
              )}
            >
              <header className={styles["SetupFormGroup-header"]}>
                <label className={styles["SetupFormGroup-label"]}>
                  Hold Exhale Time
                </label>
              </header>
              <div className={styles["SetupFormGroup-content"]}>
                <input
                  id="holdExhaleTime"
                  className={styles["SetupFormGroup-input"]}
                  name="holdExhaleTime"
                  type="range"
                  min="1"
                  max="30"
                  onChange={formik.handleChange}
                  value={formik.values.holdExhaleTime}
                />
                <p className={styles["SetupFormGroup-value"]}>
                  <span className={styles["SetupFormGroup-seconds"]}>
                    {formik.values.holdExhaleTime}
                  </span>
                  s
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SetupBreath;
