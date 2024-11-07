import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  company?: string;
  website?: string;
  completedCourses: string[];
  currentPath?: string;
  progress: Record<string, number>;
}

interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: string;
    showActivity: boolean;
  };
  appearance: {
    theme: string;
    fontSize: string;
  };
  language: string;
}

interface UserState {
  user: User | null;
  settings: UserSettings;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateSettings: (settings: UserSettings) => void;
  updateProgress: (courseId: string, progress: number) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      settings: {
        notifications: {
          email: true,
          push: true,
          marketing: false,
        },
        privacy: {
          profileVisibility: 'public',
          showActivity: true,
        },
        appearance: {
          theme: 'system',
          fontSize: 'medium',
        },
        language: 'en',
      },
      isAuthenticated: false,
      login: async (email, password) => {
        if (email === 'demo@skillbridge.com' && password === 'demo123') {
          set({
            user: {
              id: 'demo-user',
              email: 'demo@skillbridge.com',
              name: 'Demo User',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              bio: 'Passionate about learning and technology',
              location: 'San Francisco, CA',
              company: 'Tech Corp',
              website: 'https://demo.skillbridge.com',
              completedCourses: [],
              progress: {},
            },
            isAuthenticated: true,
          });
        } else {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: newSettings,
        })),
      updateProgress: (courseId, progress) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                progress: { ...state.user.progress, [courseId]: progress },
              }
            : null,
        })),
    }),
    {
      name: 'user-storage',
    }
  )
);