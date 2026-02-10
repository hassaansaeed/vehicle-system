<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomepageSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomepageController extends Controller
{
    public function edit(): Response
    {
        $setting = HomepageSetting::current();

        return Inertia::render('admin/homepage', [
            'setting' => $setting,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'heading' => ['required', 'string', 'max:255'],
            'subheading' => ['required', 'string', 'max:1000'],
            'image' => ['nullable', 'image', 'max:5120'],
        ]);

        $setting = HomepageSetting::current() ?? new HomepageSetting();

        $setting->fill([
            'title' => $validated['title'],
            'heading' => $validated['heading'],
            'subheading' => $validated['subheading'],
        ]);

        if ($request->hasFile('image')) {
            if ($setting->image_path) {
                Storage::disk('public')->delete($setting->image_path);
            }

            $path = $request->file('image')->store('homepage', 'public');
            $setting->image_path = $path;
        }

        $setting->save();

        return redirect()
            ->back()
            ->with('success', 'Homepage content updated successfully.');
    }
}

