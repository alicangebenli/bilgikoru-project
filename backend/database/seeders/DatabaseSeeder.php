<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Member;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        /*Member::factory()->count(45000)->create()->each(function ($member) {
            Address::factory()->create([
                'member_id' => $member->id
            ]);
        });
        */
        User::factory()->count(1)->create();
    }
}
