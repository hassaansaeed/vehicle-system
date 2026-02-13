import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayout
            title="Create an account"
            description="Join us today! It only takes a minute."
        >
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="font-semibold">Full Name</Label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                                        <User className="size-4" />
                                    </div>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="John Doe"
                                        className="pl-10 h-11 rounded-xl shadow-sm border-slate-200 transition-all focus-visible:ring-primary/20"
                                    />
                                </div>
                                <InputError
                                    message={errors.name}
                                    className="mt-1"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email" className="font-semibold">Email address</Label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                                        <Mail className="size-4" />
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        name="email"
                                        placeholder="email@example.com"
                                        className="pl-10 h-11 rounded-xl shadow-sm border-slate-200 transition-all focus-visible:ring-primary/20"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password" className="font-semibold">Password</Label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                                        <Lock className="size-4" />
                                    </div>
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="••••••••"
                                        className="pl-10 pr-10 h-11 rounded-xl shadow-sm border-slate-200 transition-all focus-visible:ring-primary/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                                    >
                                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation" className="font-semibold">
                                    Confirm password
                                </Label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                                        <Lock className="size-4" />
                                    </div>
                                    <Input
                                        id="password_confirmation"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="••••••••"
                                        className="pl-10 pr-10 h-11 rounded-xl shadow-sm border-slate-200 transition-all focus-visible:ring-primary/20"
                                    />
                                </div>
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <div className="text-xs text-slate-500 leading-relaxed">
                                By creating an account, you agree to our{' '}
                                <TextLink href="#" className="font-semibold underline underline-offset-4">Terms of Service</TextLink> and{' '}
                                <TextLink href="#" className="font-semibold underline underline-offset-4">Privacy Policy</TextLink>.
                            </div>

                            <Button
                                type="submit"
                                className="h-11 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all mt-2"
                                tabIndex={5}
                                data-test="register-user-button"
                                disabled={processing}
                            >
                                {processing ? (
                                    <div className="flex items-center gap-2">
                                        <Spinner className="size-4" />
                                        <span>Creating account...</span>
                                    </div>
                                ) : (
                                    "Create account"
                                )}
                            </Button>
                        </div>

                        <div className="mt-4 text-center text-sm text-slate-500">
                            Already have an account?{' '}
                            <TextLink href={login()} className="font-bold text-slate-900 hover:text-primary transition-colors" tabIndex={6}>
                                Login
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
