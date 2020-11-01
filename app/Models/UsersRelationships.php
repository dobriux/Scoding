<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersRelationships extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'admin_id',
        'user_id',
    ];
}
