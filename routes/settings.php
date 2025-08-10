<?php

use App\Http\Controllers\Settings;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('profile-settings', [Settings\ProfileController::class, 'edit'])->name('profile');
    Route::patch('profile-settings', [Settings\ProfileController::class, 'update']);
    Route::delete('profile-settings', [Settings\DeleteAccountController::class, 'destroy']);
    Route::put('profile-settings/password', [Settings\PasswordController::class, 'update'])->name('password.update');
});
