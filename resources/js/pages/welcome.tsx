import { Head, Link, usePage } from '@inertiajs/react';
import { Shield, Activity, Car, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Vehicle & Identity Verification Portal" />

            <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden font-sans antialiased">
                {/* Minimal Background Gradient */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-[120px]" />
                </div>

                {/* Header */}
                <header className="relative z-10 w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-lg backdrop-blur-md">
                            <Car className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-semibold text-lg tracking-tight">VehicleVerfi</span>
                    </div>

                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={dashboard()}>
                                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href={login()}>
                                    <Button variant="ghost" size="sm">
                                        Log in
                                    </Button>
                                </Link>
                                {canRegister && (
                                    <Link href={register()}>
                                        <Button size="sm" className="shadow-sm">
                                            Sign Up
                                        </Button>
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 text-center max-w-4xl mx-auto w-full">
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
                            Vehicle & Identity <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Verification Portal
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            A secure, government-compliant platform for instant vehicle identity verification and documentation management.
                        </p>

                        {/* Primary CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Link href="/verification">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105">
                                    Start Verification <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Indicators (Minimal) */}
                        <div className="pt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground/80">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" /> Government Compliant
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-primary" /> End-to-End Encryption
                            </div>
                            <div className="flex items-center gap-2">
                                <Activity className="h-4 w-4 text-secondary" /> Real-time Processing
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="relative z-10 py-8 border-t border-border/40 bg-background/30 backdrop-blur-sm mt-auto">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} VehicleVerfi. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
                            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Support</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
