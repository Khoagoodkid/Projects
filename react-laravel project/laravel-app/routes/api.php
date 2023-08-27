<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIController;
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
Route::get('users','App\Http\Controllers\APIController@getUsers');
Route::post('signup', 'App\Http\Controllers\APIController@signUp'); 
Route::get('/user/{id}', [APIController::class, 'getSingleUser']);
Route::put('update/{id}', [APIController::class, 'updateUser']);
Route::delete('delete/{id}', [APIController::class, 'deleteUser']);