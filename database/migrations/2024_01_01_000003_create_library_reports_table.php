<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('library_reports', function (Blueprint $table) {
            $table->id();
            $table->integer('month')->comment('Reporting month (1-12)');
            $table->integer('year')->comment('Reporting year');
            $table->integer('new_books')->default(0)->comment('Total new books added');
            $table->integer('books_borrowed')->default(0)->comment('Total books borrowed');
            $table->integer('new_members')->default(0)->comment('Total new members registered');
            $table->integer('total_visitors')->default(0)->comment('Total library visitors');
            $table->decimal('fine_collections', 10, 2)->default(0)->comment('Total fine collections in currency');
            $table->text('notes')->nullable()->comment('Additional notes and observations');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['year', 'month']);
            $table->index('year');
            $table->index('created_at');
            $table->unique(['year', 'month'], 'unique_month_year');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('library_reports');
    }
};