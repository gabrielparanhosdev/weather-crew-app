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

01/02/2025 - Implementação de sistema de autenticação

- Criado contexto de autenticação (AuthContext) com gerenciamento de estado de usuário
- Implementada navegação condicional baseada em estado de autenticação
- Criadas telas de Login e Register com validação de formulários
- Criado AuthNavigator para usuários não autenticados
- Modificado AppNavigator para renderizar condicionalmente AuthNavigator ou TabNavigator
- Adicionado botão de logout na HomeScreen
- Implementado persistência de autenticação usando AsyncStorage
- Adicionada dependência @react-native-async-storage/async-storage
- Criados testes unitários para AuthContext, LoginScreen, RegisterScreen e AuthNavigator
- Atualizado App.tsx para incluir AuthProvider

01/02/2025 - Implementação de tela de onboarding com swipe

- Criada tela de onboarding (OnboardingScreen) com navegação por swipe
- Implementado hook useOnboarding para gerenciar estado de onboarding
- Adicionada persistência de status de onboarding usando AsyncStorage
- Modificado AuthNavigator para mostrar onboarding na primeira vez que o app é aberto
- Criados 3 slides de apresentação com ícones e descrições
- Implementados indicadores de paginação e botões de navegação
- Adicionada opção de pular o onboarding
- Criados testes unitários para OnboardingScreen e useOnboarding
- Atualizados tipos de navegação para incluir tela de onboarding

01/02/2025 - Adicionado modo guest e opções no onboarding

- Modificado OnboardingScreen para exibir 3 opções no último slide: Login, Cadastro e Continuar sem logar
- Implementado modo guest/anônimo no AuthContext
- Criada tela GuestHomeScreen para usuários que continuam sem login
- Modificado AppNavigator para permitir acesso às telas principais em modo guest
- Adicionada função continueAsGuest no AuthContext
- Modo guest é desativado automaticamente quando usuário faz login ou cadastro
- Persistência do modo guest usando AsyncStorage
- Atualizados tipos de navegação para incluir GuestHome
