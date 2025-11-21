import AsyncStorage from "@react-native-async-storage/async-storage";

const DIAS_KEY = "dias_rezados_lista";

export async function registrarDiaRezados() {
  const hoje = new Date().toISOString().split("T")[0];

  const raw = await AsyncStorage.getItem(DIAS_KEY);
  let lista = raw ? JSON.parse(raw) : [];

  const jaTemHoje = lista.includes(hoje);

  if (!jaTemHoje) {
    lista.push(hoje);
    await AsyncStorage.setItem(DIAS_KEY, JSON.stringify(lista));
  }

  // retorna TRUE se contou hoje pela 1ª vez
  return !jaTemHoje;
}

export async function getDiasRezados() {
  const raw = await AsyncStorage.getItem(DIAS_KEY);
  return raw ? JSON.parse(raw).length : 0;
}
