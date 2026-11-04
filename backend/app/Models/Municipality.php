<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Municipality extends Model
{
    protected $fillable = ['name', 'department', 'country'];
    public function users(): HasMany { return $this->hasMany(User::class); }
    public function reports(): HasMany { return $this->hasMany(Report::class); }
}
