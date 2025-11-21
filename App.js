import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import RosarioScreen from "./src/screens/RosarioScreen";
import DevocionarioScreen from "./src/screens/DevocionarioScreen";
import OracoesScreen from "./src/screens/OracoesScreen";
import OracaoDetalhe from "./src/screens/OracaoDetalhe";
import HistoriaScreen from "./src/screens/HistoriaScreen";
import JaculatoriasScreen from "./src/screens/JaculatoriasScreen";
import JaculatoriaDetalhe from "./src/screens/JaculatoriaDetalhe";
import JaculatoriaDoDia from "./src/screens/JaculatoriaDoDia";
import DevocionarioHomeScreen from "./src/screens/DevocionarioHomeScreen";




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
        <Stack.Screen name="Jaculatorias" component={JaculatoriasScreen} />
        <Stack.Screen name="JaculatoriaDetalhe" component={JaculatoriaDetalhe} />
        <Stack.Screen name="JaculatoriaDoDia" component={JaculatoriaDoDia} />
        <Stack.Screen name="DevocionarioHome" component={DevocionarioHomeScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
