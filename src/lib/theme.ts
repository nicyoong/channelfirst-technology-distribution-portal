/**
 * Color tokens and theme configuration for ChannelFirst Technology
 */

export const theme = {
  colors: {
    primary: "#1D4ED8",
    primaryHover: "#1E40AF",
    primaryLight: "#EFF6FF",
    navy: "#0F172A",
    surface: "#F8FAFC",
    border: "#E2E8F0",
    background: "#FFFFFF",
    muted: "#64748B",
    mutedForeground: "#94A3B8",
    accent: "#F59E0B",
    accentForeground: "#FFFFFF",
    destructive: "#DC2626",
    success: "#16A34A",
    warning: "#D97706",
    info: "#1D4ED8",
  },
  fonts: {
    body: "Inter, system-ui, sans-serif",
    heading: "Plus Jakarta Sans, Inter, system-ui, sans-serif",
  },
  radii: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

export type ThemeKey = keyof typeof theme;
