<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable ;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone', 'role',
        'gender', 'birth_date', 'profile_image', 'fingerprint_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'birth_date' => 'date',
        'password' => 'hashed',
    ];

  public function subscriptions() {
        return $this->hasMany(Subscription::class);
    }

    public function fitnessData() {
        return $this->hasMany(FitnessData::class);
    }

    public function attendances() {
        return $this->hasMany(Attendance::class);
    }

    public function workoutPlans() {
        return $this->hasMany(WorkoutPlan::class, 'user_id');
    }

    public function nutritionPlans() {
        return $this->hasMany(NutritionPlan::class, 'user_id');
    }

    public function coachedWorkoutPlans() {
        return $this->hasMany(WorkoutPlan::class, 'coach_id');
    }

    public function coachedNutritionPlans() {
        return $this->hasMany(NutritionPlan::class, 'coach_id');
    }

    public function gymStatusLogs() {
        return $this->hasMany(GymStatusLog::class);
    }

    // علاقات المتدرب والكوتش
    public function members() {
        return $this->belongsToMany(User::class, 'coach_member', 'coach_id', 'member_id');
    }

    public function coaches() {
        return $this->belongsToMany(User::class, 'coach_member', 'member_id', 'coach_id');
    }


//     public function getAgeAttribute() {
//     return \Carbon\Carbon::parse($this->birth_date)->age;
// }


}
