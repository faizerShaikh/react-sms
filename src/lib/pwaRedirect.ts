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
    // Method 1: Check if app is in list of installed apps
    if ('getInstalledRelatedApps' in navigator) {
      try {
        const relatedApps = await (navigator as any).getInstalledRelatedApps();
        return relatedApps.length > 0;
      } catch (error) {
        console.log('getInstalledRelatedApps failed:', error);
      }
    }

    // Method 2: Check if running in standalone mode (already installed)
    if (this.isStandalone) {
      return true;
    }

    // Method 3: Check localStorage for installation status
    const installStatus = localStorage.getItem('pwa-installed');
    if (installStatus === 'true') {
      return true;
    }

    // Method 4: Check if beforeinstallprompt event was fired (indicates installable)
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
    const continueButton = prompt.querySelector('#pwa-redirect-button');

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
      // Method 1: Try to open PWA using custom URL scheme
      const pwaUrl = this.getPWAUrl();
      
      if (pwaUrl) {
        // Try to open PWA
        window.location.href = pwaUrl;
        
        // Fallback: if PWA doesn't open, try to install it
        setTimeout(() => {
          this.fallbackToInstall();
        }, 1000);
      } else {
        // Fallback to install prompt
        this.fallbackToInstall();
      }
    } catch (error) {
      console.log('PWA redirect failed:', error);
      this.fallbackToInstall();
    }
  }

  /**
   * Get PWA URL for redirection
   */
  private getPWAUrl(): string | null {
    // Try different PWA URL schemes
    const schemes = [
      'sms://', // Custom scheme
      'intent://', // Android intent
      'sms-react://', // App-specific scheme
    ];

    for (const scheme of schemes) {
      try {
        // Test if scheme is supported
        const testUrl = `${scheme}${window.location.pathname}`;
        return testUrl;
      } catch (error) {
        continue;
      }
    }

    return null;
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
