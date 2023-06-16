<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Household extends Model
{
    use HasFactory;

    protected $fillable = [
        'house_number',
        'street',
        'ward',
        'district',
        'head_of_household',
        'household_size',
        'date_of_registration',
    ];
}
