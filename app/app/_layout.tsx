import { Stack, useRouter } from "expo-router";
import "../global.css";
import { usePermissions } from "@/hooks/usePermissions";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const { permissions, isLoading } = usePermissions();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading) {
      const allGranted = permissions.media === 'granted' && permissions.storage === 'granted';
      setInitialRoute(allGranted ? 'index' : 'screens/permissions');
    }
  }, [permissions, isLoading]);

  if (!initialRoute) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <Stack initialRouteName={initialRoute}>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: true,
          title: "LRC Get"
        }} 
      />
      <Stack.Screen
        name="screens/permissions"
        options={{
        title:"LRC Get",
          headerShown: true,
          headerTitleAlign: 'center',
          headerTintColor: '#5d6dfd',
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold'
          },
          headerShadowVisible: false
        }}
      />
    </Stack>
  );
}