export const OFERECIMENTO = `Eis-nos aqui aos Vossos pés, ó dulcíssimo Jesus Crucificado, para Vos oferecermos as lágrimas d'Aquela que, com tanto amor, Vos acompanhou no caminho doloroso do Calvário. Fazei, ó bom Mestre, que nós saibamos aproveitar da lição que elas nos dão, para que, na Terra, realizando a Vossa Santíssima Vontade, possamos um dia, no Céu, Vos louvar por toda a eternidade. Amém.`;

export const ORACAO_CONTA_MAIOR = `Vede, ó Jesus, que são as lágrimas d'Aquela que mais Vos amou na Terra, e que mais Vos ama no Céu.`;

export const ORACAO_CONTA_MENOR = `Meu Jesus, ouvi os nossos rogos, pelas Lágrimas de Vossa Mãe Santíssima.`;

export const TRES_FINAIS = `Vede, ó Jesus, que são as lágrimas d'Aquela que mais Vos amou na Terra, e que mais Vos ama no Céu.`;

export const OREMOS = `Virgem Santíssima e Mãe das Dores, nós Vos pedimos que junteis os Vossos rogos aos nossos, a fim de que Jesus, Vosso Divino Filho, a quem nos dirigimos em nome das Vossas lágrimas de Mãe, ouça as nossas preces e nos conceda, com as graças que desejamos, a coroa da vida eterna. Amém.`;

export const JACULATORIAS = [
  `Por Vossa mansidão divina, ó Jesus, salvai o mundo do erro que o ameaça!`,
  `Ó Virgem Dolorosíssima, as Vossas Lágrimas derrubaram o império infernal!`
];

export function gerarSequencia() {
  const seq = [];

  seq.push({ tipo: "oferecimento", texto: OFERECIMENTO });

  // Sete mistérios
  for (let g = 1; g <= 7; g++) {
    seq.push({ tipo: "conta-maior", texto: ORACAO_CONTA_MAIOR, grupo: g });
    for (let i = 1; i <= 7; i++) {
      seq.push({ tipo: "conta-menor", texto: ORACAO_CONTA_MENOR, grupo: g, ordem: i });
    }
  }

  // Três contas finais
  for (let i = 1; i <= 3; i++) {
    seq.push({ tipo: "conta-final", texto: TRES_FINAIS, ordem: i });
  }

  seq.push({ tipo: "oremos", texto: OREMOS });
  seq.push({ tipo: "jaculatoria", texto: JACULATORIAS[0], face: 1 });
  seq.push({ tipo: "jaculatoria", texto: JACULATORIAS[1], face: 2 });

  return seq;
}
