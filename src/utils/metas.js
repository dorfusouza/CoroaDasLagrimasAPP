import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDiasRezados } from "../utils/storage"; // se você já tem função
import { NOVENA } from "../data/devocionario/novena";

const META_KEY = "meta_ativa";
const METAS_ARCHIVE_KEY = "metas_archive"; // para guardar metas concluídas/historico

// Tipos esperados: "coroas" (contagem de coroas finalizadas),
// "dias" (dias consecutivos ou totais - decidiremos no objeto meta),
// "novena" (completar novena)
export async function getMetaAtiva() {
  try {
    const raw = await AsyncStorage.getItem(META_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.log("getMetaAtiva error", e);
    return null;
  }
}

export async function setMeta(meta) {
  // meta: { tipo, objetivo, progresso, criadoEm, uid, titulo, modoStreak? }
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

export async function clearMeta() {
  try {
    await AsyncStorage.removeItem(META_KEY);
  } catch (e) {
    console.log("clearMeta error", e);
  }
}

// chamada sempre que deseja incrementar a meta devido a evento (ex: finalizar coroa)
export async function incrementarMetaPorCoroa() {
  try {
    const meta = await getMetaAtiva();
    if (!meta) return null;

    if (meta.tipo === "coroas") {
      meta.progresso = (meta.progresso || 0) + 1;
    }
    // Para novena, só incrementar se estiver no fluxo correto (verificar no integrador)
    await verificarConclusaoEMarcar(meta);
    await AsyncStorage.setItem(META_KEY, JSON.stringify(meta));
    return meta;
  } catch (e) {
    console.log("incrementarMetaPorCoroa error", e);
    return null;
  }
}

// incremento quando usuário finaliza a coroa: checa todos os tipos relevantes
export async function registrarProgressoMetaAoFinalizar({ isNewDay = false, novenaDia = null }) {
  // isNewDay: true se o fechamento contou como um dia novo (usado para metas 'dias')
  try {
    const meta = await getMetaAtiva();
    if (!meta) return null;

    if (meta.tipo === "coroas") {
      meta.progresso = (meta.progresso || 0) + 1;
    } else if (meta.tipo === "dias") {
      // esse assume que registrarDiaRezados já protege contra duplicidade por dia
      if (isNewDay) {
        meta.progresso = (meta.progresso || 0) + 1;
      }
    } else if (meta.tipo === "novena") {
      // novenaDia: número do dia rezado (1..9). Se for o próximo dia esperado, incrementa
      const esperado = (meta.progresso || 0) + 1;
      if (novenaDia && novenaDia === esperado) {
        meta.progresso = esperado;
      }
    }

    await verificarConclusaoEMarcar(meta);
    await AsyncStorage.setItem(META_KEY, JSON.stringify(meta));
    return meta;
  } catch (e) {
    console.log("registrarProgressoMetaAoFinalizar error", e);
    return null;
  }
}

async function verificarConclusaoEMarcar(meta) {
  if (!meta) return false;
  if (meta.progresso >= meta.objetivo && !meta.concluido) {
    meta.concluido = true;
    meta.concluidoEm = new Date().toISOString().split("T")[0];
    await arquivarMeta(meta);
    return true;
  }
  return false;
}

async function arquivarMeta(meta) {
  try {
    const raw = await AsyncStorage.getItem(METAS_ARCHIVE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    list.push(meta);
    await AsyncStorage.setItem(METAS_ARCHIVE_KEY, JSON.stringify(list));
    // remove meta ativa
    await AsyncStorage.removeItem(META_KEY);
  } catch (e) {
    console.log("arquivarMeta error", e);
  }
}

export async function getMetasArquivadas() {
  try {
    const raw = await AsyncStorage.getItem(METAS_ARCHIVE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.log("getMetasArquivadas error", e);
    return [];
  }
}

// editar/resetar
export async function atualizarMeta(meta) {
  try {
    await AsyncStorage.setItem(META_KEY, JSON.stringify(meta));
    return meta;
  } catch (e) {
    console.log("atualizarMeta error", e);
    return null;
  }
}
