<?php

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Kreait\Firebase\Factory;

class FirestoreReportService
{
    private $reports;

    public function __construct()
    {
        $factory = (new Factory())
            ->withServiceAccount(config('firebase.credentials'))
            ->withProjectId(config('firebase.project_id'));

        $this->reports = $factory
            ->createFirestore()
            ->database()
            ->collection(config('firebase.reports_collection'));
    }

    public function list(?string $category = null, ?int $municipalityId = null, ?float $latitude = null, ?float $longitude = null): Collection
    {
        $reports = collect();

        foreach ($this->reports->documents() as $document) {
            if (!$document->exists()) {
                continue;
            }

            $report = $document->data();
            $report['id'] = $document->id();

            if (($report['status'] ?? null) !== 'verified') {
                continue;
            }
            if ($category !== null && ($report['category'] ?? null) !== $category) {
                continue;
            }
            if ($municipalityId !== null && (int) ($report['municipality_id'] ?? 0) !== $municipalityId) {
                continue;
            }
            if ($latitude !== null && $longitude !== null && isset($report['latitude'], $report['longitude'])) {
                $report['distance_km'] = $this->distance($latitude, $longitude, (float) $report['latitude'], (float) $report['longitude']);
            }

            $reports->push($report);
        }

        return $latitude !== null && $longitude !== null
            ? $reports->sortBy('distance_km')->values()
            : $reports->sortByDesc('created_at')->values();
    }

    public function find(string $id): ?array
    {
        $document = $this->reports->document($id)->snapshot();
        if (!$document->exists() || ($document->data()['status'] ?? null) !== 'verified') {
            return null;
        }

        return ['id' => $document->id(), ...$document->data()];
    }

    public function create(array $data, int $userId): array
    {
        $id = (string) Str::uuid();
        $report = [...$data, 'id' => $id, 'user_id' => $userId, 'status' => 'pending', 'created_at' => now()->toIso8601String()];
        $this->reports->document($id)->set($report);
        return $report;
    }

    private function distance(float $lat1, float $lon1, float $lat2, float $lon2): float
    {
        $earthRadius = 6371;
        $latDelta = deg2rad($lat2 - $lat1);
        $lonDelta = deg2rad($lon2 - $lon1);
        $a = sin($latDelta / 2) ** 2 + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($lonDelta / 2) ** 2;
        return $earthRadius * 2 * asin(sqrt($a));
    }
}
