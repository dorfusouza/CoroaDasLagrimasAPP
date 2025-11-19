
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import oracoes from '../oracoes';

export default function Coroa() {
  const [index, setIndex] = useState(0);

  function avancar() {
    if (index < oracoes.length - 1) setIndex(index + 1);
  }

  function voltar() {
    if (index > 0) setIndex(index - 1);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{oracoes[index].titulo}</Text>
      <Text style={styles.text}>{oracoes[index].texto}</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.btnSmall} onPress={voltar}><Text style={styles.btntxt}>Voltar</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btnBig} onPress={avancar}><Text style={styles.btntxt}>Avançar</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, backgroundColor:'#F3EFFF' },
  title:{ fontSize:22, fontWeight:'bold', marginBottom:20, color:'#4B0082' },
  text:{ fontSize:18, marginBottom:40 },
  row:{ flexDirection:'row', justifyContent:'space-between' },
  btnSmall:{ backgroundColor:'#4169E1', padding:15, borderRadius:10 },
  btnBig:{ backgroundColor:'#4B0082', padding:20, borderRadius:10 },
  btntxt:{ color:'white', fontSize:18 }
});
