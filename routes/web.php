<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Public Verification Routes (No login required)
Route::get('verification', function () {
    return Inertia::render('verification/wizard');
})->name('verification');
Route::post('verification', [App\Http\Controllers\VerificationSubmissionController::class, 'store'])->name('verification.store');
Route::get('verification/show/{submission}', [App\Http\Controllers\VerificationSubmissionController::class, 'show'])->name('verification.show');
Route::get('verification/success/{submission}', [App\Http\Controllers\VerificationSubmissionController::class, 'success'])->name('verification.success');

// Role-specific Dashboards
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    
    Route::get('user/dashboard', [App\Http\Controllers\DashboardController::class, 'user'])->middleware('role:user')->name('user.dashboard');
    Route::get('reviewer/dashboard', [App\Http\Controllers\DashboardController::class, 'reviewer'])->middleware('role:reviewer')->name('reviewer.dashboard');
    Route::get('admin/dashboard', [App\Http\Controllers\DashboardController::class, 'admin'])->middleware('role:admin')->name('admin.dashboard');
});

// Admin Routes
Route::middleware(['auth', 'verified', 'role:admin,reviewer'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('verifications', [App\Http\Controllers\Admin\VerificationController::class, 'index'])->name('verifications.index');
    Route::get('verifications/{submission}', [App\Http\Controllers\Admin\VerificationController::class, 'show'])->name('verifications.show');
    
    // Reviewer/Admin Shared Actions
    Route::post('verifications/{submission}/review', [App\Http\Controllers\Admin\VerificationController::class, 'markUnderReview'])->name('verifications.review');
    Route::post('verifications/{submission}/verify', [App\Http\Controllers\Admin\VerificationController::class, 'markVerified'])->name('verifications.verify');

    // Admin Only Final Actions
    Route::middleware(['role:admin'])->group(function () {
        Route::post('verifications/{submission}/approve', [App\Http\Controllers\Admin\VerificationController::class, 'approve'])->name('verifications.approve');
        Route::post('verifications/{submission}/reject', [App\Http\Controllers\Admin\VerificationController::class, 'reject'])->name('verifications.reject');
        
        // User Management
        Route::get('users', [App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
        Route::post('users', [App\Http\Controllers\Admin\UserController::class, 'store'])->name('users.store');
        Route::patch('users/{user}/toggle', [App\Http\Controllers\Admin\UserController::class, 'toggleStatus'])->name('users.toggle');
        Route::patch('users/{user}/role', [App\Http\Controllers\Admin\UserController::class, 'updateRole'])->name('users.update-role');
        
        // Audit Logs
        Route::get('audit-logs', [App\Http\Controllers\Admin\AuditLogController::class, 'index'])->name('audit-logs.index');
    });
});

require __DIR__.'/settings.php';
