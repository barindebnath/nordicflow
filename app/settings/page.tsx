'use client';

import { useState, useEffect, useRef } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { useStore, Settings } from '@/lib/store/useStore';
import { useForm } from 'react-hook-form';
import { 
  Settings as SettingsIcon, 
  Check, 
  RefreshCw, 
  Trash2, 
  ShieldAlert, 
  Bell, 
  Cpu 
} from 'lucide-react';

export default function SettingsPage() {
  const { settings, updateSettings, resetToDemo } = useStore();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const confirmRef = useRef<HTMLDialogElement>(null);

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<Settings>({
    defaultValues: settings
  });

  // Keep form in sync if store settings change (e.g. on demo reset)
  useEffect(() => {
    reset(settings);
  }, [settings, reset]);

  const onSubmit = (data: Settings) => {
    updateSettings(data);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetSandbox = () => {
    confirmRef.current?.showModal();
  };

  const handleConfirmReset = () => {
    resetToDemo();
    setResetSuccess(true);
    confirmRef.current?.close();
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <AppShell>
      <div className="max-w-3xl space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-100">Settings</h2>
          <p className="text-slate-400 text-sm mt-1">Configure workspace velocity goals, alert thresholds, and demo states.</p>
        </div>

        {/* Success alerts */}
        {saveSuccess && (
          <div className="p-3 bg-emerald-950/20 text-emerald-400 border border-emerald-900/30 rounded-lg text-xs font-semibold flex items-center gap-2">
            <Check className="h-4 w-4" /> Workspace preferences updated successfully.
          </div>
        )}

        {resetSuccess && (
          <div className="p-3 bg-blue-950/20 text-blue-400 border border-blue-900/30 rounded-lg text-xs font-semibold flex items-center gap-2">
            <Check className="h-4 w-4" /> Sandbox demo data restored to initial state.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Section: Targets */}
          <div className="p-6 rounded-2xl border border-[#243041] bg-[#111827] space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              <Cpu className="h-4 w-4" /> Team Velocity Targets
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1.5">
                  Lead Time Alert Threshold (Hours)
                </label>
                <input 
                  type="number" 
                  className="w-full bg-[#0B1020] border border-[#243041] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  {...register('leadTimeThreshold', { 
                    required: 'Lead time threshold is required', 
                    min: { value: 1, message: 'Must be at least 1 hour' },
                    max: { value: 720, message: 'Cannot exceed 720 hours (30 days)' }
                  })}
                />
                {errors.leadTimeThreshold && (
                  <p className="text-red-400 text-[10px] mt-1">{errors.leadTimeThreshold.message}</p>
                )}
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1.5">
                  PR Size target (Lines of Code)
                </label>
                <input 
                  type="number" 
                  className="w-full bg-[#0B1020] border border-[#243041] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  {...register('prSizeTarget', { 
                    required: 'PR size target is required', 
                    min: { value: 10, message: 'Must be at least 10 LOC' },
                    max: { value: 5000, message: 'Cannot exceed 5000 LOC' }
                  })}
                />
                {errors.prSizeTarget && (
                  <p className="text-red-400 text-[10px] mt-1">{errors.prSizeTarget.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section: Notifications */}
          <div className="p-6 rounded-2xl border border-[#243041] bg-[#111827] space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              <Bell className="h-4 w-4" /> Notification Preferences
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <input 
                  id="alertOnFailures"
                  type="checkbox"
                  className="mt-0.5 rounded border-[#243041] bg-[#0B1020] text-blue-600 focus:ring-0 focus:ring-offset-0"
                  {...register('alertOnFailures')}
                />
                <label htmlFor="alertOnFailures" className="text-xs text-slate-300 font-medium cursor-pointer">
                  Generate warnings on CI/CD build failure spikes
                  <span className="block text-[10px] text-slate-500 font-normal mt-0.5">Sends a real-time event log to the dashboard timeline when pipeline runs fail.</span>
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input 
                  id="alertOnHighRisk"
                  type="checkbox"
                  className="mt-0.5 rounded border-[#243041] bg-[#0B1020] text-blue-600 focus:ring-0 focus:ring-offset-0"
                  {...register('alertOnHighRisk')}
                />
                <label htmlFor="alertOnHighRisk" className="text-xs text-slate-300 font-medium cursor-pointer">
                  Flag high-risk pull request alerts
                  <span className="block text-[10px] text-slate-500 font-normal mt-0.5">Logs timeline warnings when pull request sizes exceed target limits.</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section: Sync schedule */}
          <div className="p-6 rounded-2xl border border-[#243041] bg-[#111827] space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              <RefreshCw className="h-4 w-4" /> Repository Synchronization
            </div>
            <div className="max-w-xs">
              <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Automatic Sync Interval</label>
              <select 
                className="w-full bg-[#0B1020] border border-[#243041] rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-0"
                {...register('syncSchedule')}
              >
                <option value="hourly">Every Hour</option>
                <option value="daily">Every 24 Hours</option>
                <option value="weekly">Every Week</option>
                <option value="manual">Manual Pull Only</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </form>

        {/* Section: Sandbox Controls */}
        <div className="p-6 rounded-2xl border border-red-900/30 bg-red-950/5 space-y-4 mt-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4" /> Developer Sandbox Actions
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Performing a reset will restore all repository data, active pull request metrics, build status history, and system settings to the original pre-seeded Northwind Labs dataset.
          </p>
          <button 
            onClick={handleResetSandbox}
            className="flex items-center gap-1.5 bg-red-950/20 hover:bg-red-950/30 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
          >
            <Trash2 className="h-4 w-4" /> Reset Demo Sandbox
          </button>
        </div>
        {/* Native confirmation Dialog */}
        <dialog 
          ref={confirmRef} 
          className="rounded-2xl border border-[#243041] bg-[#111827] p-6 max-w-md outline-none backdrop:bg-slate-950/70 backdrop:backdrop-blur-sm text-slate-100"
        >
          <form method="dialog" className="space-y-4">
            <h3 className="text-base font-bold flex items-center gap-2 text-red-400">
              <Trash2 className="h-5 w-5" /> Confirm Sandbox Reset
            </h3>
            <p className="text-xs text-slate-400 leading-normal">
              Are you sure you want to reset all repositories, PR logs, and settings to the default Northwind Labs demo data? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button value="cancel" className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200">
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleConfirmReset} 
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
              >
                Reset Sandbox
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </AppShell>
  );
}

