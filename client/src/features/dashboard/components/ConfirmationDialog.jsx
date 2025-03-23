import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ConfirmationDialog = ({ open, onConfirm, onCancel, title, message }) => {
	return (
		<Dialog open={open} onOpenChange={onCancel}>
			<DialogContent className="w-[90%] rounded-lg">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<div className="py-4">
					<p className="text-sm">{message}</p>
				</div>
				<DialogFooter className="gap-2 md:gap-0">
					<Button variant="outline" onClick={onCancel}>
						Cancel
					</Button>
					<Button variant="destructive" onClick={onConfirm}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ConfirmationDialog;
