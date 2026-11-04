<?php

return [
    /*
    | These numbers are public Colombian service lines. Keep this catalogue
    | configurable so regional lines can be added without changing controllers.
    */
    'country' => 'CO',
    'updated_at' => '2026-11-04',
    'services' => [
        [
            'id' => 'linea-123',
            'name' => 'Línea 123',
            'description' => 'Emergencias inmediatas: policía, ambulancia o bomberos.',
            'phone' => '123',
            'type' => 'emergency',
            'available' => '24/7',
            'source' => 'https://www.policia.gov.co/linea-123',
        ],
        [
            'id' => 'linea-155',
            'name' => 'Línea 155',
            'description' => 'Orientación para mujeres víctimas de violencias.',
            'phone' => '155',
            'type' => 'support',
            'available' => '24/7',
            'source' => 'https://www.policia.gov.co/linea-155',
        ],
        [
            'id' => 'fiscalia-122',
            'name' => 'Fiscalía 122',
            'description' => 'Denuncias y orientación de la Fiscalía General de la Nación.',
            'phone' => '122',
            'type' => 'report',
            'available' => '24/7 desde celular',
            'source' => 'https://www.fiscalia.gov.co/colombia/servicios-de-informacion-al-ciudadano/',
        ],
        [
            'id' => 'gaula-165',
            'name' => 'GAULA 165',
            'description' => 'Atención para casos de extorsión y secuestro.',
            'phone' => '165',
            'type' => 'support',
            'available' => '24/7',
            'source' => 'https://www.policia.gov.co/gaula',
        ],
    ],
];
