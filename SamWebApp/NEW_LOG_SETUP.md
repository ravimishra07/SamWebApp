# Sam App - New Log Feature Setup

This document describes how to set up and run the new Daily Log feature for Sam App.

## Environment Variables

Create a `.env.local` file in the project root with the following Firebase configuration variables:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Google provider recommended)
3. Enable Firestore Database
4. Copy the configuration values from Project Settings > General > Your apps
5. Deploy the Firestore security rules from `firestore.rules`

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## New Log Feature

The new log feature includes:

- **Comprehensive Form**: Summary, status tracking, insights, goals, tags, trigger events, and symptom checklist
- **Autosave**: Drafts are automatically saved every 10 seconds and on blur
- **Offline Support**: Changes are queued when offline and synced when back online
- **Validation**: Client-side validation with helpful error messages
- **Export**: JSON export functionality for data portability
- **Mobile-First**: Responsive design optimized for mobile devices

### Key Components

- `NewLogForm.tsx` - Main form component
- `useAutosave.ts` - Draft autosave functionality
- `useOfflineQueue.ts` - Offline synchronization
- `firestore.ts` - Firestore helper functions
- `validation.ts` - Form validation logic

### Data Schema

Logs are stored in Firestore at: `users/{uid}/logs/{timestamp}`

The schema includes:
- `timestamp` - ISO timestamp
- `summary` - Required text summary (min 10 chars)
- `status` - Mood, sleep quality/duration, energy, stability
- `insights` - Wins, losses, ideas arrays
- `goals` - Goal strings array
- `tags` - Tag strings array (max 10)
- `triggerEvents` - Trigger event strings array
- `symptomChecklist` - Symptom strings array

## Testing

Run the test suite:
```bash
npm test
```

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to your hosting platform (Vercel, Netlify, etc.)

3. Update Firebase configuration for production environment

## Security

The Firestore security rules ensure:
- Users can only read/write their own logs
- Authentication is required for all operations
- Data is isolated per user

## Troubleshooting

### Common Issues

1. **Firebase not initialized**: Check environment variables are set correctly
2. **Permission denied**: Verify user is authenticated and Firestore rules are deployed
3. **Offline sync not working**: Check browser localStorage availability and network status
4. **Validation errors**: Ensure all required fields are filled and meet minimum requirements

### Support

For issues or questions, check the console logs and ensure all dependencies are properly installed.
