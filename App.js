import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import RosarioScreen from "./src/screens/RosarioScreen";
import DevocionarioScreen from "./src/screens/DevocionarioScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Rosario" component={RosarioScreen} />
        <Stack.Screen name="Devocionario" component={DevocionarioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
