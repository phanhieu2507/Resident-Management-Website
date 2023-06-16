<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HouseholdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('households')->insert([
            [
                'house_number' => 'Số nhà 1',
                'street' => 'Đường A',
                'ward' => 'Phường B',
                'district' => 'Quận C',
                'head_of_household' => 'Nguyễn Văn A',
                'household_size' => 5,
                'date_of_registration' => '2021-01-01',
            ],
            [
                'house_number' => 'Số nhà 2',
                'street' => 'Đường X',
                'ward' => 'Phường Y',
                'district' => 'Quận Z',
                'head_of_household' => 'Trần Thị B',
                'household_size' => 3,
                'date_of_registration' => '2021-02-15',
            ],
            [
                'house_number' => 'Số nhà 3',
                'street' => 'Đường M',
                'ward' => 'Phường N',
                'district' => 'Quận P',
                'head_of_household' => 'Lê Thị C',
                'household_size' => 4,
                'date_of_registration' => '2021-03-10',
            ],
            [
                'house_number' => 'Số nhà 4',
                'street' => 'Đường G',
                'ward' => 'Phường H',
                'district' => 'Quận I',
                'head_of_household' => 'Trương Văn D',
                'household_size' => 2,
                'date_of_registration' => '2021-04-20',
            ],
            [
                'house_number' => 'Số nhà 5',
                'street' => 'Đường S',
                'ward' => 'Phường T',
                'district' => 'Quận U',
                'head_of_household' => 'Phạm Thị E',
                'household_size' => 6,
                'date_of_registration' => '2021-05-05',
            ],
            [
                'house_number' => 'Số nhà 6',
                'street' => 'Đường D',
                'ward' => 'Phường E',
                'district' => 'Quận F',
                'head_of_household' => 'Vũ Văn F',
                'household_size' => 3,
                'date_of_registration' => '2021-06-18',
            ],
            [
                'house_number' => 'Số nhà 7',
                'street' => 'Đường K',
                'ward' => 'Phường L',
                'district' => 'Quận M',
                'head_of_household' => 'Ngô Thị G',
                'household_size' => 5,
                'date_of_registration' => '2021-07-02',
            ],
            [
                'house_number' => 'Số nhà 8',
                'street' => 'Đường R',
                'ward' => 'Phường Q',
                'district' => 'Quận O',
                'head_of_household' => 'Đỗ Văn H',
                'household_size' => 4,
                'date_of_registration' => '2021-08-14',
            ],
            [
                'house_number' => 'Số nhà 9',
                'street' => 'Đường W',
                'ward' => 'Phường X',
                'district' => 'Quận Y',
                'head_of_household' => 'Hồ Thị I',
                'household_size' => 3,
                'date_of_registration' => '2021-09-29',
            ],
            [
                'house_number' => 'Số nhà 10',
                'street' => 'Đường B',
                'ward' => 'Phường A',
                'district' => 'Quận Z',
                'head_of_household' => 'Trần Văn K',
                'household_size' => 7,
                'date_of_registration' => '2021-10-12',
            ]
            
        ]);
    }
}
