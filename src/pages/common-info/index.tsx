import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";
import { useCommon } from "../../hooks";

export const Dashboard = (): React.ReactElement => {
  const { chartData } = useCommon();

  return (
    <div className="w-full h-[500px] bg-[#f9f9f9] rounded-[10px] p-5 shadow-[0_4px_10px_rgba(0,0,0,0,1)]">
      <h3 className="text-center mb-5 text-[#333] font-serif">Analysis</h3>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#ccc"
          />
          <XAxis
            dataKey="blog"
            tick={{ fontSize: 12, fill: "#666" }}
          />
          <YAxis tick={{ fontSize: 12, fill: "#666" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "14px"
            }}
          />
          <Legend
            verticalAlign="top"
            align="center"
            wrapperStyle={{
              paddingBottom: "10px",
              fontSize: "14px",
              fontFamily: "Arial, sans-serif"
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#82ca9d"
            strokeWidth={3}
            dot={{ fill: "#82ca9d", strokeWidth: 2, r: 5 }}
            activeDot={{ r: 8, fill: "#8884d8", stroke: "#555" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
