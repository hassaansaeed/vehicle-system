import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import { initializeTheme } from './hooks/use-appearance';
// Bootstrap i18n (reads localStorage 'lang', sets i18next language)
import './i18n';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

/**
 * Apply RTL/LTR direction on initial page load from persisted 'lang' value.
 * This runs before React mounts so there's no flash of wrong direction.
 */
function initializeLocale(): void {
    if (typeof window === 'undefined') return;
    const lang = localStorage.getItem('lang') || 'en';
    const isAr = lang === 'ar';

    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', isAr);

    // Set X-Lang on axios default headers if available
    try {
        const axios = (window as any).axios;
        if (axios?.defaults?.headers?.common) {
            axios.defaults.headers.common['X-Lang'] = lang;
        }
    } catch (_) { /* no axios */ }
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
initializeLocale();
