const fs = require('fs');
let code = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');

const oldMenuItems = `  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'officer', 'investigator']
    },
    {
      id: 'reports',
      label: 'Crime Reports',
      icon: FileText,
      badge: newReportsCount > 0 ? newReportsCount : undefined,
      badgeColor: 'bg-blue-600 text-white',
      roles: ['admin', 'officer', 'investigator']
    },
    {
      id: 'cases',
      label: 'Case Management',
      icon: Briefcase,
      badge: activeCasesCount > 0 ? activeCasesCount : undefined,
      badgeColor: 'bg-blue-600 text-white',
      roles: ['admin', 'officer', 'investigator']
    },
    {
      id: 'analytics',
      label: 'Reports & Analytics',
      icon: BarChart3,
      roles: ['admin', 'officer', 'investigator']
    },
    {
      id: 'public-tracker',
      label: 'Public Case Tracker',
      icon: Search,
      roles: ['admin', 'officer', 'investigator']
    },`;

const newMenuItems = `  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'officer', 'investigator', 'citizen']
    },
    {
      id: 'reports',
      label: 'Crime Reports',
      icon: FileText,
      badge: newReportsCount > 0 ? newReportsCount : undefined,
      badgeColor: 'bg-blue-600 text-white',
      roles: ['admin', 'officer', 'investigator']
    },
    {
      id: 'cases',
      label: 'Case Management',
      icon: Briefcase,
      badge: activeCasesCount > 0 ? activeCasesCount : undefined,
      badgeColor: 'bg-blue-600 text-white',
      roles: ['admin', 'officer', 'investigator']
    },
    {
      id: 'analytics',
      label: 'Reports & Analytics',
      icon: BarChart3,
      roles: ['admin', 'officer', 'investigator']
    },
    {
      id: 'public-tracker',
      label: 'Public Case Tracker',
      icon: Search,
      roles: ['admin', 'officer', 'investigator', 'citizen']
    },`;

code = code.replace(oldMenuItems, newMenuItems);
fs.writeFileSync('src/components/Sidebar.tsx', code);
