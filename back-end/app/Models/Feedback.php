<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;

    protected $table = 'feedbacks';
    protected $fillable = [
        'submitter',
        'content',
        'date_submitted',
        'category',
        'status',
        'phone_number',
        'address',
    ];
    
}
