<?php

namespace Database\Factories;

use App\Models\LibraryReport;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LibraryReport>
 */
class LibraryReportFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\LibraryReport>
     */
    protected $model = LibraryReport::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'month' => $this->faker->numberBetween(1, 12),
            'year' => $this->faker->numberBetween(2020, 2024),
            'new_books' => $this->faker->numberBetween(5, 50),
            'books_borrowed' => $this->faker->numberBetween(100, 500),
            'new_members' => $this->faker->numberBetween(5, 25),
            'total_visitors' => $this->faker->numberBetween(200, 1000),
            'fine_collections' => $this->faker->randomFloat(2, 50, 500),
            'notes' => $this->faker->optional(0.7)->paragraph(),
        ];
    }
}