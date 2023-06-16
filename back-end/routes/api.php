<?php

use App\Http\Controllers\HouseholdController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\ChangeController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\Feedback_responseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::apiResource('households', HouseholdController::class);
Route::apiResource('residents', ResidentController::class);
Route::apiResource('changes', ChangeController::class);
Route::apiResource('feedbacks', FeedbackController::class);
Route::apiResource('feedback_responses', Feedback_responseController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
