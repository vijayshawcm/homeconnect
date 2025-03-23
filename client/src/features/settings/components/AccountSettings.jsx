import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
	AlertCircle,
	Compass,
	Info,
	Loader2,
	Mail,
	MapPin,
	UserX,
} from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { userAuthStore } from '@/store/userAuth';

function AccountSettings() {
	const { user, logoutUser } = userAuthStore(); // access user from store
	// email change state
	const [email, setEmail] = useState(user?.email || '');
	const [newEmail, setNewEmail] = useState('');
	const [isEmailFocused, setIsEmailFocused] = useState(false);
	const [emailErrors, setEmailErrors] = useState({});
	const [isChangingEmail, setIsChangingEmail] = useState(false);
	const [showEmailVerification, setShowEmailVerification] = useState(false);
	const [verificationCode, setVerificationCode] = useState('');
	const [isVerifying, setIsVerifying] = useState(false);
	const [resendDisabled, setResendDisabled] = useState(false);
	const [resendCountdown, setResendCountdown] = useState(60);

	// location state
	const [location, setLocation] = useState('');
	const [locationDetails, setLocationDetails] = useState({
		city: '',
		state: '',
		country: '',
	});
	const [locationErrors, setLocationErrors] = useState({});
	const [usingDetectedLocation, setUsingDetectedLocation] = useState(false);
	const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);
	const [isDetectingLocation, setIsDetectingLocation] = useState(false);
	const [showLocationPicker, setShowLocationPicker] = useState(false);
	const [locationInput, setLocationInput] = useState('');
	const [autocompleteResults, setAutocompleteResults] = useState([]);
	const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState(false);

	// account management state
	const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [deactivateReason, setDeactivateReason] = useState('');
	const [deleteConfirmation, setDeleteConfirmation] = useState('');
	const [isDeactivating, setIsDeactivating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	// resend otp countdown
	useEffect(() => {
		let timer;
		if (resendDisabled && resendCountdown > 0) {
			timer = setInterval(() => {
				setResendCountdown((prev) => prev - 1);
			}, 1000);
		} else if (resendCountdown === 0) {
			setResendDisabled(false);
			setResendCountdown(60);
		}

		return () => clearInterval(timer);
	}, [resendDisabled, resendCountdown]);

	// location autocomplete
	useEffect(() => {
		if (usingDetectedLocation) {
			setAutocompleteResults([]);
			return; // skip autocomplete when location is set via detection
		}
		const handleAutocomplete = async () => {
			if (locationInput.length < 3) {
				setAutocompleteResults([]);
				return;
			}
			setIsLoadingAutocomplete(true);
			try {
				const response = await fetch(
					`server/google/autocomplete?input=${encodeURIComponent(
						locationInput
					)}`
				);
				const data = await response.json();
				if (data.status === 'OK') {
					setAutocompleteResults(data.predictions);
				} else {
					console.error('Google Autocomplete error:', data.error_message);
					toast.error('Failed to fetch location suggestions');
				}
			} catch (error) {
				console.error('Error fetching autocomplete results:', error);
				toast.error('Error fetching location suggestions');
			} finally {
				setIsLoadingAutocomplete(false);
			}
		};

		const debounceTimeout = setTimeout(() => {
			if (locationInput) {
				handleAutocomplete();
			}
		}, 300);

		return () => clearTimeout(debounceTimeout);
	}, [locationInput, usingDetectedLocation]);

	// email change handler(s)
	const validateEmail = (email) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const handleEmailChange = (e) => {
		setNewEmail(e.target.value);
		if (emailErrors.newEmail) {
			setEmailErrors({});
		}
	};

	const handleRequestEmailChange = async (e) => {
		e.preventDefault();

		// validate email
		if (!newEmail) {
			setEmailErrors({ newEmail: 'New email is required' });
			return;
		}

		if (!validateEmail(newEmail)) {
			setEmailErrors({ newEmail: 'Please enter a valid email address' });
			return;
		}

		if (newEmail === email) {
			setEmailErrors({
				newEmail: 'New email must be different from current email',
			});
			return;
		}

		setIsChangingEmail(true);

		// api call
		const response = await fetch("/server/auth/sendOTP", {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ status: "modifyPassword", email }),
		})

		if(response.ok) {
			setIsChangingEmail(false);
			setShowEmailVerification(true);
			toast.success('Verification code sent', {
				description: `We've sent a verification code to ${newEmail}`,
			});
		}
	};

	const handleVerifyEmail = async (e) => {
		e.preventDefault();

		// api call to update email
		const res1= await fetch("/server/auth/verifyOTP", {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ OTP: verificationCode }),
		})

		console.log(verificationCode);

		if (!res1.ok) {
			toast.error('Verification failed', {
				description: 'Please enter the verification code',
			});
			return;
		}

		setIsVerifying(true);

		// api call to update email
		const res2 = await fetch("/server/users/updateEmail", {
			method: "PATCH",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: user.username, email: newEmail }),
		})

		if(res2.ok) {
			setIsVerifying(false);
			setShowEmailVerification(false);
			setEmail(newEmail);
			setNewEmail('');
			toast.success('Email updated', {
				description: 'Your email address has been updated successfully',
			});
		}
	};

	const handleResendCode = async () => {
		if (resendDisabled) return;

		setResendDisabled(true);

		// api call
		const response = await fetch("/server/auth/sendOTP", {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ status: "modifyPassword", email }),
		})

		if(response.ok) {
			toast.success('Code resent', {
				description: `A new verification code has been sent to ${newEmail}`,
			});
		}
	};

	// location handler(s)
	const handleLocationSelect = (result) => {
		setLocationInput(result.description);

		// parse location components
		const parts = result.description.split(', ');
		const country = parts.pop();
		const state = parts.pop();
		const city = parts.join(', ');

		setLocationDetails({
			city,
			state,
			country,
		});

		setAutocompleteResults([]);
	};

	const handleUpdateLocation = (e) => {
		e.preventDefault();

		if (!locationInput) {
			setLocationErrors({ location: 'Location is required' });
			return;
		}

		setIsUpdatingLocation(true);

		// simulate api call
		setTimeout(() => {
			setIsUpdatingLocation(false);
			setShowLocationPicker(false);
			setLocation(locationInput);
			toast.success('Location updated', {
				description: 'Your location has been updated successfully',
			});
		}, 1500);
	};

	const handleDetectLocation = () => {
		if (!navigator.geolocation) {
			toast.error('Geolocation not supported', {
				description: 'Your browser does not support geolocation',
			});
			return;
		}

		setIsDetectingLocation(true);

		navigator.geolocation.getCurrentPosition(
			async (position) => {
				try {
					const { latitude, longitude } = position.coords;
					const response = await fetch(
						`server/google/geocode?lat=${latitude}&lng=${longitude}`
					);
					const data = await response.json();
					if (data.status === 'OK' && data.results.length > 0) {
						const result = data.results[0];
						let city = '',
							state = '',
							country = '';
						result.address_components.forEach((component) => {
							if (component.types.includes('locality')) {
								city = component.long_name;
							}
							if (component.types.includes('administrative_area_level_1')) {
								state = component.long_name;
							}
							if (component.types.includes('country')) {
								country = component.long_name;
							}
						});
						setLocationInput(result.formatted_address);
						setLocationDetails({
							city: city || '-',
							state: state || '-',
							country: country || '-',
						});
						setUsingDetectedLocation(true); // flag to check if loc was set by detection
						toast.success('Location detected', {
							description: 'Your location has been detected successfully',
						});
					} else {
						console.error('Geocoding error:', data.error_message);
						toast.error('Failed to detect location');
					}
				} catch (error) {
					console.error('Error during reverse geocoding:', error);
					toast.error('Error detecting location');
				} finally {
					setIsDetectingLocation(false);
				}
			},
			(error) => {
				setIsDetectingLocation(false);
				let errorMessage = 'Failed to detect location';
				switch (error.code) {
					case error.PERMISSION_DENIED:
						errorMessage = 'Location permission denied';
						break;
					case error.POSITION_UNAVAILABLE:
						errorMessage = 'Location information unavailable';
						break;
					case error.TIMEOUT:
						errorMessage = 'Location request timed out';
						break;
					default:
						errorMessage = 'An unknown error occurred';
				}
				toast.error('Location detection failed', {
					description: errorMessage,
				});
			},
			{ timeout: 10000, enableHighAccuracy: true }
		);
	};

	// acct management handlers
	const handleDeactivateAccount = async () => {
		setIsDeactivating(true);

		// api call to update account status
		const response = await fetch("/server/users/accountStatus", {
			method: "PATCH",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: user.username, status: "deactivated" }),
		})

		if(response.ok) {
			setIsDeactivating(false);
			setShowDeactivateDialog(false);
			setDeactivateReason('');
			toast.success('Account deactivated', {
				description:
					'Your account has been deactivated. You will be logged out shortly.',
			})
			await logoutUser();
			window.location.href = '/login';
		};
	}

	const handleDeleteAccount = () => {
		if (deleteConfirmation !== 'DELETE') {
			toast.error('Confirmation required', {
				description: 'Please type DELETE to confirm account deletion',
			});
			return;
		}

		setIsDeleting(true);

		// simulate api call
		setTimeout(() => {
			setIsDeleting(false);
			setShowDeleteDialog(false);
			setDeleteConfirmation('');
			toast.success('Account deletion scheduled', {
				description:
					'Your account has been scheduled for deletion. You will be logged out shortly.',
			});

			// simulate logout
			setTimeout(() => {
				window.location.href = '/login';
			}, 3000);
		}, 1500);
	};

	return (
    <Card className="border-border/40 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-5 mb-6 bg-gradient-to-r from-[#7aee6f] to-[#C2E03A] rounded-tl-lg rounded-tr-lg">
        <div className="flex items-center gap-3">
          <div>
            <CardTitle className="text-lg font-semibold">
              Account Settings
            </CardTitle>
            <CardDescription className="text-sm mt-0.5">
              Manage your account information and preferences
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 pb-8">
        {/* Email Change Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 aspect-square rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-sm">
              <Mail className="h-1/2 w-1/2 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-medium leading-tight">
                Email Address
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Update your email address. A verification code will be sent to
                your new email.
              </p>
            </div>
          </div>

          <div className="space-y-5 pl-14">
            <div className="space-y-2.5">
              <Label htmlFor="currentEmail" className="text-sm font-medium">
                Current Email
              </Label>
              <Input
                id="currentEmail"
                value={email}
                disabled
                readOnly
                className="bg-muted/50 text-muted-foreground cursor-not-allowed"
              />
            </div>

            <form
              onSubmit={handleRequestEmailChange}
              className="space-y-5"
              noValidate
            >
              <div className="space-y-2.5">
                <div className="flex items-center space-x-1">
                  <Label htmlFor="newEmail" className="text-sm font-medium">
                    New Email
                  </Label>
                  <span className="text-red-500">*</span>
                  {emailErrors.newEmail && (
                    <span className="text-red-500 text-xs ml-auto">
                      - {emailErrors.newEmail}
                    </span>
                  )}
                </div>
                <Input
                  id="newEmail"
                  type="email"
                  value={newEmail}
                  onChange={handleEmailChange}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  required
                  className={`w-full border border-gray-300 focus:border-black focus-visible:ring-0 focus:outline-none dark:focus:border-white transition-colors duration-150 ${
                    emailErrors.newEmail && !isEmailFocused
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isChangingEmail}
                  className="h-9 text-sm font-medium"
                >
                  {isChangingEmail ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Verification...
                    </>
                  ) : (
                    "Change Email"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        <Separator className="my-8 bg-[#7aee6f]" />

        {/* Location Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 aspect-square rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shadow-sm">
              <MapPin className="h-1/2 w-1/2 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-base font-medium leading-tight">Location</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Set your location for weather updates and energy efficiency
                recommendations.
              </p>
            </div>
          </div>

          <div className="pl-14">
            <Popover
              open={showLocationPicker}
              onOpenChange={setShowLocationPicker}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal h-10 ${
                    !location ? "text-muted-foreground" : ""
                  }`}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {location || "Set your location"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-5" align="start">
                <form onSubmit={handleUpdateLocation} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-1">
                      <Label className="text-sm font-medium">
                        Your Location
                      </Label>
                      <span className="text-red-500">*</span>
                      {locationErrors.location && (
                        <span className="text-xs text-red-500 flex items-center gap-1">
                          - {locationErrors.location}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 relative">
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            placeholder="Enter your city, state, country"
                            value={locationInput}
                            onChange={(e) => {
                              setLocationInput(e.target.value);
                              setUsingDetectedLocation(false); // reset flag when user types manually
                              if (locationErrors.location) {
                                setLocationErrors({});
                              }
                            }}
                            className="w-full"
                          />
                          {isLoadingAutocomplete && (
                            <div className="absolute right-[70px] top-[10px]">
                              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          disabled={isDetectingLocation}
                          onClick={handleDetectLocation}
                          title="Detect my location"
                        >
                          {isDetectingLocation ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Compass className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      {autocompleteResults.length > 0 && (
                        <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-md max-h-60 overflow-auto">
                          {autocompleteResults.map((result) => (
                            <div
                              key={result.id}
                              className="p-2 hover:bg-muted cursor-pointer"
                              onClick={() => handleLocationSelect(result)}
                            >
                              <div className="font-medium">
                                {result.structured_formatting.main_text}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {result.structured_formatting.secondary_text}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          City
                        </Label>
                        <div className="text-sm font-medium truncate">
                          {locationDetails.city || "-"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          State/Province
                        </Label>
                        <div className="text-sm font-medium truncate">
                          {locationDetails.state || "-"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          Country
                        </Label>
                        <div className="text-sm font-medium truncate">
                          {locationDetails.country || "-"}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground pt-1">
                      Your location helps us provide weather data and energy
                      efficiency recommendations.
                    </p>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowLocationPicker(false)}
                      className="h-9 text-sm font-medium"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isUpdatingLocation || !locationInput}
                      className="h-9 text-sm font-medium"
                    >
                      {isUpdatingLocation ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Location"
                      )}
                    </Button>
                  </div>
                </form>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Separator className="my-8 bg-[#7aee6f]" />

        {/* Account Management Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 aspect-square rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shadow-sm">
              <UserX className="h-1/2 w-1/2 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-base font-medium leading-tight">
                Account Management
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your account status. These actions cannot be easily
                reversed.
              </p>
            </div>
          </div>

          <div className="space-y-6 pl-14">
            <div className="rounded-md border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900/50 p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-amber-800 dark:text-amber-500">
                    Important Information
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1.5">
                    Deactivating or deleting your account will remove your
                    access to HomeConnect services. This action may affect any
                    connected devices or automations you have set up.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-b pb-5">
                <div>
                  <h3 className="text-base font-medium">Deactivate Account</h3>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    Temporarily disable your account. You can reactivate it
                    later.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-700 h-9 text-sm font-medium"
                  onClick={() => setShowDeactivateDialog(true)}
                >
                  Deactivate Account
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3">
                <div>
                  <h3 className="text-base font-medium">Delete Account</h3>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  className="h-9 text-sm font-medium"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Email Verification Dialog */}
      <Dialog
        open={showEmailVerification}
        onOpenChange={setShowEmailVerification}
      >
        <DialogContent className="sm:max-w-[425px] w-[90%] max-h-[90vh] rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Verify Your Email</DialogTitle>
            <DialogDescription className="text-sm mt-1.5">
              We've sent a verification code to{" "}
              <span className="font-medium">{newEmail}</span>. Please enter the
              code below to confirm your email change.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-5">
            <div className="space-y-3">
              <Label htmlFor="verificationCode" className="text-sm font-medium">
                Verification Code
              </Label>
              <div className="flex justify-center">
                <Input
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="text-center text-base tracking-widest max-w-[220px] font-mono"
                  maxLength={6}
                />
              </div>
            </div>
            <div className="text-sm text-muted-foreground flex items-center justify-center">
              Didn't receive a code?{" "}
              {resendDisabled ? (
                <span className="text-muted-foreground ml-1.5 flex items-center">
                  <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  Resend in {resendCountdown}s
                </span>
              ) : (
                <button
                  className="text-primary hover:underline ml-1.5 focus:outline-none focus:underline"
                  onClick={handleResendCode}
                >
                  Resend code
                </button>
              )}
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowEmailVerification(false)}
              className="mt-0 sm:mt-0"
            >
              Cancel
            </Button>
            <Button
              onClick={handleVerifyEmail}
              disabled={isVerifying || !verificationCode}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate Account Dialog */}
      <Dialog
        open={showDeactivateDialog}
        onOpenChange={setShowDeactivateDialog}
      >
        <DialogContent className="sm:max-w-[425px] w-[90%] max-h-[90vh] rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="h-5 w-5" />
              Deactivate Your Account
            </DialogTitle>
            <DialogDescription className="text-sm mt-1.5">
              Your account will be temporarily disabled. You can reactivate it
              by logging in again.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-5">
            <div className="space-y-3">
              <Label htmlFor="deactivateReason" className="text-sm font-medium">
                Reason for deactivation (optional)
              </Label>
              <Input
                id="deactivateReason"
                value={deactivateReason}
                onChange={(e) => setDeactivateReason(e.target.value)}
                placeholder="Tell us why you're deactivating"
              />
            </div>
            <div className="rounded-md border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900/50 p-3">
              <div className="flex gap-2">
                <Info className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  Your connected devices will stop working when your account is
                  deactivated.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowDeactivateDialog(false)}
              className="mt-0 sm:mt-0"
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              className="border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-700"
              onClick={handleDeactivateAccount}
              disabled={isDeactivating}
            >
              {isDeactivating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deactivating...
                </>
              ) : (
                "Deactivate Account"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px] w-[90%] max-h-[90vh] rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <UserX className="h-5 w-5" />
              Delete Your Account
            </DialogTitle>
            <DialogDescription className="text-sm mt-1.5">
              This action is permanent and cannot be undone. All your data will
              be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-5">
            <div className="rounded-md border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50 p-3">
              <div className="flex gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-500 flex-shrink-0" />
                <div className="text-xs text-red-700 dark:text-red-400">
                  <p className="font-medium">
                    Warning: This action cannot be reversed
                  </p>
                  <ul className="list-disc list-inside mt-1.5 space-y-1">
                    <li>
                      All your homes, rooms, and device configurations will be
                      deleted
                    </li>
                    <li>Your automation rules will be permanently removed</li>
                    <li>
                      Your account information and preferences will be erased
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="deleteConfirmation"
                className="text-sm font-medium"
              >
                Type "DELETE" to confirm
              </Label>
              <Input
                id="deleteConfirmation"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="DELETE"
                className="text-center"
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="mt-0 sm:mt-0"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isDeleting || deleteConfirmation !== "DELETE"}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Account"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default AccountSettings;
