import { Head, router, useForm } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AppShell } from '@/components/app-shell';
import { CheckCircle, XCircle, ArrowLeft, User, FileText, Car, Camera, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

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
    reviewed_by: number | null;
    reviewer: { name: string } | null;
    created_at: string;
};

type Props = {
    submission: Submission;
};

export default function VerificationShow({ submission }: Props) {
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [showApproveDialog, setShowApproveDialog] = useState(false);

    const rejectForm = useForm({
        notes: '',
    });

    const approveForm = useForm({
        notes: '',
    });

    const handleApprove = () => {
        approveForm.post(`/admin/verifications/${submission.id}/approve`, {
            onSuccess: () => {
                setShowApproveDialog(false);
                approveForm.reset();
            },
        });
    };

    const handleReject = () => {
        rejectForm.post(`/admin/verifications/${submission.id}/reject`, {
            onSuccess: () => {
                setShowRejectDialog(false);
                rejectForm.reset();
            },
        });
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            pending: { variant: 'secondary' as const, icon: null, text: 'Pending Review' },
            approved: { variant: 'default' as const, icon: CheckCircle, text: 'Approved' },
            rejected: { variant: 'destructive' as const, icon: XCircle, text: 'Rejected' },
        };

        const config = variants[status as keyof typeof variants];
        const Icon = config.icon;

        return (
            <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
                {Icon && <Icon className="h-3 w-3" />}
                {config.text}
            </Badge>
        );
    };

    return (
        <AppShell>
            <Head title={`Submission #${submission.id}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.visit('/admin/verifications')}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
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
                                <User className="h-5 w-5" />
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
                                <CreditCard className="h-5 w-5" />
                                Payment Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-muted-foreground">STC Pay Phone</Label>
                                <p className="font-medium">+966 {submission.stc_phone}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Identity Documents */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Identity Documents
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-muted-foreground">License Expiry</Label>
                                <p className="font-medium">
                                    {format(new Date(submission.license_expiry), 'MMM dd, yyyy')}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {submission.id_front_path && (
                                    <div>
                                        <Label className="text-muted-foreground mb-2 block">National ID</Label>
                                        <img
                                            src={`/storage/${submission.id_front_path}`}
                                            alt="ID Front"
                                            className="w-full rounded-lg border object-cover"
                                        />
                                    </div>
                                )}
                                {submission.license_front_path && (
                                    <div>
                                        <Label className="text-muted-foreground mb-2 block">Driver License</Label>
                                        <img
                                            src={`/storage/${submission.license_front_path}`}
                                            alt="License Front"
                                            className="w-full rounded-lg border object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vehicle Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Car className="h-5 w-5" />
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
                                    <img
                                        src={`/storage/${submission.vehicle_registration_path}`}
                                        alt="Vehicle Registration"
                                        className="w-full rounded-lg border object-cover"
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Selfie Verification */}
                    {submission.selfie_path && (
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Camera className="h-5 w-5" />
                                    Selfie Verification
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <img
                                    src={submission.selfie_path}
                                    alt="Selfie"
                                    className="mx-auto max-w-md rounded-lg border object-cover"
                                />
                            </CardContent>
                        </Card>
                    )}

                    {/* Review Information */}
                    {submission.reviewed_at && (
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Review Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-muted-foreground">Reviewed By</Label>
                                        <p className="font-medium">{submission.reviewer?.name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">Reviewed At</Label>
                                        <p className="font-medium">
                                            {format(new Date(submission.reviewed_at), 'MMM dd, yyyy HH:mm')}
                                        </p>
                                    </div>
                                </div>
                                {submission.admin_notes && (
                                    <div>
                                        <Label className="text-muted-foreground">Admin Notes</Label>
                                        <p className="mt-1 rounded-md bg-muted p-3">{submission.admin_notes}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Action Buttons */}
                {submission.status === 'pending' && (
                    <div className="flex justify-end gap-4 border-t pt-6">
                        <Button
                            variant="destructive"
                            onClick={() => setShowRejectDialog(true)}
                        >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                        </Button>
                        <Button
                            onClick={() => setShowApproveDialog(true)}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                        </Button>
                    </div>
                )}
            </div>

            {/* Approve Dialog */}
            <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Approve Submission</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to approve this verification submission?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="approve-notes">Notes (Optional)</Label>
                            <Textarea
                                id="approve-notes"
                                placeholder="Add any notes about this approval..."
                                value={approveForm.data.notes}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => approveForm.setData('notes', e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleApprove}
                            disabled={approveForm.processing}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            Approve
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Reject Dialog */}
            <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reject Submission</DialogTitle>
                        <DialogDescription>
                            Please provide a reason for rejecting this submission.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="reject-notes">Rejection Reason *</Label>
                            <Textarea
                                id="reject-notes"
                                placeholder="Explain why this submission is being rejected..."
                                value={rejectForm.data.notes}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => rejectForm.setData('notes', e.target.value)}
                                className={rejectForm.errors.notes ? 'border-destructive' : ''}
                            />
                            {rejectForm.errors.notes && (
                                <p className="mt-1 text-sm text-destructive">{rejectForm.errors.notes}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleReject}
                            disabled={rejectForm.processing || !rejectForm.data.notes}
                        >
                            Reject
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppShell>
    );
}
