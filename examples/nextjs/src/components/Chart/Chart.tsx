"use client";

import {
  AreaChart,
  XAxis,
  YAxis,
  Area,
  useYAxisScale,
  useChartHeight,
  Tooltip,
} from "recharts";
import { data } from "./chart.data";
import styles from "./Chart.module.css";
import { useScriptsContext } from "../ScriptsProvider/ScriptsProvider";
import { useBigdataWidgetManager } from "../Widgets/BigdataWidgetManagerProvider";
import { useEffect, useRef } from "react";

const Gradient = () => {
  const scale = useYAxisScale();
  const height = useChartHeight();
  const scaledZero = scale?.(0);
  if (scaledZero == null || height == null) {
    return null;
  }
  const ratio = scaledZero / height;
  return (
    <defs>
      <linearGradient
        id="gradient"
        x1="0"
        x2="0"
        y1="0"
        y2={height}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="var(--primary)" stopOpacity={1} />
        <stop
          offset={`${ratio}`}
          stopColor="var(--primary)"
          stopOpacity={0.1}
        />
        <stop offset={`${ratio}`} stopColor="transparent" stopOpacity={0.1} />
      </linearGradient>
    </defs>
  );
};

function Chart() {
  const { BigdataAgentModule } = useScriptsContext();
  const manager = useBigdataWidgetManager();
  const chartInstance = useRef<BigdataAgent.BigdataWidget>(null);

  useEffect(() => {
    if (BigdataAgentModule) {
      chartInstance.current = new BigdataAgentModule.BigdataWidget(
        "chart",
        manager ?? undefined,
      );
    }

    return () => {
      chartInstance.current?.destroy();
    };
  }, [BigdataAgentModule, manager]);

  if (BigdataAgentModule === null) {
    return <div>loading</div>;
  }

  return (
    <div className={styles["chart-container"]}>
      <h3>Median RAM prices</h3>
      <AreaChart
        style={{
          width: "100%",
          aspectRatio: 1.618,
          maxWidth: 800,
          margin: "auto",
        }}
        responsive
        data={data}
        onClick={(mouseEventData) => {
          const index = Number(mouseEventData.activeIndex);
          if (!isNaN(index) && chartInstance.current) {
            const datapoint = data[index];

            chartInstance.current.emit("chatmessage", {
              prompt: `Can you explain why the median RAM prices were ${datapoint.value}$ on ${datapoint.date}?`,
              researchEffort: "standard",
            });
          }
        }}
      >
        <XAxis dataKey="date" stroke="var(--border)" />
        <YAxis width="auto" stroke="var(--border)" />
        <Tooltip />
        <Gradient />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--primary)"
          fill="url(#gradient)"
        />
      </AreaChart>
    </div>
  );
}

export { Chart };
