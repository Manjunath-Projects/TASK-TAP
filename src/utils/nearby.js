// utils/nearby.js
export const findNearby = (userCoords, places, maxDistanceKm = 1.5) => {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371;

  return places.filter((place) => {
    const dLat = toRad(place.lat - userCoords.lat);
    const dLon = toRad(place.lng - userCoords.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(userCoords.lat)) *
        Math.cos(toRad(place.lat)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c;
    return dist <= maxDistanceKm;
  });
};
