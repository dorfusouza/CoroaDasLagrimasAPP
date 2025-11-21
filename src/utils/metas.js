import AsyncStorage from "@react-native-async-storage/async-storage";
import { NOVENA } from "../data/devocionario/novena";

const META_KEY = "meta_ativa";
const METAS_ARCHIVE_KEY = "metas_archive";

// -----------------------------------------------------
// LER META ATIVA
// -----------------------------------------------------
export async function getMetaAtiva() {
  try {
    const raw = await AsyncStorage.getItem(META_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.log("getMetaAtiva error", e);
    return null;
  }
}

// -----------------------------------------------------
// CRIAR META
// -----------------------------------------------------
export async function setMeta(meta) {
  try {
    meta.criadoEm = meta.criadoEm || new Date().toISOString().split("T")[0];
    meta.progresso = meta.progresso || 0;
    meta.concluido = false;

    await AsyncStorage.setItem(META_KEY, JSON.stringify(meta));
    return meta;
  } catch (e) {
    console.log("setMeta error", e);
    return null;
  }
}

// -----------------------------------------------------
// APAGAR META ATIVA
// -----------------------------------------------------
export async function clearMeta() {
  try {
    await AsyncStorage.removeItem(META_KEY);
  } catch (e) {
    console.log("clearMeta error", e);
  }
}

// -----------------------------------------------------
// FUNCÃO PRINCIPAL: ATUALIZAR META AO FINALIZAR A COROA
// Sempre retorna:
// { meta, concluida }
// -----------------------------------------------------
export async function registrarProgressoMetaAoFinalizar({ isNewDay = false, novenaDia = null }) {
  try {
    const meta = await getMetaAtiva();

    if (!meta) {
      return { meta: null, concluida: false };
    }

    // ------------------------
    // 1) META DE COROAS
    // ------------------------
    if (meta.tipo === "coroas") {
      meta.progresso = (meta.progresso || 0) + 1;
    }

    // ------------------------
    // 2) META DE DIAS (streak)
    // ------------------------
    else if (meta.tipo === "dias") {
      if (isNewDay) {
        meta.progresso = (meta.progresso || 0) + 1;
      }
    }

    // ------------------------
    // 3) META DE NOVENA
    // ------------------------
    else if (meta.tipo === "novena") {
      const esperado = (meta.progresso || 0) + 1;
      if (novenaDia && novenaDia === esperado) {
        meta.progresso = esperado;
      }
    }

    // ------------------------------------------------
    // 4) VERIFICAR SE A META FOI CONCLUÍDA AQUI
    // ------------------------------------------------
    const concluiuAgora = !meta.concluido && meta.progresso >= meta.objetivo;

    if (concluiuAgora) {
      meta.concluido = true;
      meta.concluidoEm = new Date().toISOString().split("T")[0];

      await arquivarMeta(meta);

      // IMPORTANTE:
      // Retorna meta concluída para ativar confete + modal
      return { meta, concluida: true };
    }

    // NÃO concluiu → apenas atualizar
    await AsyncStorage.setItem(META_KEY, JSON.stringify(meta));

    return { meta, concluida: false };

  } catch (e) {
    console.log("registrarProgressoMetaAoFinalizar error", e);
    return { meta: null, concluida: false };
  }
}

// -----------------------------------------------------
// ARQUIVAR META (quando concluir)
// -----------------------------------------------------
async function arquivarMeta(meta) {
  try {
    const raw = await AsyncStorage.getItem(METAS_ARCHIVE_KEY);
    const list = raw ? JSON.parse(raw) : [];

    list.push(meta);

    await AsyncStorage.setItem(METAS_ARCHIVE_KEY, JSON.stringify(list));

    // Remover meta ativa
    await AsyncStorage.removeItem(META_KEY);
  } catch (e) {
    console.log("arquivarMeta error", e);
  }
}

// -----------------------------------------------------
// LER METAS ARQUIVADAS
// -----------------------------------------------------
export async function getMetasArquivadas() {
  try {
    const raw = await AsyncStorage.getItem(METAS_ARCHIVE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.log("getMetasArquivadas error", e);
    return [];
  }
}

// -----------------------------------------------------
// EDITAR META EXISTENTE
// -----------------------------------------------------
export async function atualizarMeta(meta) {
  try {
    await AsyncStorage.setItem(META_KEY, JSON.stringify(meta));
    return meta;

  } catch (e) {
    console.log("atualizarMeta error", e);
    return null;
  }
}
