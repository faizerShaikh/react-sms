// PWA Redirect Utility
// Automatically redirects users from browser to PWA app when available

export class PWARedirect {
  private static instance: PWARedirect;
  private isStandalone: boolean = false;
  private redirectAttempted: boolean = false;
  private redirectTimeout: number = 3000; // 3 seconds delay

  private constructor() {
    this.checkStandalone();
  }

  public static getInstance(): PWARedirect {
    if (!PWARedirect.instance) {
      PWARedirect.instance = new PWARedirect();
    }
    return PWARedirect.instance;
  }

  private checkStandalone(): void {
    // Check if running as PWA
    this.isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
  }

  /**
   * Check if PWA is installed and redirect if possible
   */
  public async checkAndRedirect(): Promise<boolean> {
    if (this.isStandalone || this.redirectAttempted) {
      return false;
    }

    this.redirectAttempted = true;

    try {
      // Check if PWA is installed
      const isInstalled = await this.isPWAInstalled();
      
      if (isInstalled && this.shouldShowRedirect()) {
        // Show redirect prompt
        this.showRedirectPrompt();
        return true;
      }
    } catch (error) {
      console.log('PWA redirect check failed:', error);
    }

    return false;
  }

  /**
   * Check if PWA is installed on the device
   */
  private async isPWAInstalled(): Promise<boolean> {
    // Method 1: Check localStorage for installation status (most reliable for our case)
    const installStatus = localStorage.getItem('pwa-installed');
    if (installStatus === 'true') {
      return true;
    }

    // Method 2: Check if running in standalone mode (already installed)
    if (this.isStandalone) {
      return true;
    }

    // Method 3: Check if app is in list of installed apps (Chrome only)
    if ('getInstalledRelatedApps' in navigator) {
      try {
        const relatedApps = await (navigator as any).getInstalledRelatedApps();
        if (relatedApps.length > 0) {
          // Mark as installed if detected
          localStorage.setItem('pwa-installed', 'true');
          return true;
        }
      } catch (error) {
        console.log('getInstalledRelatedApps failed:', error);
      }
    }

    // Method 4: For iOS, check if we have a history of being added to home screen
    if (this.isIOS()) {
      const iosInstalled = localStorage.getItem('ios-pwa-added');
      if (iosInstalled === 'true') {
        return true;
      }
    }

    return false;
  }

  /**
   * Show redirect prompt to user
   */
  private showRedirectPrompt(): void {
    // Create redirect prompt element
    const prompt = document.createElement('div');
    prompt.className = 'pwa-redirect-prompt';
    prompt.innerHTML = `
      <div class="pwa-redirect-content">
        <div class="pwa-redirect-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
          </svg>
        </div>
        <div class="pwa-redirect-text">
          <h3>Open in App</h3>
          <p>You have the School Management System app installed. Would you like to open it instead?</p>
        </div>
        <div class="pwa-redirect-buttons">
          <button class="pwa-redirect-button primary" id="pwa-redirect-open">
            Open App
          </button>
          <button class="pwa-redirect-button secondary" id="pwa-redirect-continue">
            Continue in Browser
          </button>
        </div>
      </div>
    `;

    // Add styles
    this.addRedirectStyles();

    // Add to page
    document.body.appendChild(prompt);

    // Add event listeners
    const openButton = prompt.querySelector('#pwa-redirect-open');
    const continueButton = prompt.querySelector('#pwa-redirect-continue');

    if (openButton) {
      openButton.addEventListener('click', () => {
        this.redirectToPWA();
        prompt.remove();
      });
    }

    if (continueButton) {
      continueButton.addEventListener('click', () => {
        prompt.remove();
        // Remember user's choice
        localStorage.setItem('pwa-redirect-dismissed', 'true');
      });
    }

    // Auto-hide after timeout
    setTimeout(() => {
      if (document.body.contains(prompt)) {
        prompt.remove();
      }
    }, this.redirectTimeout);
  }

  /**
   * Redirect user to PWA app
   */
  public redirectToPWA(): void {
    try {
      if (this.isIOS()) {
        // For iOS, show instructions to manually open the PWA
        this.showIOSOpenInstructions();
      } else if (this.isAndroid()) {
        // For Android, try intent-based redirection
        this.redirectAndroidPWA();
      } else {
        // For desktop, try to focus/open PWA window
        this.redirectDesktopPWA();
      }
    } catch (error) {
      console.log('PWA redirect failed:', error);
      this.fallbackToInstall();
    }
  }

  /**
   * Show iOS instructions to open PWA
   */
  private showIOSOpenInstructions(): void {
    alert(
      'To open the School Management System app:\n\n' +
      '1. Go to your Home Screen\n' +
      '2. Look for the "SMS" app icon\n' +
      '3. Tap the icon to open the app\n\n' +
      'The app should be available on your Home Screen if you previously added it.'
    );
  }

  /**
   * Redirect Android PWA using intent
   */
  private redirectAndroidPWA(): void {
    const currentUrl = window.location.href;
    
    // Try to launch PWA using Android intent
    const intentUrl = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(currentUrl)};end`;
    
    try {
      window.location.href = intentUrl;
      
      // Fallback after a short delay
      setTimeout(() => {
        console.log('Intent redirect may have failed, showing install prompt');
        this.fallbackToInstall();
      }, 2000);
    } catch (error) {
      console.log('Android intent failed:', error);
      this.fallbackToInstall();
    }
  }

  /**
   * Redirect desktop PWA
   */
  private redirectDesktopPWA(): void {
    // For desktop, try to open a new window in standalone mode
    // This is a fallback approach since true PWA redirection is limited
    try {
      const pwaWindow = window.open(
        window.location.href,
        'PWAWindow',
        'width=1024,height=768,menubar=no,toolbar=no,location=no,status=no'
      );
      
      if (pwaWindow) {
        // Focus the new window
        pwaWindow.focus();
        // Optionally close current window after a delay
        setTimeout(() => {
          if (confirm('PWA window opened. Close this browser tab?')) {
            window.close();
          }
        }, 1000);
      } else {
        this.fallbackToInstall();
      }
    } catch (error) {
      console.log('Desktop PWA redirect failed:', error);
      this.fallbackToInstall();
    }
  }

  /**
   * Check if running on iOS
   */
  private isIOS(): boolean {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }



  /**
   * Check if running on Android
   */
  private isAndroid(): boolean {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /android/.test(userAgent);
  }

  /**
   * Fallback to PWA installation
   */
  private fallbackToInstall(): void {
    // Show install prompt instead
    const event = new CustomEvent('showPWAInstall');
    window.dispatchEvent(event);
  }

  /**
   * Add CSS styles for redirect prompt
   */
  private addRedirectStyles(): void {
    if (document.getElementById('pwa-redirect-styles')) {
      return; // Styles already added
    }

    const style = document.createElement('style');
    style.id = 'pwa-redirect-styles';
    style.textContent = `
      .pwa-redirect-prompt {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
        animation: fadeIn 0.3s ease-out;
      }

      .pwa-redirect-content {
        background: white;
        border-radius: 16px;
        padding: 32px;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s ease-out;
      }

      .pwa-redirect-icon {
        margin-bottom: 24px;
        color: #004ab0;
      }

      .pwa-redirect-text h3 {
        margin: 0 0 16px 0;
        font-size: 24px;
        font-weight: 600;
        color: #333;
      }

      .pwa-redirect-text p {
        margin: 0 0 24px 0;
        font-size: 16px;
        color: #666;
        line-height: 1.5;
      }

      .pwa-redirect-buttons {
        display: flex;
        gap: 12px;
        flex-direction: column;
      }

      .pwa-redirect-button {
        padding: 14px 24px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .pwa-redirect-button.primary {
        background: #004ab0;
        color: white;
      }

      .pwa-redirect-button.primary:hover {
        background: #003d8f;
        transform: translateY(-1px);
      }

      .pwa-redirect-button.secondary {
        background: #f0f0f0;
        color: #333;
      }

      .pwa-redirect-button.secondary:hover {
        background: #e0e0e0;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 480px) {
        .pwa-redirect-content {
          padding: 24px;
          margin: 20px;
        }
        
        .pwa-redirect-text h3 {
          font-size: 20px;
        }
        
        .pwa-redirect-text p {
          font-size: 14px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /**
   * Check if user has dismissed the redirect prompt
   */
  private shouldShowRedirect(): boolean {
    const dismissed = localStorage.getItem('pwa-redirect-dismissed');
    if (dismissed === 'true') {
      return false;
    }
    return true;
  }

  /**
   * Reset redirect state (useful for testing)
   */
  public resetRedirectState(): void {
    this.redirectAttempted = false;
    localStorage.removeItem('pwa-redirect-dismissed');
  }

  /**
   * Mark PWA as installed
   */
  public markAsInstalled(): void {
    localStorage.setItem('pwa-installed', 'true');
    
    // For iOS, also mark the iOS-specific flag
    if (this.isIOS()) {
      localStorage.setItem('ios-pwa-added', 'true');
    }
  }

  /**
   * Manually trigger redirect prompt (for testing)
   */
  public triggerRedirectPrompt(): void {
    if (!this.isStandalone && this.shouldShowRedirect()) {
      this.showRedirectPrompt();
    }
  }

  /**
   * Get current redirect state
   */
  public getRedirectState(): {
    isStandalone: boolean;
    redirectAttempted: boolean;
    shouldShowRedirect: boolean;
  } {
    return {
      isStandalone: this.isStandalone,
      redirectAttempted: this.redirectAttempted,
      shouldShowRedirect: this.shouldShowRedirect()
    };
  }
}

// Export singleton instance
export const pwaRedirect = PWARedirect.getInstance();
