const OPENCAGE_API_KEY = "d5b61462d33549ec922cb6ccb566a0f7"; // Replace with your real key

export const getCityFromCoords = async (lat, lng) => {
  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.results.length > 0) {
      const components = data.results[0].components;
      return (
        components.city ||
        components.town ||
        components.village ||
        components.state ||
        "your location"
      );
    } else {
      return "your location";
    }
  } catch (error) {
    console.error("Geocode error:", error);
    return "your location";
  }
};
