<?php

return [
    // Install php-open-source-saver/jwt-auth and publish its config in a Laravel app.
    'secret' => env('JWT_SECRET'),
    'ttl' => env('JWT_TTL', 60),
    'refresh_ttl' => env('JWT_REFRESH_TTL', 20160),
    'algo' => env('JWT_ALGO', 'HS256'),
];
