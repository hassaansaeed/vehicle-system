<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $reviewerRole = Role::where('name', 'reviewer')->first();
        $userRole = Role::where('name', 'user')->first();

        // Create Admin
        User::updateOrCreate(
            ['email' => 'admin@obaralqaid.com'],
            [
                'name' => 'Admin User',
                'email' => 'admin@obaralqaid.com',
                'password' => Hash::make('password'),
                'role_id' => $adminRole->id,
            ]
        );

        // Create Reviewer
        User::updateOrCreate(
            ['email' => 'reviewer@obaralqaid.com'],
            [
                'name' => 'Reviewer User',
                'email' => 'reviewer@example.com',
                'password' => Hash::make('password'),
                'role_id' => $reviewerRole->id,
            ]
        );

        // Create Regular User
        User::updateOrCreate(
            ['email' => 'user@obaralqaid.com'],
            [
                'name' => 'Regular User',
                'email' => 'user@example.com',
                'password' => Hash::make('password'),
                'role_id' => $userRole->id,
            ]
        );
    }
}
