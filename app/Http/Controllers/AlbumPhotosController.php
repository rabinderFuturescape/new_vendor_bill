<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AlbumPhoto;

class AlbumPhotosController extends Controller
{
    public function index()
    {
        return AlbumPhoto::all();
    }
}