import * as StoreReview from "expo-store-review";
import { Linking } from "react-native";

export async function requestAppReview() {
  if (await StoreReview.hasAction()) {
    await StoreReview.requestReview();
  } else {
    const url = StoreReview.storeUrl();
    if (url) {
      Linking.openURL(url);
    }
  }
}
