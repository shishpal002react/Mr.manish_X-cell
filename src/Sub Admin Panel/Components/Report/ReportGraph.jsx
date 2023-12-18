import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "../../Styles/Report.module.css";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

export const options = {
  responsive: true,
};
export const ReportGraph = ({ chartData }) => {
  return (
    <Bar
      type={"bar"}
      className={styles.Bars}
      options={options}
      data={chartData}
    />
  );
};
