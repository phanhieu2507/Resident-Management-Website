<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResidentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('residents', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('household_id');
            $table->string('full_name');
            $table->string('gender');
            $table->date('date_of_birth');
            $table->string('place_of_birth');
            $table->string('ethnicity');
            $table->string('occupation');
            $table->string('id_card_number');
            $table->date('date_of_issue');
            $table->string('place_of_issue');
            $table->string('status');
            $table->date('date_of_register')->nullable();
            $table->string('current_address');
            $table->string('previous_address')->nullable();
            $table->string('relationship_with_head');
            $table->timestamps();

            $table->foreign('household_id')->references('id')->on('households');
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('residents');
    }
}
