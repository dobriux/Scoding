<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\AdminService;
use App\Models\Tasks;
use App\Models\User;
use App\Models\UsersRelationships;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function addUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50|min:3',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed|min:6'
        ]);


        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->all()], 400);
        }


        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'is_admin' => false
        ]);
        $user->save();

        $userRelationship = new UsersRelationships([
            'admin_id' =>  Auth::id(),
            'user_id' => $user->id,
        ]);
        $userRelationship->save();

        return response()->json(['message' => 'Successfully created user!'], 201);
    }

    public function getOwnedUsers(AdminService $adminService)
    {
        $users = User::find($adminService->getAdminsUsers());

        return response()->json(['message' => $users], 200);
    }

    public function editUser(Request $request, AdminService $adminService)
    {
        if (!$adminService->belongsToAdmin($request->id)) {
            return response()->json(['message' => 'This user does not belong to you'], 404);
        }

        if (!$adminService->emailsBelongsToUser($request->id, $request->email)) {
            $name = Validator::make($request->all(), [
                'name' => 'required|string|max:50|min:3',
                'email' => 'required|string|email|unique:users',
            ]);
        } else {
            $name = Validator::make($request->all(), [
                'name' => 'required|string|max:50|min:3',
            ]);
        }

        if ($name->fails()) {
            return response()->json(['message' => $name->errors()->all()], 400);
        }

        if (!empty($request->get('password'))) {
            $password = Validator::make($request->all(), [
                'password' => 'required|string|min:6'
            ]);

            if ($password->fails()) {
                return response()->json(['message' => $password->errors()->all()], 400);
            }
        }


        if ($adminService->editUser($request->id, $request->name, $request->email, $request->password)) {
            return response()->json(['message' => 'User edited successfully!'], 200);
        }


        return response()->json(['message' => ['Something went wrong']], 404);
    }

    public function deleteUser(Request $request, AdminService $adminService)
    {
        if (!$adminService->belongsToAdmin($request->id)) {
            return response()->json(['message' => 'This user does not belong to you'], 404);
        }

        $user = User::find($request->id);
        $user->delete();

        $usersR = UsersRelationships::where('user_id', $request->id);
        $usersR->delete();

        return response()->json(['message' => 'User deleted successfully!'], 200);
    }

    public function getTasks(Request $request, AdminService $adminService)
    {
        if (!$adminService->belongsToAdmin($request->id)) {
            return response()->json(['message' => 'This user does not belong to you'], 404);
        }

        $tasks = Tasks::where('user_id', $request->id)->get();

        return response()->json(['message' => $tasks], 200);
    }

    public function addTask(Request $request, AdminService $adminService)
    {
        if (!$adminService->belongsToAdmin($request->id)) {
            return response()->json(['message' => 'This user does not belong to you'], 404);
        }

        $task = new Tasks([
            'task' => $request->task,
            'user_id' => $request->id,
            'status' => "to do",
           'created_at' => Carbon::now()->toDateTimeString(),
        ]);

        if ($task->save()) {
            return response()->json(['message' => 'Task successfully saved'], 200);
        }

        return response()->json(['message' => ['Something went wrong']], 404);
    }
}
