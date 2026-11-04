<?php

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use RuntimeException;

class SupabaseReportService
{
    private function request()
    {
        return Http::baseUrl(rtrim(config('supabase.url'), '/') . '/rest/v1')
            ->withHeaders([
                'apikey' => config('supabase.service_role_key'),
                'Authorization' => 'Bearer ' . config('supabase.service_role_key'),
            ]);
    }

    public function list(?string $category = null, ?int $municipalityId = null, ?float $latitude = null, ?float $longitude = null): Collection
    {
        $query = ['select' => '*', 'status' => 'eq.verified', 'order' => 'created_at.desc', 'limit' => 25];
        if ($category !== null) $query['category'] = 'eq.' . $category;
        if ($municipalityId !== null) $query['municipality_id'] = 'eq.' . $municipalityId;
        $response = $this->request()->get(config('supabase.reports_table'), $query)->throw();
        return collect($response->json());
    }

    public function find(string $id): ?array
    {
        $response = $this->request()->get(config('supabase.reports_table'), [
            'select' => '*', 'id' => 'eq.' . $id, 'status' => 'eq.verified', 'limit' => 1,
        ])->throw()->json();
        return $response[0] ?? null;
    }

    public function create(array $data, int $userId): array
    {
        $report = [...$data, 'id' => (string) Str::uuid(), 'user_id' => $userId, 'status' => 'pending', 'created_at' => now()->toIso8601String()];
        $response = $this->request()->withHeaders(['Prefer' => 'return=representation'])
            ->post(config('supabase.reports_table'), $report)->throw()->json();
        return $response[0] ?? $report;
    }

    public function mine(int $userId): Collection
    {
        return collect($this->request()->get(config('supabase.reports_table'), [
            'select' => '*', 'user_id' => 'eq.' . $userId, 'order' => 'created_at.desc',
        ])->throw()->json());
    }
}
