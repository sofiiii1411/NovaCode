# NovaCode — QR + NFC Solutions

NovaCode is an enterprise authentication and device management platform for next-generation QR and NFC solutions.

![NovaCode Logo](/public/logo.png)

## 🚀 Features

- **Official Brand Asset Integration**: Sharp, uncompromised NovaCode gradient branding with high-resolution assets (`logo.png`, `novacode_logo.png`).
- **Firebase Authentication & Firestore**: Connected to Firebase project `novacode-2de9f` with Google Sign-In and Email/Password flows.
- **Three-Tier Access Control**:
  - 👑 **Owner / Super Admin** (`/owner/dashboard`): Platform telemetry, user management, and security governance.
  - 🛡️ **Staff / Admin** (`/staff/dashboard`): Hardware provisioning, NFC card encoding batches, and active client projects.
  - 👤 **Customer / Normal User** (`/dashboard`): Self-service dynamic QR code generation, telemetry insights, and tag programming.
- **Strict Role Elevation Guard**: Public sign-ups (Email and Google OAuth) are strictly defaulted to the `customer` role.
- **Responsive Architecture**: Pixel-perfect on mobile (320px+), tablet, laptop, and ultra-wide screens.
- **Privacy-Preserving Password Reset**: Email recovery without disclosing user existence.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Vanilla Modern CSS & CSS Variables
- **Icons**: Lucide React
- **Backend / Authentication**: Firebase Auth & Cloud Firestore (`novacode-2de9f`)
- **Alternative Backend Ready**: Supabase Auth & PostgreSQL Schema with Row Level Security (`supabase_schema.sql`)

## 💻 Getting Started Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sofiiii1411/NovaCode.git
   cd NovaCode
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🌐 Deploy to Firebase Hosting

```bash
npx firebase-tools deploy
```

---
© 2026 NovaCode — QR + NFC SOLUTIONS. All rights reserved.
