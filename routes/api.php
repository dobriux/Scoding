<?php

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

Route::post('/register', [App\Http\Controllers\Api\AuthController::class, 'register']);
Route::post('/login', [App\Http\Controllers\Api\AuthController::class, 'login']);

Route::group(['middleware' => ['auth:api']], function() {
    Route::get('/logout', [App\Http\Controllers\Api\AuthController::class, 'logout']);
});
Route::group(['middleware' => ['auth:api','admin']], function() {
    Route::get('/getUser', [App\Http\Controllers\Api\UserController::class, 'getUser']);
    Route::get('/admin/getOwnedUsers', [App\Http\Controllers\Api\AdminController::class, 'getOwnedUsers']);
    Route::post('/admin/addUser', [App\Http\Controllers\Api\AdminController::class, 'addUser']);
    Route::put('/admin/editUser', [App\Http\Controllers\Api\AdminController::class, 'editUser']);
    Route::delete('/admin/deleteUser', [App\Http\Controllers\Api\AdminController::class, 'deleteUser']);
    Route::post('/admin/getUserTasks', [App\Http\Controllers\Api\AdminController::class, 'getTasks']);
    Route::post('/admin/addTask', [App\Http\Controllers\Api\AdminController::class, 'AddTask']);
});
