const API_BASE_URL = "http://127.0.0.1:8000/api/tasks";

async function request(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
      message: "Laravel APIに接続できません。php artisan serve を確認してください。",
      error,
    };
  }
}

export async function fetchTasks() {
  return request(API_BASE_URL);
}

export async function createTask(task) {
  return request(API_BASE_URL, {
    method: "POST",
    body: JSON.stringify(task),
  });
}

export async function updateTask(id, task) {
  return request(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });
}

export async function deleteTask(id) {
  return request(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
}