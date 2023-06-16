<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChangeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        // Seed the Changes table
DB::table('changes')->insert([
    [
        'id' => 2,
        'resident_id' => 2,
        'change_type' => 'Thay đổi nghề nghiệp',
        'change_date' => '2023-06-03',
        'new_value' => 'Kỹ sư',
        'notes' => 'Đã thay đổi nghề nghiệp từ Giáo viên sang Kỹ sư',
    ],
    [
        'id' => 3,
        'resident_id' => 3,
        'change_type' => 'Thay đổi CMND',
        'change_date' => '2023-06-04',
        'new_value' => '987654321',
        'notes' => 'Đã thay đổi số CMND từ 123456789 sang 987654321',
    ],
    [
        'id' => 4,
        'resident_id' => 4,
        'change_type' => 'Thay đổi quan hệ với chủ hộ',
        'change_date' => '2023-06-05',
        'new_value' => 'Vợ',
        'notes' => 'Đã chuyển từ con sang vợ của chủ hộ',
    ],
    [
        'id' => 5,
        'resident_id' => 5,
        'change_type' => 'Thay đổi địa chỉ',
        'change_date' => '2023-06-06',
        'new_value' => '789 Đường HIJ, Quận KLM, TP HCM',
        'notes' => 'Chuyển đến địa chỉ mới',
    ],
    [
        'id' => 6,
        'resident_id' => 6,
        'change_type' => 'Thay đổi ngày cấp CMND',
        'change_date' => '2023-06-07',
        'new_value' => '2010-10-01',
        'notes' => 'Đã thay đổi ngày cấp CMND',
    ],
    [
        'id' => 7,
        'resident_id' => 7,
        'change_type' => 'Thay đổi nghề nghiệp',
        'change_date' => '2023-06-08',
        'new_value' => 'Bác sĩ',
        'notes' => 'Đã thay đổi nghề nghiệp từ Kỹ sư sang Bác sĩ',
    ],
    [
        'id' => 8,
        'resident_id' => 8,
        'change_type' => 'Thay đổi địa chỉ',
        'change_date' => '2023-06-09',
        'new_value' => '123 Đường XYZ, Quận ABC, TP HCM',
        'notes' => 'Chuyển đến địa chỉ mới',
    ],
    [
        'id' => 9,
        'resident_id' => 9,
        'change_type' => 'Thay đổi quan hệ với chủ hộ',
        'change_date' => '2023-06-10',
        'new_value' => 'Con',
        'notes' => 'Đã chuyển từ vợ sang con của chủ hộ',
    ],
    [
        'id' => 10,
        'resident_id' => 10,
        'change_type' => 'Thay đổi nghề nghiệp',
        'change_date' => '2023-06-11',
        'new_value' => 'Giáo viên',
        'notes' => 'Đã thay đổi nghề nghiệp từ Sinh viên sang Giáo viên',
    ],
]);

    }
}
