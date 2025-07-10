// storage.ts

import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isWeb = Platform.OS === "web";

type WebStorageType = "local" | "session";

export const storage = {
  async setItem(key: string, value: string, storageType: WebStorageType = "local") {
    if (isWeb) {
      const storageObj = storageType === "session" ? sessionStorage : localStorage;
      storageObj.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  },

  async getItem(key: string, storageType: WebStorageType = "local") {
    if (isWeb) {
      const storageObj = storageType === "session" ? sessionStorage : localStorage;
      return storageObj.getItem(key);
    } else {
      return await AsyncStorage.getItem(key);
    }
  },

  async removeItem(key: string, storageType: WebStorageType = "local") {
    if (isWeb) {
      const storageObj = storageType === "session" ? sessionStorage : localStorage;
      storageObj.removeItem(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  },
};
