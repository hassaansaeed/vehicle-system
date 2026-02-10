import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    UserPlus,
    Shield,
    ShieldAlert,
    ShieldCheck,
    User as UserIcon,
    MoreHorizontal,
    UserX,
    UserCheck,
    Check
} from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import type { BreadcrumbItem } from '@/types';

type Role = {
    id: number;
    name: string;
};

type User = {
    id: number;
    name: string;
    email: string;
    role_id: number;
    is_active: boolean;
    created_at: string;
    role: Role;
};

type Props = {
    users: User[];
    roles: Role[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'User Management', href: '/admin/users' },
];

export default function UserManagement({ users, roles }: Props) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        role_id: '',
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onSuccess: () => {
                setIsCreateDialogOpen(false);
                reset();
            },
        });
    };

    const toggleStatus = (user: User) => {
        router.patch(route('admin.users.toggle', user.id));
    };

    const updateRole = (user: User, roleId: string) => {
        router.patch(route('admin.users.update-role', user.id), {
            role_id: roleId,
        });
    };

    const getRoleIcon = (roleName: string) => {
        switch (roleName) {
            case 'admin': return <ShieldAlert className="h-4 w-4 text-red-500" />;
            case 'reviewer': return <ShieldCheck className="h-4 w-4 text-blue-500" />;
            default: return <UserIcon className="h-4 w-4 text-muted-foreground" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />

            <div className="space-y-6 p-4 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                        <p className="text-muted-foreground">Manage system access levels and user accounts</p>
                    </div>

                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="w-full sm:w-auto">
                                <UserPlus className="mr-2 h-4 w-4" /> Add New User
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={submit}>
                                <DialogHeader>
                                    <DialogTitle>Add New User</DialogTitle>
                                    <DialogDescription>
                                        Create a new account and assign a system role.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Role</Label>
                                        <Select value={data.role_id} onValueChange={val => setData('role_id', val)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roles.map(role => (
                                                    <SelectItem key={role.id} value={role.id.toString()}>
                                                        {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.role_id && <p className="text-sm text-red-500">{errors.role_id}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Temporary Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                        />
                                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                                    <Button type="submit" disabled={processing}>Create User</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    <th className="p-4">User</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Joined</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold">{user.name}</span>
                                                <span className="text-sm text-muted-foreground">{user.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    {getRoleIcon(user.role.name)}
                                                    <span className="capitalize">{user.role.name}</span>
                                                </div>
                                                <Select
                                                    defaultValue={user.role_id.toString()}
                                                    onValueChange={(val) => updateRole(user, val)}
                                                >
                                                    <SelectTrigger className="h-8 w-[130px] text-xs">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {roles.map(role => (
                                                            <SelectItem key={role.id} value={role.id.toString()} className="text-xs">
                                                                {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Badge variant={user.is_active ? 'default' : 'destructive'} className="rounded-full">
                                                {user.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-sm text-muted-foreground">
                                            {format(new Date(user.created_at), 'MMM dd, yyyy')}
                                        </td>
                                        <td className="p-4 text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleStatus(user)}
                                                className={user.is_active ? 'text-red-500 hover:text-red-600 hover:bg-red-50' : 'text-green-500 hover:text-green-600 hover:bg-green-50'}
                                            >
                                                {user.is_active ? (
                                                    <><UserX className="mr-2 h-4 w-4" /> Deactivate</>
                                                ) : (
                                                    <><UserCheck className="mr-2 h-4 w-4" /> Activate</>
                                                )}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

// Mock function for route (Inertia handles this but TypeScript needs it or we use literal strings)
function route(name: string, param?: any): string {
    if (name === 'admin.users.store') return '/admin/users';
    if (name === 'admin.users.toggle') return `/admin/users/${param}/toggle`;
    if (name === 'admin.users.update-role') return `/admin/users/${param}/role`;
    return '#';
}
