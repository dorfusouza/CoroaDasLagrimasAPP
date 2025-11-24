import React from "react";
import { View, Text } from "react-native";
import AppButton from "../AppButton";
import styles from "./styles";

export default function MetaCard({ meta, onPress }) {
    if (!meta) return null;

    const progresso = meta.progresso;
    const objetivo = meta.objetivo;
    const pct = objetivo > 0 ? (progresso / objetivo) * 100 : 0;

    return (
        <View style={styles.card}>
            <Text style={styles.title}>🎯 Meta ativa</Text>

            <Text style={styles.text}>{meta.titulo}</Text>

            <Text style={styles.progressText}>
                {progresso} / {objetivo}
            </Text>

            {/* Barra de progresso */}
            <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${pct}%` }]} />
            </View>

            <View style={styles.buttonWrapper}>
                <AppButton
                    label="Ver minha meta"
                    mode="secondary"
                    onPress={onPress}
                />
            </View>
        </View>
    );
}
