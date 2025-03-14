import { toast } from 'sonner';
export const showToast = {
	success: (title, description) => {
		toast.success(title, {
			description,
			duration: 5000,
		});
	},
	error: (title, description) => {
		toast.error(title, {
			description,
			duration: 5000,
		});
	},
	info: (title, description) => {
		toast.info(title, {
			description,
			duration: 5000,
		});
	},
	warning: (title, description) => {
		toast.warning(title, {
			description,
			duration: 5000,
		});
	},
};
