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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/album_photos', 'AlbumPhotosController@index');
Route::get('/chsone_accounts_master', 'AccountsMasterController@index');
Route::get('/vendors', 'VendorController@index');
Route::post('/vendors', 'VendorController@store');
Route::put('/vendors/{id}', 'VendorController@update');
Route::delete('/vendors/{id}', 'VendorController@destroy');
Route::post('/vendors/bill', 'VendorController@addBill');