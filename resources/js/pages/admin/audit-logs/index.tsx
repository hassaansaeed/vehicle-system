import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import {
    Activity,
    Calendar,
    User as UserIcon,
    Terminal,
    Search,
    Filter
} from 'lucide-react';
import { format } from 'date-fns';
import type { BreadcrumbItem } from '@/types';

type User = {
    id: number;
    name: string;
    email: string;
    role: { name: string };
};

type Log = {
    id: number;
    user_id: number;
    action: string;
    description: string;
    metadata: any;
    ip_address: string;
    created_at: string;
    user: User;
};

type Props = {
    logs: {
        data: Log[];
        links: any;
        current_page: number;
        last_page: number;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Audit Logs', href: '/admin/audit-logs' },
];

export default function AuditLogs({ logs }: Props) {
    const getActionBadge = (action: string) => {
        const variants: Record<string, string> = {
            approve_submission: 'bg-green-100 text-green-700 border-green-200',
            reject_submission: 'bg-red-100 text-red-700 border-red-200',
            review_submission: 'bg-blue-100 text-blue-700 border-blue-200',
            verify_submission: 'bg-purple-100 text-purple-700 border-purple-200',
            create_user: 'bg-indigo-100 text-indigo-700 border-indigo-200',
            update_user_role: 'bg-amber-100 text-amber-700 border-amber-200',
            toggle_user_status: 'bg-orange-100 text-orange-700 border-orange-200',
        };

        const className = variants[action] || 'bg-gray-100 text-gray-700 border-gray-200';

        return (
            <Badge variant="outline" className={`capitalize rounded-md px-2 py-0.5 font-medium border ${className}`}>
                {action.replace(/_/g, ' ')}
            </Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Audit Logs" />

            <div className="space-y-6 p-4 md:p-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
                    <p className="text-muted-foreground">Trace all administrative actions performed within the system</p>
                </div>

                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    <th className="p-4">Timestamp</th>
                                    <th className="p-4">Administrator</th>
                                    <th className="p-4">Action</th>
                                    <th className="p-4 w-1/3">Description</th>
                                    <th className="p-4">IP Address</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {logs.data.map((log) => (
                                    <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="p-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                {format(new Date(log.created_at), 'PPPp')}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <UserIcon className="h-4 w-4 text-primary" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm">{log.user?.name || 'System'}</span>
                                                    <span className="text-xs text-muted-foreground uppercase">{log.user?.role?.name}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {getActionBadge(log.action)}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm">{log.description}</span>
                                                {log.metadata && Object.keys(log.metadata).length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {Object.entries(log.metadata).map(([key, value]) => (
                                                            <span key={key} className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground border">
                                                                <span className="font-semibold">{key}:</span> {String(value)}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                                                <Terminal className="h-3 w-3" />
                                                {log.ip_address}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {logs.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2 py-4">
                        {/* Pagination placeholder - Inertia typically uses a Link component here */}
                        <p className="text-sm text-muted-foreground">
                            Page {logs.current_page} of {logs.last_page}
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
