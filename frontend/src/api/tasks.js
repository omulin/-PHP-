const API_BASE_URL = "http://127.0.0.1:8000/api/tasks";

async function handleResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      ok: false,
      message: data?.message || "API通信に失敗しました。",
      errors: data?.errors || null,
    };
  }

  return {
    ok: true,
    data,
  };
}

export async function fetchTasks() {
  try {
    const response = await fetch(API_BASE_URL);
    return await handleResponse(response);
  } catch (error) {
    console.error("タスク一覧取得エラー:", error);
    return {
      ok: false,
      message: "タスク一覧の取得に失敗しました。",
    };
  }
}

export async function createTask(taskData) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("タスク作成エラー:", error);
    return {
      ok: false,
      message: "タスクの作成に失敗しました。",
    };
  }
}

export async function updateTask(id, taskData) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("タスク更新エラー:", error);
    return {
      ok: false,
      message: "タスクの更新に失敗しました。",
    };
  }
}

export async function deleteTask(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("タスク削除エラー:", error);
    return {
      ok: false,
      message: "タスクの削除に失敗しました。",
    };
  }
}