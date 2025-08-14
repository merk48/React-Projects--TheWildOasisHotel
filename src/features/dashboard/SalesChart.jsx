import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useViewportWidth } from "../../hooks/useViewportWidth";
import { useMemo } from "react";
import { DASHBOARD_CONFIG } from "../../utils/configs/dashboardConfig";

const StyledSalesChart = styled.div`
  /* Use your DashboardBox styles (I kept it simple here) */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: 1 / -1;
  width: 100%;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }

  /* responsive padding */
  @media (max-width: 1024px) {
    padding: 1.6rem 1.8rem;
  }

  @media (max-width: 480px) {
    padding: 1.2rem 1rem;
  }

  /* make sure the svg area is visible (prevents clipping on some browsers) */
  & svg {
    overflow: visible;
  }
`;

function SalesChart({ bookings = [], numDays = 7 }) {
  const { isDarkMode } = useDarkMode();
  const vw = useViewportWidth();

  // data for all dates in interval
  const allDates = useMemo(
    () =>
      eachDayOfInterval({
        start: subDays(new Date(), numDays),
        end: new Date(),
      }),
    [numDays]
  );

  const data = useMemo(
    () =>
      allDates.map((date) => {
        return {
          label: format(date, DASHBOARD_CONFIG.UI.DATE_FORMAT),
          totalSales: bookings.reduce((acc, cur) => {
            return (acc += isSameDay(date, new Date(cur.created_at))
              ? cur.totalPrice
              : 0);
          }, 0),
          extrasSales: bookings.reduce((acc, cur) => {
            return (acc += isSameDay(date, new Date(cur.created_at))
              ? cur.extrasPrice
              : 0);
          }, 0),
        };
      }),
    [allDates, bookings]
  );

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  // Dynamic height: smaller on mobile, larger on desktop
  const chartHeight = vw < 480 ? 220 : vw < 768 ? 260 : 320;

  // compute how many ticks we can show without crowding
  // target approx one tick per 80-120px of width
  const approxTickSpacing = vw < 480 ? 80 : vw < 768 ? 90 : 120;
  const tickCount = Math.max(
    3,
    Math.min(10, Math.floor(Math.max(300, vw) / approxTickSpacing))
  );

  // interval for XAxis: show roughly tickCount ticks across data.length
  const xInterval = Math.max(0, Math.ceil(data.length / tickCount) - 1);

  // rotate ticks a bit on narrow screens
  const tickProps =
    vw < 480
      ? { angle: -45, textAnchor: "end", dx: -6, dy: 6 }
      : vw < 768
      ? { angle: -20, textAnchor: "end", dx: -4, dy: 4 }
      : { angle: 0, textAnchor: "middle" };

  // margins to ensure axes/labels don't get clipped
  const chartMargin = {
    top: 10,
    right: 20,
    left: 0,
    bottom: vw < 480 ? 60 : 30,
  };

  return (
    <StyledSalesChart>
      <Heading as="h2" variant="h2">
        {data.length
          ? `Sales from ${format(allDates.at(0), "MMM dd yyyy")} — ${format(
              allDates.at(-1),
              "MMM dd yyyy"
            )}`
          : "Sales"}
      </Heading>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <AreaChart data={data} margin={chartMargin}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text, fontSize: vw < 480 ? 11 : 12 }}
            tickLine={{ stroke: colors.text }}
            interval={xInterval}
            {...tickProps}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text, fontSize: vw < 480 ? 11 : 12 }}
            tickLine={{ stroke: colors.text }}
            width={64}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip
            contentStyle={{ backgroundColor: colors.background }}
            formatter={(value) => (value ? `$${value}` : "$0")}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
            isAnimationActive={false}
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
