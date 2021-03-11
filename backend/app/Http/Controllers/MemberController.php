<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Repositories\Member\MemberRepositoryInterface;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    protected $member;

    public function __construct(MemberRepositoryInterface $member)
    {
        $this->member = $member;
    }

    public function index()
    {
        return $this->member->getAll();
    }


    public function store(Request $request)
    {
        return $this->member->create(
            $request->only('first_name', 'last_name', 'phone', 'tc_number', 'addresses')
        );
    }

    public function update(Request $request, $id)
    {
        return $this->member->update(
            $request->only('first_name', 'last_name', 'phone', 'tc_number')
            , $id);
    }

    public function destroy($id)
    {
        return $this->member->delete($id);
    }
}
