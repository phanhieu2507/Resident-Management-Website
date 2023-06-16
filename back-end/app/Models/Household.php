<?php

namespace App\Models;

use App\Models\Resident;
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

    public function residents()
    {
        return $this->hasMany(Resident::class);
    }
}
