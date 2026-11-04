<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Report extends Model
{
    protected $fillable = ['user_id', 'municipality_id', 'category', 'reference', 'description', 'latitude', 'longitude', 'status'];
    protected $casts = ['latitude' => 'float', 'longitude' => 'float'];
    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function municipality(): BelongsTo { return $this->belongsTo(Municipality::class); }
}
