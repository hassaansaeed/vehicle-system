import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    CheckCircle,
    XCircle,
    ArrowLeft,
    User,
    FileText,
    Car,
    Camera,
    CreditCard,
    Search,
    ShieldCheck,
    ClipboardCheck,
    Lock,
    Eye,
    History
} from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
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
    status: 'pending' | 'under_review' | 'verified' | 'approved' | 'rejected';
    admin_notes: string | null;
    reviewer_notes: string | null;
    internal_notes: string | null;
    reviewed_at: string | null;
    reviewed_by: number | null;
    reviewer: { name: string } | null;
    user: { name: string; email: string };
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
    {
        title: 'Verification Submissions',
        href: '/admin/verifications',
    },
];

export default function VerificationShow({ submission }: Props) {
    const { auth } = usePage<SharedData>().props;
    const role = auth.user?.role?.name;
    const isAdmin = role === 'admin';
    const isReviewer = role === 'reviewer';

    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [showApproveDialog, setShowApproveDialog] = useState(false);
    const [showVerifyDialog, setShowVerifyDialog] = useState(false);

    const rejectForm = useForm({
        notes: '',
        internal_notes: '',
    });

    const approveForm = useForm({
        notes: '',
        internal_notes: '',
    });

    const verifyForm = useForm({
        reviewer_notes: '',
        internal_notes: '',
    });

    const handleReview = () => {
        router.post(`/admin/verifications/${submission.id}/review`);
    };

    const handleVerify = () => {
        verifyForm.post(`/admin/verifications/${submission.id}/verify`, {
            onSuccess: () => {
                setShowVerifyDialog(false);
                verifyForm.reset();
            },
        });
    };

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
            pending: { variant: 'secondary' as const, icon: null, text: 'Pending Review', color: 'bg-yellow-100 text-yellow-700' },
            under_review: { variant: 'secondary' as const, icon: Search, text: 'Under Review', color: 'bg-blue-100 text-blue-700' },
            verified: { variant: 'secondary' as const, icon: ShieldCheck, text: 'Verified', color: 'bg-purple-100 text-purple-700' },
            approved: { variant: 'default' as const, icon: CheckCircle, text: 'Approved', color: 'bg-green-100 text-green-700' },
            rejected: { variant: 'destructive' as const, icon: XCircle, text: 'Rejected', color: 'bg-red-100 text-red-700' },
        };

        const config = variants[status as keyof typeof variants] || { variant: 'outline' as const, icon: null, text: status, color: '' };
        const Icon = config.icon;

        return (
            <Badge variant={config.variant} className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] ${config.color}`}>
                {Icon && <Icon className="h-3 w-3" />}
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
                    href: `/admin/verifications/${submission.id}`,
                },
            ]}
        >
            <Head title={`Submission #${submission.id}`} />

            <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-2xl border shadow-sm">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => router.visit('/admin/verifications')}
                            className="rounded-full h-10 w-10 shrink-0"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-3xl font-bold tracking-tight">
                                    Submission #{submission.id}
                                </h1>
                                {getStatusBadge(submission.status)}
                            </div>
                            <p className="text-muted-foreground mt-1">
                                Applicant: <span className="font-semibold text-foreground">{submission.user?.name}</span> • Submitted on {format(new Date(submission.created_at), 'PPP')}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {/* Final Approval Actions (Admin Only) */}
                        {isAdmin && (submission.status === 'verified' || submission.status === 'under_review') && (
                            <>
                                <Button
                                    variant="destructive"
                                    onClick={() => setShowRejectDialog(true)}
                                    className="rounded-full shadow-lg shadow-red-500/10"
                                >
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Reject
                                </Button>
                                <Button
                                    onClick={() => setShowApproveDialog(true)}
                                    className="bg-green-600 hover:bg-green-700 rounded-full shadow-lg shadow-green-500/10"
                                >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approve Final
                                </Button>
                            </>
                        )}

                        {/* Review Session Logic */}
                        {(isAdmin || isReviewer) && submission.status === 'pending' && (
                            <Button
                                onClick={handleReview}
                                className="bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg shadow-blue-500/10"
                            >
                                <Search className="mr-2 h-4 w-4" />
                                Start Review
                            </Button>
                        )}

                        {/* Verification Step */}
                        {(isAdmin || isReviewer) && submission.status === 'under_review' && (
                            <Button
                                onClick={() => setShowVerifyDialog(true)}
                                className="bg-purple-600 hover:bg-purple-700 rounded-full shadow-lg shadow-purple-500/10"
                            >
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                Verify Documents
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Form Data */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Personal Information */}
                            <Card className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="bg-muted/30 border-b">
                                    <CardTitle className="text-lg flex items-center gap-2 font-bold">
                                        <User className="h-5 w-5 text-primary" />
                                        Personal Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-muted-foreground text-xs uppercase font-bold">Full Name</Label>
                                            <p className="font-semibold text-lg">{submission.user?.name}</p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs uppercase font-bold">Email</Label>
                                            <p className="font-medium text-sm text-blue-600 underline">{submission.user?.email}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed">
                                        <div>
                                            <Label className="text-muted-foreground text-xs uppercase font-bold">ID Number</Label>
                                            <p className="font-mono font-bold text-lg">{submission.id_number}</p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs uppercase font-bold">Gender</Label>
                                            <p className="font-medium capitalize">{submission.gender}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground text-xs uppercase font-bold">Date of Birth</Label>
                                        <p className="font-medium">
                                            {format(new Date(submission.date_of_birth), 'MMM dd, yyyy')}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment/Contact */}
                            <Card className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="bg-muted/30 border-b">
                                    <CardTitle className="text-lg flex items-center gap-2 font-bold">
                                        <CreditCard className="h-5 w-5 text-primary" />
                                        Contact & Payment
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div>
                                        <Label className="text-muted-foreground text-xs uppercase font-bold">STC Pay Phone</Label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="bg-green-100 text-green-700 rounded-lg px-2 py-1 text-xs font-bold font-mono">
                                                Saudi Arabia (+966)
                                            </div>
                                            <p className="font-bold text-xl select-all tracking-wider">{submission.stc_phone}</p>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-dashed">
                                        <Label className="text-muted-foreground text-xs uppercase font-bold">Vehicle Info</Label>
                                        <div className="flex items-center gap-3 mt-1">
                                            <Car className="h-8 w-8 text-primary/40" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Sequence Number</p>
                                                <p className="font-bold text-lg font-mono">{submission.vehicle_sequence_number}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Identity Documents Grid */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <DocumentCard
                                title="National ID"
                                path={submission.id_front_path}
                                icon={ClipboardCheck}
                            />
                            <DocumentCard
                                title="Driver License"
                                path={submission.license_front_path}
                                icon={ShieldCheck}
                                footer={`Expires: ${format(new Date(submission.license_expiry), 'MMM yyyy')}`}
                            />
                            <DocumentCard
                                title="Registration"
                                path={submission.vehicle_registration_path}
                                icon={FileText}
                            />
                        </div>

                        {/* Selfie Card */}
                        <Card className="rounded-2xl overflow-hidden border-2 border-primary/10 shadow-xl overflow-hidden">
                            <CardHeader className="bg-primary/5 border-b">
                                <CardTitle className="text-lg flex items-center gap-2 font-bold">
                                    <Camera className="h-5 w-5 text-primary" />
                                    Biometric Verification
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="aspect-[4/3] relative bg-muted flex items-center justify-center">
                                    {submission.selfie_path ? (
                                        <img
                                            src={`/storage/${submission.selfie_path}`}
                                            alt="Selfie"
                                            className="w-full h-full object-contain cursor-zoom-in"
                                            onClick={() => window.open(`/storage/${submission.selfie_path}`, '_blank')}
                                        />
                                    ) : (
                                        <div className="text-muted-foreground flex flex-col items-center gap-2">
                                            <Camera className="h-12 w-12 opacity-20" />
                                            <p>No image provided</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Review Notes & History */}
                    <div className="space-y-6">
                        {/* History & Review Summary */}
                        <Card className="rounded-2xl shadow-sm border-blue-100 bg-blue-50/20">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold flex items-center gap-2 text-blue-800 uppercase tracking-widest">
                                    <History className="h-4 w-4" />
                                    Audit & Feedback
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {(submission.admin_notes || submission.reviewer_notes) ? (
                                    <>
                                        {submission.reviewer_notes && (
                                            <div className="space-y-1">
                                                <Label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                                                    <Search className="h-3 w-3" /> Reviewer Notes
                                                </Label>
                                                <p className="text-sm italic p-3 bg-white border rounded-xl shadow-sm">
                                                    "{submission.reviewer_notes}"
                                                </p>
                                            </div>
                                        )}
                                        {submission.admin_notes && (
                                            <div className="space-y-1">
                                                <Label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                                                    <CheckCircle className="h-3 w-3" /> Admin Final Notes
                                                </Label>
                                                <p className="text-sm italic p-3 bg-white border rounded-xl shadow-sm">
                                                    "{submission.admin_notes}"
                                                </p>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="py-8 text-center border-2 border-dashed rounded-2xl flex flex-col items-center gap-2">
                                        <Search className="h-8 w-8 text-muted-foreground/30" />
                                        <p className="text-xs text-muted-foreground font-medium">No public feedback yet</p>
                                    </div>
                                )}

                                {submission.reviewed_at && (
                                    <div className="pt-4 border-t mt-4 flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <User className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-blue-800">{submission.reviewer?.name || 'Staff'}</p>
                                            <p className="text-[10px] text-muted-foreground">{format(new Date(submission.reviewed_at), 'PPP')}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Internal Team Notes (Locked) */}
                        <Card className="rounded-2xl shadow-sm border-orange-100 bg-orange-50/20">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold flex items-center gap-2 text-orange-800 uppercase tracking-widest leading-none">
                                    <Lock className="h-3 w-3" />
                                    Internal Team Notes
                                    <Badge variant="outline" className="ml-auto text-[9px] h-4 bg-orange-100 border-orange-200 text-orange-800">Private</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {submission.internal_notes ? (
                                    <p className="text-xs leading-relaxed text-orange-950/80">
                                        {submission.internal_notes}
                                    </p>
                                ) : (
                                    <p className="text-xs italic text-muted-foreground">No internal team notes recorded yet.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Verify Documents Dialog */}
            <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
                <DialogContent className="sm:max-w-md rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-purple-600" />
                            Verify Documents
                        </DialogTitle>
                        <DialogDescription>
                            Confirm all documents have been reviewed and match the applicant's profile.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="reviewer-notes" className="font-bold">Reviewer Feedback (User-Visible)</Label>
                            <Textarea
                                id="reviewer-notes"
                                placeholder="Add notes for the user..."
                                value={verifyForm.data.reviewer_notes}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => verifyForm.setData('reviewer_notes', e.target.value)}
                                className="min-h-[100px] rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="internal-notes-verify" className="font-bold text-orange-800">Internal Team Notes (Private)</Label>
                            <Textarea
                                id="internal-notes-verify"
                                placeholder="Confidential verification details..."
                                value={verifyForm.data.internal_notes}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => verifyForm.setData('internal_notes', e.target.value)}
                                className="bg-orange-50/50 rounded-xl"
                            />
                        </div>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="ghost" onClick={() => setShowVerifyDialog(false)} className="rounded-full">Cancel</Button>
                        <Button
                            onClick={handleVerify}
                            disabled={verifyForm.processing}
                            className="bg-purple-600 hover:bg-purple-700 rounded-full w-full sm:w-auto px-8"
                        >
                            Complete Verification
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Approve Dialog */}
            <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
                <DialogContent className="sm:max-w-md rounded-3xl border-green-100">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-green-700">
                            <CheckCircle className="h-5 w-5" />
                            Final Approval
                        </DialogTitle>
                        <DialogDescription>
                            Confirm final approval for this user. This will notify the user and grant system access.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="approve-notes" className="font-bold">Approval Note (Public)</Label>
                            <Textarea
                                id="approve-notes"
                                placeholder="Congratulations! Your account is approved..."
                                value={approveForm.data.notes}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => approveForm.setData('notes', e.target.value)}
                                className="rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="internal-notes-approve" className="font-bold">Internal Audit Notes</Label>
                            <Textarea
                                id="internal-notes-approve"
                                placeholder="Optional internal record..."
                                value={approveForm.data.internal_notes}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => approveForm.setData('internal_notes', e.target.value)}
                                className="rounded-xl"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setShowApproveDialog(false)} className="rounded-full">Cancel</Button>
                        <Button
                            onClick={handleApprove}
                            disabled={approveForm.processing}
                            className="bg-green-600 hover:bg-green-700 rounded-full w-full sm:w-auto px-8"
                        >
                            Confirm Approval
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Reject Dialog */}
            <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <DialogContent className="sm:max-w-md rounded-3xl border-red-100">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-700">
                            <XCircle className="h-5 w-5" />
                            Reject Submission
                        </DialogTitle>
                        <DialogDescription>
                            Please provide a clear reason for rejection so the user can rectify the issue.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="reject-notes" className="font-bold text-red-700">Rejection Reason *</Label>
                            <Textarea
                                id="reject-notes"
                                placeholder="e.g. Identity document expired, data mismatch..."
                                value={rejectForm.data.notes}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => rejectForm.setData('notes', e.target.value)}
                                className={`rounded-xl ${rejectForm.errors.notes ? 'border-destructive' : ''}`}
                            />
                            {rejectForm.errors.notes && (
                                <p className="mt-1 text-xs text-destructive font-medium">{rejectForm.errors.notes}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="internal-notes-reject" className="font-bold">Internal Team Rationale</Label>
                            <Textarea
                                id="internal-notes-reject"
                                value={rejectForm.data.internal_notes}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => rejectForm.setData('internal_notes', e.target.value)}
                                className="rounded-xl"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setShowRejectDialog(false)} className="rounded-full">Cancel</Button>
                        <Button
                            variant="destructive"
                            onClick={handleReject}
                            disabled={rejectForm.processing || !rejectForm.data.notes}
                            className="rounded-full w-full sm:w-auto px-10"
                        >
                            Confirm Rejection
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

function DocumentCard({ title, path, icon: Icon, footer }: { title: string, path: string | null, icon: any, footer?: string }) {
    return (
        <Card className="rounded-2xl overflow-hidden group shadow-sm hover:shadow-xl transition-all border-none">
            <div className="bg-muted aspect-[3/4] relative flex items-center justify-center overflow-hidden">
                {path ? (
                    <>
                        <img
                            src={`/storage/${path}`}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="rounded-full"
                                onClick={() => window.open(`/storage/${path}`, '_blank')}
                            >
                                <Eye className="h-4 w-4 mr-2" /> View Original
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-2 opacity-20">
                        <Icon className="h-12 w-12" />
                        <span className="text-xs font-bold uppercase tracking-wider">No {title}</span>
                    </div>
                )}
            </div>
            <div className="p-4 bg-white border-t flex flex-col gap-1">
                <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">{title}</span>
                {footer ? (
                    <span className="text-xs font-medium text-primary">{footer}</span>
                ) : (
                    <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Ready for review</span>
                )}
            </div>
        </Card>
    );
}
