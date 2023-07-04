<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use Illuminate\Http\Request;

class ResidentController extends Controller
{
    public function index()
    {
        $residents = Resident::all();
        return response()->json($residents);
    }

    public function show($id)
    {
        $resident = Resident::findOrFail($id);
        return response()->json($resident);
    }

    public function store(Request $request)
    {
        $resident = Resident::create($request->all());
        return response()->json($resident, 201);
    }

    public function update(Request $request, $id)
    {
        $resident = Resident::findOrFail($id);
        $resident->update($request->all());
        return response()->json($resident);
    }

    public function destroy($id)
    {
        $resident = Resident::findOrFail($id);
        $resident -> changes () -> delete();
        $resident->delete();
        return response()->json(null, 204);
    }
}
