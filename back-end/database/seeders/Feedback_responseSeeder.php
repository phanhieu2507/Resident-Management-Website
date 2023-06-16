<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Feedback_responseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Seed the FeedbackResponse table
DB::table('feedback_responses')->insert([
    [
        'id' => 2,
        'feedback_id' => 9,
        'responder' => 'Admin',
        'response_content' => 'Cảm ơn bạn đã gửi phản ánh. Chúng tôi sẽ xem xét và xử lý sớm nhất.',
        'response_date' => '2023-06-01',
    ],
    [
        'id' => 3,
        'feedback_id' => 2,
        'responder' => 'Admin',
        'response_content' => 'Cảm ơn bạn đã gửi kiến nghị. Chúng tôi đã tiếp nhận và đang thực hiện các biện pháp cần thiết.',
        'response_date' => '2023-06-02',
    ],
    [
        'id' => 4,
        'feedback_id' => 3,
        'responder' => 'Admin',
        'response_content' => 'Cảm ơn bạn đã gửi phản ánh. Chúng tôi đã xem xét và đã giải quyết vấn đề.',
        'response_date' => '2023-06-03',
    ],
    [
        'id' => 5,
        'feedback_id' => 4,
        'responder' => 'Admin',
        'response_content' => 'Cảm ơn bạn đã gửi phản ánh. Chúng tôi sẽ tiến hành điều tra và xử lý tình huống này.',
        'response_date' => '2023-06-04',
    ],
    [
        'id' => 6,
        'feedback_id' => 5,
        'responder' => 'Admin',
        'response_content' => 'Cảm ơn bạn đã gửi kiến nghị. Chúng tôi đã tiếp nhận và đang thảo luận về vấn đề này.',
        'response_date' => '2023-06-05',
    ],
    [
        'id' => 7,
        'feedback_id' => 6,
        'responder' => 'Admin',
        'response_content' => 'Cảm ơn bạn đã gửi phản ánh. Chúng tôi đã tiếp nhận và đang xem xét các giải pháp.',
        'response_date' => '2023-06-06',
    ],
    [
        'id' => 8,
        'feedback_id' => 7,
        'responder' => 'Admin',
        'response_content' => 'Cảm ơn bạn đã gửi phản ánh. Chúng tôi đã tiếp nhận và sẽ tiến hành điều tra vấn đề.',
        'response_date' => '2023-06-07',
    ],
    [
        'id' => 9,
        'feedback_id' => 8,
        'responder' => 'Admin',
        'response_content' => 'Cảm ơn bạn đã gửi phản ánh. Chúng tôi đã tiếp nhận và đang tiến hành xử lý.',
        'response_date' => '2023-06-08',
    ]
    ]);
    }
}
