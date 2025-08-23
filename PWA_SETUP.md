# PWA Setup Guide for School Management System

This guide explains how to set up and use the Progressive Web App (PWA) features for the School Management System.

## What's Been Implemented

### 1. PWA Manifest (`public/manifest.json`)

- Complete PWA configuration with proper icons
- App name, description, and theme colors
- Standalone display mode for app-like experience
- Proper icon sizes for different devices

### 2. Service Worker (`public/sw.js`)

- Offline caching for core app resources
- Background sync capabilities
- Push notification support
- Cache management and cleanup

### 3. PWA Install Prompt (`src/components/PWAInstallPrompt.tsx`)

- Automatic install prompt for Android/Chrome users
- iOS-specific installation instructions
- Smart detection of installable state
- User-friendly installation flow

### 4. Offline Support (`src/components/OfflinePage.tsx`)

- Offline page when no internet connection
- Cached content access
- Retry connection functionality

### 5. PWA Status Indicator (`src/components/PWAStatus.tsx`)

- Shows when app is running as PWA
- Online/offline status indicator
- Installation status

### 6. PWA Utilities (`src/lib/pwa.ts`)

- Centralized PWA configuration
- Installation management
- Platform detection (iOS/Android)
- Status monitoring

## How to Install

### For Android/Chrome Users:

1. Visit the website in Chrome
2. Look for the "Install App" button at the bottom
3. Click "Install App" when prompted
4. The app will be installed to your home screen

### For iOS Users:

1. Visit the website in Safari
2. Tap the Share button (square with arrow up)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" to confirm
5. The app will appear on your home screen

## Features

### ✅ Offline Functionality

- App works without internet connection
- Cached content is available offline
- Automatic cache updates when online

### ✅ App-like Experience

- Full-screen standalone mode
- No browser UI when launched from home screen
- Native app feel and behavior

### ✅ Cross-Platform Support

- Works on Android (Chrome, Edge, Samsung Internet)
- Works on iOS (Safari)
- Works on desktop browsers
- Responsive design for all screen sizes

### ✅ Smart Caching

- Core app resources are cached
- Automatic cache updates
- Efficient storage management

### ✅ Push Notifications

- Service worker supports push notifications
- Background notification handling
- User interaction with notifications

## Technical Details

### Service Worker Registration

The service worker is automatically registered in `src/main.tsx` and provides:

- Resource caching
- Offline functionality
- Background sync
- Push notification support

### PWA Detection

The app automatically detects:

- Whether it's running as a PWA
- User's platform (iOS/Android)
- Installation status
- Online/offline state

### Icon Generation

Icons are generated using the `@vite-pwa/assets-generator` plugin:

- Multiple sizes for different devices
- Maskable icons for Android
- Apple touch icons for iOS
- Splash screen images for iOS

## Testing

### Local Development

1. Run `npm run dev`
2. Open browser dev tools
3. Go to Application tab
4. Check Service Workers and Manifest sections

### PWA Testing

1. Build the app: `npm run build`
2. Serve the build: `npm run preview`
3. Test install prompt
4. Test offline functionality
5. Test on mobile devices

### Lighthouse Audit

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run PWA audit
4. Should score 90+ for PWA criteria

## Troubleshooting

### Install Prompt Not Showing

- Ensure HTTPS is enabled (required for PWA)
- Check if app meets installability criteria
- Verify manifest.json is accessible
- Check browser console for errors

### Splash Screen Not Working (iOS)

- Verify all splash screen images are present
- Check media queries in index.html
- Ensure proper image dimensions
- Test on actual iOS device

### Offline Not Working

- Check service worker registration
- Verify cache is being populated
- Check browser console for errors
- Ensure service worker file is accessible

### Icons Not Loading

- Verify icon paths in manifest.json
- Check if icons exist in public folder
- Ensure proper file permissions
- Test with different icon sizes

## Browser Support

### Full PWA Support

- Chrome (Android & Desktop)
- Edge (Android & Desktop)
- Samsung Internet
- Firefox (Android & Desktop)

### Partial PWA Support

- Safari (iOS) - Limited to "Add to Home Screen"
- Other WebKit browsers

### No PWA Support

- Internet Explorer
- Very old browser versions

## Performance Tips

1. **Optimize Images**: Use WebP format when possible
2. **Minimize Bundle Size**: Tree-shake unused code
3. **Efficient Caching**: Cache only essential resources
4. **Lazy Loading**: Load non-critical resources on demand
5. **Service Worker Updates**: Implement proper update strategies

## Security Considerations

1. **HTTPS Required**: PWA features only work over HTTPS
2. **Content Security Policy**: Implement proper CSP headers
3. **Service Worker Scope**: Limit service worker scope appropriately
4. **Cache Validation**: Validate cached content integrity

## Future Enhancements

- Background sync for offline actions
- Advanced push notification features
- Offline-first data strategies
- Advanced caching strategies
- PWA analytics and monitoring
