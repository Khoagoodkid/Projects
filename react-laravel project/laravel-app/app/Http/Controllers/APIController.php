<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
class APIController extends Controller
{
    public function getUsers(){
        $getUsers = User::get();
        return response() -> json(["users"=>$getUsers],200);
    }
    public function signUp(Request $request){
        $query = DB::table('users') -> insert([
            'email' => $request->input('email'),
            'username' => $request -> input('username'),
            'password' => $request -> input('password')
        ]);
        if($query){
            return back() -> with('success','Data have been success!');
        }
    }
    public function getSingleUser($id){
        $data = User::Find($id);
        return $data;
    }
    public function updateUser(Request $request, $id){
        DB::table('users')
        ->where('id',$id)
        ->update([
            'email' => $request->email,
            'username' => $request-> username
        ]);
    }
    public function deleteUser($id) {
        DB::table('users')
        ->where('id', $id)
        ->delete();
    }
    
}
