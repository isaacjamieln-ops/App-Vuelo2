const API_URL = "http://localhost:5000/api";

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
}