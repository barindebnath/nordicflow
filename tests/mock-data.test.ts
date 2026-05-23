import { describe, it, expect } from 'vitest';
import { repos, pullsByRepo } from '@/lib/data/mock-data';
describe('mock data integrity', () => {
  it('has repositories', () => { expect(repos.length).toBeGreaterThan(0); });
  it('contains risk labels for PR analysis', () => {
    const risks = pullsByRepo['1'].map((p) => p.risk);
    expect(risks).toContain('High');
  });
});
