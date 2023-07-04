<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Change extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'change_type',
        'change_date',
        'new_value',
        'notes',
    ];
    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }
}
