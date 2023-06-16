<?php

namespace App\Http\Controllers;

use App\Models\Household;
use App\Models\Resident;
use Illuminate\Http\Request;

class HouseholdController extends Controller
{
    public function index()
    {
        $households = Household::with('residents')->get();
        return response()->json($households);
    }

    public function store(Request $request)
    {
        $household = Household::create($request->all());
        return response()->json($household, 201);
    }

    public function show($id)
    {
        $household = Household::findOrFail($id);
        return response()->json($household);
    }

    public function update(Request $request, $id)
    {
        $household = Household::findOrFail($id);
        $household->update($request->all());
        return response()->json($household, 200);
    }

    public function destroy($id)
    {
        Household::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

