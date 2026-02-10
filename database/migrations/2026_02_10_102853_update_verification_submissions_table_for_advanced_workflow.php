<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('verification_submissions', function (Blueprint $table) {
            $table->text('reviewer_notes')->nullable()->after('admin_notes');
            $table->text('internal_notes')->nullable()->after('reviewer_notes');
        });

        // PostgreSQL specific: Drop old constraint and add new one
        DB::statement('ALTER TABLE verification_submissions DROP CONSTRAINT verification_submissions_status_check');
        DB::statement("ALTER TABLE verification_submissions ADD CONSTRAINT verification_submissions_status_check CHECK (status IN ('pending', 'under_review', 'verified', 'approved', 'rejected'))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('verification_submissions', function (Blueprint $table) {
            $table->dropColumn(['reviewer_notes', 'internal_notes']);
        });
        
        DB::statement('ALTER TABLE verification_submissions DROP CONSTRAINT verification_submissions_status_check');
        DB::statement("ALTER TABLE verification_submissions ADD CONSTRAINT verification_submissions_status_check CHECK (status IN ('pending', 'approved', 'rejected'))");
    }
};
