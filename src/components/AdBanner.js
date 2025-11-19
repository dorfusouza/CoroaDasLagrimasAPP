import { View, StyleSheet } from "react-native";
import { AdMobBanner } from "expo-ads-admob";

// TEST ID oficial Google → usar ID real só na publicação
const adUnitId = __DEV__
  ? "ca-app-pub-3940256099942544/6300978111"
  : "ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx";

export default function AdBanner() {
  return (
    <View style={styles.container}>
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID={adUnitId}
        servePersonalizedAds
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingBottom: 4,
  },
});
