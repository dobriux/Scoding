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

    public function changeStatus(Request $request){
        $user = $request->user();
        $task = Tasks::find($request->id);

        if($user->id === $task->user_id)
        {
            switch ($request->status) {
                case 1:
                    $task->status = 'in progress';
                    break;
                case 2:
                    $task->status = 'to do';
                    break;
                case 3:
                    $task->status = 'done';
                    break;
            }
            $task->save();
            return response()->json(['message' => 'Task has been saved!', 200]);
        }

        return response()->json(['message' => 'Something went wrong', 404]);
    }
}
