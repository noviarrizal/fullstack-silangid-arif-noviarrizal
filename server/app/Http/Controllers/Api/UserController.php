<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllUsers()
    {
        $users = User::all();
        return response()->json([
            'status' => true,
            'users' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function saveUser(Request $request)
    {
        $validator = Validator::makle($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8'
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
                'message' => 'Error Creating User'
            ], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
           'status' => true,
            'user' => $user,
            'message' => 'User Created Successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function getUser(string $id)
    {
        $user = User::find($id);

        if(!$user) {
            return response()->json([
               'status' => false,
               'message' => 'User Not Found'
            ], 404);
        }
        return response()->json([
          'status' => true,
            'user' => $user
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function editUser(Request $request, string $id)
    {
        $user = User::find($id);
        if(!$user) {
            return response()->json([
             'status' => false,
             'message' => 'User Not Found'
            ], 404);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' =>'required|email|unique:users,email,'.$user->id,
            'password' =>'required|min:8'
        ]);
        if($validator->fails()) {
            return response()->json([
               'status' => false,
                'errors' => $validator->errors(),
               'message' => 'Error Updating User'
            ], 400);
        }
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        return response()->json([
            'status' => true,
            'user' => $user,
            'message' => 'User Updated Successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteUser(string $id)
    {
        $user = User::find($id);

        if(!$user) {
            return response()->json([
              'status' => false,
              'message' => 'User Not Found'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'status' => true,
            'message' => 'User Deleted Successfully'
        ], 200);
    }
}
