import mobileAds, {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

// ─────────────────────────────────────────────
// IDs de anúncio  (troque pelos seus quando publicar)
// ─────────────────────────────────────────────
const IS_TEST = __DEV__;

export const BANNER_ID = IS_TEST
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-7069143233004245/XXXXXXXXXX"; // ← substitua pelo seu Ad Unit de banner

export const INTERSTITIAL_ID = IS_TEST
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-7069143233004245/XXXXXXXXXX"; // ← substitua pelo seu Ad Unit de intersticial

// ─────────────────────────────────────────────
// Inicializar SDK (chamar uma vez no boot)
// ─────────────────────────────────────────────
export async function initAds() {
  try {
    await mobileAds().initialize();
    console.log("✅ AdMob SDK inicializado");
  } catch (e) {
    console.log("❌ Erro ao inicializar AdMob", e);
  }
}

// ─────────────────────────────────────────────
// Helper para intersticial
// ─────────────────────────────────────────────
export function loadInterstitial(onClosed) {
  const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_ID);

  const unsubLoaded = interstitial.addAdEventListener(
    AdEventType.LOADED,
    () => {
      interstitial.show();
    }
  );

  const unsubClosed = interstitial.addAdEventListener(
    AdEventType.CLOSED,
    () => {
      unsubLoaded();
      unsubClosed();
      unsubError();
      if (onClosed) onClosed();
    }
  );

  const unsubError = interstitial.addAdEventListener(
    AdEventType.ERROR,
    (error) => {
      console.log("AdMob Error:", error);
      unsubLoaded();
      unsubClosed();
      unsubError();
      if (onClosed) onClosed();
    }
  );

  interstitial.load();

  return () => {
    unsubLoaded();
    unsubClosed();
    unsubError();
  };
}
