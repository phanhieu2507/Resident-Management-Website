<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback_response extends Model
{
    use HasFactory;

    protected $table = 'feedback_responses';
    protected $fillable = [
        'feedback_id',
        'responder',
        'response_content',
        'response_date',
    ];
}
