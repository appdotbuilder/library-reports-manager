<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLibraryReportRequest;
use App\Http\Requests\UpdateLibraryReportRequest;
use App\Models\LibraryReport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LibraryReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $year = $request->get('year', now()->year);
        
        $reports = LibraryReport::forYear($year)
            ->orderBy('month')
            ->get();
            
        $availableYears = LibraryReport::distinct()
            ->orderBy('year', 'desc')
            ->pluck('year');

        // Calculate totals for the year
        $yearTotals = [
            'new_books' => $reports->sum('new_books'),
            'books_borrowed' => $reports->sum('books_borrowed'),
            'new_members' => $reports->sum('new_members'),
            'total_visitors' => $reports->sum('total_visitors'),
            'fine_collections' => $reports->sum('fine_collections'),
        ];

        // Prepare chart data
        $chartData = $reports->map(function ($report) {
            return [
                'month' => $report->month,
                'month_name' => $report->month_name,
                'new_books' => $report->new_books,
                'books_borrowed' => $report->books_borrowed,
                'new_members' => $report->new_members,
                'total_visitors' => $report->total_visitors,
                'fine_collections' => (float) $report->fine_collections,
            ];
        });

        return Inertia::render('library-reports/index', [
            'reports' => $reports,
            'availableYears' => $availableYears,
            'selectedYear' => $year,
            'yearTotals' => $yearTotals,
            'chartData' => $chartData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('library-reports/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLibraryReportRequest $request)
    {
        $report = LibraryReport::create($request->validated());

        return redirect()->route('library-reports.show', $report)
            ->with('success', 'Library report created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(LibraryReport $libraryReport)
    {
        return Inertia::render('library-reports/show', [
            'report' => $libraryReport
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LibraryReport $libraryReport)
    {
        return Inertia::render('library-reports/edit', [
            'report' => $libraryReport
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLibraryReportRequest $request, LibraryReport $libraryReport)
    {
        $libraryReport->update($request->validated());

        return redirect()->route('library-reports.show', $libraryReport)
            ->with('success', 'Library report updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LibraryReport $libraryReport)
    {
        $libraryReport->delete();

        return redirect()->route('library-reports.index')
            ->with('success', 'Library report deleted successfully.');
    }
}