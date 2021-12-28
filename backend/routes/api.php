<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::group(['prefix' => 'user'], function () {
    Route::post('/list', [UserController::class, 'list']);
    Route::post('/add', [UserController::class, 'store']);
    Route::post('/edit', [UserController::class, 'update']);
    Route::get('/remove/{id}', [UserController::class, 'delete']);
    Route::get('/remove-add/{id}', [UserController::class, 'deleteAddress']);
    Route::get('/remove-mob/{id}', [UserController::class, 'deleteMobile']);
// });

