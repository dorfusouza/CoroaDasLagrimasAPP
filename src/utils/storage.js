import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getDias() {
  const v = await AsyncStorage.getItem("diasRezd");
  return v ? Number(v) : 0;
}

export async function incDias() {
  const atual = await getDias();
  await AsyncStorage.setItem("diasRezd", String(atual + 1));
}
