import { portfolioData } from "@/data/portfolioData";
import { GraduationCap, Users, CheckCircle, FolderGit2 } from "lucide-react";

export default function StatsCounter() {
  const statIcons = [
    <GraduationCap key="edu" size={22} className="text-blue-600 dark:text-blue-400" />,
    <Users key="users" size={22} className="text-indigo-600 dark:text-indigo-400" />,
    <CheckCircle key="bugs" size={22} className="text-emerald-600 dark:text-emerald-400" />,
    <FolderGit2 key="projects" size={22} className="text-sky-600 dark:text-sky-400" />,
  ];

  return (
    <div className="stats-grid-desktop w-full mt-10">
      {portfolioData.stats.map((stat, idx) => (
        <div
          key={stat.label}
          className="card-glass rounded-2xl p-5 border border-[var(--surface-border)] flex flex-col items-start justify-center tech-card-hover group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            {statIcons[idx]}
          </div>
          <div className="text-2xl lg:text-3xl font-black text-[var(--foreground)] tracking-tight">
            {stat.value}
          </div>
          <div className="text-xs font-medium text-[var(--muted-foreground)] mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
