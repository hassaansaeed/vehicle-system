<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('verification_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable();

            // Personal Information
            $table->enum('gender', ['male', 'female']);
            $table->date('date_of_birth');
            $table->string('id_number', 10);

            // Identity Documents
            $table->string('id_front_path')->nullable();
            $table->string('license_front_path')->nullable();
            $table->date('license_expiry');

            // Vehicle Information
            $table->string('vehicle_registration_path')->nullable();
            $table->string('vehicle_sequence_number');

            // Verification & Payment
            $table->string('selfie_path')->nullable();
            $table->string('stc_phone', 9);

            // Status & Admin
            $table->text('status')->default('pending');
            $table->text('admin_notes')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users');

            $table->text('reviewer_notes')->nullable()->after('admin_notes');
            $table->text('internal_notes')->nullable()->after('reviewer_notes');

            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('verification_submissions');
    }
};
