const API_URL = "https://crm-backend-eh94.onrender.com/api";

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: string,
  designation: string,
) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      role,
      designation,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}

//Get current user
export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found");
  }
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to get current user");
  }
  return data;
}

//Logout
export async function logoutUser() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Logout failed");
    }
    return data;
  } finally {
    // remove local authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
