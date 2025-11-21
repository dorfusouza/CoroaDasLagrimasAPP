import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import RosarioScreen from "./src/screens/RosarioScreen";
import DevocionarioScreen from "./src/screens/DevocionarioScreen";
import OracoesScreen from "./src/screens/OracoesScreen";
import OracaoDetalhe from "./src/screens/OracaoDetalhe";
import HistoriaScreen from "./src/screens/HistoriaScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Rosario" component={RosarioScreen} />
        <Stack.Screen name="Devocionario" component={DevocionarioScreen} />
        <Stack.Screen name="Oracoes" component={OracoesScreen} />
        <Stack.Screen name="OracaoDetalhe" component={OracaoDetalhe} />
        <Stack.Screen name="Historia" component={HistoriaScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
