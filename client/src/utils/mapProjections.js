// utils/mapProjections.js
export const getAlbersProjection = () => {
  return {
    name: 'albers',
    center: [-96, 23],
    parallels: [29.5, 45.5]
  };
};

// In your MapView component
map.current = new mapboxgl.Map({
  container: mapContainer.current,
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-98.5, 39.8],
  zoom: 3,
  projection: 'albers' // Built-in Albers USA projection
});