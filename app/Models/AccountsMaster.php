<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountsMaster extends Model
{
    protected $table = 'chsone_accounts_master';
    protected $primaryKey = 'account_id';
    public $timestamps = false;
    protected $fillable = [
        'soc_id',
        'ledger_account_id',
        'account_name',
        'bank_name',
        'branch',
        'account_number',
        'bank_address',
        'bank_city',
        'bank_ifsc',
        'default_account',
        'created_by',
        'added_on',
        'modified_on',
        'status',
        'group_id',
        'active_for_payments',
        'default_bank_for_incidental',
        'default_bank_for_nonmember'
    ];
}