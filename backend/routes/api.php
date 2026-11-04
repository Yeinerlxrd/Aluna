<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MunicipalityController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\EmergencyController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('google', [AuthController::class, 'google']);
    Route::middleware('auth:api')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});
Route::get('municipalities', [MunicipalityController::class, 'index']);
Route::get('emergency-services', [EmergencyController::class, 'index']);
Route::get('reports', [ReportController::class, 'index']);
Route::middleware('auth:api')->group(function () {
    Route::post('reports', [ReportController::class, 'store']);
    Route::get('reports/mine', [ReportController::class, 'mine']);
});
Route::get('reports/{report}', [ReportController::class, 'show'])->whereNumber('report');
