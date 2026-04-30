# TrustLand | Stop Land Fraud. Forever.

TrustLand is a production-grade decentralized land registry platform built on the Stellar blockchain. It ensures property title integrity by anchoring cryptographic SHA-256 hashes of land documents onto the immutable ledger, creating a fraud-proof audit trail for global real estate.

---

### 🌐 Links
- **Live Demo**: [Open TrustLand](https://trustland-v2.vercel.app)
- **Metrics Dashboard**: [View Admin Metrics](https://trustland-v2.vercel.app/admin/dashboard)
- **Technical Documentation**: [TECHNICAL_DOCS.md](./TECHNICAL_DOCS.md)
- **User Guide**: [USER_GUIDE.md](./USER_GUIDE.md)

---

### 🚀 Production Features (Black Belt Edition)
- **Gasless Transactions**: Fully implemented **Stellar Fee Bump** sponsorship. Users pay 0 XLM for document registration.
- **Data Indexing**: Real-time indexing of on-chain transactions to a Supabase PostgreSQL database for fast lookups.
- **Live Metrics Dashboard**: Real-time tracking of DAU, transaction volume, success rates, and user retention.
- **Enterprise Security**: Rate limiting, XSS/CSRF protection, and comprehensive input validation.
- **Production Monitoring**: Sentry integration for error tracking and structured logging for auditability.
- **Scalable Architecture**: Migrated to Next.js 15 for optimized performance and SEO.

---

### 📈 User Base (30+ Verified Testnet Users)
The following wallet addresses represent our active testnet user base participating in Phase 3 validation:

1. `GAYMWU2VTZC6646FV4M5753ZZUBIXZHSBLBOLTHBHCVFQIOBZH6D5W4H`
2. `GDC55QCAP36VCKEJ66YILV45LR6GRLJOE7AZYYMUM5MN4WAKPFAHBARL`
3. `GAYJALSDDA3QYIIQDFESHZCHNKGWV43C76Y2MSL6MZS6RCGO7YO3HTMQ`
4. `GBUDUGMHCM7B54DIB5P5LP4PP6MG7MJ6VUBBYDB53BZNZCTH36LLG5MG`
5. `GAMZFU5HFWQRSVTHYCRGVDHRFAQKSVIMU232D3LITOEIDVD6MZVXVOHC`
6. `GD6N4U2WZA3Y6C5R6Y3N...` (and 25+ others)

---

### 🛡 Security Checklist
Our production security implementation includes:
- [x] Input validation using Zod
- [x] Rate limiting (100 req/min) via Middleware
- [x] Environment variable audit (No secrets in code)
- [x] CORS configuration for production domains
- [x] XSS protection via DOMPurify
- [x] Stellar Transaction Signing security (Client-side signing only)
- [x] Dependency vulnerability management (NPM Audit Fix)

---

### 🛠 Tech Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Blockchain**: Stellar SDK (@stellar/stellar-sdk)
- **Database**: Supabase (PostgreSQL)
- **Monitoring**: Sentry
- **Analytics**: Recharts
- **Styling**: Glassmorphism / Dark Mode

---

### 📖 API Documentation
- `GET /api/transactions?wallet=G...`: Retrieve paginated transaction history for a wallet.
- `GET /api/transactions/stats`: Global application statistics (Volume, Success Rate, Growth).
- `GET /api/health`: Uptime monitoring and network status.

---

### 💻 How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Durvesh452/LEVEL-5.git
   cd LEVEL-5
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file based on `.env.example`.

4. **Run development server**:
   ```bash
   npm run dev
   ```

---

### 🗺 Roadmap
- [ ] Mobile Application (iOS/Android)
- [ ] Integration with Government Land Registry APIs
- [ ] NFT-based Title Deeds
- [ ] Multi-sig Ownership Transfers
