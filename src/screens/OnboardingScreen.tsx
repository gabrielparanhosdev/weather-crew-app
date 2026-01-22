import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '../contexts/AuthContext';
import { useOnboarding } from '../hooks/useOnboarding';
import type { AuthStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Bem-vindo ao Weather Crew',
    description: 'Acompanhe o clima em tempo real e receba previsões precisas para os próximos dias.',
    icon: 'house.fill',
    color: '#0a7ea4',
  },
  {
    id: 2,
    title: 'Previsões Detalhadas',
    description: 'Veja previsões para os próximos 7 dias com informações sobre temperatura, umidade e vento.',
    icon: 'paperplane.fill',
    color: '#4CAF50',
  },
  {
    id: 3,
    title: 'Notícias do Clima',
    description: 'Fique por dentro das últimas notícias e atualizações sobre o clima na sua região.',
    icon: 'chevron.left.forwardslash.chevron.right',
    color: '#FF9800',
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const colorScheme = useColorScheme();
  const { completeOnboarding } = useOnboarding();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * SCREEN_WIDTH,
        animated: true,
      });
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    await completeOnboarding();
  };

  const handleLogin = async () => {
    await completeOnboarding();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleRegister = async () => {
    await completeOnboarding();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Register' }],
    });
  };

  const { continueAsGuest } = useAuth();

  const handleContinueAsGuest = async () => {
    await completeOnboarding();
    await continueAsGuest();
    navigation.reset({
      index: 0,
      routes: [{ name: 'GuestHome' }],
    });
    // A navegação será feita automaticamente pelo AppNavigator quando isGuest mudar
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}>
        {slides.map((slide) => (
          <View key={slide.id} style={[styles.slide, { width: SCREEN_WIDTH }]}>
            <View style={styles.iconContainer}>
              <View style={[styles.iconCircle, { backgroundColor: `${slide.color}20` }]}>
                <IconSymbol name={slide.icon as any} size={80} color={slide.color} />
              </View>
            </View>

            <View style={styles.content}>
              <ThemedText type="title" style={styles.title}>
                {slide.title}
              </ThemedText>
              <ThemedText style={styles.description}>{slide.description}</ThemedText>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive,
                index === currentIndex && { backgroundColor: slides[currentIndex].color },
              ]}
            />
          ))}
        </View>

        {currentIndex === slides.length - 1 ? (
          <View style={styles.actionButtons}>
            <View style={styles.topButtonsRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.loginButton, styles.halfWidth]}
                onPress={handleLogin}>
                <ThemedText style={styles.actionButtonText}>Login</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.registerButton, styles.halfWidth]}
                onPress={handleRegister}>
                <ThemedText style={styles.actionButtonText}>Cadastrar</ThemedText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.actionButton, styles.guestButton]}
              onPress={handleContinueAsGuest}>
              <ThemedText style={styles.guestButtonText}>Continuar sem logar</ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: slides[currentIndex].color }]}
            onPress={handleNext}>
            <ThemedText style={styles.nextButtonText}>Próximo</ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 60,
  },
  iconCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 40,
    paddingBottom: 50,
    paddingTop: 30,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 24,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    gap: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    gap: 12,
  },
  topButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halfWidth: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#0a7ea4',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
  },
  guestButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#0a7ea4',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  guestButtonText: {
    color: '#0a7ea4',
    fontSize: 16,
    fontWeight: '600',
  },
});
