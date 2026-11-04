<?php

return [
    'credentials' => env('FIREBASE_CREDENTIALS'),
    'project_id' => env('FIREBASE_PROJECT_ID'),
    'reports_collection' => env('FIREBASE_REPORTS_COLLECTION', 'reports'),
];
