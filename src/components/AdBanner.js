import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function AdBanner() {
    return (
        <View style={styles.container}>
            <WebView
                style={styles.webview}
                scrollEnabled={false}
                javaScriptEnabled
                source={{
                    html: `
            <html>
            <body style="margin:0;padding:0;background:transparent;display:flex;justify-content:center;align-items:center;">
              <iframe 
                style="border:0;width:100%;height:50px;"
                src="https://ads.expo.dev/banner.html" 
              ></iframe>
            </body>
            </html>
          `,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 55,
        backgroundColor: "#00000022",
        justifyContent: "center",
    },
    webview: {
        width: "100%",
        height: 50,
        backgroundColor: "transparent",
    }, 

});
