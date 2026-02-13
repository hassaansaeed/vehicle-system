import { Link, usePage } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps, SharedData } from '@/types';
import { Car, ShieldCheck, Zap, Lock } from 'lucide-react';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage<SharedData>().props;

    return (
        <div className="relative min-h-screen flex flex-col lg:grid lg:grid-cols-2">
            {/* Mobile Header - only visible on small screens */}
            <div className="lg:hidden flex items-center justify-between p-6 border-b bg-background/50 backdrop-blur-sm sticky top-0 z-50">
                <Link href={home()} className="flex items-center gap-2 group">
                    <div className="bg-primary p-1.5 rounded-lg text-primary-foreground transition-transform group-hover:scale-105">
                        <Car className="size-5" />
                    </div>
                    <span className="font-bold tracking-tight text-lg">{name}</span>
                </Link>
            </div>

            {/* Right Side: Form (First on mobile) */}
            <main className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:max-w-md">
                    <div className="space-y-2 mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
                        <p className="text-muted-foreground">{description}</p>
                    </div>

                    <div className="relative">
                        {/* Subtle background blob for the form card */}
                        <div className="absolute -top-10 -left-10 size-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative">
                            {children}
                        </div>
                    </div>
                </div>
            </main>

            {/* Left Side: Branding Panel (Hidden on mobile or stacked) */}
            <aside className="relative hidden lg:flex flex-col bg-slate-900 p-12 text-white overflow-hidden justify-between">
                {/* Decorative Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/20 via-transparent to-transparent opacity-50" />
                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-50" />
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
                </div>

                <div className="relative z-10">
                    <Link href={home()} className="flex items-center gap-3 transition-opacity hover:opacity-90">
                        <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl ring-1 ring-white/20">
                            <Car className="size-8 text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">{name}</span>
                    </Link>

                    <div className="mt-20 max-w-lg">
                        <h2 className="text-4xl font-bold leading-tight mb-4">
                            Modern Vehicle <br />
                            <span className="text-primary-foreground/80">Verification Platform.</span>
                        </h2>
                        <p className="text-lg text-slate-400 font-medium">
                            Professional verification tools at your fingertips.
                        </p>

                        <div className="mt-12 space-y-8">
                            {[
                                { icon: ShieldCheck, title: "Secure", desc: "Enterprise-grade encryption for all your data." },
                                { icon: Zap, title: "Fast", desc: "Instant processing and real-time updates." },
                                { icon: Lock, title: "Private", desc: "Your identity is protected with advanced privacy controls." }
                            ].map((feature, i) => (
                                <div key={i} className="flex items-start gap-4 group">
                                    <div className="mt-1 bg-white/5 p-2 rounded-lg ring-1 ring-white/10 group-hover:bg-white/10 transition-colors">
                                        <feature.icon className="size-5 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                                        <p className="text-slate-400">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} {name}. All rights reserved.
                    </p>
                </div>
            </aside>
        </div>
    );
}
