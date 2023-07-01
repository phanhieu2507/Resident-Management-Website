<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFeedbackResponsesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('feedback_responses', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('feedback_id');
            $table->foreign('feedback_id')->references('id')->on('feedbacks');
            $table->string('responder');
            $table->text('response_content');
            $table->date('response_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('feedback_responses');
    }
}