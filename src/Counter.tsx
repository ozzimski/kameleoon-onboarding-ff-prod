import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {
  useFeatureFlag,
  useInitialize,
  useVisitorCode,
} from "@kameleoon/react-sdk";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const { getVisitorCode } = useVisitorCode();

  const { getVariation, isFeatureFlagActive } = useFeatureFlag();

  const { initialize } = useInitialize();

  useEffect(() => {
    const init = async () => {
      await initialize();
      setIsReady(true);
    };

    init();
  }, [initialize]);

  const isEnabled = useMemo(() => {
    if (!isReady) return;

    const visitorCode = getVisitorCode();

    const isActive = isFeatureFlagActive({
      visitorCode,
      featureKey: "enable_counter",
    });

    if (!isActive) {
      return false;
    }

    console.log("is active", isActive);

    const variation = getVariation({
      visitorCode: visitorCode,
      featureKey: "enable_counter",
      track: false,
    });

    console.log(variation.key);

    return variation.key === "on";
  }, [getVisitorCode, getVariation, isFeatureFlagActive, isReady]);

  if (!isEnabled) {
    return <div>Feature disabled</div>;
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
