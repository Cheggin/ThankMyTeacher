import 'dotenv/config';

export default {
  expo: {
    name: "ThankMyTeacher",
    slug: "ThankMyTeacher",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "thankmyteacher",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
    },
    fonts: [
      {
        asset: "./assets/fonts/Inter-Regular.ttf",
        family: "Inter"
      },
      {
        asset: "./assets/fonts/Inter-Medium.ttf",
        family: "Inter",
        weight: "500"
      },
      {
        asset: "./assets/fonts/Inter-SemiBold.ttf",
        family: "Inter",
        weight: "600"
      },
      {
        asset: "./assets/fonts/Inter-Bold.ttf",
        family: "Inter",
        weight: "700"
      },
      {
        asset: "./assets/fonts/SpaceMono-Regular.ttf",
        family: "SpaceMono"
      }
    ],
  },
}; 