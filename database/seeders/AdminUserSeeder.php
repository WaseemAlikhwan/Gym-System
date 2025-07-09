<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
                User::updateOrCreate(
            ['email' => 'admin@gym.com'],
            [
                'name' => 'Gym Admin',
                'password' => Hash::make('admin123'),
                'phone' => '0999999999',
                'role' => 'admin',
                'gender' => 'male',
                'birth_date' => '1990-01-01',
            ]
        );

    }
}
