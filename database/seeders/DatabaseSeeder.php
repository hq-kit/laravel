<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $permissions = ['view-any', 'view', 'create', 'update', 'delete'];
        $models = ['user', 'task', 'role', 'permission'];

        $additionalPermission = ['user.assign-role', 'user.remove-role'];

        foreach ($models as $model) {
            foreach ($permissions as $permission) {
                Permission::create(['name' => "$model.$permission", 'guard_name' => 'web']);
            }
        }

        foreach ($additionalPermission as $permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'web']);
        }

        Role::create(['name' => 'super admin'])->givePermissionTo(Permission::query()->pluck('name')->toArray());
        Role::create(['name' => 'manager'])->givePermissionTo([
            Permission::query()
                ->where('name', 'like', '%view%')
                ->orWhere('name', 'like', '%create%')
                ->orWhere('name', 'like', '%task%')
                ->pluck('name')->toArray(),
        ]);

        User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@example.test',
        ])->assignRole('super admin');

        User::factory()->create([
            'name' => 'Manager',
            'email' => 'manager@example.test',
        ])->assignRole('manager');

        User::factory(100)->create();

        Task::create([
            'title' => 'Create new project',
            'description' => 'Start a fresh laravel development kit',
            'completed' => true,
        ]);

        Task::create([
            'title' => 'Finish the project',
            'description' => 'Ready for production',
            'completed' => false,
        ]);
    }
}
