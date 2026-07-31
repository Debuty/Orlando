import type { Store } from '@reduxjs/toolkit';

type AppStore = Store;

let appStore: AppStore | null = null;

export function injectStore(store: AppStore) {
  appStore = store;
}

export function getStore(): AppStore | null {
  return appStore;
}
