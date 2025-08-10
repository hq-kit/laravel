<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

if (! app()->isProduction()) {
    Route::get('login/{id}', function ($id = null) {
        $user = User::query()->findOrFail($id);
        Auth::login($user);

        return to_route('home');
    });
}
