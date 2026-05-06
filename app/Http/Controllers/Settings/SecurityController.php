<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\PasswordUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class SecurityController extends Controller
{
    /**
     * Show the user's security settings page.
     */
    public function edit(): Response
    {
        return inertia('settings/security');
    }

    /**
     * Update the user's password.
     */
    public function update(PasswordUpdateRequest $request): RedirectResponse
    {
        $request->user()->update([
            'password' => $request->password,
        ]);

        inertia()->flash('toast', ['type' => 'success', 'message' => __('Password updated.')]);

        return back();
    }
}
