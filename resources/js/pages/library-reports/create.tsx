import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Calendar } from 'lucide-react';
import { InputError } from '@/components/input-error';

interface LibraryReportFormData {
    month: string;
    year: string;
    new_books: string;
    books_borrowed: string;
    new_members: string;
    total_visitors: string;
    fine_collections: string;
    notes: string;
    [key: string]: string;
}

export default function CreateLibraryReport() {
    const { data, setData, post, processing, errors } = useForm<LibraryReportFormData>({
        month: '',
        year: new Date().getFullYear().toString(),
        new_books: '',
        books_borrowed: '',
        new_members: '',
        total_visitors: '',
        fine_collections: '',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('library-reports.store'));
    };

    const months = [
        { value: '1', label: 'January' },
        { value: '2', label: 'February' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    const years = Array.from({ length: 10 }, (_, i) => {
        const year = new Date().getFullYear() - 5 + i;
        return { value: year.toString(), label: year.toString() };
    });

    return (
        <AppShell>
            <Head title="Create Library Report" />
            
            <div className="container mx-auto p-6 max-w-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link href={route('library-reports.index')}>
                            <Button variant="ghost" className="mb-4">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Reports
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                            <Calendar className="mr-3 h-8 w-8 text-blue-600" />
                            Create New Report
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Add a new monthly library report with all the key metrics
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>📊 Monthly Report Details</CardTitle>
                        <CardDescription>
                            Enter the data for your monthly library report
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Period Selection */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="month">📅 Month</Label>
                                    <Select value={data.month} onValueChange={(value) => setData('month', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select month" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {months.map((month) => (
                                                <SelectItem key={month.value} value={month.value}>
                                                    {month.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.month} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="year">🗓️ Year</Label>
                                    <Select value={data.year} onValueChange={(value) => setData('year', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {years.map((year) => (
                                                <SelectItem key={year.value} value={year.value}>
                                                    {year.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.year} />
                                </div>
                            </div>

                            {/* Book Statistics */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                    📚 Book Statistics
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="new_books">New Books Added</Label>
                                        <Input
                                            id="new_books"
                                            type="number"
                                            min="0"
                                            value={data.new_books}
                                            onChange={(e) => setData('new_books', e.target.value)}
                                            placeholder="0"
                                        />
                                        <InputError message={errors.new_books} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="books_borrowed">Books Borrowed</Label>
                                        <Input
                                            id="books_borrowed"
                                            type="number"
                                            min="0"
                                            value={data.books_borrowed}
                                            onChange={(e) => setData('books_borrowed', e.target.value)}
                                            placeholder="0"
                                        />
                                        <InputError message={errors.books_borrowed} />
                                    </div>
                                </div>
                            </div>

                            {/* Member & Visitor Statistics */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                    👥 Members & Visitors
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="new_members">New Members</Label>
                                        <Input
                                            id="new_members"
                                            type="number"
                                            min="0"
                                            value={data.new_members}
                                            onChange={(e) => setData('new_members', e.target.value)}
                                            placeholder="0"
                                        />
                                        <InputError message={errors.new_members} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="total_visitors">Total Visitors</Label>
                                        <Input
                                            id="total_visitors"
                                            type="number"
                                            min="0"
                                            value={data.total_visitors}
                                            onChange={(e) => setData('total_visitors', e.target.value)}
                                            placeholder="0"
                                        />
                                        <InputError message={errors.total_visitors} />
                                    </div>
                                </div>
                            </div>

                            {/* Financial Data */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                    💰 Financial Data
                                </h3>
                                <div className="space-y-2">
                                    <Label htmlFor="fine_collections">Fine Collections ($)</Label>
                                    <Input
                                        id="fine_collections"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.fine_collections}
                                        onChange={(e) => setData('fine_collections', e.target.value)}
                                        placeholder="0.00"
                                    />
                                    <InputError message={errors.fine_collections} />
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="space-y-2">
                                <Label htmlFor="notes">📝 Notes (Optional)</Label>
                                <Textarea
                                    id="notes"
                                    rows={4}
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Any additional notes or observations for this month..."
                                />
                                <InputError message={errors.notes} />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end space-x-4 pt-6">
                                <Link href={route('library-reports.index')}>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Saving...' : 'Save Report'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}