import React, {useEffect, useRef, useMemo} from "react";
import {gsap} from "gsap";
import classNames from "classnames";
import {useFormik} from "formik";
import MaskedInput from "react-text-mask";

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
      time: "05:00",
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
        <h2 className={styles["Setup-title"]}>Setup Details</h2>
        <p className={styles["Setup-desc"]}>Adjust parameters</p>
        <div className={styles["SetupForm"]}>
          <div
            className={classNames(
              styles["SetupFormGroup"],
              styles["SetupFormGroup--inhale"],
            )}
          >
            <header className={styles["SetupFormGroup-header"]}>
              <label className={styles["SetupFormGroup-label"]}>
                Inhale Time
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
              <div className={styles["SetupFormGroup-number"]}>
                <input
                  type="number"
                  min="1"
                  max="30"
                  className={styles["SetupFormGroup-value"]}
                  id="inhaleTime"
                  name="inhaleTime"
                  onChange={formik.handleChange}
                  value={formik.values.inhaleTime}
                />
                <span className={styles["SetupFormGroup-letter"]}>s</span>
              </div>
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
              <div className={styles["SetupFormGroup-number"]}>
                <input
                  type="number"
                  min="1"
                  max="30"
                  className={styles["SetupFormGroup-value"]}
                  id="holdInhaleTime"
                  name="holdInhaleTime"
                  onChange={formik.handleChange}
                  value={formik.values.holdInhaleTime}
                />
                <span className={styles["SetupFormGroup-letter"]}>s</span>
              </div>
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
              <div className={styles["SetupFormGroup-number"]}>
                <input
                  type="number"
                  min="1"
                  max="30"
                  className={styles["SetupFormGroup-value"]}
                  id="exhaleTime"
                  name="exhaleTime"
                  onChange={formik.handleChange}
                  value={formik.values.exhaleTime}
                />
                <span className={styles["SetupFormGroup-letter"]}>s</span>
              </div>
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
              <div className={styles["SetupFormGroup-number"]}>
                <input
                  type="number"
                  min="1"
                  max="30"
                  className={styles["SetupFormGroup-value"]}
                  id="holdExhaleTime"
                  name="holdExhaleTime"
                  onChange={formik.handleChange}
                  value={formik.values.holdExhaleTime}
                />
                <span className={styles["SetupFormGroup-letter"]}>s</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["SetupTime"]}>
          <label htmlFor="time" className={styles["SetupTime-label"]}>
            Time
          </label>
          {/* <input
            id="time"
            name="time"
            className={styles["SetupTime-input"]}
            value={formik.values.time}
            onChange={formik.handleChange}
            type="text"
          /> */}
          <MaskedInput
            id="time"
            name="time"
            className={styles["SetupTime-input"]}
            value={formik.values.time}
            onChange={formik.handleChange}
            type="text"
            mask={[/[0-5]/, /[0-9]/, ":", /[0-5]/, /[0-9]/]}
          />
        </div>
        {/* <div className={styles["SetupOverview"]}>
          <div className={styles["SetupSummary"]}>
            <div
              className={classNames(
                styles["SetupSummary-item"],
                styles["SetupSummary-item--inhale"],
              )}
            >
              <p className={styles["SetupSummary-value"]}>
                <span className={styles["SetupSummary-sec"]}>
                  {formik.values.inhaleTime}
                </span>
                s
              </p>
              <p className={styles["SetupSummary-label"]}>Inhale</p>
            </div>
            <div
              className={classNames(
                styles["SetupSummary-item"],
                styles["SetupSummary-item--holdInhale"],
              )}
            >
              <p className={styles["SetupSummary-value"]}>
                <span className={styles["SetupSummary-sec"]}>
                  {formik.values.holdInhaleTime}
                </span>
                s
              </p>
              <p className={styles["SetupSummary-label"]}>Hold</p>
            </div>
            <div
              className={classNames(
                styles["SetupSummary-item"],
                styles["SetupSummary-item--exhale"],
              )}
            >
              <p className={styles["SetupSummary-value"]}>
                <span className={styles["SetupSummary-sec"]}>
                  {formik.values.exhaleTime}
                </span>
                s
              </p>
              <p className={styles["SetupSummary-label"]}>Exhale</p>
            </div>
            <div
              className={classNames(
                styles["SetupSummary-item"],
                styles["SetupSummary-item--holdExhale"],
              )}
            >
              <p className={styles["SetupSummary-value"]}>
                <span className={styles["SetupSummary-sec"]}>
                  {formik.values.holdExhaleTime}
                </span>
                s
              </p>
              <p className={styles["SetupSummary-label"]}>Hold</p>
            </div>
          </div>
        </div> */}
        <button className={styles["SetupForm-submit"]} type="submit">
          Start
        </button>
      </form>
    </div>
  );
};

export default SetupBreath;
