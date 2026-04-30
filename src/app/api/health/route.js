import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    network: 'stellar-testnet',
    env: process.env.NODE_ENV
  });
}
