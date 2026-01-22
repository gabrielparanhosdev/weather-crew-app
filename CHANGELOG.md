# Changelog

01/02/2025 - 13:33 - Migração para React Navigation

- Migrado de Expo Router para React Navigation tradicional
- Criada estrutura de navegação com Bottom Tabs e Stack Navigator
- Movidas telas para src/screens (HomeScreen, ExploreScreen, ModalScreen)
- Criado App.tsx como entry point principal
- Criado src/navigation/AppNavigator.tsx com NavigationContainer e Stack Navigator
- Criado src/navigation/TabNavigator.tsx com Bottom Tab Navigator
- Criado src/navigation/types.ts com tipos TypeScript para navegação
- Atualizado package.json para usar expo/AppEntry.js e adicionado @react-navigation/native-stack
- Atualizado app.json removendo expo-router dos plugins
- Criados testes unitários para todas as telas e navegador
- Adicionadas dependências de teste (jest, jest-expo, @testing-library/react-native)
