<?php


namespace App\Repositories\Member;


use App\Models\Member;
use Illuminate\Support\Facades\Cache;

class MemberRepository implements MemberRepositoryInterface
{

    public function create($data): Member
    {
        $addresses = $data["addresses"];
        $member = Member::create($data);

        foreach ($addresses as $address) {
            $member->addresses()->create([
                'address' => $address
            ]);
        }

        return $member;
    }

    public function update($data, $id)
    {
        return Member::where(['id' => $id])->update($data);
    }

    public function delete($id)
    {
        $user = Member::find($id);
        $user->delete();
    }

    public function getAll()
    {
        if (!Cache::has('members-' . request()->query('page'))) {
            Cache::remember('members-' . request()->query('page'), 86400, function () {
                return Member::with('addresses')->paginate(1000);
            });
        }

        // return Cache::get('members-'. request()->query('page'));
        return Member::with('addresses')->paginate(1000);
    }
}
