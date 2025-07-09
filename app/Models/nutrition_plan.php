<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class nutrition_plan extends Model
{
    use HasFactory;
        protected $fillable = ['user_id', 'coach_id', 'title', 'description', 'start_date', 'end_date'];


          protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

      public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function coach() {
        return $this->belongsTo(User::class, 'coach_id');
    }
}
