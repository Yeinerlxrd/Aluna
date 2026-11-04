<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReportRequest;
use App\Services\FirestoreReportService;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function __construct(private readonly FirestoreReportService $reports) {}

    public function index(Request $request)
    {
        $reports = $this->reports->list(
            $request->input('category'),
            $request->integer('municipality_id') ?: null,
            $request->float('latitude') ?: null,
            $request->float('longitude') ?: null,
        );

        return response()->json(['data' => $reports->take(25)->values(), 'total' => $reports->count()]);
    }

    public function show(string $report)
    {
        $report = $this->reports->find($report);
        abort_if($report === null, 404);
        return response()->json($report);
    }
    public function store(StoreReportRequest $request)
    {
        $report = $this->reports->create($request->validated(), $request->user()->id);
        return response()->json(['message' => 'Reporte recibido para revisión.', 'report' => $report], 201);
    }
    public function mine(Request $request) { return response()->json(['data' => []]); }
}
