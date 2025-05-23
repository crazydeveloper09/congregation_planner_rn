export default ({ config }) => ({
  ...config,
  entryPoint: './index.js',
  extra: {
    ...config.extra,
    eas: {
      projectId: '945eed66-9302-4d9e-a573-94f7d5ba939b'
    }
  },
  android: {
    ...config.android,
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#1F8AAD'
    },
    permissions: [
      'android.permission.READ_CALENDAR',
      'android.permission.WRITE_CALENDAR',
      'android.permission.USE_BIOMETRIC',
      'android.permission.USE_FINGERPRINT',
      'com.google.android.gms.permission.AD_ID'
    ],
    package: 'com.crazydev09.congregation_planner',
    versionCode: 29
  },
  ios: {
    ...config.ios,
    bundleIdentifier: 'com.miszki.congregation-planner',
    supportsTablet: true,
    infoPlist: {
      NSCalendarsUsageDescription: 'Ta aplikacja do przydatnych dla Ciebie funkcji potrzebuje dostępu do kalendarza',
      NSRemindersUsageDescription: 'Pozwól $(PRODUCT_NAME) na dostęp do przypomnień',
      NSCalendarsFullAccessUsageDescription: 'Ta aplikacja do przydatnych dla Ciebie funkcji potrzebuje dostępu do kalendarza',
      NSRemindersFullAccessUsageDescription: 'Pozwól $(PRODUCT_NAME) na dostęp do przypomnień',
      NSFaceIDUsageDescription: 'Pozwól $(PRODUCT_NAME) na używanie Face ID.'
    }
  },
  plugins: [
    'expo-font',
    ['expo-calendar'],
    'expo-localization',
    ['expo-notifications', { icon: './assets/icon.png' }]
  ],
  splash: {
    image: './assets/mysplash.png',
    resizeMode: 'contain',
    backgroundColor: '#1F8AAD'
  },
  assetBundlePatterns: ['**/*'],
  updates: {
    url: 'https://u.expo.dev/945eed66-9302-4d9e-a573-94f7d5ba939b'
  },
  runtimeVersion: {
    policy: 'appVersion'
  },
  userInterfaceStyle: 'light',
  name: 'Congregation Planner',
  slug: 'congregation_planner',
  version: '3.10.1',
  owner: 'miszki',
  web: {
    favicon: './assets/favicon.png'
  }
});
