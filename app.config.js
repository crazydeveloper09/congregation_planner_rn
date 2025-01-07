export default {
  "expo": {
    "name": "Congregation Planner",
    "slug": "congregation_planner",
    "version": "3.2.1",
    "owner": "miszki",
    "orientation": "default",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/mysplash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1F8AAD"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.miszki.congregation-planner",
      "infoPlist": {
        "NSCalendarsUsageDescription": "Ta aplikacja do przydatnych dla Ciebie funkcji potrzebuje dostępu do kalendarza",
        "NSRemindersUsageDescription": "Pozwól $(PRODUCT_NAME) na dostęp do przypomnień",
        "NSCalendarsFullAccessUsageDescription": "Ta aplikacja do przydatnych dla Ciebie funkcji potrzebuje dostępu do kalendarza",
        "NSRemindersFullAccessUsageDescription": "Pozwól $(PRODUCT_NAME) na dostęp do przypomnień",
        "NSFaceIDUsageDescription": "Pozwól $(PRODUCT_NAME) na używanie Face ID."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/icon.png",
        "backgroundColor": "#1F8AAD"
      },
      "permissions": [
        "android.permission.READ_CALENDAR",
        "android.permission.WRITE_CALENDAR",
        "android.permission.USE_BIOMETRIC",
        "android.permission.USE_FINGERPRINT",
        "com.google.android.gms.permission.AD_ID"
      ],
      "package": "com.crazydev09.congregation_planner",
      "versionCode": 25,
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-font",
      [
        "expo-calendar",
        {
          "calendarPermission": "Ta aplikacja do przydatnych dla Ciebie funkcji potrzebuje dostępu do kalendarza"
        }
      ],
      "expo-localization",
      [
        "expo-notifications",
        {
          "icon": "./assets/icon.png"
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "945eed66-9302-4d9e-a573-94f7d5ba939b"
      }
    },
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "updates": {
      "url": "https://u.expo.dev/945eed66-9302-4d9e-a573-94f7d5ba939b"
    }
  }
}
