import { Head, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, ArrowLeft, User, FileText, Car, Camera, CreditCard, Clock } from 'lucide-react';
import { format } from 'date-fns';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Submission = {
    id: number;
    gender: string;
    date_of_birth: string;
    id_number: string;
    id_front_path: string | null;
    license_front_path: string | null;
    license_expiry: string;
    vehicle_registration_path: string | null;
    vehicle_sequence_number: string;
    selfie_path: string | null;
    stc_phone: string;
    status: 'pending' | 'approved' | 'rejected';
    admin_notes: string | null;
    reviewed_at: string | null;
    created_at: string;
};

type Props = {
    submission: Submission;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function VerificationShow({ submission }: Props) {
    const getStatusBadge = (status: string) => {
        const variants = {
            pending: { variant: 'secondary' as const, icon: Clock, text: 'Pending' },
            approved: { variant: 'default' as const, icon: CheckCircle, text: 'Approved' },
            rejected: { variant: 'destructive' as const, icon: XCircle, text: 'Rejected' },
        };

        const config = variants[status as keyof typeof variants];
        const Icon = config.icon;

        return (
            <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
                <Icon className="h-3 w-3" />
                {config.text}
            </Badge>
        );
    };

    return (
        <AppLayout
            breadcrumbs={[
                ...breadcrumbs,
                {
                    title: `Submission #${submission.id}`,
                    href: `/verification/show/${submission.id}`,
                },
            ]}
        >
            <Head title={`Submission #${submission.id}`} />

            <div className="space-y-6 max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.visit('/dashboard')}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Submission #{submission.id}
                            </h1>
                            <p className="text-muted-foreground">
                                Submitted on {format(new Date(submission.created_at), 'MMMM dd, yyyy')}
                            </p>
                        </div>
                    </div>
                    <div>{getStatusBadge(submission.status)}</div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-muted-foreground">ID Number</Label>
                                <p className="font-medium">{submission.id_number}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-muted-foreground">Gender</Label>
                                    <p className="font-medium capitalize">{submission.gender}</p>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Date of Birth</Label>
                                    <p className="font-medium">
                                        {format(new Date(submission.date_of_birth), 'MMM dd, yyyy')}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-primary" />
                                Payment Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-muted-foreground">STC Pay Number</Label>
                                <p className="font-medium">{submission.stc_phone}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feedback from Admin */}
                    {submission.admin_notes && (
                        <Card className="md:col-span-2 border-primary/20 bg-primary/5">
                            <CardHeader>
                                <CardTitle className="text-primary">Admin Feedback</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="italic text-lg">"{submission.admin_notes}"</p>
                                {submission.reviewed_at && (
                                    <p className="text-xs text-muted-foreground mt-4">
                                        Reviewed at {format(new Date(submission.reviewed_at), 'PPPp')}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Identity Documents */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                Identity Documents
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {submission.id_front_path && (
                                    <div>
                                        <Label className="text-muted-foreground mb-2 block">National ID</Label>
                                        <div className="aspect-video relative overflow-hidden rounded-lg border">
                                            <img
                                                src={`/storage/${submission.id_front_path}`}
                                                alt="ID Front"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                )}
                                {submission.license_front_path && (
                                    <div>
                                        <Label className="text-muted-foreground mb-2 block">Driver License</Label>
                                        <div className="aspect-video relative overflow-hidden rounded-lg border">
                                            <img
                                                src={`/storage/${submission.license_front_path}`}
                                                alt="License Front"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vehicle Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Car className="h-5 w-5 text-primary" />
                                Vehicle Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-muted-foreground">Sequence Number</Label>
                                <p className="font-medium">{submission.vehicle_sequence_number}</p>
                            </div>
                            {submission.vehicle_registration_path && (
                                <div>
                                    <Label className="text-muted-foreground mb-2 block">Registration Card</Label>
                                    <div className="aspect-video relative overflow-hidden rounded-lg border">
                                        <img
                                            src={`/storage/${submission.vehicle_registration_path}`}
                                            alt="Vehicle Registration"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Selfie Verification */}
                    {submission.selfie_path && (
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Camera className="h-5 w-5 text-primary" />
                                    Selfie Verification
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <img
                                    src={`/storage/${submission.selfie_path}`}
                                    alt="Selfie"
                                    className="mx-auto max-w-md rounded-lg border object-cover shadow-xl"
                                />
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
