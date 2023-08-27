<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('users',[AuthController::class,'getUsers']);
Route::get('/users/{id}', [AuthController::class,'getSingleUser']);
Route::put('/users/profile/{id}', [AuthController::class, 'updateProfile']);
Route::get('check-dup',[AuthController::class,'checkDup']);
Route::post('signup',[AuthController::class,'signUp']); 
Route::get('login', [AuthController::class], 'logIn');
Route::put('/users/{id}',[AuthController::class,'updateBudget']);
Route::put('/users/charge/{id}', [AuthController::class,'chargeBudget']);


