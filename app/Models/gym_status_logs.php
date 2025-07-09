<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class gym_status_logs extends Model
{
    use HasFactory;

        protected $fillable = ['user_id', 'status', 'recorded_at'];

        public function user() {
        return $this->belongsTo(User::class);
    }
}
