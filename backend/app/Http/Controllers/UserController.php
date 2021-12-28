<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserAddress;
use App\Models\UserMobile;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    function list(Request $request) {
        try{
            return response([
                'users' => User::with('address','mobile')->get(),
                'status' => 200,
                'success' => true,
            ]);
        }catch(Exception $e){
            return response([
                'message' => 'Sorry! Anything is wrong!',
                'status' => 201,
                'success' => false,
            ]);
        }
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required | string ',
            'email' => 'required | email | unique:users',
            'profile' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        try{
                DB::beginTransaction();
                // store user information

                $fileName = '';
                if ($request->hasFile('profile')) {
                    $fileName = time().'.'.$request->profile->extension();  
                    $request->profile->move(public_path('uploads'), $fileName);
                }

                $user_id = DB::table('users')->insertGetId([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'profile' => $fileName
                ]);

                // store user address information
                foreach ($request->addressList as $address) {
                    UserAddress::create([
                        'address' => $address,
                        'user_id' => $user_id,
                    ]);
                }

                // store user mobile information
                foreach ($request->mobileList as $mobile) {
                    UserMobile::create([
                        'mobile' => $mobile,
                        'user_id' => $user_id,
                    ]);
                }
                DB::commit();
                if ($user_id) {
                    return response([
                        'message' => 'User created succesfully!',
                        'user' => User::with('address','mobile')->all(),
                        'success' => true,
                        'status' => 200,
                    ]);
                }

                return response([
                    'message' => 'Sorry! Failed to create user!',
                    'success' => false,
                    'status' => 201,
                ]);
            }catch(Exception $e){
                DB::rollBack();
                return response([
                    'message' => 'Sorry! Anything is wrong!',
                    'success' => false,
                    'status' => 201,
                ]);
            }

    }

    public function update($id, Request $request){

        $request->validate([
            'user_id' => 'required',
            'name' => 'required | string ',
            'email' => 'required | email | unique:users',
        ]);
        try{
                $user_data = User::where('id',$request->user_id)->first();
                DB::beginTransaction();

                $fileName = '';
                if ($request->hasFile('profile')) {
                    $request->validate([
                        'profile' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
                    ]);
                    unlink(storage_path('uploads/'.$user_data->profile));

                    $fileName = time().'.'.$request->profile->extension();  
                    $request->profile->move(public_path('uploads'), $fileName);
                }
                // store user information
                $user = User::where('id',$request->user_id)->update([
                    'name' => $request->name,
                    'email' => $request->email,
                ]);

                // store user address information
                foreach ($request->addressAddList as $address) {
                    UserAddress::create([
                        'address' => $address,
                        'user_id' => $request->user_id,
                    ]);
                }

                foreach ($request->addressUpdateList as $address) {
                    UserAddress::where('user_id',$request->user_id)->upadte([
                        'address' => $address,
                    ]);
                }

                // store user mobile information
                foreach ($request->mobileAddList as $mobile) {
                    UserMobile::create([
                        'mobile' => $mobile,
                        'user_id' => $request->user_id,
                    ]);
                }

                foreach ($request->mobileUpdateList as $mobile) {
                    UserMobile::where('user_id',$request->user_id)->upadte([
                        'mobile' => $mobile,
                    ]);
                }

                DB::commit();
                if ($user) {
                    return response([
                        'message' => 'User created succesfully!',
                        'user' => User::with('address','mobile')->all(),
                        'success' => true,
                        'status' => 200,
                    ]);
                }

                return response([
                    'message' => 'Sorry! Failed to create user!',
                    'success' => false,
                    'status' => 201,
                ]);
            }catch(Exception $e){
                DB::rollBack();
                return response([
                    'message' => 'Sorry! Anything is wrong!',
                    'success' => false,
                    'status' => 201,
                ]);
            }
    }

    public function delete($id, Request $request){
        try{
            DB::beginTransaction();
            $user_data = User::where('id',$request->user_id)->first();
            unlink(storage_path('uploads/'.$user_data->profile));
            
            $user = User::find($id);

            DB::commit();
            if ($user) {
                $user->delete();
                return response(['message' => 'User has been deleted', 'success' => true,'status' => 200]);
            } else {
                return response(['message' => 'Sorry! Not found!', 'success' => false,'status' => 201]);
            }
            
        }catch(Exception $e){
            DB::rollBack();
            return response([
                'message' => 'Sorry! Anything is wrong!',
                'success' => false,
                'status' => 201
            ]);
        }


    }

    public function deleteAddress($id, Request $request){
        try{
            DB::beginTransaction();
            $user_add = UserAddress::find($id);
            DB::commit();
            if ($user_add) {
                $user_add->delete();
                return response(['message' => 'User address has been deleted', 'success' => true, 'status' => 200]);
            } else {
                return response(['message' => 'Sorry! Not found!', 'success' => false, 'status' => 201]);
            }
        }catch(Exception $e){
            DB::rollBack();
            return response([
                'message' => 'Sorry! Anything is wrong!',
                'success' => false,
                'status' => 201
            ]);
        }
    }

    public function deleteMobile($id, Request $request){
        try{
            DB::beginTransaction();
            $user_mob = UserMobile::find($id);
            DB::commit();
            if ($user_mob) {
                $user_mob->delete();
                return response(['message' => 'User mobile has been deleted', 'success' => true,'status' => 200]);
            } else {
                return response(['message' => 'Sorry! Not found!', 'success' => false, 'status' => 201]);
            }
        }catch(Exception $e){
            DB::rollBack();
            return response([
                'message' => 'Sorry! Anything is wrong!',
                'success' => false,
                'status' => 201
            ]);
        }

    }

}
