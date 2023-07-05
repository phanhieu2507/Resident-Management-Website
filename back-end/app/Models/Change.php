<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Change extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'household_id',
        'change_type',
        'change_date',
        'new_value',
        'notes',
    ];
   
}
