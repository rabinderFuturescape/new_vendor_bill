<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class VendorController extends BaseController
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:vendors',
        ]);

        $vendor = Vendor::create($validatedData);

        return response()->json($vendor, 201);
    }

    // Other methods like index, update, destroy can be added here
}