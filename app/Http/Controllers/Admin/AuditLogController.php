<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Inertia\Inertia;

class AuditLogController extends Controller
{
    public function index()
    {
        $logs = ActivityLog::with('user', 'user.role')
            ->latest()
            ->paginate(20);

        return Inertia::render('admin/audit-logs/index', [
            'logs' => $logs,
        ]);
    }
}
