<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
class AuthController extends Controller
{
    public function getUsers(){
       return  DB::table('users') -> get();
    }
  
    public function signUp(Request $request) {
        $query = DB::table('users') -> insert([
            'email' => $request->input('email'),
            'username' => $request -> input('username'),
            'password' => $request -> input('password'),
            'budget' => $request -> input('budget'),
            'address' => $request -> input('address'),
            // 'birthday' => $request -> input('birthday'),

        ]);
        if($query){
            return back() -> with('success','Data have been success!');
        }
    }
    public function getSingleUser($id) {
      return DB::table('users')
        ->where('_id', $id)
        ->get();
    }
    public function updateBudget(Request $request, $id){
        DB::table('users')
        -> where('_id', $id)
        -> decrement('budget', $request -> moneyToDecrease);
    }
    public function chargeBudget(Request $request, $id){
        DB::table('users')
        -> where('_id',$id)
        -> increment('budget', $request -> moneyToIncrease);
    }   
    public function updateProfile(Request $request, $id){
        DB::table('users')
        -> where('_id', $id) 
        -> update(['username' => $request -> username,
                    'password' => $request -> password, 
                    'email' => $request -> email, 
                    'budget' => $request -> budget, 
                    'address' => $request -> address
    ]);
    }
}
    