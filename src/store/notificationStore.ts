import { create } from "zustand";

export type NotificationSeverity = "success" | "error" | "warning" | "info";

export interface Notification {
	id: string;
	message: string;
	severity: NotificationSeverity;
	autoHide?: boolean;
	duration?: number;
}

interface NotificationState {
	notifications: Notification[];
	addNotification: (
		message: string,
		severity?: NotificationSeverity,
		options?: { autoHide?: boolean; duration?: number },
	) => void;
	removeNotification: (id: string) => void;
	clearAll: () => void;
	// Convenience methods
	showSuccess: (message: string, options?: { autoHide?: boolean; duration?: number }) => void;
	showError: (message: string, options?: { autoHide?: boolean; duration?: number }) => void;
	showWarning: (message: string, options?: { autoHide?: boolean; duration?: number }) => void;
	showInfo: (message: string, options?: { autoHide?: boolean; duration?: number }) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
	notifications: [],

	addNotification: (message, severity = "info", options = {}) => {
		const id = `notification-${Date.now()}-${Math.random()}`;
		const { autoHide = true, duration = 6000 } = options;

		const notification: Notification = {
			id,
			message,
			severity,
			autoHide,
			duration,
		};

		set((state) => ({
			notifications: [...state.notifications, notification],
		}));

		// Auto remove if autoHide is enabled
		if (autoHide) {
			setTimeout(() => {
				get().removeNotification(id);
			}, duration);
		}
	},

	removeNotification: (id) =>
		set((state) => ({
			notifications: state.notifications.filter((n) => n.id !== id),
		})),

	clearAll: () => set({ notifications: [] }),

	// Convenience methods
	showSuccess: (message, options) => get().addNotification(message, "success", options),
	showError: (message, options) => get().addNotification(message, "error", options),
	showWarning: (message, options) => get().addNotification(message, "warning", options),
	showInfo: (message, options) => get().addNotification(message, "info", options),
}));
