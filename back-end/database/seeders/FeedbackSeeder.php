<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FeedbackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Seed the Feedback table
DB::table('feedbacks')->insert([
    [
        'id' => 2,
        'submitter' => 'Nguyễn Văn B',
        'content' => 'Gửi phản ánh về vấn đề giao thông tại khu vực XYZ',
        'date_submitted' => '2023-06-03',
        'category' => 'Giao thông',
        'status' => 'Đang xử lý',
    ],
    [
        'id' => 3,
        'submitter' => 'Trần Thị C',
        'content' => 'Gửi kiến nghị về việc cải thiện dịch vụ y tế tại bệnh viện ABC',
        'date_submitted' => '2023-06-04',
        'category' => 'Y tế',
        'status' => 'Đã xử lý',
    ],
    [
        'id' => 4,
        'submitter' => 'Lê Văn D',
        'content' => 'Gửi phản ánh về tình trạng môi trường ô nhiễm tại khu vực DEF',
        'date_submitted' => '2023-06-05',
        'category' => 'Môi trường',
        'status' => 'Đã xử lý',
    ],
    [
        'id' => 5,
        'submitter' => 'Nguyễn Thị E',
        'content' => 'Gửi phản ánh về tình trạng an ninh trật tự tại khu vực GHI',
        'date_submitted' => '2023-06-06',
        'category' => 'An ninh',
        'status' => 'Đang xử lý',
    ],
    [
        'id' => 6,
        'submitter' => 'Trần Văn F',
        'content' => 'Gửi kiến nghị về việc xây dựng công viên tại khu vực JKL',
        'date_submitted' => '2023-06-07',
        'category' => 'Công viên',
        'status' => 'Đã xử lý',
    ],
    [
        'id' => 7,
        'submitter' => 'Lê Thị G',
        'content' => 'Gửi phản ánh về tình trạng giao thông ùn tắc tại khu vực MNO',
        'date_submitted' => '2023-06-08',
        'category' => 'Giao thông',
        'status' => 'Đang xử lý',
    ],
    [
        'id' => 8,
        'submitter' => 'Nguyễn Văn H',
        'content' => 'Gửi phản ánh về tình trạng vệ sinh công cộng tại khu vực PQR',
        'date_submitted' => '2023-06-09',
        'category' => 'Vệ sinh',
        'status' => 'Đang xử lý',
    ],
    [
        'id' => 9,
        'submitter' => 'Trần Thị I',
        'content' => 'Gửi kiến nghị về việc nâng cao chất lượng giáo dục tại trường XYZ',
        'date_submitted' => '2023-06-10',
        'category' => 'Giáo dục',
        'status' => 'Đã xử lý',
    ],
    [
        'id' => 10,
        'submitter' => 'Lê Văn K',
        'content' => 'Gửi phản ánh về tình trạng an toàn giao thông tại khu vực STU',
        'date_submitted' => '2023-06-11',
        'category' => 'Giao thông',
        'status' => 'Đã xử lý',
    ],
    [
        'id' => 11,
        'submitter' => 'Nguyễn Thị L',
        'content' => 'Gửi phản ánh về tình trạng mất nước tại khu vực VWX',
        'date_submitted' => '2023-06-12',
        'category' => 'Môi trường',
        'status' => 'Đang xử lý',
    ],
]);

    }
}
