import { NextResponse } from 'next/server';

// Simple in-memory rate limiting (Note: resets on redeploy/cold start in serverless)
// In a real production app, use Upstash Redis or similar.
const rateLimitMap = new Map();

export function proxy(request) {
  const ip = request.ip || 'anonymous';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 100;

  const rateData = rateLimitMap.get(ip) || { count: 0, startTime: now };

  if (now - rateData.startTime > windowMs) {
    rateData.count = 1;
    rateData.startTime = now;
  } else {
    rateData.count++;
  }

  rateLimitMap.set(ip, rateData);

  if (rateData.count > maxRequests) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  const response = NextResponse.next();

  // CORS configuration
  response.headers.set('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://horizon-testnet.stellar.org https://friendbot.stellar.org https://*.supabase.co;");

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
