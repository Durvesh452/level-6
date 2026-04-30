'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

// Lazy load heavy chart components
const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });


// Mock data for initial preview
const signupData = [
  { day: 'Mon', count: 12 },
  { day: 'Tue', count: 18 },
  { day: 'Wed', count: 15 },
  { day: 'Thu', count: 25 },
  { day: 'Fri', count: 32 },
  { day: 'Sat', count: 28 },
  { day: 'Sun', count: 35 },
];

const txVolumeData = [
  { day: 'Mon', volume: 450 },
  { day: 'Tue', volume: 600 },
  { day: 'Wed', volume: 550 },
  { day: 'Thu', volume: 800 },
  { day: 'Fri', volume: 1200 },
  { day: 'Sat', volume: 1100 },
  { day: 'Sun', volume: 1400 },
];

const successRateData = [
  { name: 'Success', value: 92 },
  { name: 'Failed', value: 8 },
];

const COLORS = ['#00D4AA', '#FF4757', '#6C63FF', '#FFA502'];

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (password === 'trustland-admin-2026') { // Placeholder for production auth
      setIsAdmin(true);
    } else {
      alert('Unauthorized');
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-40 px-4">
        <Card>
          <h2 className="text-2xl font-black mb-6 text-center">Admin Access</h2>
          <form onSubmit={handleAdminAuth} className="space-y-4">
            <input 
              type="password" 
              placeholder="Admin Secret Key"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">Unlock Dashboard</Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2">Metrics Dashboard</h1>
          <p className="text-muted">Live application performance & user growth</p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" icon="download">Export Data</Button>
          <Button variant="outline" icon="refresh-cw">Refresh</Button>
        </div>
      </div>

      {/* High-Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Daily Active Users', value: '142', change: '+12%', icon: 'users', color: 'primary' },
          { label: 'Total Transactions', value: '3,842', change: '+8%', icon: 'activity', color: 'secondary' },
          { label: 'TX Volume (XLM)', value: '42,500', change: '+24%', icon: 'trending-up', color: 'warning' },
          { label: 'Retention Rate', value: '68%', change: '+5%', icon: 'user-check', color: 'accent' },
        ].map((stat, i) => (
          <Card key={i} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 bg-${stat.color}/10 rounded-lg flex items-center justify-center`}>
                <Icon name={stat.icon} className={`text-${stat.color}`} size={20} />
              </div>
              <span className="text-xs font-bold text-secondary">{stat.change}</span>
            </div>
            <div>
              <p className="text-3xl font-black">{stat.value}</p>
              <p className="text-muted text-xs uppercase tracking-widest font-bold">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card className="h-[400px] flex flex-col">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Icon name="user-plus" size={18} className="text-primary" /> New Signups (Last 7 Days)
          </h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={signupData}>
                <defs>
                  <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6C63FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2E" vertical={false} />
                <XAxis dataKey="day" stroke="#8888AA" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#8888AA" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111118', border: '1px solid #1E1E2E', borderRadius: '12px' }}
                  itemStyle={{ color: '#F0F0FF' }}
                />
                <Area type="monotone" dataKey="count" stroke="#6C63FF" fillOpacity={1} fill="url(#colorSignups)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="h-[400px] flex flex-col">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Icon name="bar-chart-3" size={18} className="text-secondary" /> Transaction Volume (XLM)
          </h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={txVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2E" vertical={false} />
                <XAxis dataKey="day" stroke="#8888AA" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#8888AA" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(108, 99, 255, 0.1)' }}
                  contentStyle={{ backgroundColor: '#111118', border: '1px solid #1E1E2E', borderRadius: '12px' }}
                />
                <Bar dataKey="volume" fill="#00D4AA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="h-[400px] flex flex-col">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Icon name="pie-chart" size={18} className="text-warning" /> Success vs Failed Rate
          </h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={successRateData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {successRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111118', border: '1px solid #1E1E2E', borderRadius: '12px' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="h-[400px] flex flex-col">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Icon name="clock" size={18} className="text-accent" /> User Retention (Day 1, 7, 30)
          </h3>
          <div className="flex flex-col justify-center h-full gap-8">
            {[
              { label: 'Day 1', value: 85, color: '#6C63FF' },
              { label: 'Day 7', value: 42, color: '#00D4AA' },
              { label: 'Day 30', value: 18, color: '#FFA502' },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold uppercase tracking-wider">{item.label}</span>
                  <span className="text-muted">{item.value}%</span>
                </div>
                <div className="w-full h-3 bg-surface rounded-full overflow-hidden border border-border">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
