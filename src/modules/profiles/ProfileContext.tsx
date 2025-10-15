import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'iptv_profiles';

export type Profile = {
  id: string;
  name: string;
  avatar: string;
  pin?: string;
  createdAt: number;
};

export type WatchHistory = {
  streamId: string | number;
  title: string;
  poster?: string;
  lastPosition: number;
  duration: number;
  watchedAt: number;
  type: 'movie' | 'series';
};

export type Favorite = {
  streamId: string | number;
  title: string;
  poster?: string;
  type: 'movie' | 'series';
  addedAt: number;
};

type ProfileData = {
  favorites: Favorite[];
  watchHistory: WatchHistory[];
};

type ProfilesState = {
  profiles: Profile[];
  activeProfileId: string | null;
  profileData: Record<string, ProfileData>;
};

type ProfilesContextType = {
  profiles: Profile[];
  activeProfile: Profile | null;
  selectProfile: (id: string, pin?: string) => boolean;
  createProfile: (name: string, avatar: string, pin?: string) => Profile;
  updateProfile: (id: string, updates: Partial<Omit<Profile, 'id' | 'createdAt'>>) => void;
  deleteProfile: (id: string) => void;
  addFavorite: (item: Omit<Favorite, 'addedAt'>) => void;
  removeFavorite: (streamId: string | number) => void;
  isFavorite: (streamId: string | number) => boolean;
  getFavorites: () => Favorite[];
  updateWatchHistory: (item: Omit<WatchHistory, 'watchedAt'>) => void;
  getWatchHistory: () => WatchHistory[];
  clearProfile: () => void;
  logoutProfile: () => void;
};

const ProfilesContext = createContext<ProfilesContextType | null>(null);

const DEFAULT_AVATARS = [
  '🎬', '🎭', '🎪', '🎨', '🎸', '🎮', '🎯', '🎲',
  '🌟', '⭐', '✨', '💫', '🔥', '⚡', '💎', '🏆'
];

function loadState(): ProfilesState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('[profiles] Failed to load state', error);
  }

  const defaultProfile: Profile = {
    id: crypto.randomUUID(),
    name: 'Perfil Principal',
    avatar: DEFAULT_AVATARS[0],
    createdAt: Date.now()
  };

  return {
    profiles: [defaultProfile],
    activeProfileId: null, // Sempre inicia sem perfil ativo para mostrar seletor
    profileData: {
      [defaultProfile.id]: {
        favorites: [],
        watchHistory: []
      }
    }
  };
}

function saveState(state: ProfilesState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('[profiles] Failed to save state', error);
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProfilesState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const activeProfile = state.profiles.find((p) => p.id === state.activeProfileId) ?? null;

  const selectProfile = useCallback((id: string, pin?: string): boolean => {
    const profile = state.profiles.find((p) => p.id === id);
    if (!profile) {
      return false;
    }

    if (profile.pin && profile.pin !== pin) {
      return false;
    }

    setState((prev) => ({ ...prev, activeProfileId: id }));
    return true;
  }, [state.profiles]);

  const createProfile = useCallback((name: string, avatar: string, pin?: string): Profile => {
    const newProfile: Profile = {
      id: crypto.randomUUID(),
      name: name.trim() || 'Novo Perfil',
      avatar: avatar || DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)],
      pin: pin?.trim() || undefined,
      createdAt: Date.now()
    };

    setState((prev) => ({
      ...prev,
      profiles: [...prev.profiles, newProfile],
      profileData: {
        ...prev.profileData,
        [newProfile.id]: {
          favorites: [],
          watchHistory: []
        }
      }
    }));

    return newProfile;
  }, []);

  const updateProfile = useCallback((id: string, updates: Partial<Omit<Profile, 'id' | 'createdAt'>>) => {
    setState((prev) => ({
      ...prev,
      profiles: prev.profiles.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      )
    }));
  }, []);

  const deleteProfile = useCallback((id: string) => {
    setState((prev) => {
      const remaining = prev.profiles.filter((p) => p.id !== id);
      if (!remaining.length) {
        const defaultProfile: Profile = {
          id: crypto.randomUUID(),
          name: 'Perfil Principal',
          avatar: DEFAULT_AVATARS[0],
          createdAt: Date.now()
        };
        return {
          profiles: [defaultProfile],
          activeProfileId: defaultProfile.id,
          profileData: {
            [defaultProfile.id]: {
              favorites: [],
              watchHistory: []
            }
          }
        };
      }

      const newActiveId = prev.activeProfileId === id ? remaining[0].id : prev.activeProfileId;
      const { [id]: _removed, ...restData } = prev.profileData;

      return {
        profiles: remaining,
        activeProfileId: newActiveId,
        profileData: restData
      };
    });
  }, []);

  const addFavorite = useCallback((item: Omit<Favorite, 'addedAt'>) => {
    if (!state.activeProfileId) return;

    setState((prev) => {
      const currentData = prev.profileData[state.activeProfileId!] ?? { favorites: [], watchHistory: [] };
      const exists = currentData.favorites.some((f) => f.streamId === item.streamId);
      if (exists) return prev;

      return {
        ...prev,
        profileData: {
          ...prev.profileData,
          [state.activeProfileId!]: {
            ...currentData,
            favorites: [
              ...currentData.favorites,
              { ...item, addedAt: Date.now() }
            ]
          }
        }
      };
    });
  }, [state.activeProfileId]);

  const removeFavorite = useCallback((streamId: string | number) => {
    if (!state.activeProfileId) return;

    setState((prev) => {
      const currentData = prev.profileData[state.activeProfileId!] ?? { favorites: [], watchHistory: [] };
      return {
        ...prev,
        profileData: {
          ...prev.profileData,
          [state.activeProfileId!]: {
            ...currentData,
            favorites: currentData.favorites.filter((f) => f.streamId !== streamId)
          }
        }
      };
    });
  }, [state.activeProfileId]);

  const isFavorite = useCallback((streamId: string | number): boolean => {
    if (!state.activeProfileId) return false;
    const data = state.profileData[state.activeProfileId];
    return data?.favorites.some((f) => f.streamId === streamId) ?? false;
  }, [state.activeProfileId, state.profileData]);

  const getFavorites = useCallback((): Favorite[] => {
    if (!state.activeProfileId) return [];
    return state.profileData[state.activeProfileId]?.favorites ?? [];
  }, [state.activeProfileId, state.profileData]);

  const updateWatchHistory = useCallback((item: Omit<WatchHistory, 'watchedAt'>) => {
    if (!state.activeProfileId) return;

    setState((prev) => {
      const currentData = prev.profileData[state.activeProfileId!] ?? { favorites: [], watchHistory: [] };
      const existingIndex = currentData.watchHistory.findIndex((h) => h.streamId === item.streamId);

      let updatedHistory: WatchHistory[];
      if (existingIndex >= 0) {
        updatedHistory = [...currentData.watchHistory];
        updatedHistory[existingIndex] = { ...item, watchedAt: Date.now() };
      } else {
        updatedHistory = [
          { ...item, watchedAt: Date.now() },
          ...currentData.watchHistory
        ].slice(0, 50);
      }

      return {
        ...prev,
        profileData: {
          ...prev.profileData,
          [state.activeProfileId!]: {
            ...currentData,
            watchHistory: updatedHistory
          }
        }
      };
    });
  }, [state.activeProfileId]);

  const getWatchHistory = useCallback((): WatchHistory[] => {
    if (!state.activeProfileId) return [];
    return state.profileData[state.activeProfileId]?.watchHistory ?? [];
  }, [state.activeProfileId, state.profileData]);

  const clearProfile = useCallback(() => {
    setState((prev) => ({ ...prev, activeProfileId: null }));
  }, []);

  const logoutProfile = useCallback(() => {
    setState((prev) => ({ ...prev, activeProfileId: null }));
  }, []);

  return (
    <ProfilesContext.Provider
      value={{
        profiles: state.profiles,
        activeProfile,
        selectProfile,
        createProfile,
        updateProfile,
        deleteProfile,
        addFavorite,
        removeFavorite,
        isFavorite,
        getFavorites,
        updateWatchHistory,
        getWatchHistory,
        clearProfile,
        logoutProfile
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
}

export function useProfiles() {
  const context = useContext(ProfilesContext);
  if (!context) {
    throw new Error('useProfiles must be used within ProfileProvider');
  }
  return context;
}
