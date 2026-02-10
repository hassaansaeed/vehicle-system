<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomepageSetting extends Model
{
    protected $fillable = [
        'title',
        'heading',
        'subheading',
        'image_path',
    ];

    public static function current(): ?self
    {
        return static::query()->latest('id')->first();
    }
}

