# Sam App - Daily Logging & Mental Health Tracking

A beautiful, production-ready web application built with Next.js, TypeScript, and Firebase for tracking daily experiences, mood, and mental health insights.

![Sam App Screenshot](https://via.placeholder.com/800x400/1f2937/ffffff?text=Sam+App+-+Daily+Logging)

## 🌟 Features

### 📝 **Comprehensive Daily Logging**
- **Rich Summary**: Detailed daily experiences and reflections
- **Status Tracking**: Mood (1-10), sleep quality/duration, energy level, stability score
- **Insights**: Wins, losses, and ideas with easy add/remove functionality
- **Goals**: Track daily and long-term goals
- **Tags**: Organize logs with custom tags and pre-seeded mental health tags
- **Trigger Events**: Document events that impact your mental state
- **Symptom Checklist**: Track mental health symptoms and patterns

### 🎨 **Beautiful UI/UX**
- **Mobile-First Design**: Optimized for all devices with responsive layout
- **Modern Components**: Built with shadcn/ui and Tailwind CSS
- **Intuitive Interface**: Clean, accessible design with helpful microcopy
- **Visual Indicators**: Color-coded status badges and icons for quick insights
- **Interactive Cards**: Expandable log cards with detailed views

### 💾 **Smart Data Management**
- **Autosave**: Drafts saved every 10 seconds and on blur
- **Offline Support**: Queue changes when offline, sync when back online
- **Export**: JSON export functionality for data portability
- **Real-time Sync**: Instant updates with Firebase Firestore

### 🔒 **Security & Privacy**
- **User Authentication**: Secure Google OAuth integration
- **Private Data**: Users can only access their own logs
- **Firestore Rules**: Comprehensive security rules for data protection

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SamWebApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the project root:
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication (Google provider recommended)
4. Enable Firestore Database

### 2. Configure Authentication
1. In Firebase Console → Authentication → Sign-in method
2. Enable Google provider
3. Add your domain to authorized domains

### 3. Set up Firestore
1. Create Firestore database
2. Deploy the security rules from `firestore.rules`:
   ```bash
   firebase deploy --only firestore:rules
   ```

### 4. Get Configuration
1. Go to Project Settings → General → Your apps
2. Copy the configuration values to your `.env.local`

## 📱 Usage

### Creating a New Log
1. Click "New Log" button
2. Fill in the daily summary (minimum 10 characters)
3. Set your status indicators (mood, sleep, energy, stability)
4. Add insights (wins, losses, ideas)
5. Set goals and add tags
6. Document any trigger events or symptoms
7. Save & Commit or Save Draft

### Viewing Logs
- **Overview**: See all logs with key metrics at a glance
- **Statistics**: View total logs, latest mood, and average sleep
- **Detailed View**: Click "View Details" for full log information
- **Export**: Download individual logs as JSON files

### Offline Usage
- Logs are automatically queued when offline
- Changes sync automatically when connection is restored
- Visual indicators show offline status and queue size

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14, TypeScript, React
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Firebase Firestore, Firebase Auth
- **State Management**: React hooks and context
- **Testing**: Jest, React Testing Library

### Project Structure
```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── NewLogForm.tsx  # Main logging form
│   ├── DailyLogCard.tsx # Log display component
│   └── LogDetailView.tsx # Detailed log modal
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication hook
│   ├── useAutosave.ts  # Draft autosave functionality
│   ├── useOfflineQueue.ts # Offline sync management
│   └── useDailyLogs.ts # Firestore data fetching
├── lib/                # Utility functions
│   ├── firebase.ts     # Firebase configuration
│   ├── firestore.ts    # Firestore helpers
│   └── validation.ts   # Form validation logic
└── types/              # TypeScript type definitions
```

### Data Schema
```typescript
interface DailyLog {
  timestamp: string;           // ISO timestamp
  summary: string;            // Required daily summary
  status: {
    moodLevel: string;        // 1-10 or empty
    sleepQuality: string;     // 1-5 or empty
    sleepDuration: string;    // Hours or empty
    energyLevel: string;      // 1-10 or empty
    stabilityScore: string;   // 1-5 or empty
  };
  insights: {
    wins: string[];          // Array of wins
    losses: string[];        // Array of losses
    ideas: string[];         // Array of ideas
  };
  goals: string[];           // Array of goals
  tags: string[];            // Array of tags (max 10)
  triggerEvents: string[];   // Array of trigger events
  symptomChecklist: string[]; // Array of symptoms
}
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📦 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Other Platforms
The app is compatible with any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker containers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@samapp.com or create an issue in the GitHub repository.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Firebase](https://firebase.google.com/) for backend services
- [Lucide](https://lucide.dev/) for beautiful icons

---

**Built with ❤️ for mental health awareness and self-reflection**