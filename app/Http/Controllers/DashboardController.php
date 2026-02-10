<?php

namespace App\Http\Controllers;

use App\Models\VerificationSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Redirect to the appropriate role-based dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        
        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }

        if ($user->isReviewer()) {
            return redirect()->route('reviewer.dashboard');
        }

        return redirect()->route('user.dashboard');
    }

    /**
     * User Dashboard
     */
    public function user()
    {
        $user = auth()->user();
        
        $submissions = VerificationSubmission::where('user_id', $user->id)
            ->latest()
            ->get();

        return Inertia::render('dashboard', [
            'role' => 'user',
            'submissions' => $submissions,
        ]);
    }

    /**
     * Reviewer Dashboard
     */
    public function reviewer()
    {
        return Inertia::render('dashboard', [
            'role' => 'reviewer',
            'stats' => [
                'total' => VerificationSubmission::count(),
                'pending' => VerificationSubmission::whereIn('status', ['pending', 'under_review'])->count(),
                'approved' => VerificationSubmission::where('status', 'approved')->count(),
            ]
        ]);
    }

    /**
     * Admin Dashboard
     */
    public function admin()
    {
        return Inertia::render('dashboard', [
            'role' => 'admin',
            'stats' => [
                'total' => VerificationSubmission::count(),
                'pending' => VerificationSubmission::whereIn('status', ['pending', 'under_review', 'verified'])->count(),
                'approved' => VerificationSubmission::where('status', 'approved')->count(),
            ]
        ]);
    }
}
