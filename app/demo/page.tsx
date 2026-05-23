'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import DashboardPage from '@/app/dashboard/page';
import { Sparkles, Info, X } from 'lucide-react';

export default function DemoPage() {
  const { resetToDemo } = useStore();
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    resetToDemo();
  }, [resetToDemo]);

  return (
    <div className="relative">
      {showBanner && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs font-semibold py-3 px-6 flex items-center justify-between z-40 relative">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
            <span>
              <strong>Northwind Labs Demo Mode Active:</strong> Seeded mock repositories, PR risk scores, and build timelines are active. Feel free to simulate events in the <strong>Repositories</strong> tab.
            </span>
          </div>
          <button onClick={() => setShowBanner(false)} className="hover:opacity-85 text-white/80 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      <DashboardPage />
    </div>
  );
}

