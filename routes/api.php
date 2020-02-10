<?php

use Illuminate\Http\Request;
use App\Task;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::namespace('Api')->group(function() {
    Route::get('/list', function() {
         $list = Task::all();
         return response()->json($list);
    });

    Route::post('/list', function(Request $request) {
         $newTask = $request->input('title');

         $task = new Task;
         $task->title = $newTask;
         if($task->save()) {
            return response()->json([
               'id' => $task->id,
               'title'=> $task->title
            ]);
         } else {
            return response()->json(false);
         }
    });

    Route::post('/list/{id}', function(Request $request) {
        $task = Task::find($request->route('id'));
        $updTask = $request->input('title');
        $task->title = $updTask;
        if($task->save()) {
           return response()->json(true);
        } else {
          return response()->json(false);
        }
    });

    Route::delete('/list/{id}', function(Request $request) {
        $task = Task::where('id', $request->route('id'))->delete();
        if($task) {
           return response()->json(true);
        } else {
           return response()->json(false);
        }
    });
});
