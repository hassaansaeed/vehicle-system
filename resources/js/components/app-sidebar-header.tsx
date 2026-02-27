import { Breadcrumbs } from '@/components/breadcrumbs';
import { LanguageSwitcher } from '@/components/language-switcher';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { useLocale } from '@/hooks/use-locale';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage<SharedData>().props;
    const { t } = useLocale();
    const role = auth.user?.role?.name || 'user';

    const getRoleStyles = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-red-500/10 text-red-600 border-red-200';
            case 'reviewer': return 'bg-blue-500/10 text-blue-600 border-blue-200';
            default: return 'bg-green-500/10 text-green-600 border-green-200';
        }
    };

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <Badge
                    variant="outline"
                    className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${getRoleStyles(role)}`}
                >
                    <Shield className="h-3 w-3" />
                    {t('sidebar.logged_in_as', { role })}
                </Badge>
            </div>
        </header>
    );
}
