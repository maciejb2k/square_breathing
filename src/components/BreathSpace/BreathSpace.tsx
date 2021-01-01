import React, {useEffect, useMemo, useRef, useState} from "react";
import {gsap} from "gsap";
import classNames from "classnames";
import {FiX} from "react-icons/fi";
import Countdown from "react-countdown";

import styles from "./BreathSpace.module.scss";

import {timeToSeconds} from "utils/breathUtils";
import {SettingsType} from "utils/types";

type AppProps = {
  isStarted: boolean;
  settings: SettingsType;
  stopBreathing: () => void;
};

const BreathSpace: React.FC<AppProps> = (props: AppProps) => {
  const {isStarted, settings, stopBreathing} = props;
  const [duration, setDuration] = useState(0);

  const boxTimeline = useMemo(
    () =>
      gsap.timeline({
        paused: true,
        repeat: -1,
      }),
    [],
  );

  const container = useRef(null);
  const barTop = useRef(null);
  const barRight = useRef(null);
  const barBottom = useRef(null);
  const barLeft = useRef(null);
  const indicatorTop = useRef(null);
  const indicatorRight = useRef(null);
  const indicatorBottom = useRef(null);
  const indicatorLeft = useRef(null);
  const refInhale = useRef(null);
  const refHoldInhale = useRef(null);
  const refExhale = useRef(null);
  const refHoldExhale = useRef(null);
  const refTime = useRef(null);

  const exitBreathing = () => {
    gsap.to(container.current, {
      opacity: 0,
      duration: 1,
    });
    gsap.to(refTime.current, {
      opacity: 0,
      duration: 1,
    });

    boxTimeline.pause(0);
    boxTimeline.clear();
    boxTimeline.restart();

    setDuration(0);
    stopBreathing();
  };

  const countdownRenderer = ({minutes, seconds, completed}: any) => {
    if (completed) {
      return <span>Done</span>;
    } else {
      return (
        <span>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      );
    }
  };

  useEffect(() => {
    if (
      isStarted &&
      !(Object.keys(settings).length === 0 && settings.constructor === Object)
    ) {
      const inhaleSeconds = settings.inhaleTime;
      const inhaleHoldSeconds = settings.inhaleTime + settings.holdInhaleTime;
      const inhaleHoldExhaleSeconds =
        settings.inhaleTime + settings.holdInhaleTime + settings.exhaleTime;
      const inhaleHoldExhaleHoldSeconds =
        settings.inhaleTime +
        settings.holdInhaleTime +
        settings.exhaleTime +
        settings.holdExhaleTime;

      const miliseconds = timeToSeconds(settings.time) * 1000 + 500;
      setDuration(miliseconds);

      boxTimeline.restart();
      boxTimeline
        // Clear Props because gsap sucks dick
        .to(barBottom.current, {clearProps: "all", duration: 0}, 0)
        .to(barLeft.current, {clearProps: "all", duration: 0}, 0)

        // Inhale
        .to(refInhale.current, {opacity: 1, duration: 0.3}, 0)
        .to(indicatorTop.current, {opacity: 1, duration: 0.3}, 0)
        .to(
          barTop.current,
          {
            width: "calc(100% - 30px)",
            duration: settings.inhaleTime,
            ease: "none",
          },
          0,
        )

        // Hold Inhale
        .to(refInhale.current, {opacity: 0, duration: 0.3}, inhaleSeconds)
        .to(
          refHoldInhale.current,
          {opacity: 1, duration: 0.3},
          inhaleSeconds + 0.3,
        )
        .to(
          indicatorRight.current,
          {opacity: 1, duration: 0.3},
          inhaleSeconds - 0.1,
        )
        .to(
          barRight.current,
          {
            height: "calc(100% - 30px)",
            duration: settings.holdInhaleTime,
            ease: "none",
          },
          inhaleSeconds,
        )

        // Exhale
        .to(
          refHoldInhale.current,
          {opacity: 0, duration: 0.3},
          inhaleHoldSeconds,
        )
        .to(
          refExhale.current,
          {opacity: 1, duration: 0.3},
          inhaleHoldSeconds + 0.3,
        )
        .to(
          indicatorBottom.current,
          {opacity: 1, duration: 0.3},
          inhaleHoldSeconds - 0.1,
        )
        .to(
          barBottom.current,
          {
            width: "calc(100% - 30px)",
            duration: settings.exhaleTime,
            ease: "none",
          },
          inhaleHoldSeconds,
        )

        // Hold Exhale
        .to(
          refExhale.current,
          {opacity: 0, duration: 0.3},
          inhaleHoldExhaleSeconds,
        )
        .to(
          refHoldExhale.current,
          {opacity: 1, duration: 0.3},
          inhaleHoldExhaleSeconds + 0.3,
        )
        .to(
          indicatorLeft.current,
          {opacity: 1, duration: 0.3},
          inhaleHoldExhaleSeconds - 0.1,
        )
        .to(
          barLeft.current,
          {
            height: "calc(100% - 30px)",
            duration: settings.holdExhaleTime,
            ease: "none",
          },
          inhaleHoldExhaleSeconds,
        )

        // Revert all bars
        .to(
          barTop.current,
          {
            right: 0,
            left: "inherit",
            width: 0,
            opacity: 0,
            ease: "power1.out",
            duration: 0.2,
          },
          inhaleHoldExhaleHoldSeconds - 0.6,
        )
        .to(
          barRight.current,
          {
            bottom: 0,
            top: "inherit",
            height: 0,
            ease: "power1.out",
            duration: 0.25,
          },
          inhaleHoldExhaleHoldSeconds - 0.4,
        )
        .to(
          barBottom.current,
          {
            left: 0,
            right: "inherit",
            width: 0,
            ease: "power1.out",
            duration: 0.2,
          },
          inhaleHoldExhaleHoldSeconds - 0.2,
        )
        .to(
          barLeft.current,
          {
            top: 0,
            bottom: "inherit",
            height: 0,
            ease: "power1.out",
            opacity: 0,
            duration: 0.2,
          },
          inhaleHoldExhaleHoldSeconds,
        )

        // Revert last text box
        .to(
          refHoldExhale.current,
          {opacity: 0, duration: 0.3},
          inhaleHoldExhaleHoldSeconds,
        )

        // Revert indicators
        .to(
          indicatorTop.current,
          {opacity: 0, duration: 0.2},
          inhaleHoldExhaleHoldSeconds - 0.6,
        )
        .to(
          indicatorRight.current,
          {opacity: 0, duration: 0.2},
          inhaleHoldExhaleHoldSeconds - 0.4,
        )
        .to(
          indicatorBottom.current,
          {opacity: 0, duration: 0.2},
          inhaleHoldExhaleHoldSeconds - 0.2,
        )
        .to(
          indicatorLeft.current,
          {opacity: 0, duration: 0.2},
          inhaleHoldExhaleHoldSeconds,
        );

      gsap.to(container.current, {opacity: 1, duration: 0.5, delay: 0.5});
      gsap.to(refTime.current, {opacity: 1, duration: 0.5, delay: 0.5});
      boxTimeline.play();
    }
  }, [isStarted, boxTimeline, settings]);

  return (
    <div className={styles["BreathSpace"]}>
      <div
        ref={container}
        className={classNames("", styles["BreathSpace-container"])}
      >
        <header className={styles["BreathSpace-header"]}>
          <button
            className={styles["BreathSpace-close"]}
            onClick={exitBreathing}
          >
            <FiX />
          </button>
        </header>

        <div className={styles["BreathInfo"]}>
          <div ref={refInhale} className={styles["BreathText"]}>
            <h3 className={styles["BreathText-phase"]}>Inhale</h3>
            <div
              className={classNames(
                styles["BreathText-line"],
                styles["BreathText-line--inhale"],
              )}
            ></div>
            <p className={styles["BreathText-tips"]}>
              Direct your breath to lower ribs, expand your chest 360°, keep
              belly tight.
            </p>
          </div>
          <div ref={refHoldInhale} className={styles["BreathText"]}>
            <h3 className={styles["BreathText-phase"]}>Hold</h3>
            <div
              className={classNames(
                styles["BreathText-line"],
                styles["BreathText-line--holdInhale"],
              )}
            ></div>
            <p className={styles["BreathText-tips"]}>
              Relax muscles of your neck and shoulders.
            </p>
          </div>
          <div ref={refExhale} className={styles["BreathText"]}>
            <h3 className={styles["BreathText-phase"]}>Exhale</h3>
            <div
              className={classNames(
                styles["BreathText-line"],
                styles["BreathText-line--exhale"],
              )}
            ></div>
            <p className={styles["BreathText-tips"]}>
              Should be calm and done using your nose.
            </p>
          </div>
          <div ref={refHoldExhale} className={styles["BreathText"]}>
            <h3 className={styles["BreathText-phase"]}>Hold</h3>
            <div
              className={classNames(
                styles["BreathText-line"],
                styles["BreathText-line--holdExhale"],
              )}
            ></div>
            <p ref={refTime} className={styles["BreathText-tips"]}>
              Try to experience every part of your body.
            </p>
          </div>
        </div>
        <div className={styles["BreathVisuals"]}>
          <div className={styles["BreathBox"]}>
            <div>
              <div
                className={classNames(
                  styles["BreathBox-bar"],
                  styles["BreathBox-barTop"],
                  styles["BreathBox-bar--inactive"],
                )}
              ></div>
              <div
                ref={barTop}
                className={classNames(
                  styles["BreathBox-bar"],
                  styles["BreathBox-barTop"],
                  styles["BreathBox-barTop--active"],
                )}
              ></div>
            </div>
            <div>
              <div
                className={classNames(
                  styles["BreathBox-bar"],
                  styles["BreathBox-barRight"],
                  styles["BreathBox-bar--inactive"],
                )}
              ></div>
              <div
                ref={barRight}
                className={classNames(
                  styles["BreathBox-bar"],
                  styles["BreathBox-barRight"],
                  styles["BreathBox-barRight--active"],
                )}
              ></div>
            </div>
            <div>
              <div
                className={classNames(
                  styles["BreathBox-bar"],
                  styles["BreathBox-barBottom"],
                  styles["BreathBox-bar--inactive"],
                )}
              ></div>
              <div
                ref={barBottom}
                className={classNames(
                  styles["BreathBox-bar"],
                  styles["BreathBox-barBottom"],
                  styles["BreathBox-barBottom--active"],
                )}
              ></div>
            </div>
            <div>
              <div
                className={classNames(
                  styles["BreathBox-bar"],
                  styles["BreathBox-barLeft"],
                  styles["BreathBox-bar--inactive"],
                )}
              ></div>
              <div
                ref={barLeft}
                className={classNames(
                  styles["BreathBox-bar"],
                  styles["BreathBox-barLeft"],
                  styles["BreathBox-barLeft--active"],
                )}
              ></div>
            </div>
            <p ref={refTime} className={styles["BreathBox-timeLeft"]}>
              {duration > 0 ? (
                <Countdown
                  date={Date.now() + duration}
                  renderer={countdownRenderer}
                />
              ) : null}
            </p>
          </div>
          <div className={styles["BreathIndicators"]}>
            <div className={styles["BreathIndicators-group"]}>
              <span
                className={classNames(
                  styles["BreathIndicators-item"],
                  styles["BreathIndicators-item--inactive"],
                )}
              ></span>
              <span
                ref={indicatorTop}
                className={classNames(
                  styles["BreathIndicators-item"],
                  styles["BreathIndicators-itemTop"],
                  styles["BreathIndicators-itemTop--active"],
                )}
              ></span>
            </div>
            <div className={styles["BreathIndicators-group"]}>
              <span
                className={classNames(
                  styles["BreathIndicators-item"],
                  styles["BreathIndicators-item--inactive"],
                )}
              ></span>
              <span
                ref={indicatorRight}
                className={classNames(
                  styles["BreathIndicators-item"],
                  styles["BreathIndicators-itemRight"],
                  styles["BreathIndicators-itemRight--active"],
                )}
              ></span>
            </div>
            <div className={styles["BreathIndicators-group"]}>
              <span
                className={classNames(
                  styles["BreathIndicators-item"],
                  styles["BreathIndicators-item--inactive"],
                )}
              ></span>
              <span
                ref={indicatorBottom}
                className={classNames(
                  styles["BreathIndicators-item"],
                  styles["BreathIndicators-itemBottom"],
                  styles["BreathIndicators-itemBottom--active"],
                )}
              ></span>
            </div>
            <div className={styles["BreathIndicators-group"]}>
              <span
                className={classNames(
                  styles["BreathIndicators-item"],
                  styles["BreathIndicators-item--inactive"],
                )}
              ></span>
              <span
                ref={indicatorLeft}
                className={classNames(
                  styles["BreathIndicators-item"],
                  styles["BreathIndicators-itemLeft"],
                  styles["BreathIndicators-itemLeft--active"],
                )}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathSpace;
