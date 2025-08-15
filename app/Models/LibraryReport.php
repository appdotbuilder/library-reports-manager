<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\LibraryReport
 *
 * @property int $id
 * @property int $month
 * @property int $year
 * @property int $new_books
 * @property int $books_borrowed
 * @property int $new_members
 * @property int $total_visitors
 * @property float $fine_collections
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read string $month_name
 * @property-read string $period
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|LibraryReport newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LibraryReport newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LibraryReport query()
 * @method static \Illuminate\Database\Eloquent\Builder|LibraryReport whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LibraryReport whereMonth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LibraryReport whereYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LibraryReport whereNewBooks($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LibraryReport whereBBooksBorrowed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LibraryReport whereNewMembers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LibraryReport whereTotalVisitors($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LibraryReport whereFineCollections($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LibraryReport whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LibraryReport whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LibraryReport whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LibraryReport forYear($year)
 * @method static \Illuminate\Database\Eloquent\Builder|LibraryReport latest()
 * @method static \Database\Factories\LibraryReportFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class LibraryReport extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'month',
        'year',
        'new_books',
        'books_borrowed',
        'new_members',
        'total_visitors',
        'fine_collections',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'month' => 'integer',
        'year' => 'integer',
        'new_books' => 'integer',
        'books_borrowed' => 'integer',
        'new_members' => 'integer',
        'total_visitors' => 'integer',
        'fine_collections' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the month name attribute.
     *
     * @return string
     */
    public function getMonthNameAttribute(): string
    {
        $months = [
            1 => 'January', 2 => 'February', 3 => 'March', 4 => 'April',
            5 => 'May', 6 => 'June', 7 => 'July', 8 => 'August',
            9 => 'September', 10 => 'October', 11 => 'November', 12 => 'December'
        ];

        return $months[$this->month] ?? 'Unknown';
    }

    /**
     * Get the period attribute (Month Year).
     *
     * @return string
     */
    public function getPeriodAttribute(): string
    {
        return $this->month_name . ' ' . $this->year;
    }

    /**
     * Scope a query to filter by year.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $year
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForYear($query, $year)
    {
        return $query->where('year', $year);
    }
}