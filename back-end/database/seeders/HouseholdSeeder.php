<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Household;
use App\Models\Resident;
use Faker\Factory as Faker;

class HouseholdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Tạo 10 hộ khẩu
        for ($i = 0; $i < 10; $i++) {
            $household = Household::create([
                'house_number' => $faker->buildingNumber,
                'street' => $faker->streetName,
                'ward' => $faker->citySuffix,
                'district' => $faker->city,
                'head_of_household' => 0,
                'household_size' => 0,
                'date_of_registration' => $faker->date(),
            ]);
             $head = Resident::create([
                'household_id' => $household->id,
                'full_name' => $faker->name,
                'gender' => $faker->randomElement(['Nam', 'Nữ']),
                'date_of_birth' => $faker->date(),
                'place_of_birth' => $faker->city,
                'ethnicity' => $faker->randomElement(['Kinh', 'Tày', 'Nùng', 'Hoa', 'Khác']),
                'occupation' => $faker->jobTitle,
                'id_card_number' => $faker->unique()->numerify('############'),
                'date_of_issue' => $faker->date(),
                'place_of_issue' => $faker->city,
                'status' => $faker->randomElement(['Thường trú', 'Tạm trú']),
                'date_of_register' => $faker->date(),
                'current_address' => $faker->address,
                'previous_address' => $faker->address,
                'relationship_with_head' => 'chủ hộ',
            ]);
            
                $household->head_of_household = $head->id;
                $household->household_size = 5;
                $household->save();
            
            // Tạo 5 thành viên trong mỗi hộ khẩu
            for ($j = 0; $j < 4; $j++) {
                $relationship = $faker->randomElement([ 'Con', 'Vợ', 'Chồng', 'Anh/Chị/Em']);
                $resident = Resident::create([
                    'household_id' => $household->id,
                    'full_name' => $faker->name,
                    'gender' => $faker->randomElement(['Nam', 'Nữ']),
                    'date_of_birth' => $faker->date(),
                    'place_of_birth' => $faker->city,
                    'ethnicity' => $faker->randomElement(['Kinh', 'Tày', 'Nùng', 'Hoa', 'Khác']),
                    'occupation' => $faker->jobTitle,
                    'id_card_number' => $faker->unique()->numerify('############'),
                    'date_of_issue' => $faker->date(),
                    'place_of_issue' => $faker->city,
                    'status' => $faker->randomElement(['Thường trú', 'Tạm trú']),
                    'date_of_register' => $faker->date(),
                    'current_address' => $faker->address,
                    'previous_address' => $faker->address,
                    'relationship_with_head' => $relationship,
                ]);

                
            }
        }    
    }
}
