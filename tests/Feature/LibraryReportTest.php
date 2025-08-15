<?php

namespace Tests\Feature;

use App\Models\LibraryReport;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class LibraryReportTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create();
    }

    public function test_can_view_library_reports_index(): void
    {
        // Create reports with unique month/year combinations
        LibraryReport::factory()->create(['month' => 1, 'year' => now()->year]);
        LibraryReport::factory()->create(['month' => 2, 'year' => now()->year]);
        LibraryReport::factory()->create(['month' => 3, 'year' => now()->year]);

        $response = $this->actingAs($this->user)
            ->get(route('library-reports.index'));

        $response->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('library-reports/index')
                ->has('reports', 3)
                ->has('yearTotals')
                ->has('chartData')
            );
    }

    public function test_can_create_library_report(): void
    {
        $reportData = [
            'month' => 3,
            'year' => 2024,
            'new_books' => 25,
            'books_borrowed' => 150,
            'new_members' => 10,
            'total_visitors' => 500,
            'fine_collections' => 125.50,
            'notes' => 'Great month for library activities'
        ];

        $response = $this->actingAs($this->user)
            ->post(route('library-reports.store'), $reportData);

        $response->assertRedirect();

        $this->assertDatabaseHas('library_reports', [
            'month' => 3,
            'year' => 2024,
            'new_books' => 25,
            'books_borrowed' => 150,
            'new_members' => 10,
            'total_visitors' => 500,
            'fine_collections' => 125.50
        ]);
    }

    public function test_can_view_library_report(): void
    {
        $report = LibraryReport::factory()->create();

        $response = $this->actingAs($this->user)
            ->get(route('library-reports.show', $report));

        $response->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('library-reports/show')
                ->where('report.id', $report->id)
            );
    }

    public function test_can_edit_library_report(): void
    {
        $report = LibraryReport::factory()->create();
        
        $updateData = [
            'month' => $report->month,
            'year' => $report->year,
            'new_books' => 50,
            'books_borrowed' => 200,
            'new_members' => 15,
            'total_visitors' => 600,
            'fine_collections' => 175.25,
            'notes' => 'Updated report notes'
        ];

        $response = $this->actingAs($this->user)
            ->patch(route('library-reports.update', $report), $updateData);

        $response->assertRedirect();

        $this->assertDatabaseHas('library_reports', [
            'id' => $report->id,
            'new_books' => 50,
            'books_borrowed' => 200,
            'notes' => 'Updated report notes'
        ]);
    }

    public function test_can_delete_library_report(): void
    {
        $report = LibraryReport::factory()->create();

        $response = $this->actingAs($this->user)
            ->delete(route('library-reports.destroy', $report));

        $response->assertRedirect();

        $this->assertDatabaseMissing('library_reports', [
            'id' => $report->id
        ]);
    }

    public function test_validates_required_fields(): void
    {
        $response = $this->actingAs($this->user)
            ->post(route('library-reports.store'), []);

        $response->assertSessionHasErrors([
            'month',
            'year',
            'new_books',
            'books_borrowed',
            'new_members',
            'total_visitors',
            'fine_collections'
        ]);
    }

    public function test_validates_numeric_fields(): void
    {
        $invalidData = [
            'month' => 'invalid',
            'year' => 'invalid',
            'new_books' => 'invalid',
            'books_borrowed' => 'invalid',
            'new_members' => 'invalid',
            'total_visitors' => 'invalid',
            'fine_collections' => 'invalid'
        ];

        $response = $this->actingAs($this->user)
            ->post(route('library-reports.store'), $invalidData);

        $response->assertSessionHasErrors([
            'month',
            'year',
            'new_books',
            'books_borrowed',
            'new_members',
            'total_visitors',
            'fine_collections'
        ]);
    }

    public function test_dashboard_shows_library_data(): void
    {
        // Create reports with unique month/year combinations
        LibraryReport::factory()->create(['month' => 1, 'year' => now()->year]);
        LibraryReport::factory()->create(['month' => 2, 'year' => now()->year]);
        LibraryReport::factory()->create(['month' => 3, 'year' => now()->year]);
        LibraryReport::factory()->create(['month' => 4, 'year' => now()->year]);
        LibraryReport::factory()->create(['month' => 5, 'year' => now()->year]);

        $response = $this->actingAs($this->user)
            ->get(route('dashboard'));

        $response->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('dashboard')
                ->has('recentReports')
                ->has('yearTotals')
                ->has('chartData')
            );
    }

    public function test_model_accessors_work_correctly(): void
    {
        $report = LibraryReport::factory()->create([
            'month' => 3,
            'year' => 2024
        ]);

        $this->assertEquals('March', $report->month_name);
        $this->assertEquals('March 2024', $report->period);
    }
}