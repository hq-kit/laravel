<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/', Controllers\HomeController::class)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', Controllers\DashboardController::class)->name('dashboard');

    Route::resource('users', Controllers\UserController::class);
    Route::resource('roles', Controllers\RoleController::class);
    Route::resource('permissions', Controllers\PermissionController::class);
    Route::resource('tasks', Controllers\TaskController::class);

    Route::post('users/bulk', [Controllers\UserController::class, 'bulk'])->name('users.bulk');
    Route::post('users/role', [Controllers\UserController::class, 'role'])->name('users.role');

});

require __DIR__.'/settings.php';
