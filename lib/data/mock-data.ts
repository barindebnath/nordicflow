import { Build, PullRequest, Repo } from '@/lib/types';
export const repos: Repo[] = [
  { id: '1', name: 'checkout-web', owner: 'Northwind Labs', dxScore: 82, openPrs: 7, deployFreq: 14 },
  { id: '2', name: 'accounts-ui', owner: 'Northwind Labs', dxScore: 76, openPrs: 4, deployFreq: 10 }
];
export const pullsByRepo: Record<string, PullRequest[]> = {
  '1': [
    { id: 'p1', title: 'Refactor cart state synchronization', risk: 'High', filesChanged: 28, loc: 920, hoursOpen: 53, reviews: 1 },
    { id: 'p2', title: 'Improve payment retry telemetry', risk: 'Low', filesChanged: 5, loc: 120, hoursOpen: 9, reviews: 2 }
  ],
  '2': [{ id: 'p3', title: 'Migrate profile settings to React Hook Form', risk: 'Medium', filesChanged: 11, loc: 430, hoursOpen: 26, reviews: 1 }]
};
export const buildsByRepo: Record<string, Build[]> = {
  '1': [
    { id: 'b1', status: 'success', duration: 412, createdAt: '2026-05-22T09:42:00Z' },
    { id: 'b2', status: 'failed', duration: 398, createdAt: '2026-05-21T10:15:00Z' }
  ],
  '2': [
    { id: 'b3', status: 'success', duration: 281, createdAt: '2026-05-22T11:30:00Z' },
    { id: 'b4', status: 'success', duration: 300, createdAt: '2026-05-21T14:05:00Z' }
  ]
};
