import { Link } from 'react-router-dom';

function Footer() {
	return (
		<footer className="py-12 sm:py-16 bg-white border-t">
			<div className="container mx-auto max-w-7xl px-6">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					<div>
						<h3 className="font-semibold mb-4">Product</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="#"
									className="text-muted-foreground hover:text-violet-600 transition-colors"
								>
									Features
								</Link>
							</li>
							<li>
								<Link
									to="#"
									className="text-muted-foreground hover:text-violet-600 transition-colors"
								>
									Pricing
								</Link>
							</li>
							<li>
								<Link
									to="#"
									className="text-muted-foreground hover:text-violet-600 transition-colors"
								>
									FAQ
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold mb-4">Company</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="#"
									className="text-muted-foreground hover:text-violet-600 transition-colors"
								>
									About
								</Link>
							</li>
							<li>
								<Link
									to="#"
									className="text-muted-foreground hover:text-violet-600 transition-colors"
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									to="#"
									className="text-muted-foreground hover:text-violet-600 transition-colors"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold mb-4">Resources</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="#"
									className="text-muted-foreground hover:text-violet-600 transition-colors"
								>
									Documentation
								</Link>
							</li>
							<li>
								<Link
									to="#"
									className="text-muted-foreground hover:text-violet-600 transition-colors"
								>
									Support
								</Link>
							</li>
							<li>
								<Link
									to="#"
									className="text-muted-foreground hover:text-violet-600 transition-colors"
								>
									Terms
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold mb-4">Connect</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="#"
									className="text-muted-foreground hover:text-violet-600 transition-colors"
								>
									Twitter
								</Link>
							</li>
							<li>
								<Link
									to="#"
									className="text-muted-foreground hover:text-violet-600 transition-colors"
								>
									LinkedIn
								</Link>
							</li>
							<li>
								<Link
									to="#"
									className="text-muted-foreground hover:text-violet-600 transition-colors"
								>
									GitHub
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-12 pt-8 border-t text-center text-muted-foreground">
					<p>&copy; 2025 HomeConnect. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
