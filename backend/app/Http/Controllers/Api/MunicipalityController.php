<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Municipality;

class MunicipalityController extends Controller
{
    public function index() { return Municipality::query()->orderBy('name')->get(['id', 'name', 'department', 'country']); }
}
