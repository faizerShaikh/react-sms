// PWA Configuration and Utilities

export interface PWAConfig {
  name: string;
  shortName: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  display: "standalone" | "fullscreen" | "minimal-ui" | "browser";
  orientation:
    | "portrait"
    | "landscape"
    | "portrait-primary"
    | "landscape-primary";
  scope: string;
  startUrl: string;
  icons: Array<{
    src: string;
    sizes: string;
    type: string;
    purpose?: "any" | "maskable";
  }>;
}

export const pwaConfig: PWAConfig = {
  name: "School Management System",
  shortName: "SMS",
  description:
    "A comprehensive school management system for students, teachers, and administrators",
  themeColor: "#004ab0",
  backgroundColor: "#ffffff",
  display: "standalone",
  orientation: "portrait-primary",
  scope: "/",
  startUrl: "/",
  icons: [
    {
      src: "/pwa-64x64.png",
      sizes: "64x64",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/pwa-192x192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/maskable-icon-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
};

// PWA Installation Utilities
export class PWAInstaller {
  private deferredPrompt: any = null;
  private isIOS: boolean = false;
  private isStandalone: boolean = false;

  constructor() {
    this.checkPlatform();
    this.checkStandalone();
    this.setupEventListeners();
  }

  private checkPlatform(): void {
    const userAgent = window.navigator.userAgent.toLowerCase();
    this.isIOS = /iphone|ipad|ipod/.test(userAgent);
  }

  private checkStandalone(): void {
    this.isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
  }

  private setupEventListeners(): void {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });

    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null;
      this.checkStandalone();
    });
  }

  public canInstall(): boolean {
    return !this.isStandalone && this.deferredPrompt !== null;
  }

  public isIOSDevice(): boolean {
    return this.isIOS;
  }

  public isRunningAsApp(): boolean {
    return this.isStandalone;
  }

  public async install(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    try {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;

      if (outcome === "accepted") {
        this.deferredPrompt = null;
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error during PWA installation:", error);
      return false;
    }
  }

  public showIOSInstallInstructions(): void {
    if (this.isIOS) {
      // Mark the time when user attempts to install
      localStorage.setItem('ios-install-attempt', Date.now().toString());
      
      alert(
        "To install this app on your iOS device:\n\n" +
          "1. Tap the Share button (square with arrow up)\n" +
          '2. Scroll down and tap "Add to Home Screen"\n' +
          '3. Tap "Add" to confirm\n\n' +
          'After adding, you can open the app directly from your Home Screen!'
      );
    }
  }
}

// PWA Status Utilities
export class PWAStatus {
  private static instance: PWAStatus;
  private isOnline: boolean = navigator.onLine;
  private listeners: Array<(online: boolean) => void> = [];

  private constructor() {
    this.setupEventListeners();
  }

  public static getInstance(): PWAStatus {
    if (!PWAStatus.instance) {
      PWAStatus.instance = new PWAStatus();
    }
    return PWAStatus.instance;
  }

  private setupEventListeners(): void {
    window.addEventListener("online", () => this.updateStatus(true));
    window.addEventListener("offline", () => this.updateStatus(false));
  }

  private updateStatus(online: boolean): void {
    this.isOnline = online;
    this.listeners.forEach((listener) => listener(online));
  }

  public isOnlineStatus(): boolean {
    return this.isOnline;
  }

  public addStatusListener(listener: (online: boolean) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
}

// Export singleton instances
export const pwaInstaller = new PWAInstaller();
export const pwaStatus = PWAStatus.getInstance();

// Re-export redirect utility
export { pwaRedirect } from "./pwaRedirect";
