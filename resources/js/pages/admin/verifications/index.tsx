import { Head, Link, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, XCircle, FileText, Eye } from 'lucide-react';
import { format } from 'date-fns';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

type Submission = {
    id: number;
    id_number: string;
    gender: string;
    date_of_birth: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    stc_phone: string;
};

type Stats = {
    total: number;
    pending: number;
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
        href: dashboard().url,
    },
    {
        title: 'Verification Submissions',
        href: '/admin/verifications',
    },
];

export default function VerificationsIndex({ submissions, stats }: Props) {
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Verification Submissions" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Verification Submissions</h1>
                    <p className="text-muted-foreground">
                        Review and manage vehicle verification submissions
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pending}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Approved</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.approved}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                            <XCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.rejected}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Submissions Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Submissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b text-left text-sm text-muted-foreground">
                                        <th className="pb-3 font-medium">ID Number</th>
                                        <th className="pb-3 font-medium">Phone</th>
                                        <th className="pb-3 font-medium">Gender</th>
                                        <th className="pb-3 font-medium">Submitted</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submissions.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-muted-foreground">
                                                No submissions found
                                            </td>
                                        </tr>
                                    ) : (
                                        submissions.data.map((submission) => (
                                            <tr
                                                key={submission.id}
                                                className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                                            >
                                                <td className="py-4 font-medium">{submission.id_number}</td>
                                                <td className="py-4">+966 {submission.stc_phone}</td>
                                                <td className="py-4 capitalize">{submission.gender}</td>
                                                <td className="py-4">
                                                    {format(new Date(submission.created_at), 'MMM dd, yyyy')}
                                                </td>
                                                <td className="py-4">{getStatusBadge(submission.status)}</td>
                                                <td className="py-4 text-right">
                                                    <Link href={`/admin/verifications/${submission.id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {submissions.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing {(submissions.current_page - 1) * submissions.per_page + 1} to{' '}
                                    {Math.min(submissions.current_page * submissions.per_page, submissions.total)} of{' '}
                                    {submissions.total} results
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={submissions.current_page === 1}
                                        onClick={() => router.visit(`?page=${submissions.current_page - 1}`)}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={submissions.current_page === submissions.last_page}
                                        onClick={() => router.visit(`?page=${submissions.current_page + 1}`)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
