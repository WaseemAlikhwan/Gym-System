<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class subscription extends Model
{
    use HasFactory;
     protected $fillable = [
        'user_id', 'membership_id', 'start_date', 'end_date', 'is_active', 'notes'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];


     public function user() {
        return $this->belongsTo(User::class);
    }

    public function membership() {
        return $this->belongsTo(Membership::class);
    }
}
