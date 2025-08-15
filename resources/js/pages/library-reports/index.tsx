import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SimpleLineChart, SimpleBarChart } from '@/components/simple-charts';
import { Plus, Eye, Edit, Trash2, TrendingUp, BookOpen, Users, DollarSign, Calendar, BarChart3 } from 'lucide-react';

interface LibraryReport {
    id: number;
    month: number;
    year: number;
    month_name: string;
    period: string;
    new_books: number;
    books_borrowed: number;
    new_members: number;
    total_visitors: number;
    fine_collections: number;
    notes?: string;
    created_at: string;
}

interface Props {
    reports: LibraryReport[];
    availableYears: number[];
    selectedYear: number;
    yearTotals: {
        new_books: number;
        books_borrowed: number;
        new_members: number;
        total_visitors: number;
        fine_collections: number;
    };
    chartData: Array<{
        month: number;
        month_name: string;
        new_books: number;
        books_borrowed: number;
        new_members: number;
        total_visitors: number;
        fine_collections: number;
    }>;
    [key: string]: unknown;
}

export default function LibraryReportsIndex({ 
    reports, 
    availableYears, 
    selectedYear, 
    yearTotals, 
    chartData 
}: Props) {


    const handleYearChange = (year: string) => {
        router.get(route('library-reports.index'), { year });
    };

    const handleDelete = (report: LibraryReport) => {
        if (confirm(`Are you sure you want to delete the report for ${report.period}?`)) {
            router.delete(route('library-reports.destroy', report.id));
        }
    };

    return (
        <AppShell>
            <Head title="Library Reports" />
            
            <div className="container mx-auto p-6 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                            📚 Library Reports
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manage and analyze your monthly library data
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <Select value={selectedYear.toString()} onValueChange={handleYearChange}>
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableYears.map((year) => (
                                    <SelectItem key={year} value={year.toString()}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        
                        <Link href={route('library-reports.create')}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="mr-2 h-4 w-4" />
                                New Report
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Year Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <BookOpen className="mr-2 h-4 w-4" />
                                New Books
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{yearTotals.new_books.toLocaleString()}</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <BookOpen className="mr-2 h-4 w-4" />
                                Books Borrowed
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{yearTotals.books_borrowed.toLocaleString()}</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                New Members
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{yearTotals.new_members.toLocaleString()}</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                Total Visitors
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{yearTotals.total_visitors.toLocaleString()}</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <DollarSign className="mr-2 h-4 w-4" />
                                Fine Collections
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${yearTotals.fine_collections.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                {chartData.length > 0 && (
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Line Chart - Trends */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <TrendingUp className="mr-2 h-5 w-5" />
                                    Monthly Trends
                                </CardTitle>
                                <CardDescription>Books and member activity over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SimpleLineChart data={chartData} />
                            </CardContent>
                        </Card>

                        {/* Bar Chart - Visitors & Collections */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <BarChart3 className="mr-2 h-5 w-5" />
                                    Visitors & Collections
                                </CardTitle>
                                <CardDescription>Monthly visitors and fine collections</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SimpleBarChart data={chartData} />
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Reports List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Calendar className="mr-2 h-5 w-5" />
                            {selectedYear} Reports
                        </CardTitle>
                        <CardDescription>
                            {reports.length} report{reports.length !== 1 ? 's' : ''} for {selectedYear}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {reports.length === 0 ? (
                            <div className="text-center py-12">
                                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No reports yet</h3>
                                <p className="text-gray-500">Get started by creating your first monthly report.</p>
                                <Link href={route('library-reports.create')} className="mt-4 inline-block">
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create Report
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-4 font-medium">Period</th>
                                            <th className="text-right p-4 font-medium">New Books</th>
                                            <th className="text-right p-4 font-medium">Borrowed</th>
                                            <th className="text-right p-4 font-medium">New Members</th>
                                            <th className="text-right p-4 font-medium">Visitors</th>
                                            <th className="text-right p-4 font-medium">Fine Collections</th>
                                            <th className="text-right p-4 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reports.map((report) => (
                                            <tr key={report.id} className="border-b hover:bg-gray-50">
                                                <td className="p-4">
                                                    <div className="flex items-center">
                                                        <Badge variant="outline" className="mr-2">
                                                            {report.month_name}
                                                        </Badge>
                                                        <span className="font-medium">{report.year}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-right">{report.new_books.toLocaleString()}</td>
                                                <td className="p-4 text-right">{report.books_borrowed.toLocaleString()}</td>
                                                <td className="p-4 text-right">{report.new_members.toLocaleString()}</td>
                                                <td className="p-4 text-right">{report.total_visitors.toLocaleString()}</td>
                                                <td className="p-4 text-right">${report.fine_collections.toLocaleString()}</td>
                                                <td className="p-4">
                                                    <div className="flex justify-end space-x-2">
                                                        <Link href={route('library-reports.show', report.id)}>
                                                            <Button variant="ghost" size="sm">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={route('library-reports.edit', report.id)}>
                                                            <Button variant="ghost" size="sm">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            onClick={() => handleDelete(report)}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}