import React, { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

const LineChart = ({ data, chartId, borderColor, backgroundColor }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const chart = new Chart(chartId, {
      type: "line",
      data: {
        labels: data.map(d => d.timestamp),
        datasets: [
          {
            label: "Concurrent Viewers",
            data: data.map(d => d.value),
            fill: true,
            borderColor: borderColor,
            borderWidth: 5,
            tension: 0.5,
            pointRadius: 0.5,
            backgroundColor: backgroundColor,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0, // Make sure that the points are not drawn
          },
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        scales: {
          x: {
            display: false, // Remove the x-axis labels and grid lines
          },
          y: {
            display: false,
            suggestedMin: 0,
            suggestedMax: 100, // Remove the y-axis labels and grid lines
          },
        },
      },
    })

    chartRef.current = chart

    return () => {
      chart.destroy()
      chartRef.current = null
    }
  }, [data, chartId])

  useEffect(() => {
    const chart = chartRef.current

    if (chart) {
      chart.data.labels = data.map(d => d.timestamp)
      chart.data.datasets[0].data = data.map(d => d.value)
      chart.update()
    }
  }, [data])

  return <canvas id={chartId} width="100%"></canvas>
}

export default LineChart
