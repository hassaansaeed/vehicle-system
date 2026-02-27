<?php

namespace App\Http\Controllers;

use App\Models\VerificationSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class VerificationSubmissionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'gender' => 'required|in:male,female',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'date_of_birth' => 'required|date|before:today',
            'id_number' => 'required|string|size:10|unique:verification_submissions,id_number',
            'id_front' => 'required|file|image|max:5120', // 5MB
            'license_front' => 'required|file|image|max:5120',
            'license_expiry' => 'required|date|after:today',
            'vehicle_registration' => 'required|file|image|max:5120',
            'vehicle_sequence_number' => 'required|string|max:50',
            'selfie' => 'required|string', // Base64 data URL
            'stc_phone' => 'nullable|string|max:50',
        ], [
            'id_number.unique' => 'This ID number has already been submitted.',
            'id_number.size' => 'ID number must be exactly 10 digits.',
            'date_of_birth.before' => 'Date of birth must be in the past.',
            'license_expiry.after' => 'License expiry date must be in the future.',
        ]);

        // Handle file uploads
        $idFrontPath = $request->file('id_front')->store('verifications/ids', 'public');
        $licenseFrontPath = $request->file('license_front')->store('verifications/licenses', 'public');
        $vehicleRegistrationPath = $request->file('vehicle_registration')->store('verifications/vehicles', 'public');

        // Handle selfie (base64 to file)
        $selfieData = $validated['selfie'];
        $selfieData = str_replace('data:image/jpeg;base64,', '', $selfieData);
        $selfieData = str_replace(' ', '+', $selfieData);
        $selfieDecoded = base64_decode($selfieData);
        
        $selfieName = 'selfie_' . Str::random(40) . '.jpg';
        $selfiePath = 'verifications/selfies/' . $selfieName;
        Storage::disk('public')->put($selfiePath, $selfieDecoded);

        // Create submission
        $submission = VerificationSubmission::create([
            'user_id' => auth()->id(),
            'gender' => $validated['gender'],
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'date_of_birth' => $validated['date_of_birth'],
            'id_number' => $validated['id_number'],
            'id_front_path' => $idFrontPath,
            'license_front_path' => $licenseFrontPath,
            'license_expiry' => $validated['license_expiry'],
            'vehicle_registration_path' => $vehicleRegistrationPath,
            'vehicle_sequence_number' => $validated['vehicle_sequence_number'],
            'selfie_path' => $selfiePath,
            'stc_phone' => $validated['stc_phone'] ?? '',
            'status' => 'pending',
        ]);

        return redirect()->route('verification.success', ['submission' => $submission->id])
            ->with('success', __('messages.verification_submitted'));
    }

    public function show($submissionId)
    {
        $submission = VerificationSubmission::findOrFail($submissionId);
        $user = auth()->user();

        // Security check: allow staff or if submission has no user (guest submission)
        // If submission has a user, only that user or staff can see it
        if ($submission->user_id) {
            if (!$user || ($submission->user_id !== $user->id && !$user->isAdmin() && !$user->isReviewer())) {
                abort(403);
            }
        }
        
        // If no user_id, it was a guest submission - for now we allow viewing it
        // In a real app we might want a token in the URL for guests

        return inertia('verification/show', [
            'submission' => $submission,
        ]);
    }

    public function success($submissionId)
    {
        $submission = VerificationSubmission::findOrFail($submissionId);
        $user = auth()->user();

        // Security check: same as show method
        if ($submission->user_id) {
            if (!$user || ($submission->user_id !== $user->id && !$user->isAdmin() && !$user->isReviewer())) {
                abort(403);
            }
        }

        return inertia('verification/success', [
            'submission' => $submission,
        ]);
    }
}
