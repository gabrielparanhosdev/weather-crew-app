import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const ONBOARDING_STORAGE_KEY = '@weather_crew:onboarding_completed';

export function useOnboarding() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOnboardingStatus();
  }, []);

  const loadOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);
      setHasSeenOnboarding(value === 'true');
    } catch (error) {
      console.error('Erro ao carregar status de onboarding:', error);
      setHasSeenOnboarding(false);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error('Erro ao salvar status de onboarding:', error);
    }
  };

  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem(ONBOARDING_STORAGE_KEY);
      setHasSeenOnboarding(false);
    } catch (error) {
      console.error('Erro ao resetar onboarding:', error);
    }
  };

  return {
    hasSeenOnboarding: hasSeenOnboarding ?? false,
    isLoading,
    completeOnboarding,
    resetOnboarding,
  };
}
