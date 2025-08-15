<?php

namespace Database\Seeders;

use App\Models\LibraryReport;
use Illuminate\Database\Seeder;

class LibraryReportSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $currentYear = now()->year;
        $lastYear = $currentYear - 1;
        
        // Create reports for the current year (partial data)
        $currentYearReports = [
            [
                'month' => 1, 'year' => $currentYear,
                'new_books' => 25, 'books_borrowed' => 342, 'new_members' => 18, 
                'total_visitors' => 1250, 'fine_collections' => 185.50,
                'notes' => 'Strong start to the year with good member acquisition.'
            ],
            [
                'month' => 2, 'year' => $currentYear,
                'new_books' => 32, 'books_borrowed' => 289, 'new_members' => 14, 
                'total_visitors' => 1180, 'fine_collections' => 210.75,
                'notes' => 'Valentine\'s Day romance book display was very popular.'
            ],
            [
                'month' => 3, 'year' => $currentYear,
                'new_books' => 28, 'books_borrowed' => 398, 'new_members' => 22, 
                'total_visitors' => 1420, 'fine_collections' => 156.25,
                'notes' => 'Spring reading program launched with great success.'
            ],
            [
                'month' => 4, 'year' => $currentYear,
                'new_books' => 35, 'books_borrowed' => 445, 'new_members' => 19, 
                'total_visitors' => 1380, 'fine_collections' => 198.00,
                'notes' => 'Poetry month events drew larger crowds than expected.'
            ],
            [
                'month' => 5, 'year' => $currentYear,
                'new_books' => 41, 'books_borrowed' => 512, 'new_members' => 26, 
                'total_visitors' => 1650, 'fine_collections' => 243.50,
                'notes' => 'Mother\'s Day cookbook section expansion was well received.'
            ],
            [
                'month' => 6, 'year' => $currentYear,
                'new_books' => 38, 'books_borrowed' => 478, 'new_members' => 31, 
                'total_visitors' => 1580, 'fine_collections' => 189.75,
                'notes' => 'Summer reading program registration opened with high enthusiasm.'
            ],
        ];

        // Create reports for last year (complete data)
        $lastYearReports = [
            [
                'month' => 1, 'year' => $lastYear,
                'new_books' => 22, 'books_borrowed' => 315, 'new_members' => 16, 
                'total_visitors' => 1150, 'fine_collections' => 165.25,
                'notes' => 'New Year resolution readers brought good traffic.'
            ],
            [
                'month' => 2, 'year' => $lastYear,
                'new_books' => 18, 'books_borrowed' => 278, 'new_members' => 12, 
                'total_visitors' => 1050, 'fine_collections' => 142.50,
                'notes' => 'Shorter month showed in visitor numbers.'
            ],
            [
                'month' => 3, 'year' => $lastYear,
                'new_books' => 29, 'books_borrowed' => 356, 'new_members' => 20, 
                'total_visitors' => 1280, 'fine_collections' => 176.75,
                'notes' => 'Spring break increased student visits significantly.'
            ],
            [
                'month' => 4, 'year' => $lastYear,
                'new_books' => 31, 'books_borrowed' => 402, 'new_members' => 18, 
                'total_visitors' => 1320, 'fine_collections' => 193.25,
                'notes' => 'Earth Day environmental book display was popular.'
            ],
            [
                'month' => 5, 'year' => $lastYear,
                'new_books' => 27, 'books_borrowed' => 389, 'new_members' => 15, 
                'total_visitors' => 1290, 'fine_collections' => 158.50,
                'notes' => 'Graduation season brought many returning alumni.'
            ],
            [
                'month' => 6, 'year' => $lastYear,
                'new_books' => 33, 'books_borrowed' => 445, 'new_members' => 25, 
                'total_visitors' => 1450, 'fine_collections' => 201.75,
                'notes' => 'Summer reading program kickoff was very successful.'
            ],
            [
                'month' => 7, 'year' => $lastYear,
                'new_books' => 24, 'books_borrowed' => 378, 'new_members' => 14, 
                'total_visitors' => 1180, 'fine_collections' => 145.25,
                'notes' => 'Summer vacation period with reduced regular visitors.'
            ],
            [
                'month' => 8, 'year' => $lastYear,
                'new_books' => 26, 'books_borrowed' => 298, 'new_members' => 11, 
                'total_visitors' => 980, 'fine_collections' => 128.50,
                'notes' => 'Quietest month due to summer activities and travel.'
            ],
            [
                'month' => 9, 'year' => $lastYear,
                'new_books' => 39, 'books_borrowed' => 534, 'new_members' => 28, 
                'total_visitors' => 1620, 'fine_collections' => 267.25,
                'notes' => 'Back-to-school season brought surge in all activities.'
            ],
            [
                'month' => 10, 'year' => $lastYear,
                'new_books' => 35, 'books_borrowed' => 467, 'new_members' => 22, 
                'total_visitors' => 1480, 'fine_collections' => 234.50,
                'notes' => 'Halloween story time events were very popular with families.'
            ],
            [
                'month' => 11, 'year' => $lastYear,
                'new_books' => 42, 'books_borrowed' => 512, 'new_members' => 19, 
                'total_visitors' => 1390, 'fine_collections' => 198.75,
                'notes' => 'Thanksgiving cooking books and holiday crafts in high demand.'
            ],
            [
                'month' => 12, 'year' => $lastYear,
                'new_books' => 28, 'books_borrowed' => 423, 'new_members' => 16, 
                'total_visitors' => 1250, 'fine_collections' => 175.25,
                'notes' => 'Holiday season with gift book recommendations and year-end events.'
            ],
        ];

        // Insert all reports
        foreach (array_merge($currentYearReports, $lastYearReports) as $reportData) {
            LibraryReport::create($reportData);
        }
    }
}