<?php

namespace App\Repositories\Member;

use App\Models\Member;

interface MemberRepositoryInterface
{
    public function create($data): Member;

    public function update($data, $id);

    public function delete($id);

    public function getAll();
}
