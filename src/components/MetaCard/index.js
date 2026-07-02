import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../theme";
import styles from "./styles";

export default function MetaCard({ meta, onPress }) {
    if (!meta) return null;

    const progresso = meta.progresso;
    const objetivo = meta.objetivo;
    const pct = objetivo > 0 ? (progresso / objetivo) * 100 : 0;

    return (
        <Pressable style={styles.card} onPress={onPress}>
            <View style={styles.headerRow}>
                <View style={styles.labelRow}>
                    <MaterialCommunityIcons
                        name="target"
                        size={14}
                        color={COLORS.textoSecundario}
                    />
                    <Text style={styles.label}>Meta atual</Text>
                </View>
                <Text style={styles.progressLabel}>
                    {progresso} de {objetivo}
                </Text>
            </View>

            <Text style={styles.title}>{meta.titulo}</Text>

            <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${pct}%` }]} />
            </View>

            <View style={styles.footerRow}>
                <Text style={styles.footerText}>Ver minha meta</Text>
                <MaterialCommunityIcons
                    name="chevron-right"
                    size={16}
                    color={COLORS.dourado}
                />
            </View>
        </Pressable>
    );
}
