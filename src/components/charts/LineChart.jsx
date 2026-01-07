import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Paper, Typography, useTheme } from "@mui/material";

const LineChart = ({
  series = [],
  categories = [],
  title = "Power Consumption Trend",
  yAxisTitle = "Consumption (kWh)",
}) => {
  const theme = useTheme();

  const options = {
    chart: {
      type: "areaspline",
      backgroundColor: "transparent",
      height: 400,
      style: {
        fontFamily: theme.typography.fontFamily,
      },
    },
    title: {
      text: title,
      align: "left",
      style: {
        color: theme.palette.text.primary,
        fontSize: "20px",
        fontWeight: "700",
      },
    },
    xAxis: {
      categories: categories,
      crosshair: {
        width: 1,
        color: theme.palette.divider,
        dashStyle: "ShortDash",
      },
      labels: {
        style: {
          color: theme.palette.text.secondary,
        },
      },
      gridLineWidth: 0,
      lineColor: theme.palette.divider,
    },
    yAxis: {
      title: {
        text: yAxisTitle,
        style: {
          color: theme.palette.text.secondary,
        },
      },
      labels: {
        style: {
          color: theme.palette.text.secondary,
        },
      },
      gridLineColor: theme.palette.divider,
      gridLineDashStyle: "ShortDot",
    },
    tooltip: {
      shared: true,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderWidth: 0,
      borderRadius: 8,
      shadow: true,
      useHTML: true,
      headerFormat:
        '<span style="font-size: 12px; color: #666">{point.key}</span><br/>',
      pointFormat:
        '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y} kWh</b><br/>',
      padding: 12,
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.1,
        lineWidth: 3,
        states: {
          hover: {
            lineWidth: 4,
          },
        },
        marker: {
          enabled: false,
          radius: 4,
          states: {
            hover: {
              enabled: true,
              fillColor: "#ffffff",
              lineWidth: 2,
              lineColor: null,
            },
          },
        },
      },
    },
    legend: {
      align: "right",
      verticalAlign: "top",
      layout: "horizontal",
      itemStyle: {
        color: theme.palette.text.primary,
        fontWeight: "500",
      },
    },
    series: series.map((s) => ({
      ...s,
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [
            0,
            Highcharts.color(s.color || theme.palette.primary.main)
              .setOpacity(0.3)
              .get("rgba"),
          ],
          [
            1,
            Highcharts.color(s.color || theme.palette.primary.main)
              .setOpacity(0)
              .get("rgba"),
          ],
        ],
      },
    })),
    credits: {
      enabled: false,
    },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: "100%",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {series.length === 0 || categories.length === 0 ? (
        <Box
          sx={{
            height: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No data available
          </Typography>
        </Box>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </Paper>
  );
};

export default LineChart;
