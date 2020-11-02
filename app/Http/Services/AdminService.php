<?php


namespace App\Http\Services;

use App\Models\User;
use App\Models\UsersRelationships;
use Illuminate\Support\Facades\Auth;
use phpDocumentor\Reflection\Types\Integer;

class AdminService
{
    public function getAdminsUsers() : array
    {
        $usersR = UsersRelationships::where('admin_id', Auth::id())->get();

        $usersId = [];
        foreach ($usersR as $item) {
            $usersId[] = $item->user_id;
        }

        return $usersId;
    }

    public function belongsToAdmin(int  $userId) : bool
    {
        $users = $this->getAdminsUsers();
        if (in_array($userId, $users)) {
            return true;
        }
        return false;
    }

    public function editUser(int $id, String $name, String $email, ?String $password) : bool
    {
        $user = User::find($id);
        $user->name = $name;
        $user->email = $email;
        if (!empty($password)) {
            $user->password = bcrypt($password);
        }
        if ($user->save()) {
            return true;
        }
        return false;
    }

    public function emailsBelongsToUser(int $id, string $email): bool
    {
        $user = User::find($id);
        if ($user->email === $email) {
            return true;
        }
        return false;
    }
}
