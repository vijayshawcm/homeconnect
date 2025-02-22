import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

// Title utility function
export const updatePageTitle = (title) => {
	document.title = title
		? `HomeConnect | ${title}`
		: 'HomeConnect | Smart Home Management';
};
