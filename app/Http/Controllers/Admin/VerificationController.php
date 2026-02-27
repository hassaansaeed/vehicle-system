<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VerificationSubmission;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerificationController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->input('status');

        $submissions = VerificationSubmission::with('reviewer', 'user')
            ->when($status, function ($query, $status) {
                return $query->where('status', $status);
            })
            ->latest()
            ->paginate(20)
            ->withQueryString();

        $stats = [
            'total' => VerificationSubmission::count(),
            'pending' => VerificationSubmission::pending()->count(),
            'under_review' => VerificationSubmission::underReview()->count(),
            'verified' => VerificationSubmission::verified()->count(),
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
        $submission->load('reviewer', 'user');

        return Inertia::render('admin/verifications/show', [
            'submission' => $submission,
        ]);
    }

    public function approve(Request $request, VerificationSubmission $submission)
    {
        if (! auth()->user()?->isAdmin()) {
            abort(403, 'Unauthorized action.');
        }

        $submission->update([
            'status' => 'approved',
            'admin_notes' => $request->input('notes'),
            'internal_notes' => $request->input('internal_notes'),
            'reviewed_at' => now(),
            'reviewed_by' => auth()->id(),
        ]);

        ActivityLog::log(
            'approve_submission',
            "Approved verification submission #{$submission->id} for user {$submission?->user?->email}",
            ['submission_id' => $submission->id, 'user_id' => $submission->user_id]
        );

        return redirect()->back()->with('success', __('messages.verification_approved'));
    }

    public function reject(Request $request, VerificationSubmission $submission)
    {
        if (! auth()->user()?->isAdmin()) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'notes' => 'required|string|max:1000',
        ]);

        $submission->update([
            'status' => 'rejected',
            'admin_notes' => $request->input('notes'),
            'internal_notes' => $request->input('internal_notes'),
            'reviewed_at' => now(),
            'reviewed_by' => auth()->id(),
        ]);

        ActivityLog::log(
            'reject_submission',
            "Rejected verification submission #{$submission->id} for user {$submission->user->email}",
            [
                'submission_id' => $submission->id,
                'user_id' => $submission->user_id,
                'reason' => $request->input('notes')
            ]
        );

        return redirect()->back()->with('success', __('messages.verification_rejected'));
    }

    public function markUnderReview(VerificationSubmission $submission)
    {
        $submission->update(['status' => 'under_review']);

        ActivityLog::log(
            'review_submission',
            "Marked submission #{$submission->id} as Under Review",
            ['submission_id' => $submission->id]
        );

        return back()->with('success', __('messages.verification_reviewed'));
    }

    public function markVerified(Request $request, VerificationSubmission $submission)
    {
        $submission->update([
            'status' => 'verified',
            'reviewer_notes' => $request->input('reviewer_notes'),
            'internal_notes' => $request->input('internal_notes'),
        ]);

        ActivityLog::log(
            'verify_submission',
            "Marked submission #{$submission->id} as Verified",
            ['submission_id' => $submission->id]
        );

        return back()->with('success', __('messages.success'));
    }
}
