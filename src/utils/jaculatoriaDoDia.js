import AsyncStorage from "@react-native-async-storage/async-storage";
import { JACULATORIAS } from "../data/devocionario/jaculatorias";

const STORAGE_KEY = "jaculatoria_do_dia";

export async function getJaculatoriaDoDia() {
  try {
    const hoje = new Date().toISOString().split("T")[0];

    const salvo = await AsyncStorage.getItem(STORAGE_KEY);

    if (salvo) {
      const { data, texto } = JSON.parse(salvo);

      // Se já existe para hoje → retorna
      if (data === hoje) return texto;
    }

    // Gerar nova jaculatória
    const randomIndex = Math.floor(Math.random() * JACULATORIAS.length);
    const texto = JACULATORIAS[randomIndex];

    // Salvar para uso futuro
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ data: hoje, texto })
    );

    return texto;

  } catch (e) {
    console.log("Erro gravando jaculatoria", e);
    return JACULATORIAS[0]; // fallback
  }
}
