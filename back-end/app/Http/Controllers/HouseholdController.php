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
        $household = new Household();
        $household->house_number = $request->input('house_number');
        $household->street = $request->input('street');
        $household->ward = $request->input('ward');
        $household->district = $request->input('district');
        $household->head_of_household = '0';
        $household->household_size = '0';
        $household->date_of_registration = $request->input('date_of_registration');
        $household->save();

        // Lấy ID của hộ khẩu vừa được tạo
        $householdId = $household->id;

        // Lưu dữ liệu thành viên vào bảng "residents"
        $members = $request->input('members');
        $headOfHouseholdId = '0'; // Lưu ID của người chủ hộ
        foreach ($members as $member) {
            $resident = new Resident();
            $resident->household_id = $householdId;
            $resident->full_name = $member['full_name'];
            $resident->gender = $member['gender'];
            $resident->date_of_birth = $member['date_of_birth'];
            $resident->place_of_birth = $member['place_of_birth'];
            $resident->ethnicity = $member['ethnicity'];
            $resident->occupation = $member['occupation'];
            $resident->id_card_number = $member['id_card_number'];
            $resident->date_of_issue = $member['date_of_issue'];
            $resident->place_of_issue = $member['place_of_issue'];
            $resident->status = $member['status'];
            $resident->date_of_register = $request->input('date_of_registration');
            $resident->current_address = $member['current_address'];
            $resident->previous_address = $member['previous_address'];
            $resident->relationship_with_head = $member['relationship_with_head'];
            $resident->save();

            // Kiểm tra nếu là "chủ hộ" thì lưu ID của người đó vào head_of_household
            if ($member['relationship_with_head'] === 'chủ hộ') {
               $headOfHouseholdId = $resident->id;
           }
        }

        // Cập nhật trường "head_of_household" trong bảng "households"
        $household->head_of_household = $headOfHouseholdId;
        
        // Cập nhật trường "household_size" trong bảng "households"
        $household->household_size = count($members);
        
        $household->save();

        // Phản hồi thành công
        return response()->json(['message' => 'Thêm mới hộ khẩu thành công'], 201);
    
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
        
    $household = Household::findOrFail($id);

    // Xóa tất cả các thành viên trong hộ khẩu
    $household->residents()->delete();

    // Xóa hộ khẩu
    $household->delete();

    return response()->json(null, 204);
    }
}

