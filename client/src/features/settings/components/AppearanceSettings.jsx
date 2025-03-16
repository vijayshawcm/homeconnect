import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Loader2, Palette, Check } from 'lucide-react';

function AppearanceSettings() {
	const [theme, setTheme] = useState('system');
	const [originalTheme, setOriginalTheme] = useState('system');
	const [isSaving, setIsSaving] = useState(false);

	// toggle dark mode class on doc element
	const applyTheme = (selectedTheme) => {
		const isDark =
			selectedTheme === 'dark' ||
			(selectedTheme === 'system' &&
				window.matchMedia('(prefers-color-scheme: dark)').matches);

		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	// apply theme
	useEffect(() => {
		applyTheme(theme);
		setOriginalTheme(theme);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSaving(true);

		try {
			// simulate api call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			applyTheme(theme);
			setOriginalTheme(theme);
			toast.success('Appearance settings updated successfully');
		} catch (error) {
			toast.error('Failed to update appearance settings');
		} finally {
			setIsSaving(false);
		}
	};

	const themeOptions = [
		{
			value: 'light',
			label: 'Light',
			description: 'Light mode for daytime use',
			preview: (
				<div className="w-full h-28 mb-4 rounded-lg border border-gray-200 bg-white flex flex-col overflow-hidden shadow-sm">
					<div className="h-7 border-b border-gray-200 bg-gray-50 flex items-center px-3">
						<div className="h-2.5 w-2.5 rounded-full bg-gray-300 mr-1.5"></div>
						<div className="h-2.5 w-2.5 rounded-full bg-gray-300 mr-1.5"></div>
						<div className="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
					</div>
					<div className="flex-1 p-3">
						<div className="h-2.5 w-16 bg-gray-200 rounded mb-2.5"></div>
						<div className="h-2.5 w-full bg-gray-100 rounded mb-1.5"></div>
						<div className="h-2.5 w-full bg-gray-100 rounded mb-1.5"></div>
						<div className="h-2.5 w-3/4 bg-gray-100 rounded"></div>
					</div>
				</div>
			),
		},
		{
			value: 'dark',
			label: 'Dark',
			description: 'Dark mode for nighttime use',
			preview: (
				<div className="w-full h-28 mb-4 rounded-lg border border-gray-700 bg-gray-900 flex flex-col overflow-hidden shadow-sm">
					<div className="h-7 border-b border-gray-700 bg-gray-800 flex items-center px-3">
						<div className="h-2.5 w-2.5 rounded-full bg-gray-600 mr-1.5"></div>
						<div className="h-2.5 w-2.5 rounded-full bg-gray-600 mr-1.5"></div>
						<div className="h-2.5 w-2.5 rounded-full bg-gray-600"></div>
					</div>
					<div className="flex-1 p-3">
						<div className="h-2.5 w-16 bg-gray-700 rounded mb-2.5"></div>
						<div className="h-2.5 w-full bg-gray-800 rounded mb-1.5"></div>
						<div className="h-2.5 w-full bg-gray-800 rounded mb-1.5"></div>
						<div className="h-2.5 w-3/4 bg-gray-800 rounded"></div>
					</div>
				</div>
			),
		},
		{
			value: 'system',
			label: 'System',
			description: 'Follow system preferences',
			preview: (
				<div className="w-full h-28 mb-4 rounded-lg border border-gray-400 bg-gradient-to-r from-white to-gray-900 flex flex-col overflow-hidden shadow-sm">
					<div className="h-7 border-b border-gray-400 bg-gradient-to-r from-gray-50 to-gray-800 flex items-center px-3">
						<div className="h-2.5 w-2.5 rounded-full bg-gray-500 mr-1.5"></div>
						<div className="h-2.5 w-2.5 rounded-full bg-gray-500 mr-1.5"></div>
						<div className="h-2.5 w-2.5 rounded-full bg-gray-500"></div>
					</div>
					<div className="flex-1 p-3">
						<div className="h-2.5 w-16 bg-gradient-to-r from-gray-200 to-gray-700 rounded mb-2.5"></div>
						<div className="h-2.5 w-full bg-gradient-to-r from-gray-100 to-gray-800 rounded mb-1.5"></div>
						<div className="h-2.5 w-full bg-gradient-to-r from-gray-100 to-gray-800 rounded mb-1.5"></div>
						<div className="h-2.5 w-3/4 bg-gradient-to-r from-gray-100 to-gray-800 rounded"></div>
					</div>
				</div>
			),
		},
	];

	return (
		<form onSubmit={handleSubmit}>
			<Card className="border-border/40 shadow-md hover:shadow-lg transition-shadow duration-300">
				<CardHeader className="pb-5 mb-6 bg-primary/10 rounded-tl-lg rounded-tr-lg">
					<div className="flex items-center gap-3">
						<div>
							<CardTitle className="text-lg font-medium">Appearance</CardTitle>
							<CardDescription className="text-sm mt-0.5">
								Customize how HomeConnect looks on your device
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="pb-8">
					<div className="space-y-6">
						<div className="flex items-center gap-3">
							<div className="h-10 w-10 aspect-square rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shadow-sm">
								<Palette className="h-1/2 w-1/2 text-purple-600 dark:text-purple-400" />
							</div>
							<div>
								<h3 className="text-base font-medium leading-tight">Theme</h3>
								<p className="text-sm text-muted-foreground mt-0.5">
									Select your preferred theme for the dashboard
								</p>
							</div>
						</div>

						<div className="pl-14 pt-2">
							<RadioGroup
								value={theme}
								onValueChange={(value) => {
									setTheme(value);
									applyTheme(value);
								}}
								className="grid grid-cols-1 md:grid-cols-3 gap-5"
							>
								{themeOptions.map((option) => {
									return (
										<div key={option.value} className="relative">
											<RadioGroupItem
												value={option.value}
												id={`theme-${option.value}`}
												className="peer sr-only"
											/>
											<Label
												htmlFor={`theme-${option.value}`}
												className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all duration-200"
											>
												{option.preview}
												<span className="font-medium mb-1">{option.label}</span>
												<span className="text-xs text-center text-muted-foreground">
													{option.description}
												</span>

												{theme === option.value && (
													<div className="absolute -top-1.5 -right-1.5 h-6 w-6 bg-primary rounded-full flex items-center justify-center shadow-sm">
														<Check className="h-3.5 w-3.5 text-white dark:text-black" />
													</div>
												)}
											</Label>
										</div>
									);
								})}
							</RadioGroup>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-end gap-3 border-t pt-6 px-6">
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							setTheme(originalTheme);
							applyTheme(originalTheme);
						}}
						disabled={isSaving || theme === originalTheme}
						className="h-9 text-sm font-medium"
					>
						Reset
					</Button>
					<Button
						type="submit"
						disabled={isSaving || theme === originalTheme}
						className="h-9 text-sm font-medium"
					>
						{isSaving ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Saving...
							</>
						) : (
							'Save Changes'
						)}
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}

export default AppearanceSettings;
