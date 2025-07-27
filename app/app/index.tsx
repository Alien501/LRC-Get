import { useState, useEffect } from "react";
import { Text, TextInput, View, FlatList, Image, ActivityIndicator } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { usePermissions } from "@/hooks/usePermissions";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Index() {
  const [songs, setSongs] = useState<MediaLibrary.Asset[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<MediaLibrary.Asset[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { permissions } = usePermissions();

  useEffect(() => {
    if (permissions.media === 'granted') {
      fetchSongs();
    }
  }, [permissions.media]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter(song =>
        song.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (song.album && song.album.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (song.artist && song.artist.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredSongs(filtered);
    }
  }, [searchQuery, songs]);

  const fetchSongs = async () => {
    try {
      setIsLoading(true);
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
        first: 1000, // Maximum number of items to return
        sortBy: ['creationTime'], // Sort by most recent first
      });
      setSongs(media.assets);
      setFilteredSongs(media.assets);
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSongItem = ({ item }: { item: MediaLibrary.Asset }) => (
    <View className="flex-row items-center p-3 border-b border-gray-100">
      {item.albumArtwork ? (
        <Image 
          source={{ uri: item.albumArtwork }} 
          className="w-12 h-12 rounded-md mr-3"
        />
      ) : (
        <View className="w-12 h-12 bg-gray-200 rounded-md mr-3 flex items-center justify-center">
          <MaterialIcons name="music-note" size={24} color="gray" />
        </View>
      )}
      <View className="flex-1">
        <Text className="font-medium text-gray-800" numberOfLines={1}>
          {item.filename.replace('.mp3', '').replace('.m4a', '')}
        </Text>
        <Text className="text-sm text-gray-500" numberOfLines={1}>
          {item.artist || 'Unknown Artist'} • {item.album || 'Unknown Album'}
        </Text>
      </View>
      <MaterialIcons`` name="play-circle-outline" size={28} color="#3b82f6" />
    </View>
  );

  if (permissions.media !== 'granted') {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-4">
        <Text className="text-lg text-gray-700 mb-4">
          Media permission required to access songs
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <TextInput
        placeholder="Search Songs"
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="bg-white mx-4 mt-4 p-3 rounded-md border border-primary/10 focus:border-primary/100"
      />
      
      <FlatList
        data={filteredSongs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-10">
            <Text className="text-gray-500">
              {searchQuery ? "No matching songs found" : "No songs found on device"}
            </Text>
          </View>
        }
      />
    </View>
  );
}