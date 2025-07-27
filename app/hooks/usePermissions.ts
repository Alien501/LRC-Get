import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

type PermissionStatus =
  | "granted"
  | "denied"
  | "undetermined"
  | "never_ask_again";

interface AppPermissions {
  media: PermissionStatus;
  storage: PermissionStatus;
  mediaWrite: PermissionStatus;
}

export function usePermissions() {
  const [permissions, setPermissions] = useState<AppPermissions>({
    media: "undetermined",
    mediaWrite: "undetermined",
    storage: "undetermined",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const requestMediaPermission = async () => {
    try {
      setIsLoading(true);

      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();

      setPermissions((prev) => ({
        ...prev,
        media:
          status === "granted"
            ? "granted"
            : canAskAgain
            ? "denied"
            : "never_ask_again",
      }));

      return status === "granted";
    } catch (error) {
      console.error("Media permission error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const requestStoragePermission = async () => {
    try {
      setIsLoading(true);

      if (Platform.OS === "android") {
        const permission =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        setPermissions((prev) => ({
          ...prev,
          storage: permission.granted ? "granted" : "denied",
        }));

        return permission.granted;
      }

      setPermissions((prev) => ({
        ...prev,
        storage: "granted",
      }));

      return true;
    } catch (error) {
      console.error("Storage permission error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const checkAllPermissions = async () => {
    try {
      setIsLoading(true);

      const mediaPermission = await MediaLibrary.getPermissionsAsync();
      setPermissions((prev) => ({
        ...prev,
        media:
          mediaPermission.status === "granted"
            ? "granted"
            : mediaPermission.canAskAgain
            ? "denied"
            : "never_ask_again",
      }));

      if (Platform.OS === "android") {
        const dir = FileSystem.documentDirectory;
        const { granted } =
          await FileSystem.StorageAccessFramework.readDirectoryAsync(dir!)
            .then(() => ({ granted: true }))
            .catch(() => ({ granted: false }));

        setPermissions((prev) => ({
          ...prev,
          storage: granted ? "granted" : "denied",
        }));
      } else {
        setPermissions((prev) => ({
          ...prev,
          storage: "granted",
        }));
      }
    } catch (error) {
      console.error("Permission check error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAllPermissions();
  }, []);

  return {
    permissions,
    isLoading,
    requestMediaPermission,
    requestStoragePermission,
    checkAllPermissions,
  };
}
