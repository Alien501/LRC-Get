import { usePermissions } from "@/hooks/usePermissions";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";

export default function PermissionsScreen() {
  const {
    permissions,
    isLoading,
    requestMediaPermission,
    requestStoragePermission,
  } = usePermissions();
  const router = useRouter();

  const handleContinue = () => {
    if (permissions.media === "granted" && permissions.storage === "granted") {
        router.replace('/');
    }
  };
  
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 px-4">
      <View className="w-full max-w-md mb-8">
        <Text className="text-2xl font-bold text-center text-gray-800">
          Please Grant Following{" "}
          <Text className="text-primary">Permissions</Text>
        </Text>
        <Text className="text-sm text-gray-500 text-center mt-2">
          For smooth app experience and full functionality
        </Text>
      </View>

      <View className="w-full max-w-md space-y-10">
        <View className="w-full flex-row justify-between items-center p-5 bg-white rounded-xl mb-4 shadow-md border border-gray-200">
          <View className="flex-1 mr-4">
            <View className="flex-row items-center">
              <MaterialIcons
                name="photo-library"
                size={20}
                color="#4254f4"
                className="mr-2"
              />
              <Text className="text-lg font-semibold text-gray-800">
                Media Access
              </Text>
            </View>
            <Text className="text-sm text-gray-500 mt-1 ml-7">
              To retrieve available audio files
            </Text>
          </View>
          <TouchableOpacity
            onPress={requestMediaPermission}
            activeOpacity={0.8}
            className={`px-5 py-2.5 rounded-full ${
              permissions.media === "granted"
                ? "bg-green-500"
                : permissions.media === "never_ask_again"
                ? "bg-gray-400"
                : "bg-primary"
            }`}
          >
            <Text className="text-white font-medium">
              {permissions.media === "granted"
                ? "Granted"
                : permissions.media === "never_ask_again"
                ? "Permission Denied"
                : "Allow Media Access"}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-full flex-row justify-between items-center p-5 bg-white rounded-xl  mb-4 shadow-md border border-gray-200">
          <View className="flex-1 mr-4">
            <View className="flex-row items-center">
              <MaterialIcons
                name="sd-storage"
                size={20}
                color="#4254f4"
                className="mr-2"
              />
              <Text className="text-lg font-semibold text-gray-800">
                Storage Access
              </Text>
            </View>
            <Text className="text-sm text-gray-500 mt-1 ml-7">
              To save downloaded files to your device
            </Text>
          </View>
          <TouchableOpacity
            onPress={requestStoragePermission}
            activeOpacity={0.8}
            className={`px-5 py-2.5 rounded-full ${
              permissions.storage === "granted"
                ? "bg-green-500"
                : permissions.storage === "never_ask_again"
                ? "bg-gray-400"
                : "bg-primary"
            }`}
          >
            <Text className="text-white font-medium">
              {permissions.storage === "granted"
                ? "Granted"
                : permissions.storage === "never_ask_again"
                ? "Permission Denied"
                : "Allow Storage Access"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-xs text-gray-500 text-center mt-2 px-4">
          These permissions are required for full app functionality. We respect
          your privacy and only access what&apos;s necessary.
        </Text>

        <TouchableOpacity
            onPress={handleContinue}
          activeOpacity={0.8}
          className="bg-primary rounded-full flex items-center justify-center mt-8 h-12 shadow-md"
        >
          <View className="flex-row items-center px-6">
            <Text className="font-semibold text-white text-lg">Continue</Text>
            <MaterialIcons
              name="arrow-forward"
              size={24}
              color="white"
              className="ml-2"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
