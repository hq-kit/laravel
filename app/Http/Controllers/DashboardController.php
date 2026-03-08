<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        return inertia('dashboard', [
            'stats' => [
                'users' => (int) User::count(),
                'tasks' => (int) Task::count(),
            ],
        ]);
    }
}
