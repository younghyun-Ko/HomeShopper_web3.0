export type UserRole = "GENERAL" | "AGENT" | "ADMIN";

export type AuthUser = {
  email: string;
  id: string;
  name: string;
  userRole: UserRole;
};

type StoredUser = AuthUser & {
  password: string;
};

export type AuthSession = {
  signedInAt: string;
  user: AuthUser;
};

type LoginInput = {
  email: string;
  password: string;
  remember: boolean;
};

type RegisterInput = {
  email: string;
  name: string;
  password: string;
  remember: boolean;
  userRole: UserRole;
};

export type AuthResult =
  | {
      session: AuthSession;
      success: true;
    }
  | {
      error: string;
      success: false;
    };

const AUTH_USERS_STORAGE_KEY = "homeshopper:auth-users";
const AUTH_LOCAL_SESSION_STORAGE_KEY = "homeshopper:auth-session";
const AUTH_SESSION_SESSION_KEY = "homeshopper:auth-session-temporary";
export const AUTH_CHANGE_EVENT = "homeshopper-auth-changed";

export const MY_PAGE_ROOT_PATH = "/mypage";
export const GENERAL_MY_PAGE_PATH = "/mypage/general";
export const AGENT_MY_PAGE_PATH = "/mypage/agent";
export const ADMIN_PAGE_PATH = "/admin";
export const LEGACY_MY_PAGE_PATH = "/my-page";

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Admin",
  AGENT: "Agent",
  GENERAL: "General",
};

export const USER_ROLE_STATUS_LABELS: Record<UserRole, string> = {
  ADMIN: "관리자",
  AGENT: "중개사",
  GENERAL: "일반 회원",
};

const ADMIN_EMAIL = "admin@homeshopper.kr";
const ADMIN_PASSWORD = "admin1234";
const ADMIN_STORED_USER: StoredUser = {
  email: ADMIN_EMAIL,
  id: "admin-root",
  name: "관리자",
  password: ADMIN_PASSWORD,
  userRole: "ADMIN",
};

function getStorage(type: "local" | "session") {
  if (typeof window === "undefined") {
    return null;
  }

  return type === "local" ? window.localStorage : window.sessionStorage;
}

function readJson<T>(value: string | null, fallback: T) {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function notifyAuthChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

function readUsers() {
  return readJson<StoredUser[]>(
    getStorage("local")?.getItem(AUTH_USERS_STORAGE_KEY) ?? null,
    [],
  );
}

function writeUsers(users: StoredUser[]) {
  getStorage("local")?.setItem(AUTH_USERS_STORAGE_KEY, JSON.stringify(users));
}

function readSessionFrom(type: "local" | "session") {
  const key =
    type === "local"
      ? AUTH_LOCAL_SESSION_STORAGE_KEY
      : AUTH_SESSION_SESSION_KEY;

  return readJson<AuthSession | null>(getStorage(type)?.getItem(key) ?? null, null);
}

function clearStoredSessions() {
  getStorage("local")?.removeItem(AUTH_LOCAL_SESSION_STORAGE_KEY);
  getStorage("session")?.removeItem(AUTH_SESSION_SESSION_KEY);
  notifyAuthChanged();
}

function writeSession(session: AuthSession, remember: boolean) {
  clearStoredSessions();

  const storageType = remember ? "local" : "session";
  const storageKey =
    storageType === "local"
      ? AUTH_LOCAL_SESSION_STORAGE_KEY
      : AUTH_SESSION_SESSION_KEY;

  getStorage(storageType)?.setItem(storageKey, JSON.stringify(session));
  notifyAuthChanged();
}

function createUserId() {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function toAuthUser(user: StoredUser): AuthUser {
  return {
    email: user.email,
    id: user.id,
    name: user.name,
    userRole: user.userRole,
  };
}

function createSession(user: StoredUser): AuthSession {
  return {
    signedInAt: new Date().toISOString(),
    user: toAuthUser(user),
  };
}

function isInternalPath(path: string) {
  return path.startsWith("/") && !path.startsWith("//");
}

function isMyPagePath(path: string) {
  return (
    path === MY_PAGE_ROOT_PATH ||
    path === LEGACY_MY_PAGE_PATH ||
    path.startsWith(`${MY_PAGE_ROOT_PATH}/`)
  );
}

export function getMyPagePathByRole(userRole: UserRole) {
  if (userRole === "ADMIN") return ADMIN_PAGE_PATH;
  return userRole === "AGENT" ? AGENT_MY_PAGE_PATH : GENERAL_MY_PAGE_PATH;
}

export function buildLoginPath(redirectPath = MY_PAGE_ROOT_PATH) {
  return `/login?redirect=${encodeURIComponent(redirectPath)}`;
}

export function resolvePostLoginPath(
  redirectPath: string | null | undefined,
  userRole: UserRole,
) {
  if (userRole === "ADMIN") return ADMIN_PAGE_PATH;

  const safeRedirectPath =
    redirectPath && isInternalPath(redirectPath) ? redirectPath : MY_PAGE_ROOT_PATH;

  if (isMyPagePath(safeRedirectPath)) {
    return getMyPagePathByRole(userRole);
  }

  return safeRedirectPath;
}

export function getAuthSession() {
  return readSessionFrom("session") ?? readSessionFrom("local");
}

export function isLoggedIn() {
  return getAuthSession() !== null;
}

export function registerUser({
  email,
  name,
  password,
  remember,
  userRole,
}: RegisterInput): AuthResult {
  const trimmedName = name.trim();
  const normalizedEmail = normalizeEmail(email);
  const trimmedPassword = password.trim();

  if (!trimmedName) {
    return { error: "이름을 입력해주세요.", success: false };
  }

  if (!normalizedEmail) {
    return { error: "이메일을 입력해주세요.", success: false };
  }

  if (!trimmedPassword) {
    return { error: "비밀번호를 입력해주세요.", success: false };
  }

  const users = readUsers();
  const existingUser = users.find((user) => user.email === normalizedEmail);

  if (existingUser) {
    return { error: "이미 가입된 이메일입니다.", success: false };
  }

  const nextUser: StoredUser = {
    email: normalizedEmail,
    id: createUserId(),
    name: trimmedName,
    password: trimmedPassword,
    userRole,
  };

  writeUsers([...users, nextUser]);

  const session = createSession(nextUser);
  writeSession(session, remember);

  return {
    session,
    success: true,
  };
}

export function loginUser({
  email,
  password,
  remember,
}: LoginInput): AuthResult {
  const normalizedEmail = normalizeEmail(email);
  const trimmedPassword = password.trim();

  if (!normalizedEmail) {
    return { error: "이메일을 입력해주세요.", success: false };
  }

  if (!trimmedPassword) {
    return { error: "비밀번호를 입력해주세요.", success: false };
  }

  if (normalizedEmail === ADMIN_EMAIL && trimmedPassword === ADMIN_PASSWORD) {
    const session = createSession(ADMIN_STORED_USER);
    writeSession(session, remember);
    return { session, success: true };
  }

  const existingUser = readUsers().find((user) => user.email === normalizedEmail);

  if (!existingUser) {
    return {
      error: "가입된 계정이 없습니다. 먼저 계정을 만들어주세요.",
      success: false,
    };
  }

  if (existingUser.password !== trimmedPassword) {
    return { error: "비밀번호가 올바르지 않습니다.", success: false };
  }

  const session = createSession(existingUser);
  writeSession(session, remember);

  return {
    session,
    success: true,
  };
}

export function logoutUser() {
  clearStoredSessions();
}
