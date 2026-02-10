import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    FileText,
    Folder,
    LayoutGrid,
    Users,
    History,
    Shield,
    PlusCircle,
    ClipboardList,
    Image as ImageIcon,
} from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem, SharedData } from '@/types';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const role = auth.user?.role?.name || 'user';
    const isAdmin = role === 'admin';
    const isReviewer = role === 'reviewer';
    const isUser = role === 'user';

    // Build navigation items based on role
    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];

    // User-specific items
    if (isUser) {
        mainNavItems.push(
            {
                title: 'New Verification',
                href: '/verification',
                icon: PlusCircle,
            },
            {
                title: 'My Applications',
                href: '/dashboard', // User dashboard lists applications
                icon: ClipboardList,
            }
        );
    }

    // Admin & Reviewer shared items
    if (isAdmin || isReviewer) {
        mainNavItems.push({
            title: 'Verifications',
            href: '/admin/verifications',
            icon: FileText,
        });
    }

    // Admin-only items
    if (isAdmin) {
        mainNavItems.push(
            {
                title: 'User Management',
                href: '/admin/users',
                icon: Users,
            },
            {
                title: 'Audit Logs',
                href: '/admin/audit-logs',
                icon: History,
            },
            {
                title: 'Homepage Content',
                href: '/admin/homepage',
                icon: ImageIcon,
            }
        );
    }

    const footerNavItems: NavItem[] = [];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
