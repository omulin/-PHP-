import { useEffect, useState } from "react";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/users";

const ROLE_OPTIONS = ["USER", "STAFF", "MANAGER", "ADMIN"];

function getRoleLabel(role) {
  switch (role) {
    case "STAFF":
      return "所員";
    case "MANAGER":
      return "所長";
    case "ADMIN":
      return "管理者";
    default:
      return "利用者";
  }
}

function normalizeUser(user) {
  if (!user || typeof user !== "object") return null;
  if (!user.id) return null;

  return {
    id: user.id,
    name: user.name ?? "",
    email: user.email ?? "",
    role: user.role ?? "USER",
    roleLabel: user.roleLabel ?? getRoleLabel(user.role ?? "USER"),
    createdAt: user.createdAt ?? user.created_at ?? null,
    updatedAt: user.updatedAt ?? user.updated_at ?? null,
  };
}

function getUsersFromResponse(data) {
  if (!data) return [];

  if (Array.isArray(data)) {
    return data.map(normalizeUser).filter(Boolean);
  }

  if (Array.isArray(data.data)) {
    return data.data.map(normalizeUser).filter(Boolean);
  }

  if (Array.isArray(data.users)) {
    return data.users.map(normalizeUser).filter(Boolean);
  }

  return [];
}

function getUserFromResponse(data) {
  if (!data) return null;

  if (data.id) return normalizeUser(data);
  if (data.user?.id) return normalizeUser(data.user);
  if (data.data?.id) return normalizeUser(data.data);

  return null;
}

function validateUser(userData) {
  const name = String(userData.name || "").trim();
  const email = String(userData.email || "").trim();
  const role = userData.role || "USER";

  if (!name) {
    return {
      ok: false,
      message: "名前を入力してください。",
    };
  }

  if (!email) {
    return {
      ok: false,
      message: "メールアドレスを入力してください。",
    };
  }

  if (!email.includes("@")) {
    return {
      ok: false,
      message: "メールアドレスの形式を確認してください。",
    };
  }

  if (!ROLE_OPTIONS.includes(role)) {
    return {
      ok: false,
      message: "役割の指定が正しくありません。",
    };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      role,
    },
  };
}

function getSafePrevUsers(prevUsers) {
  if (!Array.isArray(prevUsers)) return [];

  return prevUsers.map(normalizeUser).filter(Boolean);
}

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [userErrorMessage, setUserErrorMessage] = useState("");

  async function reloadUsers() {
    setIsUsersLoading(true);
    setUserErrorMessage("");

    const result = await fetchUsers();

    if (!result.ok) {
      setUserErrorMessage(result.message || "ユーザー一覧の取得に失敗しました。");
      setIsUsersLoading(false);
      return result;
    }

    setUsers(getUsersFromResponse(result.data));
    setIsUsersLoading(false);

    return result;
  }

  async function handleAddUser(userData) {
    setUserErrorMessage("");

    const validation = validateUser(userData);

    if (!validation.ok) {
      setUserErrorMessage(validation.message);
      return validation;
    }

    const result = await createUser(validation.data);

    if (!result.ok) {
      setUserErrorMessage(result.message || "ユーザー追加に失敗しました。");
      return result;
    }

    const savedUser = getUserFromResponse(result.data);

    if (!savedUser) {
      setUserErrorMessage("追加後のユーザーデータ形式が正しくありません。再取得します。");
      await reloadUsers();

      return {
        ok: false,
        message: "追加後のユーザーデータ形式が正しくありません。",
      };
    }

    setUsers((prevUsers) => [savedUser, ...getSafePrevUsers(prevUsers)]);

    return {
      ok: true,
      data: savedUser,
    };
  }

  async function handleUpdateUser(id, userData) {
    setUserErrorMessage("");

    const validation = validateUser(userData);

    if (!validation.ok) {
      setUserErrorMessage(validation.message);
      return validation;
    }

    const result = await updateUser(id, validation.data);

    if (!result.ok) {
      setUserErrorMessage(result.message || "ユーザー更新に失敗しました。");
      return result;
    }

    const savedUser = getUserFromResponse(result.data);

    if (!savedUser) {
      setUserErrorMessage("更新後のユーザーデータ形式が正しくありません。再取得します。");
      await reloadUsers();

      return {
        ok: false,
        message: "更新後のユーザーデータ形式が正しくありません。",
      };
    }

    setUsers((prevUsers) =>
      getSafePrevUsers(prevUsers).map((user) =>
        String(user.id) === String(id) ? savedUser : user
      )
    );

    return {
      ok: true,
      data: savedUser,
    };
  }

  async function handleDeleteUser(id) {
    setUserErrorMessage("");

    const result = await deleteUser(id);

    if (!result.ok) {
      setUserErrorMessage(result.message || "ユーザー削除に失敗しました。");
      return result;
    }

    setUsers((prevUsers) =>
      getSafePrevUsers(prevUsers).filter(
        (user) => String(user.id) !== String(id)
      )
    );

    return {
      ok: true,
    };
  }

  useEffect(() => {
    let ignore = false;

    async function run() {
      setIsUsersLoading(true);
      setUserErrorMessage("");

      const result = await fetchUsers();

      if (ignore) return;

      if (!result.ok) {
        setUserErrorMessage(result.message || "ユーザー一覧の取得に失敗しました。");
        setIsUsersLoading(false);
        return;
      }

      setUsers(getUsersFromResponse(result.data));
      setIsUsersLoading(false);
    }

    run();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    users,
    isUsersLoading,
    userErrorMessage,
    reloadUsers,

    // 正式名
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,

    // App.jsx側の名前ズレ対策
    addUser: handleAddUser,
    updateUser: handleUpdateUser,
    removeUser: handleDeleteUser,
    deleteUser: handleDeleteUser,
  };
}