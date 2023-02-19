import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MapScreen from "./screens/MapScreen";

export default function App() {
  return (
    <View>
      <MapScreen />
    </View>
  );
}

const styles = StyleSheet.create({});
