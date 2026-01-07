import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Paper, Typography, useTheme } from "@mui/material";

const BarChart = ({
  categories = [],
  actualData = [],
  predictedData = [],
  title = "Actual vs Predicted Consumption",
}) => {
  const theme = useTheme();

  const options = {
    chart: {
      type: "column",
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
      labels: {
        style: {
          color: theme.palette.text.secondary,
        },
      },
      gridLineWidth: 0,
      lineColor: theme.palette.divider,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Consumption (kWh)",
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
      pointFormat:
        '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y} kWh</b><br/>',
      padding: 12,
    },
    plotOptions: {
      column: {
        borderRadius: 6,
        borderWidth: 0,
        groupPadding: 0.15,
        pointPadding: 0.05,
        dataLabels: {
          enabled: false,
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
    series: [
      {
        name: "Actual",
        data: actualData,
        color: theme.palette.primary.main,
      },
      {
        name: "Predicted",
        data: predictedData,
        color: theme.palette.secondary.main,
      },
    ],
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
      {categories.length === 0 ||
      (actualData.length === 0 && predictedData.length === 0) ? (
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

export default BarChart;
