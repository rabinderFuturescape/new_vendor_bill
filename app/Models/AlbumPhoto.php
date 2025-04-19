<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AlbumPhoto extends Model
{
    protected $table = 'album_photos';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'album_id',
        'soc_id',
        'image',
        'description',
        'status',
        'created_by',
        'modified_by',
        'created_date',
        'modified_date'
    ];
}