<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('role')->latest()->get();
        $roles = Role::all();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'role_id' => 'required|exists:roles,id',
            'password' => ['required', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role_id' => $validated['role_id'],
            'password' => Hash::make($validated['password']),
        ]);

        ActivityLog::log(
            'create_user',
            "Created a new user: {$user->name} ({$user->email})",
            ['user_id' => $user->id]
        );

        return back()->with('success', 'User created successfully.');
    }

    public function toggleStatus(User $user)
    {
        // Prevent deactivating yourself
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot deactivate your own account.');
        }

        $user->is_active = !$user->is_active;
        $user->save();

        $status = $user->is_active ? 'activated' : 'deactivated';
        
        ActivityLog::log(
            'toggle_user_status',
            "{$status} user account: {$user->email}",
            ['user_id' => $user->id, 'new_status' => $status]
        );

        return back()->with('success', "User account {$status} successfully.");
    }

    public function updateRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        $oldRole = $user->role->name;
        $user->role_id = $validated['role_id'];
        $user->save();
        
        $newRole = Role::find($validated['role_id'])->name;

        ActivityLog::log(
            'update_user_role',
            "Updated user role for {$user->email} from {$oldRole} to {$newRole}",
            ['user_id' => $user->id, 'old_role' => $oldRole, 'new_role' => $newRole]
        );

        return back()->with('success', 'User role updated successfully.');
    }
}
