const API_BASE_URL = "http://127.0.0.1:8000/api/users";

async function request(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        message: data?.message || `通信エラー: ${response.status}`,
        errors: data?.errors || null,
      };
    }

    return {
      ok: true,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      message:
        "Laravel APIに接続できません。php artisan serve が起動しているか確認してください。",
      error,
    };
  }
}

export async function fetchUsers() {
  return request(API_BASE_URL);
}

export async function createUser(user) {
  return request(API_BASE_URL, {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export async function updateUser(id, user) {
  return request(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });
}

export async function deleteUser(id) {
  return request(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
}