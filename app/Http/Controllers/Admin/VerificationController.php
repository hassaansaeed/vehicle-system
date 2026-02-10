<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VerificationSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerificationController extends Controller
{
    public function index()
    {
        $submissions = VerificationSubmission::with('reviewer')
            ->latest()
            ->paginate(20);

        $stats = [
            'total' => VerificationSubmission::count(),
            'pending' => VerificationSubmission::pending()->count(),
            'approved' => VerificationSubmission::approved()->count(),
            'rejected' => VerificationSubmission::rejected()->count(),
        ];

        return Inertia::render('admin/verifications/index', [
            'submissions' => $submissions,
            'stats' => $stats,
        ]);
    }

    public function show(VerificationSubmission $submission)
    {
        $submission->load('reviewer');

        return Inertia::render('admin/verifications/show', [
            'submission' => $submission,
        ]);
    }

    public function approve(Request $request, VerificationSubmission $submission)
    {
        $submission->update([
            'status' => 'approved',
            'admin_notes' => $request->input('notes'),
            'reviewed_at' => now(),
            'reviewed_by' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Submission approved successfully.');
    }

    public function reject(Request $request, VerificationSubmission $submission)
    {
        $request->validate([
            'notes' => 'required|string|max:1000',
        ]);

        $submission->update([
            'status' => 'rejected',
            'admin_notes' => $request->input('notes'),
            'reviewed_at' => now(),
            'reviewed_by' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Submission rejected successfully.');
    }
}
