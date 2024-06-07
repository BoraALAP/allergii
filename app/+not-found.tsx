import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Text>This screen doesn't exist.</Text>

        <Link href="/(tabs)/now">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
