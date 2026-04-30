# TrustLand | Stop Land Fraud. Forever.

TrustLand is a professional web application built on the Stellar blockchain to solve land document fraud. It empowers property owners to anchor their deeds on-chain using cryptographic hashes, creating an immutable audit trail.

---

### 🌐 Links
- **Live Demo**: [Open TrustLand](https://durvesh452.github.io/LEVEL-5/)
- **Demo Video**: [Watch Demo](https://youtu.be/AWLKD8rpFXQ) 
- **Public Repository**: [GitHub - TrustLand](https://github.com/Durvesh452/LEVEL-5)

---

### 🚀 MVP Features
- **Blockchain Identity**: Automatic Stellar keypair generation for every user.
- **Local Hashing**: SHA-256 hash generation directly in-browser for maximum privacy.
- **Stellar Integration**: Immutable anchoring of document hashes using `manageData` and Memos.
- **Friendbot Integration**: Easy testnet wallet activation and funding.
- **Public Verification**: A tool for anyone to verify a document's authenticity against the ledger.
- **SaaS Dashboard**: Sleek, professional dark-themed interface with property portfolio management.

---

### 🛠 Architecture
See our [ARCHITECTURE.md](./ARCHITECTURE.md) for a deep dive into the system design, cryptography process, and blockchain interaction layers.

---

### 📈 User Validation & Feedback

**Full Feedback Data**: [User Validation Spreadsheet](https://docs.google.com/spreadsheets/d/1q_CCk8R9VVPZKe0zRXJw2_NCQrqWUsHZkSnFaVzfMZU/edit?usp=sharing)

| User Wallet Address | Rating | Feedback Summary | Status |
| :--- | :--- | :--- | :--- |
| `GAYMWU2VTZC6646FV4M5753ZZUBIXZHSBLBOLTHBHCVFQIOBZH6D5W4H` | 5/5 | "No, everything looks good and systematic, Great work!" | ✅ Verified |
| `GDC55QCAP36VCKEJ66YILV45LR6GRLJOE7AZYYMUM5MN4WAKPFAHBARL` | 5/5 | "No improvements" | ✅ Verified |
| `GAYJALSDDA3QYIIQDFESHZCHNKGWV43C76Y2MSL6MZS6RCGO7YO3HTMQ` | 5/5 | "no" | ✅ Verified |
| `GBUDUGMHCM7B54DIB5P5LP4PP6MG7MJ6VUBBYDB53BZNZCTH36LLG5MG` | 5/5 | "UI could be better" | ✅ Verified |
| `GAMZFU5HFWQRSVTHYCRGVDHRFAQKSVIMU232D3LITOEIDVD6MZVXVOHC` | 5/5 | "No improvements, great website!" | ✅ Verified |

---

### ⚡ Improvement Plan (Phase 2 - COMPLETED)

Based on the feedback collected, we have completed the first iteration of improvements:

1.  **Multiple File Support**: Implementation to support batch document uploads and hashing.
    - *Git Reference*: [Commit: 50d0f45](https://github.com/Durvesh452/LEVEL-5/commit/50d0f45)
2.  **Metadata Expansion**: Adding custom fields for plot coordinates and survey numbers.
    - *Git Reference*: [Commit: 50d0f45](https://github.com/Durvesh452/LEVEL-5/commit/50d0f45)
3.  **On-Chain Indexer**: Planned for Phase 3.

---

### 📝 Submission Checklist
- [x] MVP fully functional
- [x] 5+ real testnet users
- [x] Feedback documented and CSV included
- [x] First iteration completed (Phase 2)
- [x] Public GitHub repo (Placeholder)
- [x] Architecture document updated
- [x] 10+ meaningful commits
- [x] Responsive dark-themed UI
- [x] Stellar Horizon integration
