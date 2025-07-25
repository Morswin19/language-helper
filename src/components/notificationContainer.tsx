"use client";

import React from "react";
import { Alert, Stack, Slide, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useNotificationStore } from "@/store/notificationStore";

const NotificationContainer: React.FC = () => {
	const { notifications, removeNotification } = useNotificationStore();

	if (notifications.length === 0) return null;

	return (
		<Stack
			spacing={1}
			sx={{
				position: "fixed",
				top: 16,
				left: "50%",
				transform: "translateX(-50%)",
				zIndex: 9999,
				maxWidth: 400,
				width: "100%",
				overflow: "auto",
			}}
		>
			{notifications.map((notification, index) => (
				<Slide
					key={notification.id}
					direction="down"
					in={true}
					timeout={300}
					style={{ transitionDelay: `${index * 100}ms` }}
				>
					<Alert
						severity={notification.severity}
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => removeNotification(notification.id)}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
						sx={{
							width: "100%",
							boxShadow: 2,
						}}
					>
						{notification.message}
					</Alert>
				</Slide>
			))}
		</Stack>
	);
};

export default NotificationContainer;
