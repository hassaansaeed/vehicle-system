import { Form, Head } from '@inertiajs/react';
import { Mail, LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Forgot password"
            description="Enter your email to receive a password reset link"
        >
            <Head title="Forgot password" />

            {status && (
                <div className="mb-6 p-3 rounded-lg bg-green-50 border border-green-200 text-sm font-medium text-green-600 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                    {status}
                </div>
            )}

            <Form {...email.form()} className="flex flex-col gap-5">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="font-semibold">Email address</Label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                                    <Mail className="size-4" />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="email@example.com"
                                    className="pl-10 h-11 rounded-xl shadow-sm border-slate-200 transition-all focus-visible:ring-primary/20"
                                />
                            </div>
                            <InputError message={errors.email} />
                        </div>

                        <Button
                            className="h-11 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
                            disabled={processing}
                            data-test="email-password-reset-link-button"
                        >
                            {processing ? (
                                <div className="flex items-center gap-2">
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                    <span>Sending link...</span>
                                </div>
                            ) : (
                                "Email password reset link"
                            )}
                        </Button>
                    </>
                )}
            </Form>

            <div className="mt-8 text-center text-sm text-slate-500">
                Or, return to{' '}
                <TextLink href={login()} className="font-bold text-slate-900 hover:text-primary transition-colors">log in</TextLink>
            </div>
        </AuthLayout>
    );
}
