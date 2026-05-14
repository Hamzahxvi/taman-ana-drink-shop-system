import { usePage } from '@inertiajs/react';
import {
    ClipboardList,
    Coffee,
    Image,
    LayoutGrid,
    ShoppingBag,
} from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const { auth } = usePage().props;
    const isAdmin = auth.user?.role === 'admin';

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'My Orders',
            href: '/orders',
            icon: ClipboardList,
        },
    ];

    const adminNavItems: NavItem[] = [
        {
            title: 'Admin Dashboard',
            href: '/admin',
            icon: LayoutGrid,
        },
        {
            title: 'Menu',
            href: '/admin/products',
            icon: Coffee,
        },
        {
            title: 'Orders',
            href: '/admin/orders',
            icon: ShoppingBag,
        },
        {
            title: 'Garden',
            href: '/admin/garden',
            icon: Image,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarContent>
                <NavMain items={mainNavItems} />
                {isAdmin && (
                    <NavMain items={adminNavItems} label="Management" />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
