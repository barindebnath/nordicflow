import { create } from 'zustand';
import { Repo, PullRequest, Build } from '@/lib/types';
import { repos as initialRepos, pullsByRepo as initialPulls, buildsByRepo as initialBuilds } from '@/lib/data/mock-data';

// INP optimization helper: runs heavy CPU simulation yielding control back to main thread periodically
async function analyzeCodebaseComplexity(complexityWeight: number) {
  let deadline = performance.now() + 50; // 50ms budget
  let result = 0;
  
  for (let i = 0; i < complexityWeight; i++) {
    // Heavy math calculations to simulate analysis
    for (let j = 0; j < 150000; j++) {
      result += Math.sin(j) * Math.cos(j);
    }
    
    // Yield execution to prevent UI-blocking Long Tasks
    if (performance.now() >= deadline) {
      if (typeof window !== 'undefined' && 'scheduler' in window && 'yield' in (window.scheduler as any)) {
        await (window.scheduler as any).yield();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
      deadline = performance.now() + 50; // Reset budget
    }
  }
  return result;
}

export interface User {
  username: string;
  name: string;
  avatarUrl: string;
  email: string;
}

export interface AppNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Settings {
  leadTimeThreshold: number; // in hours
  prSizeTarget: number; // in LOC
  syncSchedule: 'hourly' | 'daily' | 'weekly' | 'manual';
  alertOnFailures: boolean;
  alertOnHighRisk: boolean;
}

interface StoreState {
  // Auth State
  user: User | null;
  isAuthenticated: boolean;
  
  // Data State
  repos: Repo[];
  pulls: Record<string, PullRequest[]>;
  builds: Record<string, Build[]>;
  
  // Sync State
  syncStatus: {
    syncing: boolean;
    progress: number;
    currentRepo: string | null;
  };
  
  // Settings State
  settings: Settings;
  
  // Notifications State
  notifications: AppNotification[];
  
  // Actions
  login: (username: string) => void;
  logout: () => void;
  startSync: (repoId?: string) => Promise<void>;
  updateSettings: (settings: Partial<Settings>) => void;
  addRepo: (name: string, owner: string) => void;
  deleteRepo: (id: string) => void;
  addPullRequest: (repoId: string, pr: Omit<PullRequest, 'id'>) => void;
  addBuild: (repoId: string, build: Omit<Build, 'id'>) => void;
  dismissNotification: (id: string) => void;
  clearNotifications: () => void;
  resetToDemo: () => void;
}

const defaultSettings: Settings = {
  leadTimeThreshold: 48,
  prSizeTarget: 250,
  syncSchedule: 'daily',
  alertOnFailures: true,
  alertOnHighRisk: true,
};

const initialNotifications: AppNotification[] = [
  {
    id: 'n1',
    type: 'warning',
    message: 'High-risk PR detected in checkout-web: "Refactor cart state synchronization" (920 LOC)',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    read: false,
  },
  {
    id: 'n2',
    type: 'error',
    message: 'Build #b2 failed in checkout-web during deployment confidence checks.',
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    read: false,
  },
  {
    id: 'n3',
    type: 'success',
    message: 'Simulated repository sync completed successfully.',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    read: true,
  }
];

export const useStore = create<StoreState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  repos: initialRepos,
  pulls: initialPulls,
  builds: initialBuilds,
  syncStatus: {
    syncing: false,
    progress: 0,
    currentRepo: null,
  },
  settings: defaultSettings,
  notifications: initialNotifications,

  login: (username) => {
    const user: User = {
      username,
      name: username === 'demo' ? 'Lars Sørensen' : username,
      avatarUrl: `https://github.com/${username}.png`,
      email: `${username}@northwindlabs.dk`,
    };
    set({ user, isAuthenticated: true });
    
    // Add welcome notification
    const welcomeNotification: AppNotification = {
      id: `welcome-${Date.now()}`,
      type: 'info',
      message: `Signed in as ${user.name}. Welcome to NordicFlow.`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    set(state => ({ notifications: [welcomeNotification, ...state.notifications] }));
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  startSync: async (repoId) => {
    const state = get();
    if (state.syncStatus.syncing) return;

    const targetRepoName = repoId 
      ? state.repos.find(r => r.id === repoId)?.name || 'repository'
      : 'all repositories';

    set({
      syncStatus: {
        syncing: true,
        progress: 0,
        currentRepo: targetRepoName,
      }
    });

    // Simulate progress
    const steps = 10;
    for (let i = 1; i <= steps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      await analyzeCodebaseComplexity(30); // Yielding CPU calculations to keep UI thread unblocked
      set((state) => ({
        syncStatus: {
          ...state.syncStatus,
          progress: Math.min(i * 10, 100),
        }
      }));
    }

    // Update synced repo DX score slightly to simulate analysis updates
    set((state) => {
      const updatedRepos = state.repos.map((repo) => {
        if (!repoId || repo.id === repoId) {
          // Adjust DX score slightly up or down to show sync updates
          const delta = Math.floor(Math.random() * 5) - 2;
          return {
            ...repo,
            dxScore: Math.min(Math.max(repo.dxScore + delta, 0), 100),
          };
        }
        return repo;
      });

      const newNotification: AppNotification = {
        id: `sync-${Date.now()}`,
        type: 'success',
        message: `Successfully synchronized data for ${targetRepoName}.`,
        timestamp: new Date().toISOString(),
        read: false,
      };

      return {
        repos: updatedRepos,
        syncStatus: {
          syncing: false,
          progress: 0,
          currentRepo: null,
        },
        notifications: [newNotification, ...state.notifications],
      };
    });
  },

  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings }
    }));
  },

  addRepo: (name, owner) => {
    set((state) => {
      const newId = String(state.repos.length + 1);
      const newRepo: Repo = {
        id: newId,
        name,
        owner,
        dxScore: 70 + Math.floor(Math.random() * 20), // random starting score
        openPrs: 0,
        deployFreq: 5 + Math.floor(Math.random() * 10),
      };

      return {
        repos: [...state.repos, newRepo],
        pulls: { ...state.pulls, [newId]: [] },
        builds: { ...state.builds, [newId]: [] },
      };
    });
  },

  deleteRepo: (id) => {
    set((state) => {
      const updatedRepos = state.repos.filter(r => r.id !== id);
      const updatedPulls = { ...state.pulls };
      const updatedBuilds = { ...state.builds };
      delete updatedPulls[id];
      delete updatedBuilds[id];

      return {
        repos: updatedRepos,
        pulls: updatedPulls,
        builds: updatedBuilds,
      };
    });
  },

  addPullRequest: (repoId, pr) => {
    set((state) => {
      const currentPulls = state.pulls[repoId] || [];
      const newPr: PullRequest = {
        ...pr,
        id: `pr-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      };

      // Recalculate repo open prs
      const updatedRepos = state.repos.map(r => 
        r.id === repoId ? { ...r, openPrs: r.openPrs + 1 } : r
      );

      // Create notification for high risk PR if enabled
      const newNotifications = [...state.notifications];
      if (pr.risk === 'High' && state.settings.alertOnHighRisk) {
        newNotifications.unshift({
          id: `alert-pr-${Date.now()}`,
          type: 'warning',
          message: `High risk PR detected in ${updatedRepos.find(r => r.id === repoId)?.name}: "${pr.title}"`,
          timestamp: new Date().toISOString(),
          read: false,
        });
      }

      return {
        pulls: {
          ...state.pulls,
          [repoId]: [newPr, ...currentPulls],
        },
        repos: updatedRepos,
        notifications: newNotifications,
      };
    });
  },

  addBuild: (repoId, build) => {
    set((state) => {
      const currentBuilds = state.builds[repoId] || [];
      const newBuild: Build = {
        ...build,
        id: `build-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      };

      const newNotifications = [...state.notifications];
      if (build.status === 'failed' && state.settings.alertOnFailures) {
        newNotifications.unshift({
          id: `alert-build-${Date.now()}`,
          type: 'error',
          message: `Build failed for ${state.repos.find(r => r.id === repoId)?.name || 'repository'}.`,
          timestamp: new Date().toISOString(),
          read: false,
        });
      }

      return {
        builds: {
          ...state.builds,
          [repoId]: [newBuild, ...currentBuilds],
        },
        notifications: newNotifications,
      };
    });
  },

  dismissNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => 
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  resetToDemo: () => {
    set({
      user: {
        username: 'demo',
        name: 'Lars Sørensen',
        avatarUrl: 'https://github.com/github.png',
        email: 'lars@northwindlabs.dk',
      },
      isAuthenticated: true,
      repos: initialRepos,
      pulls: initialPulls,
      builds: initialBuilds,
      notifications: initialNotifications,
      settings: defaultSettings,
      syncStatus: {
        syncing: false,
        progress: 0,
        currentRepo: null,
      }
    });
  }
}));
