<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tasks;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        return response()->json($request->user());
    }

    public function getTasks(Request $request)
    {
            $user = $request->user();
            $tasks = Tasks::where('user_id', $user->id)->get();

        return response()->json(['message' => $tasks, 200]);
    }
}
