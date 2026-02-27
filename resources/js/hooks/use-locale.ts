import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export type SupportedLang = 'en' | 'ar';

/**
 * useLocale — returns { lang, dir, t, setLang }
 *
 * setLang persists to localStorage, updates the <html> element's lang/dir
 * attributes, toggles the 'rtl' class on <body>, and sends the X-Lang header
 * with every subsequent request via the global axios instance if available.
 */
export function useLocale() {
    const { t, i18n } = useTranslation('common');

    const lang = i18n.language as SupportedLang;
    const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';

    const setLang = useCallback(
        (newLang: SupportedLang) => {
            i18n.changeLanguage(newLang);

            // Persist
            localStorage.setItem('lang', newLang);

            // Apply to HTML element
            const html = document.documentElement;
            html.lang = newLang;
            html.dir = newLang === 'ar' ? 'rtl' : 'ltr';

            // Toggle RTL body class
            document.body.classList.toggle('rtl', newLang === 'ar');

            // Keep axios in-sync (if present, e.g. from Inertia)
            try {
                // @ts-ignore – axios may or may not be on window
                const axios = (window as any).axios;
                if (axios?.defaults?.headers?.common) {
                    axios.defaults.headers.common['X-Lang'] = newLang;
                }
            } catch (_) {/* no axios, skip */ }
        },
        [i18n],
    );

    return { lang, dir, t, setLang } as const;
}
