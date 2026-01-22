import { renderHook, act } from '@testing-library/react-native';
import { useOnboarding } from '../useOnboarding';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

describe('useOnboarding', () => {
  it('deve retornar valores iniciais corretos', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useOnboarding());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasSeenOnboarding).toBe(false);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
  });

  it('deve completar o onboarding corretamente', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useOnboarding());

    await waitForNextUpdate();

    await act(async () => {
      await result.current.completeOnboarding();
    });

    expect(result.current.hasSeenOnboarding).toBe(true);
  });
});
