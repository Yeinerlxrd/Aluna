<?php

return [
    'url' => env('SUPABASE_URL'),
    'service_role_key' => env('SUPABASE_SERVICE_ROLE_KEY'),
    'reports_table' => env('SUPABASE_REPORTS_TABLE', 'reports'),
];
