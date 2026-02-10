<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('verification', function () {
    return Inertia::render('verification/wizard');
})->name('verification');

Route::post('verification', [App\Http\Controllers\VerificationSubmissionController::class, 'store'])->name('verification.store');
Route::get('verification/success/{submission}', [App\Http\Controllers\VerificationSubmissionController::class, 'success'])->name('verification.success');

// Admin Routes
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('verifications', [App\Http\Controllers\Admin\VerificationController::class, 'index'])->name('verifications.index');
    Route::get('verifications/{submission}', [App\Http\Controllers\Admin\VerificationController::class, 'show'])->name('verifications.show');
    Route::post('verifications/{submission}/approve', [App\Http\Controllers\Admin\VerificationController::class, 'approve'])->name('verifications.approve');
    Route::post('verifications/{submission}/reject', [App\Http\Controllers\Admin\VerificationController::class, 'reject'])->name('verifications.reject');
});

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
