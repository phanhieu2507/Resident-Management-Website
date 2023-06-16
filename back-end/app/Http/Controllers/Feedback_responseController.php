<?php

namespace App\Http\Controllers;

use App\Models\Feedback_response;
use Illuminate\Http\Request;

class Feedback_responseController extends Controller
{
    public function index()
    {
        $responses = Feedback_response::all();
        return response()->json($responses);
    }

    public function show($id)
    {
        $response = Feedback_response::findOrFail($id);
        return response()->json($response);
    }

    public function store(Request $request)
    {
        $response = Feedback_response::create($request->all());
        return response()->json($response, 201);
    }

    public function update(Request $request, $id)
    {
        $response = Feedback_response::findOrFail($id);
        $response->update($request->all());
        return response()->json($response);
    }

    public function destroy($id)
    {
        $response = Feedback_response::findOrFail($id);
        $response->delete();
        return response()->json(null, 204);
    }
}
