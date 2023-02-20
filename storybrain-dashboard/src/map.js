import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import worldData from "./mapData.json"

const geographyPaths = worldData.features.map(feature => feature.geometry)

function WorldMap() {
  return (
    <svg width={800} height={500}>
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 155 }}>
        <Geographies geography={geographyPaths}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#DDD"
                stroke="#FFF"
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </svg>
  )
}

export default WorldMap
