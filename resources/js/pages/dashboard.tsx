import { Head, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, SharedData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    CheckCircle,
    Clock,
    XCircle,
    AlertCircle,
    Plus,
    FileText,
    ChevronRight,
    History,
    MessageSquare,
    Users,
    Activity,
    Shield,
    Search,
    TrendingUp,
    Layout
} from 'lucide-react';
import { format } from 'date-fns';

type Submission = {
    id: number;
    status: 'pending' | 'under_review' | 'verified' | 'approved' | 'rejected';
    created_at: string;
    admin_notes: string | null;
    reviewer_notes: string | null;
};

interface DashboardProps extends SharedData {
    submissions?: Submission[];
    role: string;
    stats?: {
        total: number;
        pending: number;
        approved: number;
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { props } = usePage<DashboardProps>();
    const { auth, submissions, role, stats } = props;

    const isAdmin = role === 'admin';
    const isReviewer = role === 'reviewer';
    const isUser = role === 'user';

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved': return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'rejected': return <XCircle className="h-5 w-5 text-red-500" />;
            case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
            case 'under_review': return <Search className="h-5 w-5 text-blue-500" />;
            case 'verified': return <Shield className="h-5 w-5 text-purple-500" />;
            default: return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
        }
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            pending: { variant: 'secondary' as const, text: 'Pending', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
            under_review: { variant: 'secondary' as const, text: 'Under Review', color: 'bg-blue-100 text-blue-700 border-blue-200' },
            verified: { variant: 'secondary' as const, text: 'Verified', color: 'bg-purple-100 text-purple-700 border-purple-200' },
            approved: { variant: 'default' as const, text: 'Approved', color: 'bg-green-100 text-green-700 border-green-200' },
            rejected: { variant: 'destructive' as const, text: 'Rejected', color: 'bg-red-100 text-red-700 border-red-200' },
        };
        const config = variants[status as keyof typeof variants] || { variant: 'outline' as const, text: status, color: '' };
        return <Badge variant={config.variant} className={`rounded-full px-2.5 py-0.5 font-bold text-[10px] uppercase tracking-wider ${config.color}`}>{config.text}</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-8 p-4 md:p-8 animate-in fade-in duration-500">
                {/* Welcome Hero */}
                <div className="relative overflow-hidden rounded-3xl bg-neutral-900 px-8 py-12 text-white shadow-2xl dark:bg-white dark:text-neutral-900 transition-all duration-300">
                    <div className="relative z-10 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20 dark:bg-black/10 dark:text-black dark:border-black/20">
                                <Activity className="mr-1 h-3 w-3" /> System Active
                            </Badge>
                        </div>
                        <h1 className="text-4xl font-black tracking-tight lg:text-6xl max-w-2xl leading-[1.1]">
                            Welcome back, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{auth.user?.name}</span>.
                        </h1>
                        <p className="text-lg text-neutral-400 dark:text-neutral-600 max-w-xl">
                            {isUser
                                ? 'Your vehicle verification hub. Track your status and manage submissions in real-time.'
                                : 'Advanced administration workspace. Manage verifications, users, and system integrity.'}
                        </p>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute right-[-10%] top-[-20%] h-[150%] w-[50%] skew-x-[-20deg] bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl transition-opacity duration-1000"></div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Action Cards Grid */}
                    {isAdmin && (
                        <>
                            <DashboardActionCard
                                href="/admin/verifications"
                                title="Submission Queue"
                                description="Review, verify and process vehicle applications"
                                icon={FileText}
                                color="blue"
                                stats={stats?.pending.toString() || '0'}
                                statsLabel="Pending"
                            />
                            <DashboardActionCard
                                href="/admin/users"
                                title="Team & Users"
                                description="Manage account permissions and role assignments"
                                icon={Users}
                                color="purple"
                            />
                            <DashboardActionCard
                                href="/admin/audit-logs"
                                title="System Audit"
                                description="Trace administrative actions and system events"
                                icon={History}
                                color="orange"
                            />
                        </>
                    )}

                    {isReviewer && (
                        <>
                            <DashboardActionCard
                                href="/admin/verifications"
                                title="My Review Queue"
                                description="Continue processing pending verifications"
                                icon={Search}
                                color="blue"
                                stats={stats?.pending.toString() || '0'}
                                statsLabel="Tasks"
                            />
                            <DashboardActionCard
                                href="/admin/verifications?status=under_review"
                                title="Active Reviews"
                                description="View submissions currently under investigation"
                                icon={Layout}
                                color="indigo"
                            />
                            <DashboardActionCard
                                href="/dashboard"
                                title="Personal Profile"
                                description="Update your reviewer credentials and settings"
                                icon={Users}
                                color="emerald"
                            />
                        </>
                    )}

                    {isUser && (
                        <>
                            <DashboardActionCard
                                href="/verification"
                                title="New Application"
                                description="Begin your vehicle verification process"
                                icon={Plus}
                                color="blue"
                                primary
                            />
                            <DashboardActionCard
                                href="/dashboard"
                                title="Active Status"
                                description="Current status of your most recent request"
                                icon={Activity}
                                color="emerald"
                                stats={submissions?.[0]?.status || 'None'}
                                statsLabel="Recent"
                            />
                            <DashboardActionCard
                                href="/dashboard"
                                title="Support Hub"
                                description="Get help with your verification documents"
                                icon={MessageSquare}
                                color="orange"
                            />
                        </>
                    )}
                </div>

                {/* Role Specific Detailed Sections */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {isUser && (
                            <section className="space-y-4">
                                <div className="flex items-center justify-between px-2">
                                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                                        <History className="h-6 w-6 text-primary" />
                                        Application History
                                    </h2>
                                </div>

                                {submissions && submissions.length > 0 ? (
                                    <div className="grid gap-4">
                                        {submissions.map((submission) => (
                                            <Card key={submission.id} className="group relative overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
                                                <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`rounded-2xl p-4 transition-transform group-hover:scale-110 duration-500 shadow-inner ${submission.status === 'approved' ? 'bg-green-100 text-green-600' :
                                                            submission.status === 'rejected' ? 'bg-red-100 text-red-600' :
                                                                'bg-blue-100 text-blue-600'
                                                            }`}>
                                                            {getStatusIcon(submission.status)}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-black text-lg">Case #{submission.id}</h4>
                                                                {getStatusBadge(submission.status)}
                                                            </div>
                                                            <p className="text-sm text-muted-foreground font-medium">
                                                                Created {format(new Date(submission.created_at), 'PPP')}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-4">
                                                        {submission.admin_notes && (
                                                            <Badge variant="outline" className="hidden xl:flex bg-muted/50 font-medium px-4 py-1.5 rounded-xl border-dashed">
                                                                Feedback Shared
                                                            </Badge>
                                                        )}
                                                        <Button variant="outline" size="sm" className="rounded-2xl h-12 px-6 font-bold shadow-none group/btn" asChild>
                                                            <Link href={`/verification/show/${submission.id}`}>
                                                                View Details <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-muted p-16 text-center bg-muted/10 transition-colors hover:bg-muted/20">
                                        <div className="rounded-2xl bg-muted p-6 mb-6">
                                            <FileText className="h-12 w-12 text-muted-foreground/50" />
                                        </div>
                                        <h3 className="text-2xl font-black mb-2">No Submissions Found</h3>
                                        <p className="text-muted-foreground max-w-sm mb-8 font-medium">
                                            Start your journey by submitting your first vehicle verification request.
                                        </p>
                                        <Button asChild className="rounded-2xl h-14 px-10 text-lg font-black shadow-xl shadow-primary/20">
                                            <Link href="/verification">
                                                <Plus className="mr-2 h-6 w-6" /> Get Started
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </section>
                        )}

                        {(isAdmin || isReviewer) && (
                            <section className="space-y-4">
                                <div className="flex items-center justify-between px-2">
                                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                                        <TrendingUp className="h-6 w-6 text-primary" />
                                        System Insights
                                    </h2>
                                </div>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <Card className="rounded-[2.5rem] overflow-hidden border-none shadow-lg bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-8">
                                        <CardHeader className="p-0 mb-4">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg font-bold">Total Volume</CardTitle>
                                                <Activity className="h-5 w-5 opacity-60" />
                                            </div>
                                        </CardHeader>
                                        <div className="flex items-end justify-between">
                                            <div className="text-5xl font-black tracking-tighter">{stats?.total || 124}</div>
                                            <div className="flex flex-col items-end">
                                                <Badge className="bg-white/20 hover:bg-white/30 text-white rounded-full border-none px-3">+12%</Badge>
                                                <span className="text-[10px] uppercase font-black tracking-widest mt-2 opacity-60">vs Last Month</span>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="rounded-[2.5rem] overflow-hidden border-none shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8">
                                        <CardHeader className="p-0 mb-4">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg font-bold">Approval Rate</CardTitle>
                                                <CheckCircle className="h-5 w-5 opacity-60" />
                                            </div>
                                        </CardHeader>
                                        <div className="flex items-end justify-between">
                                            <div className="text-5xl font-black tracking-tighter">89.4%</div>
                                            <div className="flex flex-col items-end">
                                                <Badge className="bg-white/20 hover:bg-white/30 text-white rounded-full border-none px-3">Optimal</Badge>
                                                <span className="text-[10px] uppercase font-black tracking-widest mt-2 opacity-60">System Health</span>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-6">
                        <Card className="rounded-[2.5rem] border-none shadow-xl bg-neutral-50 dark:bg-neutral-900/50 p-6 overflow-hidden relative">
                            <CardHeader>
                                <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">System Alerts</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 relative z-10">
                                <div className="flex gap-4 p-4 rounded-3xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100/50 dark:border-neutral-700/50 hover:shadow-md transition-all cursor-default group">
                                    <div className="h-10 w-10 rounded-2xl bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center shrink-0 group-hover:animate-pulse">
                                        <AlertCircle className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold leading-tight">Identity Refresh Required</p>
                                        <p className="text-xs text-muted-foreground leading-tight">Ensure all IDs are up to date.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 rounded-3xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100/50 dark:border-neutral-700/50 hover:shadow-md transition-all cursor-default">
                                    <div className="h-10 w-10 rounded-2xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center shrink-0">
                                        <Shield className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold leading-tight">Security Audit Complete</p>
                                        <p className="text-xs text-muted-foreground leading-tight">Zero vulnerabilities detected.</p>
                                    </div>
                                </div>
                            </CardContent>
                            <div className="absolute bottom-[-20px] right-[-20px] h-32 w-32 bg-primary/5 rounded-full blur-3xl"></div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function DashboardActionCard({
    href,
    title,
    description,
    icon: Icon,
    color,
    primary = false,
    stats,
    statsLabel
}: {
    href: string;
    title: string;
    description: string;
    icon: any;
    color: 'blue' | 'purple' | 'orange' | 'emerald' | 'indigo';
    primary?: boolean;
    stats?: string;
    statsLabel?: string;
}) {
    const colorClasses = {
        blue: 'bg-blue-500/10 text-blue-600 group-hover:bg-blue-500 group-hover:text-white',
        purple: 'bg-purple-500/10 text-purple-600 group-hover:bg-purple-500 group-hover:text-white',
        orange: 'bg-orange-500/10 text-orange-600 group-hover:bg-orange-500 group-hover:text-white',
        emerald: 'bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white',
        indigo: 'bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white',
    };

    const gradientClasses = {
        blue: 'hover:border-blue-500/50',
        purple: 'hover:border-purple-500/50',
        orange: 'hover:border-orange-500/50',
        emerald: 'hover:border-emerald-500/50',
        indigo: 'hover:border-indigo-500/50',
    };

    return (
        <Link
            href={href}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border-2 border-transparent bg-card p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${primary ? 'border-primary/20 bg-primary/5 ring-4 ring-primary/5' : 'bg-neutral-50/50 dark:bg-neutral-900/30'} ${gradientClasses[color]}`}
        >
            <div>
                <div className="flex items-center justify-between mb-8">
                    <div className={`rounded-2xl p-4 transition-all duration-500 ${colorClasses[color]}`}>
                        <Icon className="h-7 w-7" />
                    </div>
                    {stats && (
                        <div className="flex flex-col items-end">
                            <span className="text-3xl font-black tracking-tighter leading-none group-hover:scale-110 transition-transform duration-500">{stats}</span>
                            <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mt-1">{statsLabel}</span>
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="text-2xl font-black mb-2 transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
            <div className="mt-8 flex items-center text-sm font-black uppercase tracking-widest group-hover:gap-2 transition-all duration-300">
                Explore <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
            {/* Ambient hover effect */}
            <div className={`absolute top-0 right-0 h-32 w-32 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${color === 'blue' ? 'bg-blue-500' :
                color === 'purple' ? 'bg-purple-500' :
                    color === 'orange' ? 'bg-orange-500' :
                        'bg-emerald-500'
                }`}></div>
        </Link>
    );
}
