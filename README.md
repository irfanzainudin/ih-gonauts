# 🏠 SharedSpace.my

### Built by Team Gonauts  
👨‍🚀 Irfan Zainuddin • 👨‍🚀 Izzat Afifi • 👨‍🚀 Nabil Roslizar

> ⚠️ Disclaimer: This is an early-stage prototype. The backend logic and smart contracts are still under active development. Current implementation includes mock/stub logic for demonstration purposes only.

A Web3-Powered Booking Platform for Shared Spaces in Malaysia

![Built with IOTA](https://img.shields.io/badge/Built%20With-IOTA-green)
![License](https://img.shields.io/badge/license-Apache--2.0-blue)
![Status](https://img.shields.io/badge/status-In%20Development-orange)

SharedSpace.my is a decentralized platform for discovering, booking, and managing shared spaces — from sports courts and meeting rooms to coworking desks and event halls.

By combining the simplicity of traditional platforms with the power of IOTA's feeless distributed ledger and smart contracts, SharedSpace.my offers a frictionless, trustless, and rewarding experience for both users and venue owners.

---

## 🚀 Features

- 🔍 Unified listing and real-time booking  
- 👛 100% wallet-based login (IOTA Identity)  
- 💸 Gasless transactions with IOTA Gas Station  
- 🔐 On-chain proof of booking (MoveVM smart contracts)  
- 💰 Earn $SHRD loyalty tokens on every booking  
- 🧾 Admin dashboard for space owners  

---

## 💡 Why SharedSpace.my?

Booking venues in Malaysia is often manual — WhatsApp, cash, uncertainty.

SharedSpace.my fixes this by:

- Offering a one-stop platform for all venue types  
- Securing bookings on-chain (no tampering)  
- Rewarding loyal users with $SHRD tokens  
- Supporting both MYR and crypto payments  
- Removing the need to understand or own crypto (gas is sponsored!)  

---

## 🛠️ Tech Stack

```text
Frontend:
- React + Vite
- Tailwind CSS
- IOTA Identity SDK
- MYR Payment Gateway (FPX, Touch 'n Go, GrabPay)

Backend:
- IOTA MoveVM Smart Contracts:
  - BookSpace (booking logs)
  - RewardTracker (token rewards)
- IOTA Gas Station (gas sponsorship)
- IOTA Node (DID anchoring & proof)
