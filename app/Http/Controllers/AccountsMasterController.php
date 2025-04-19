<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AccountsMaster;

class AccountsMasterController extends Controller
{
    public function index()
    {
        return AccountsMaster::all();
    }
}