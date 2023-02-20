import React, { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

const LineChart = ({ data, chartId }) => {
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
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
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

  return (
    <canvas
      id={chartId}
      width="100%"
      style={{ border: `1px solid black` }}
    ></canvas>
  )
}

export default LineChart
