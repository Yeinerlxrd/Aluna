<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    protected $fillable = ['name', 'email', 'password', 'municipality_id'];
    protected $hidden = ['password', 'remember_token'];
    public function getJWTIdentifier() { return $this->getKey(); }
    public function getJWTCustomClaims(): array { return []; }
    public function municipality(): BelongsTo { return $this->belongsTo(Municipality::class); }
    public function reports(): HasMany { return $this->hasMany(Report::class); }
}
