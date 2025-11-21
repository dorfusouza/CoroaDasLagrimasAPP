import React from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function DevocionarioScreen({ navigation }) {
    return (
        <LinearGradient
            colors={["#19204A", "#4B1C56", "#CFAF56"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Devocionário de Nossa Senhora das Lágrimas</Text>

                <Text style={styles.sectionTitle}>História</Text>
                <Text style={styles.text}>
                    A devoção a Nossa Senhora das Lágrimas está intimamente ligada às
                    manifestações recebidas pela Irmã Amália Aguirre, em Campinas (SP),
                    no ano de 1930. Segundo o relato, a própria Virgem Santíssima
                    ensinou-lhe a Coroa das Lágrimas — uma oração poderosa composta de sete
                    grupos de súplicas, meditadas em união às lágrimas da Mãe Dolorosa.
                </Text>

                <Text style={styles.text}>
                    Esta devoção foi registrada, promovida e novamente difundida em nossos
                    tempos por diversos apostolados, entre eles os estudos e materiais do
                    Prof. Raphael Tonon, que organizou a doutrina espiritual, textos e
                    exercícios devocionais ligados às Lágrimas de Maria.
                </Text>

                <Text style={styles.sectionTitle}>Material de Estudo e Oração</Text>

                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() =>
                        Linking.openURL("https://livrariaraphaeltonon.com.br/devocionario-das-lagrimas")
                    }
                >
                    <Text style={styles.linkText}>📘 Comprar Devocionário (Raphael Tonon)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() =>
                        Linking.openURL("https://www.youtube.com/results?search_query=raphael+tonon+lágrimas")
                    }
                >
                    <Text style={styles.linkText}>🎥 Aulas e Reflexões no YouTube</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() =>
                        Linking.openURL("https://shopee.com.br/shop/570569248")
                    }
                >
                    <Text style={styles.linkText}>📿Comprar Coroa das Lágrimas (Shopee)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => navigation.navigate("Rosario")}
                >
                    <Text style={styles.linkText}>🙏 Rezar a Coroa das Lágrimas</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: { flex: 1 },

    content: {
        padding: 20,
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#F9F7F3",
        textAlign: "center",
        marginBottom: 30,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#E2C878",
        marginTop: 20,
        marginBottom: 8,
    },

    text: {
        color: "#F9F7F3",
        fontSize: 17,
        lineHeight: 26,
        marginBottom: 10,
    },

    linkButton: {
        backgroundColor: "#3B4C97aa",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginTop: 15,
    },

    linkText: {
        color: "#fff",
        fontSize: 17,
        textAlign: "center",
    },
});
