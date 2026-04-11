# Coroa das Lágrimas

Aplicativo móvel devocional dedicado à reza da Coroa das Lágrimas de Nossa Senhora. O app oferece uma interface moderna e intuitiva para acompanhar as orações, gerenciar metas espirituais e acessar um devocionário completo.

## ✨ Funcionalidades

- **Coroa Interativa:** Sequência guiada de orações da Coroa das Lágrimas.
- **Gestão de Metas:** Crie metas de oração e acompanhe seu progresso diário com indicadores visuais.
- **Devocionário:** Acesso à história, orações diversas, jaculatórias e novenas.
- **Monetização:** Integração com Google AdMob (Banners e Intersticiais).
- **Design Premium:** Interface com cores harmônicas, gradientes e modo escuro nativo.

## 🚀 Tecnologias

- **Framework:** [Expo](https://expo.dev/) (SDK 51)
- **Base:** React Native
- **Navegação:** React Navigation
- **Anúncios:** `react-native-google-mobile-ads`
- **Componentes:** Expo Linear Gradient, Safe Area Context.

## 🛠️ Configuração e Instalação

### Pré-requisitos
- Node.js instalado.
- Expo CLI.
- EAS CLI (para builds nativos).
- Ambiente Android/iOS configurado (para Development Builds).

### Instalação
1. Clone o repositório.
2. Instale as dependências:
   ```bash
   npm install
   ```

### Execução
Como o projeto utiliza módulos nativos (AdMob), ele requer um **Development Build**:
```bash
npx expo run:android
# ou
npx expo run:ios
```

## 💰 Configuração de Anúncios

Os IDs de anúncio estão centralizados em `src/utils/ads.js`.
- Em modo `__DEV__`, o app usa IDs de teste do Google automaticamente.
- Para produção, substitua os valores em `src/utils/ads.js` pelos seus IDs gerados no painel do AdMob.
- Certifique-se de que o `android_app_id` no `app.json` corresponde ao seu App ID do AdMob.

---
Desenvolvido com fé e tecnologia.