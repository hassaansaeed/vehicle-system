import { useLocale } from '@/hooks/use-locale';
import { cn } from '@/lib/utils';

/**
 * LanguageSwitcher
 *
 * Renders a compact EN | AR pill toggle in the sidebar header / navbar.
 * Meets: persist lang, swap HTML dir, body.rtl class.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
    const { lang, setLang, t } = useLocale();

    return (
        <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            title={t('lang.switch')}
            className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold',
                'border border-border bg-background hover:bg-muted transition-colors',
                'select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                className,
            )}
        >
            <span className="text-primary font-extrabold">{t('lang.current')}</span>
            <span className="text-muted-foreground">|</span>
            <span>{t('lang.switch')}</span>
        </button>
    );
}
