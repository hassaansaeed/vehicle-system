<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * SetLocale
 *
 * Reads X-Lang header (preferred) or Accept-Language header.
 * Allows only 'en' or 'ar'. Falls back to 'en'.
 * Sets Laravel application locale for the current request.
 */
class SetLocale
{
    private const SUPPORTED = ['en', 'ar'];

    public function handle(Request $request, Closure $next): Response
    {
        $lang = $this->resolveLocale($request);

        app()->setLocale($lang);

        return $next($request);
    }

    private function resolveLocale(Request $request): string
    {
        // Priority 1: custom header X-Lang
        $xLang = $request->header('X-Lang');
        if ($xLang && in_array($xLang, self::SUPPORTED, true)) {
            return $xLang;
        }

        // Priority 2: Accept-Language header (take first segment, e.g. "ar-SA" → "ar")
        $acceptLang = $request->header('Accept-Language');
        if ($acceptLang) {
            $primary = strtolower(substr($acceptLang, 0, 2));
            if (in_array($primary, self::SUPPORTED, true)) {
                return $primary;
            }
        }

        return 'en';
    }
}
