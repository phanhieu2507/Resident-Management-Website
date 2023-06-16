<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    use HasFactory;

    protected $fillable = [
        'household_id',
        'full_name',
        'gender',
        'date_of_birth',
        'place_of_birth',
        'ethnicity',
        'occupation',
        'id_card_number',
        'date_of_issue',
        'place_of_issue',
        'current_address',
        'previous_address',
        'relationship_with_head',
    ];
}
