// Save visited place ID to localStorage
export const saveVisit = (placeId) => {
  const visited = JSON.parse(localStorage.getItem("visited") || "[]");
  if (!visited.includes(placeId)) {
    visited.push(placeId);
    localStorage.setItem("visited", JSON.stringify(visited));
  }
};

// Retrieve all visited places
export const getVisited = () => {
  return JSON.parse(localStorage.getItem("visited") || "[]");
};
