# TrustLand Architecture Document

TrustLand is a decentralized land document verification platform that ensures property title integrity using the Stellar blockchain.

## 1. System Overview

TrustLand allows users to create a cryptographically verifiable "digital twin" of their land documents by anchoring a unique SHA-256 hash of the document onto the Stellar testnet.

## 2. Technology Stack

- **Frontend**: React 18, Tailwind CSS (via CDN)
- **State Management**: React Hooks + LocalStorage (for persistence)
- **Blockchain**: Stellar Network (Testnet)
- **Stellar SDK**: `stellar-sdk` JS library
- **Cryptography**: SHA-256 via Browser Web Crypto API
- **Icons**: Lucide Icons

## 3. Core Logic & Data Flow

### 3.1 Document Hashing (Local-first)
When a user uploads a document, the system reads the file as an `ArrayBuffer` and computes its SHA-256 hash directly in the browser.
- **Multi-File Support**: The system now supports batch selection. It iterates through all selected files, generating independent hashes for each.
**Privacy Note**: The original document is never uploaded to any server or stored on-chain. Only the hash is used.

### 3.2 On-Chain Anchoring
The hash is recorded on the Stellar Testnet through a `manageData` operation. 
- **Batch Registry**: In multi-file scenarios, the system submits separate transactions for each file (to maintain record atomicity) or packs multiple `manageData` entries.
- **Metadata Storage**: Core metadata (hashes) are stored on-chain. Advanced metadata (Survey ID, Coordinates, Owner ID) are linked to the transaction hash and persisted in the registry state.
- **Account Funding**: New users can automatically fund their accounts via the Stellar Friendbot.
- **Transaction Signing**: Transactions are signed using the user's secret key.

### 3.3 Verification Process
The verification tool allows any user to upload a document. The system re-computes the hash and compares it against:
1. Local registration records (for performance).
2. On-Chain Ledger: The tool retrieves the anchored metadata (Survey ID, Coordinates, etc.) once a cryptographic match is found, providing full transparency.

## 4. UI/UX Design

The application follows a "Professional Dark Theme" design system:
- **Color Palette**: Background (`#0A0A0F`), Surface (`#111118`), Accent (`#6C63FF`).
- **Glassmorphism**: Subtle backgrounds with backdrop blur to create depth.
- **Responsiveness**: Fully responsive layout that adapts to mobile and desktop views.

## 5. Security Considerations

- **Secret Key Handling**: Secret keys are stored in `localStorage`. Users are explicitly warned to back them up as they cannot be recovered by the platform.
- **Local Hashing**: High privacy as files stay on the client machine.
