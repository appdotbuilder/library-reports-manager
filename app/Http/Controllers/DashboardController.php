<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\LibraryReport;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the main dashboard with library reports.
     */
    public function index()
    {
        $currentYear = now()->year;
        
        // Get recent reports
        $recentReports = LibraryReport::latest()
            ->take(6)
            ->get();
            
        // Get current year data
        $yearReports = LibraryReport::forYear($currentYear)
            ->orderBy('month')
            ->get();

        // Calculate current year totals
        $yearTotals = [
            'new_books' => $yearReports->sum('new_books'),
            'books_borrowed' => $yearReports->sum('books_borrowed'),
            'new_members' => $yearReports->sum('new_members'),
            'total_visitors' => $yearReports->sum('total_visitors'),
            'fine_collections' => $yearReports->sum('fine_collections'),
            'reports_count' => $yearReports->count(),
        ];

        // Prepare chart data for trends
        $chartData = $yearReports->map(function ($report) {
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

        return Inertia::render('dashboard', [
            'recentReports' => $recentReports,
            'yearTotals' => $yearTotals,
            'chartData' => $chartData,
            'currentYear' => $currentYear,
        ]);
    }
}