<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fitness_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->float('weight');
            $table->float('height');
            $table->float('bmi')->nullable(); // يجب تلقائي
            $table->float('fat_percent')->nullable(); // نسبة الدهون إذا متوفرة
            $table->float('muscle_mass')->nullable(); // نسبة العضل اذا متوفرة
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fitness_data');
    }
};
