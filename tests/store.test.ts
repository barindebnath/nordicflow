import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '@/lib/store/useStore';

describe('Zustand Store Integration', () => {
  beforeEach(() => {
    // Reset store to initial defaults before each test
    useStore.setState({
      user: null,
      isAuthenticated: false,
      repos: [
        { id: '1', name: 'checkout-web', owner: 'Northwind Labs', dxScore: 82, openPrs: 7, deployFreq: 14 },
        { id: '2', name: 'accounts-ui', owner: 'Northwind Labs', dxScore: 76, openPrs: 4, deployFreq: 10 }
      ],
      pulls: {
        '1': [
          { id: 'p1', title: 'Refactor cart state synchronization', risk: 'High', filesChanged: 28, loc: 920, hoursOpen: 53, reviews: 1 },
          { id: 'p2', title: 'Improve payment retry telemetry', risk: 'Low', filesChanged: 5, loc: 120, hoursOpen: 9, reviews: 2 }
        ],
        '2': [{ id: 'p3', title: 'Migrate profile settings to React Hook Form', risk: 'Medium', filesChanged: 11, loc: 430, hoursOpen: 26, reviews: 1 }]
      },
      builds: {
        '1': [
          { id: 'b1', status: 'success', duration: 412, createdAt: '2026-05-22T09:42:00Z' },
          { id: 'b2', status: 'failed', duration: 398, createdAt: '2026-05-21T10:15:00Z' }
        ],
        '2': [
          { id: 'b3', status: 'success', duration: 281, createdAt: '2026-05-22T11:30:00Z' },
          { id: 'b4', status: 'success', duration: 300, createdAt: '2026-05-21T14:05:00Z' }
        ]
      },
      notifications: [
        {
          id: 'n1',
          type: 'warning',
          message: 'High-risk PR detected in checkout-web: "Refactor cart state synchronization" (920 LOC)',
          timestamp: '2026-05-24T14:00:00Z',
          read: false,
        }
      ],
      settings: {
        leadTimeThreshold: 48,
        prSizeTarget: 250,
        syncSchedule: 'daily',
        alertOnFailures: true,
        alertOnHighRisk: true,
      },
      syncStatus: {
        syncing: false,
        progress: 0,
        currentRepo: null,
      }
    });
  });

  it('verifies initial state is set correctly', () => {
    const state = useStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.repos.length).toBe(2);
    expect(state.notifications.length).toBe(1);
  });

  it('handles login and logout actions correctly', () => {
    const store = useStore.getState();
    
    // Login
    store.login('kbacon');
    let state = useStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.username).toBe('kbacon');
    expect(state.user?.name).toBe('kbacon');
    expect(state.user?.email).toBe('kbacon@northwindlabs.dk');
    expect(state.notifications[0].message).toContain('Welcome to NordicFlow');

    // Logout
    state.logout();
    state = useStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  it('updates settings state correctly', () => {
    const store = useStore.getState();
    store.updateSettings({ leadTimeThreshold: 24, prSizeTarget: 150 });
    
    const state = useStore.getState();
    expect(state.settings.leadTimeThreshold).toBe(24);
    expect(state.settings.prSizeTarget).toBe(150);
    expect(state.settings.syncSchedule).toBe('daily'); // unchanged
  });

  it('manages repository addition and deletion', () => {
    const store = useStore.getState();
    
    // Add repo
    store.addRepo('new-service', 'Northwind Labs');
    let state = useStore.getState();
    expect(state.repos.length).toBe(3);
    
    const newRepo = state.repos.find(r => r.name === 'new-service');
    expect(newRepo).toBeDefined();
    expect(newRepo?.owner).toBe('Northwind Labs');
    expect(newRepo?.openPrs).toBe(0);
    expect(state.pulls[newRepo!.id]).toEqual([]);
    expect(state.builds[newRepo!.id]).toEqual([]);

    // Delete repo
    store.deleteRepo(newRepo!.id);
    state = useStore.getState();
    expect(state.repos.length).toBe(2);
    expect(state.repos.find(r => r.name === 'new-service')).toBeUndefined();
    expect(state.pulls[newRepo!.id]).toBeUndefined();
  });

  it('appends pull requests and increments open PR counts', () => {
    const store = useStore.getState();
    
    store.addPullRequest('1', {
      title: 'Update database connections',
      risk: 'Low',
      filesChanged: 2,
      loc: 45,
      hoursOpen: 1,
      reviews: 0
    });

    const state = useStore.getState();
    const repo1 = state.repos.find(r => r.id === '1');
    expect(repo1?.openPrs).toBe(8); // 7 initial + 1 new
    expect(state.pulls['1'][0].title).toBe('Update database connections');
    expect(state.pulls['1'][0].risk).toBe('Low');
  });

  it('triggers a notification alert when a High Risk PR is added', () => {
    const store = useStore.getState();
    
    store.addPullRequest('1', {
      title: 'Major payment refactor',
      risk: 'High',
      filesChanged: 45,
      loc: 1200,
      hoursOpen: 12,
      reviews: 0
    });

    const state = useStore.getState();
    expect(state.notifications[0].type).toBe('warning');
    expect(state.notifications[0].message).toContain('High risk PR detected');
    expect(state.notifications[0].message).toContain('Major payment refactor');
  });

  it('appends builds to repositories', () => {
    const store = useStore.getState();
    
    store.addBuild('2', {
      status: 'success',
      duration: 250,
      createdAt: '2026-05-24T12:00:00Z'
    });

    const state = useStore.getState();
    expect(state.builds['2'][0].status).toBe('success');
    expect(state.builds['2'][0].duration).toBe(250);
  });

  it('triggers a notification alert on build failures', () => {
    const store = useStore.getState();
    
    store.addBuild('1', {
      status: 'failed',
      duration: 320,
      createdAt: '2026-05-24T12:10:00Z'
    });

    const state = useStore.getState();
    expect(state.notifications[0].type).toBe('error');
    expect(state.notifications[0].message).toContain('Build failed for checkout-web');
  });

  it('manages notifications read state and clearance', () => {
    const store = useStore.getState();
    
    store.dismissNotification('n1');
    let state = useStore.getState();
    expect(state.notifications.find(n => n.id === 'n1')?.read).toBe(true);

    store.clearNotifications();
    state = useStore.getState();
    expect(state.notifications.length).toBe(0);
  });

  it('restores state on demo sandbox reset', () => {
    const store = useStore.getState();
    store.login('kbacon');
    store.clearNotifications();
    
    store.resetToDemo();
    const state = useStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.name).toBe('Lars Sørensen');
    expect(state.user?.email).toBe('lars@northwindlabs.dk');
    expect(state.notifications.length).toBeGreaterThan(0);
  });
});
