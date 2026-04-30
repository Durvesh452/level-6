import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('amount, status, created_at');

    if (error) throw error;

    const totalTransactions = data.length;
    const successfulTransactions = data.filter(tx => tx.status === 'success').length;
    const totalVolume = data.reduce((sum, tx) => sum + (parseFloat(tx.amount) || 0), 0);
    
    // Group by day for the last 7 days
    const last7Days = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      last7Days[dateStr] = 0;
    }

    data.forEach(tx => {
      const dateStr = tx.created_at.split('T')[0];
      if (last7Days[dateStr] !== undefined) {
        last7Days[dateStr]++;
      }
    });

    return NextResponse.json({
      totalTransactions,
      successfulTransactions,
      failedTransactions: totalTransactions - successfulTransactions,
      totalVolume,
      dailyStats: Object.entries(last7Days).map(([date, count]) => ({ date, count })).reverse()
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
