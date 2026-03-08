<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Http\Resources\Task\TaskDetailResource;
use App\Http\Resources\Task\TaskIndexResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('view-any', Task::class);
        $tasks = Task::query()
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($request->sort, function ($query, $sort) use ($request) {
                $query->orderBy($sort, $request->direction ?? 'asc');
            })
            ->paginate($request->integer('per_page', 10))
            ->withQueryString();

        return inertia('tasks/index', [
            'tasks' => TaskIndexResource::collection($tasks),
            'filters' => $request->only('search', 'sort', 'direction', 'role'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Task::class);

        return inertia('tasks/form', [
            'data' => new Task,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskRequest $request)
    {
        Gate::authorize('create', Task::class);

        Task::create($request->validated());
        toast('Task created successfully');

        return to_route('tasks.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        Gate::authorize('view', $task);

        return inertia('tasks/show', [
            'task' => TaskDetailResource::make($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        Gate::authorize('update', $task);

        return inertia('tasks/form', [
            'data' => $task,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskRequest $request, Task $task)
    {
        Gate::authorize('update', $task);

        $task->update($request->validated());
        toast('Task updated successfully');

        return to_route('tasks.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        Gate::authorize('delete', $task);

        $task->delete();
        toast('Task deleted successfully');

        return to_route('tasks.index');
    }
}
