import { cn } from "@/lib/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({
  dataSets,
  className,
  title,
  dataSetTitle,
}: {
  dataSets: number[];
  title: string;
  dataSetTitle: string;
  className?: string;
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    maintainAspectRatio: false,
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: dataSetTitle,
        data: dataSets,
        backgroundColor: "#0a529e",
        borderColor: "#fe6a5c",
        pointBorderColor: "#0a529e",
        //fill:true,
        tension: 0.5,
      },
    ],
  };

  return (
    <div
      style={{
        minHeight: "60vh",
        position: "relative",
      }}
      className={cn("", className)}
    >
      <Line options={options} className="bg-red-" data={data} />
    </div>
  );
}
