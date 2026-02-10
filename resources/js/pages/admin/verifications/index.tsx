import { Head, Link, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    CheckCircle,
    Clock,
    XCircle,
    FileText,
    Eye,
    Filter,
    Search,
    User,
    ShieldCheck,
    AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Submission = {
    id: number;
    id_number: string;
    gender: string;
    date_of_birth: string;
    status: 'pending' | 'under_review' | 'verified' | 'approved' | 'rejected';
    created_at: string;
    stc_phone: string;
    user: { name: string; email: string };
};

type Stats = {
    total: number;
    pending: number;
    under_review: number;
    verified: number;
    approved: number;
    rejected: number;
};

type Props = {
    submissions: {
        data: Submission[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    stats: Stats;
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

export default function VerificationsIndex({ submissions, stats }: Props) {
    const urlParams = new URLSearchParams(window.location.search);
    const activeStatus = urlParams.get('status') || '';

    const setFilter = (status: string) => {
        const params = new URLSearchParams(window.location.search);
        if (status) {
            params.set('status', status);
        } else {
            params.delete('status');
        }
        params.delete('page'); // Reset to page 1 on filter
        router.visit(`/admin/verifications?${params.toString()}`);
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            pending: { variant: 'secondary' as const, icon: Clock, text: 'Pending', color: 'text-yellow-600 bg-yellow-50' },
            under_review: { variant: 'secondary' as const, icon: Search, text: 'Under Review', color: 'text-blue-600 bg-blue-50' },
            verified: { variant: 'secondary' as const, icon: ShieldCheck, text: 'Verified', color: 'text-purple-600 bg-purple-50' },
            approved: { variant: 'default' as const, icon: CheckCircle, text: 'Approved', color: 'text-green-600 bg-green-50' },
            rejected: { variant: 'destructive' as const, icon: XCircle, text: 'Rejected', color: 'text-red-600 bg-red-50' },
        };

        const config = variants[status as keyof typeof variants] || { variant: 'outline' as const, icon: AlertCircle, text: status, color: '' };
        const Icon = config.icon;

        return (
            <Badge variant={config.variant} className={`flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full font-medium ${config.color}`}>
                <Icon className="h-3.5 w-3.5" />
                {config.text}
            </Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Verification Submissions" />

            <div className="space-y-6 p-4 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Verification Submissions</h1>
                        <p className="text-muted-foreground">
                            Manage the full lifecycle of vehicle verification applications
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Card
                        className={`cursor-pointer transition-all hover:bg-muted/50 ${!activeStatus ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                        onClick={() => setFilter('')}
                    >
                        <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Total</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>

                    <Card
                        className={`cursor-pointer transition-all hover:bg-muted/50 ${activeStatus === 'pending' ? 'ring-2 ring-yellow-500 bg-yellow-500/5' : ''}`}
                        onClick={() => setFilter('pending')}
                    >
                        <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Pending</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                        </CardContent>
                    </Card>

                    <Card
                        className={`cursor-pointer transition-all hover:bg-muted/50 ${activeStatus === 'under_review' ? 'ring-2 ring-blue-500 bg-blue-500/5' : ''}`}
                        onClick={() => setFilter('under_review')}
                    >
                        <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Review</CardTitle>
                            <Search className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold text-blue-600">{stats.under_review}</div>
                        </CardContent>
                    </Card>

                    <Card
                        className={`cursor-pointer transition-all hover:bg-muted/50 ${activeStatus === 'verified' ? 'ring-2 ring-purple-500 bg-purple-500/5' : ''}`}
                        onClick={() => setFilter('verified')}
                    >
                        <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Verified</CardTitle>
                            <ShieldCheck className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold text-purple-600">{stats.verified}</div>
                        </CardContent>
                    </Card>

                    <Card
                        className={`cursor-pointer transition-all hover:bg-muted/50 ${activeStatus === 'approved' ? 'ring-2 ring-green-500 bg-green-500/5' : ''}`}
                        onClick={() => setFilter('approved')}
                    >
                        <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Approved</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                        </CardContent>
                    </Card>

                    <Card
                        className={`cursor-pointer transition-all hover:bg-muted/50 ${activeStatus === 'rejected' ? 'ring-2 ring-red-500 bg-red-500/5' : ''}`}
                        onClick={() => setFilter('rejected')}
                    >
                        <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Rejected</CardTitle>
                            <XCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter Toolbar */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mr-2 shrink-0">
                        <Filter className="h-4 w-4" /> Filter by Status:
                    </div>
                    {[
                        { id: '', label: 'All Submissions' },
                        { id: 'pending', label: 'Pending' },
                        { id: 'under_review', label: 'Under Review' },
                        { id: 'verified', label: 'Verified' },
                        { id: 'approved', label: 'Approved' },
                        { id: 'rejected', label: 'Rejected' }
                    ].map(f => (
                        <Button
                            key={f.id}
                            variant={activeStatus === f.id ? 'default' : 'outline'}
                            size="sm"
                            className="rounded-full shrink-0 h-8"
                            onClick={() => setFilter(f.id)}
                        >
                            {f.label}
                        </Button>
                    ))}
                </div>

                {/* Submissions Table */}
                <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    <th className="p-4">Submission ID</th>
                                    <th className="p-4">Applicant</th>
                                    <th className="p-4">ID Number</th>
                                    <th className="p-4">Submitted At</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {submissions.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-12 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <FileText className="h-8 w-8 text-muted-foreground/50" />
                                                <p className="text-muted-foreground font-medium">No submissions found matching your filters</p>
                                                <Button variant="link" onClick={() => setFilter('')}>Clear all filters</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    submissions.data.map((submission) => (
                                        <tr key={submission.id} className="hover:bg-muted/30 transition-colors">
                                            <td className="p-4 font-mono text-sm">#{submission.id}</td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm">{submission.user?.name || 'Unknown User'}</span>
                                                    <span className="text-xs text-muted-foreground">{submission.user?.email || 'N/A'}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 font-medium text-sm">{submission.id_number}</td>
                                            <td className="p-4 text-sm text-muted-foreground">
                                                {format(new Date(submission.created_at), 'MMM dd, h:mm a')}
                                            </td>
                                            <td className="p-4">{getStatusBadge(submission.status)}</td>
                                            <td className="p-4 text-right">
                                                <Button variant="outline" size="sm" asChild className="rounded-full shadow-none border-primary/20 hover:bg-primary/5">
                                                    <Link href={`/admin/verifications/${submission.id}`}>
                                                        <Eye className="mr-1.5 h-3.5 w-3.5" />
                                                        Review
                                                    </Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {submissions.last_page > 1 && (
                        <div className="p-4 border-t flex items-center justify-between bg-muted/20">
                            <p className="text-sm text-muted-foreground font-medium">
                                Showing <span className="text-foreground">{(submissions.current_page - 1) * submissions.per_page + 1}</span> to <span className="text-foreground">{Math.min(submissions.current_page * submissions.per_page, submissions.total)}</span> of <span className="text-foreground">{submissions.total}</span> entries
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={submissions.current_page === 1}
                                    onClick={() => {
                                        const p = new URLSearchParams(window.location.search);
                                        p.set('page', (submissions.current_page - 1).toString());
                                        router.visit(`?${p.toString()}`);
                                    }}
                                    className="h-8 shadow-none"
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={submissions.current_page === submissions.last_page}
                                    onClick={() => {
                                        const p = new URLSearchParams(window.location.search);
                                        p.set('page', (submissions.current_page + 1).toString());
                                        router.visit(`?${p.toString()}`);
                                    }}
                                    className="h-8 shadow-none"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
