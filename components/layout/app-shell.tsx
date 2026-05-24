'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { useStore } from '@/lib/store/useStore';
import { 
  LayoutDashboard, 
  GitBranch, 
  Settings as SettingsIcon, 
  Menu, 
  X, 
  Bell, 
  RefreshCw, 
  Play, 
  LogOut, 
  User, 
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Repositories', href: '/repos', icon: GitBranch },
  { label: 'Settings', href: '/settings', icon: SettingsIcon },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileDrawerRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogEl = mobileDrawerRef.current;
    if (!dialogEl) return;
    if (mobileMenuOpen) {
      if (!dialogEl.open) {
        dialogEl.showModal();
      }
    } else {
      if (dialogEl.open) {
        dialogEl.close();
      }
    }
  }, [mobileMenuOpen]);
  
  const { 
    user, 
    isAuthenticated, 
    syncStatus, 
    notifications, 
    startSync, 
    dismissNotification, 
    clearNotifications,
    logout,
    login
  } = useStore();

  const unreadCount = notifications.filter(n => !n.read).length;

  // Auto-login to demo if not authenticated (or let pages handle it, but this keeps the header state valid)
  useEffect(() => {
    if (!isAuthenticated && pathname !== '/') {
      login('demo');
    }
  }, [isAuthenticated, pathname, login]);

  const handleSync = () => {
    startSync();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      default: return <Info className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-slate-100 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-[#243041] bg-[#111827] fixed h-full z-20">
        <div className="h-16 flex items-center px-6 border-b border-[#243041]">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-xs font-bold text-white">N</span>
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              NordicFlow
            </span>
          </Link>
          <span className="ml-2 text-[10px] bg-blue-900/40 text-blue-300 px-1.5 py-0.5 rounded border border-blue-800/40 font-mono">
            MVP
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
                  isActive 
                    ? 'text-white bg-[#1F2937]/60 border-l-2 border-blue-500 pl-2.5' 
                    : 'text-slate-400 hover:text-white hover:bg-[#1F2937]/30'
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#243041] bg-[#0F172A]/50">
          {isAuthenticated && user ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full border border-[#243041]"
                  onError={(e) => {
                    // Fallback if avatar fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-200 truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
              <button 
                onClick={logout} 
                className="p-1.5 rounded-md hover:bg-[#1F2937] text-slate-500 hover:text-red-400 transition-colors"
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link 
              href="/auth" 
              className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <User className="h-3.5 w-3.5" />
              Connect GitHub
            </Link>
          )}
        </div>
      </aside>

      {/* Mobile Drawer menu */}
      <dialog
        ref={mobileDrawerRef}
        className="lg:hidden m-0 fixed inset-y-0 left-0 z-40 w-64 h-full bg-[#111827] border-y-0 border-l-0 border-r border-[#243041] p-5 max-h-none max-w-none text-slate-100 outline-none backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm"
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <span className="text-lg font-bold tracking-tight">NordicFlow</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'text-white bg-[#1F2937]/60 border-l-2 border-blue-500 pl-2.5' 
                      : 'text-slate-400 hover:text-white hover:bg-[#1F2937]/30'
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-[#243041] mt-auto">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={user.avatarUrl} alt={user.name} className="h-8 w-8 rounded-full border border-[#243041]" />
                  <div>
                    <p className="text-xs font-semibold text-slate-200">{user.name}</p>
                    <p className="text-[10px] text-slate-500">{user.email}</p>
                  </div>
                </div>
                <button onClick={logout} className="text-slate-400 hover:text-red-400">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link 
                href="/auth" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 text-white rounded-lg text-xs"
              >
                Connect GitHub
              </Link>
            )}
          </div>
        </div>
      </dialog>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-[#243041] bg-[#111827]/85 backdrop-blur-md sticky top-0 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="lg:hidden p-1.5 rounded-md hover:bg-[#1F2937] text-slate-400 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <span>Northwind Labs</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-200 capitalize">
                {pathname.split('/')[1] || 'Overview'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Sync Controls */}
            {syncStatus.syncing ? (
              <div className="flex items-center gap-2 bg-[#1F2937]/80 text-blue-400 px-3 py-1.5 rounded-full text-xs font-medium border border-blue-900/30">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span className="hidden md:inline">Syncing {syncStatus.currentRepo}...</span>
                <span>{syncStatus.progress}%</span>
              </div>
            ) : (
              <button 
                onClick={handleSync}
                className="flex items-center gap-1.5 bg-[#1F2937]/50 hover:bg-[#1F2937] text-slate-300 hover:text-white px-3 py-1.5 rounded-full text-xs font-medium border border-[#243041] transition-all"
                title="Sync engineering data"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Sync Now</span>
              </button>
            )}

            {/* Notifications Bell */}
            <div>
              <button 
                id="bell-button"
                popoverTarget="notifications-dropdown"
                className="p-1.5 rounded-md hover:bg-[#1F2937] text-slate-400 hover:text-white transition-colors relative"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#111827]"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              <div 
                id="notifications-dropdown"
                popover="auto"
                className="w-80 sm:w-96 rounded-xl border border-[#243041] bg-[#111827] shadow-xl overflow-hidden"
              >
                <div className="p-4 border-b border-[#243041] flex items-center justify-between bg-[#1F2937]/40">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Activity & Alerts</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={clearNotifications}
                      className="text-[10px] text-slate-500 hover:text-slate-300 font-medium"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-[#243041]/60">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500">
                      No recent activity.
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div 
                        key={n.id} 
                        onClick={() => dismissNotification(n.id)}
                        className={`p-3.5 text-xs flex gap-3 transition-colors cursor-pointer ${
                          n.read ? 'opacity-60 hover:opacity-90' : 'bg-blue-950/20 hover:bg-blue-950/30'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {getNotificationIcon(n.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-200 leading-normal">{n.message}</p>
                          <span className="text-[10px] text-slate-500 mt-1 block">
                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-2 border-t border-[#243041] text-center bg-[#1F2937]/20">
                  <span className="text-[10px] text-slate-500 font-mono">NordicFlow Analytics Engine</span>
                </div>
              </div>
            </div>

            {/* Quick Demo Selector */}
            <Link 
              href="/demo" 
              className="bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border border-blue-500/20 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all"
            >
              Demo Workspace
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

