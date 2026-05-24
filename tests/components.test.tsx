import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetricCard } from '@/components/dashboard/metric-card';
import { AppShell } from '@/components/layout/app-shell';
import { useStore } from '@/lib/store/useStore';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}));

describe('MetricCard Component', () => {
  it('renders title, value, and delta correctly', () => {
    render(
      <MetricCard 
        title="Deployment Frequency" 
        value="12.5/day" 
        delta="↑ 15% vs last week" 
      />
    );

    expect(screen.getByText('Deployment Frequency')).toBeInTheDocument();
    expect(screen.getByText('12.5/day')).toBeInTheDocument();
    expect(screen.getByText('↑ 15% vs last week')).toBeInTheDocument();
  });
});

describe('AppShell Component', () => {
  beforeEach(() => {
    // Reset state before rendering
    useStore.setState({
      user: {
        username: 'lars',
        name: 'Lars Sørensen',
        avatarUrl: 'https://github.com/lars.png',
        email: 'lars@northwindlabs.dk',
      },
      isAuthenticated: true,
      repos: [],
      pulls: {},
      builds: {},
      notifications: [
        { id: 'n1', type: 'info', message: 'Test message 1', timestamp: '2026-05-24T12:00:00Z', read: false },
        { id: 'n2', type: 'error', message: 'Test message 2', timestamp: '2026-05-24T12:00:00Z', read: true },
      ],
      syncStatus: {
        syncing: false,
        progress: 0,
        currentRepo: null,
      },
      settings: {
        leadTimeThreshold: 48,
        prSizeTarget: 250,
        syncSchedule: 'daily',
        alertOnFailures: true,
        alertOnHighRisk: true,
      }
    });
  });

  it('renders navigation links and branding title', () => {
    render(
      <AppShell>
        <div data-testid="child-content">Main Workspace Content</div>
      </AppShell>
    );

    // Verify logo and branding title
    expect(screen.getAllByText('NordicFlow')).toHaveLength(2); // Desktop and Mobile views
    
    // Verify desktop sidebar links
    expect(screen.getByRole('link', { name: /Dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Repositories/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Settings/i })).toBeInTheDocument();

    // Verify children rendering
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('displays authenticated user profile information', () => {
    render(
      <AppShell>
        <div>Content</div>
      </AppShell>
    );

    // Verify avatar and user name
    const avatars = screen.getAllByRole('img');
    expect(avatars.length).toBeGreaterThan(0);
    expect(screen.getAllByText('Lars Sørensen')[0]).toBeInTheDocument();
    expect(screen.getAllByText('lars@northwindlabs.dk')[0]).toBeInTheDocument();
  });

  it('renders sync indicator controls', () => {
    render(
      <AppShell>
        <div>Content</div>
      </AppShell>
    );

    // Verify "Sync Now" button exists since syncing is false
    expect(screen.getByText('Sync Now')).toBeInTheDocument();
  });
});
