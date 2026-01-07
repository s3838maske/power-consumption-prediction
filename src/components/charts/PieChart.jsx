import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Paper, Typography, useTheme } from "@mui/material";

const PieChart = ({
  data = [],
  title = "Energy Consumption",
  subtitle = "",
}) => {
  const theme = useTheme();

  const options = {
    chart: {
      type: "pie",
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
    subtitle: {
      text: subtitle,
      align: "left",
      style: {
        color: theme.palette.text.secondary,
      },
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderWidth: 0,
      borderRadius: 8,
      shadow: true,
      pointFormat:
        "{series.name}: <b>{point.percentage:.1f}%</b><br/>Usage: <b>{point.y} kWh</b>",
    },
    plotOptions: {
      pie: {
        innerSize: "65%",
        allowPointSelect: true,
        cursor: "pointer",
        borderWidth: 2,
        borderColor: theme.palette.background.paper,
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          distance: 20,
          style: {
            fontSize: "12px",
            fontWeight: "600",
            color: theme.palette.text.primary,
            textOutline: "none",
          },
        },
        showInLegend: true,
      },
    },
    legend: {
      align: "right",
      verticalAlign: "middle",
      layout: "vertical",
      itemStyle: {
        color: theme.palette.text.primary,
        fontWeight: "500",
      },
      itemMarginBottom: 10,
    },
    series: [
      {
        name: "Share",
        colorByPoint: true,
        data: data.map((item) => ({
          name: item.name,
          y: item.value,
        })),
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
      {data.length === 0 ? (
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

export default PieChart;
