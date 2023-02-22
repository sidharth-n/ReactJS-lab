/* 

import React from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function MapChart() {
  // Define an array of country names that you want to highlight
  const highlightedCountries = [
    "United States",
    "Canada",
    "Mexico",
    "Brazil",
    "India",
  ]

  return (
    <div className="w-3/4 h-3/4">
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              // Determine if the current country should be highlighted
              const isHighlighted = highlightedCountries.includes(
                geo.properties.name
              )

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: isHighlighted ? "#2f56d2" : "#aabdff",
                      stroke: "white",
                    },
                    hover: {
                      fill: isHighlighted ? "#aabdff" : "#2e55d1",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: isHighlighted ? "#aabdff" : "#E42",
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
} */

import React, { useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps"

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function MapChart() {
  // Define an array of country names that you want to highlight
  const highlightedCountries = [
    "United States",
    "Canada",
    "Mexico",
    "Brazil",
    "India",
  ]

  const [zoom, setZoom] = useState(0.7) // Initialize the zoom level to 1

  const handleZoomIn = () => {
    setZoom(z => z * 2) // Double the current zoom level
  }

  const handleZoomOut = () => {
    setZoom(z => z / 2) // Halve the current zoom level
  }

  return (
    <div className="w-full h-3/4">
      <div className="zoom buttons flex gap-2 absolute bottom-0 left-0 p-4">
        <div
          onClick={handleZoomIn}
          className="bg-white border border-gray text-gray-600 text-2xl font-bold h-10 w-10 text-center rounded text-indigo-700 hover:cursor-pointer hover:bg-[#2f56ce] hover:text-white"
        >
          +
        </div>
        <div
          onClick={handleZoomOut}
          className="bg-white border border-gray text-gray-600 text-3xl font-bold h-10 w-10 text-center rounded text-indigo-700 hover:cursor-pointer hover:bg-[#2f56ce] hover:text-white"
        >
          -
        </div>
      </div>
      <ComposableMap>
        <ZoomableGroup zoom={zoom}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                // Determine if the current country should be highlighted
                const isHighlighted = highlightedCountries.includes(
                  geo.properties.name
                )

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: isHighlighted ? "#2f56d2" : "#aabdff",
                        stroke: "white",
                      },
                      hover: {
                        fill: isHighlighted ? "#aabdff" : "#2e55d1",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: isHighlighted ? "#aabdff" : "#E42",
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}
