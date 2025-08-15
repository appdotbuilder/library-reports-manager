<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLibraryReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'month' => 'required|integer|between:1,12',
            'year' => 'required|integer|between:2000,2100',
            'new_books' => 'required|integer|min:0',
            'books_borrowed' => 'required|integer|min:0',
            'new_members' => 'required|integer|min:0',
            'total_visitors' => 'required|integer|min:0',
            'fine_collections' => 'required|numeric|min:0',
            'notes' => 'nullable|string|max:1000',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'month.required' => 'Please select a reporting month.',
            'month.between' => 'Month must be between 1 and 12.',
            'year.required' => 'Please enter a reporting year.',
            'year.between' => 'Year must be between 2000 and 2100.',
            'new_books.required' => 'Please enter the number of new books.',
            'new_books.min' => 'New books cannot be negative.',
            'books_borrowed.required' => 'Please enter the number of books borrowed.',
            'books_borrowed.min' => 'Books borrowed cannot be negative.',
            'new_members.required' => 'Please enter the number of new members.',
            'new_members.min' => 'New members cannot be negative.',
            'total_visitors.required' => 'Please enter the total number of visitors.',
            'total_visitors.min' => 'Total visitors cannot be negative.',
            'fine_collections.required' => 'Please enter the fine collections amount.',
            'fine_collections.min' => 'Fine collections cannot be negative.',
            'notes.max' => 'Notes cannot exceed 1000 characters.',
        ];
    }
}