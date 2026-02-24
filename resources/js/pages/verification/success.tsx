import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

type Props = {
    submission: {
        id: number;
        id_number: string;
        status: string;
        created_at: string;
    };
};

export default function VerificationSuccess({ submission }: Props) {
    return (
        <>
            <Head title="Submission Successful" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
                <div className="w-full max-w-md space-y-6 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Submission Successful!
                        </h1>
                        <p className="text-muted-foreground">
                            Your verification has been submitted successfully and is now under review.
                        </p>
                    </div>

                    <div className="rounded-lg border bg-muted/30 p-6 space-y-3">
                        <div className="flex justify-between text-sm">
                            {/*<span className="text-muted-foreground">Submission ID:</span>*/}
                            {/*<span className="font-medium">#{submission.id}</span>*/}
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">ID Number:</span>
                            <span className="font-medium">{submission.id_number}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Status:</span>
                            <span className="font-medium capitalize">{submission.status}</span>
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        You will be notified once your verification has been reviewed.
                        This typically takes 4-5 business days.
                    </p>

                    <Button
                        onClick={() => router.visit('/')}
                        className="w-full"
                    >
                        Return to Home
                    </Button>
                </div>
            </div>
        </>
    );
}
