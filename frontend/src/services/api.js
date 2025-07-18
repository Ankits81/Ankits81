// services/api.js
export const addUserAPI = async (name) => {
  const res = await fetch("http://localhost:5000/api/add-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  
  if (!res.ok) throw new Error("Failed to add user");
  return await res.json();
};

export const fetchUsersAPI = async () => {
  const res = await fetch("http://localhost:5000/api/users");
  return await res.json();
};

export const claimPointsAPI = async (userId) => {
  const res = await fetch(`http://localhost:5000/api/claim/${userId}`, {
    method: "POST",
  });
  return await res.json();
};
