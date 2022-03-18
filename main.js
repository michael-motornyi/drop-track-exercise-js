import "./style.css";
import data from "./response.json";

// Get all tracks in one array
const allTracks = data.map((item) => item.tracks).flat();

// Get tooltip for unique day
const getToolTip = (day) => {
  // Get all tracks names
  const allTrackNames = allTracks
    .filter((i) => i.timestp === day)
    .reduce((res, i) => [...res, i.trackName], []);

  // Get unique tracks names
  const uniqueTracks = [...new Set(allTrackNames)];

  // Build tooltip
  return uniqueTracks
    .map((i) => [`${i} (${allTrackNames.filter((t) => t === i).length})`])
    .join(", ");
};

// Get unique days
const uniqueDays = [...new Set(allTracks.map((item) => item.timestp))];

// Create chart
const chartData = uniqueDays
  .map((d) => ({
    x: d,
    y: allTracks.filter((t) => t.timestp === d).length,
    tooltip: getToolTip(d),
  }))
  .sort((a, b) => new Date(a.x) - new Date(b.x));

console.log(chartData);

document.querySelector("#app").innerHTML = `
  <pre>${JSON.stringify(chartData, null, 2)}</pre>
`;
