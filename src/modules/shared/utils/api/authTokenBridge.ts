/**
 * In-memory token bridge so Axios interceptors stay in sync with Redux auth
 * (persist rehydrates auth → we sync here; no duplicate localStorage token key).
 */
let currentToken: string | null = null;

export function syncAuthToken(token: string | null) {
  currentToken = token;
}

export function getAuthToken(): string | null {
  return currentToken;
}
