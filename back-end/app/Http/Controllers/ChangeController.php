<?php

namespace App\Http\Controllers;

use App\Models\Change;
use Illuminate\Http\Request;

class ChangeController extends Controller
{
    public function index()
    {
        $change = Change::all();
        return response()->json($change);
    }

    public function show($id)
    {
        $change = Change::findOrFail($id);
        return response()->json($change);
    }

    public function store(Request $request)
    {
        $change = Change::create($request->all());
        return response()->json($change, 201);
    }

    public function update(Request $request, $id)
    {
        $change = Change::findOrFail($id);
        $change->update($request->all());
        return response()->json($change);
    }

    public function destroy($id)
    {
        $change = Change::findOrFail($id);
        $change->delete();
        return response()->json(null, 204);
    }
}
