<?php

namespace App\Http\Controllers;


use App\Models\Change;
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
        $change = new Change();
        $change->resident_id = $resident->id;
        $change->change_type = 'tạo nhân khẩu mới';
        $change->change_date = date('Y-m-d'); // Ngày hôm nay
        $change->save();
        return response()->json($resident, 201);
    }

    public function update(Request $request, $id)
    {
        $resident = Resident::findOrFail($id);
        foreach ($request->all() as $key => $value) {
            if ($resident->{$key} != $value) {
                $change = new Change();
                $change->resident_id = $resident->id;
                $change->household_id = $resident->household_id;
                $change->change_type = 'cập nhật nhân khẩu';
                $change->change_date = date('Y-m-d'); // Ngày hôm nay
                $change->new_value = $value;
                $change->notes = 'Cập nhật thông tin ' . $key;
                $change->save();
            }
        }
        $resident->update($request->all());
        return response()->json($resident);
    }

    public function destroy($id)
    {
        $resident = Resident::findOrFail($id);
        $change = new Change();
        $change->household_id = $resident->household_id;
        $change->resident_id = $resident->id;
        $change->change_type = 'xóa nhân khẩu';
        $change->change_date = date('Y-m-d'); // Ngày hôm nay
        $change->notes = 'xóa nhân khẩu ' . $resident->full_name;
        $change->save();
        $resident->delete();
        return response()->json(null, 204);
    }
}
