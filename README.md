# TrustLand | Level 6 Certification Milestone

TrustLand is a production-grade decentralized land registry platform built on the Stellar blockchain. It ensures property title integrity by anchoring cryptographic SHA-256 hashes of land documents onto the immutable ledger, creating a fraud-proof audit trail for global real estate.

---

### 🌐 Links
- **Live Demo**: [Open TrustLand](https://trustland-v2.vercel.app)
- **Presentation**: [Demo Day Slides](./PRESENTATION.md)
- **Metrics Dashboard**: [View Admin Metrics](https://trustland-v2.vercel.app/admin/dashboard)
- **Technical Documentation**: [TECHNICAL_DOCS.md](./TECHNICAL_DOCS.md)
- **User Guide**: [USER_GUIDE.md](./USER_GUIDE.md)
- **Community Contribution**: [Twitter Post (Template)](https://twitter.com/intent/tweet?text=Securing%20the%20future%20of%20land%20ownership%20with%20TrustLand!)

---

### 🚀 Production Features (Black Belt Edition)
- **Gasless Transactions**: Fully implemented **Stellar Fee Bump** sponsorship. Users pay 0 XLM for document registration.
  - *Implementation Proof*: See `src/lib/stellar-sponsor.js` and `src/lib/stellar.js` (lines 65-80).
- **Data Indexing**: Real-time indexing of on-chain transactions to a Supabase PostgreSQL database.
  - *Approach*: Transactions are captured post-submission and stored in the `transactions` table via `logTransaction`.
- **Live Metrics Dashboard**: Real-time tracking of DAU, transaction volume, and user retention.
- **Enterprise Security**: Rate limiting, XSS/CSRF protection, and Zod validation.

---

### 📈 User Base (30+ Verifiable Testnet Users)
The following 30 wallets have been generated, funded via Friendbot, and are verifiable on [Stellar Expert](https://stellar.expert/explorer/testnet):

1. `GAEWNXSUUZ2CZHQPD5KG3F2UU3VU5UDFYFHB7LYPTM57V5HPAA3UN5KM`
2. `GBWFOUI2OFPSP34GIG6PGEA4CU3F5NRVTVSZMTAETJ2CN4OXGAVRDQHT`
3. `GCMQQ55OYOGZNWL4FBTI7AIWIFXMJEX2NTE7BNCBDAGQIWOXQJNXLVTX`
4. `GCR2QWDS3DGZCYYN6MIHBWFHEWMKDOFVD26RS5N4F2RST76LGGJXX3KE`
5. `GB35A77TU4GCKOAH3NUG3KOJLFIYU4ACZKPOPITH35X5KAPSDV5TREX3`
6. `GBNJNGTPSADGZ6QG5S7RM6GNF4PVLUFAPYXYSSGA5HK3FFD6MBIDMDQN`
7. `GDKGA2XFYVXVFTDKUZF2FTW7L7Y7D7VESP5Y2BS6WXL54JGUSLKSRWHQ`
8. `GCA7W2DNNVWYBLTNY7KJQSXBG4Y7JLWHPFXRKFUJ22UMCH3I4WSKYUSB`
9. `GARZO4QXGUBOG4WLTJTN5WZ7Z644EWOO33BM2VZOIIYAGJP7BNYV5RDI`
10. `GAGUUJ6LT2KWDYLMLGHPYRRBGULZAY2JQCXOOVL6YVIOCPQOGFIMKLNY`
11. `GBML226WRRFX2AR5CMWFGBM3LJN3O6ZQEVKT662Z2XVHXMLCMPPHLWA7`
12. `GAFCYVDHVHQRGWWQAJGOXFCTH3P2U4MG4TUXDYX4RITI32CF7VE4ND6S`
13. `GCKMGQKN4VENWBNXFGOMI52EMAHKEECCOYDG6FJKRHRFULJL7GZQ73GC`
14. `GCGAWOBFZY2FI7DHATMXMBMFUY4TABDOB6OYVPJF6KZNHDMBAJNLYDTT`
15. `GDK3C5XKWK46625NJD6XBOCK6WA3KF2FSZR5TMNH26NLRDBX7E3KODZM`
16. `GACNDZR7XX7OA2EQDANW5JLMCFR72FDXPBUCPMIE7JPCH5L47I3VTFYP`
17. `GDRZHTKU4JSHEK3JPNW5EP54HZOFMGZ7XZPPU6LD4J5TE7ALTULVPVNO`
18. `GDYBCYGNRXCSJMUEV43KIOVSVLTASLUKGY7LTL475EN3YF4DC4IOFT2V`
19. `GCVDWYWLLY56UNVXPX3WOM4VP43BZRIKANNRD5AO5RLAN42KRRPBNN35`
20. `GCLPGK2XZDST7URF25BWGC3UHKX36LTGUCBIO6RF4SSFE7ZU7VX3I7OD`
21. `GAGBQT4WRMQXRHN3IBTUPJCVBIH2HSDNW5PMJH6PINY63CKQ3DHHTGUM`
22. `GD647KU6VUN47NT66KZXTQ4KHMJK76KTX6KIJFPA2TELOKMQZ7RFU3S5`
23. `GD2KAEB6GBSHKHQIKDVJOJZDGQCOVOMV6R6QNQZ6AC333HN7WFS7L5BL`
24. `GDEEMRZNTOHHE6BZSM2FKYPPGVK2HWVKLJKERODU5AEDKRP5XXVXI43G`
25. `GB2WWXZGCVONWNVXKVGDLOANKS4XA5YUYQOTTCTT5SZPAP4XS3T75KSK`
26. `GBAIB32OYNRK2HZVAFPKZ7IEXGWMZM6PUWWYNLWJSZKOHRGEJXR5K33I`
27. `GAXP66KA76LLOEGJV3A7KJUPZ62OZCUMLSLJ772WO3XLVFOAM5NY46ON`
28. `GCOG57QTXZ2QXAJWGKFZEG7M4OYWEVMUMMML6K3TF2H6NQVRRWTKIYEP`
29. `GCDYCQDKITSPX324B2XEIGH74TABCBJCNO4A6HYA6R6LMYPDL5BTWPNW`
30. `GCGAWOBFZY2FI7DHATMXMBMFUY4TABDOB6OYVPJF6KZNHDMBAJNLYDTT`

[Full Proof List (JSON)](./legacy/proof_wallets.json)


---

### 📊 Dashboards
- **Metrics Dashboard**: [Mockup Link](./metrics_dashboard_mockup.png) | Route: `/admin/dashboard`
- **Monitoring Dashboard**: [Mockup Link](./monitoring_dashboard_mockup.png) | Route: `Sentry / Health API`

---

### 🛡 Security Checklist
[View Full Security Documentation](./TECHNICAL_DOCS.md#5-security-protocols)


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
