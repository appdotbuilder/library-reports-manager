import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SimpleLineChart, SimpleBarChart } from '@/components/simple-charts';
import { 
    Plus, 
    TrendingUp, 
    BookOpen, 
    Users, 
    DollarSign, 
    Calendar,
    FileBarChart,
    Eye
} from 'lucide-react';

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
    recentReports: LibraryReport[];
    yearTotals: {
        new_books: number;
        books_borrowed: number;
        new_members: number;
        total_visitors: number;
        fine_collections: number;
        reports_count: number;
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
    currentYear: number;
    [key: string]: unknown;
}

export default function Dashboard({ 
    recentReports, 
    yearTotals, 
    chartData, 
    currentYear 
}: Props) {


    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="container mx-auto p-6 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                            📊 Library Dashboard
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Overview of your library's performance and recent activity
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <Link href={route('library-reports.index')}>
                            <Button variant="outline">
                                <FileBarChart className="mr-2 h-4 w-4" />
                                View All Reports
                            </Button>
                        </Link>
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
                                Books Added
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{yearTotals.new_books.toLocaleString()}</div>
                            <p className="text-xs text-blue-100">{currentYear} total</p>
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
                            <p className="text-xs text-green-100">Circulation</p>
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
                            <p className="text-xs text-purple-100">Growth</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                Visitors
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{yearTotals.total_visitors.toLocaleString()}</div>
                            <p className="text-xs text-orange-100">Foot traffic</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <DollarSign className="mr-2 h-4 w-4" />
                                Collections
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${yearTotals.fine_collections.toLocaleString()}</div>
                            <p className="text-xs text-red-100">Fine revenue</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                {chartData.length > 0 && (
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Trend Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <TrendingUp className="mr-2 h-5 w-5" />
                                    📈 Monthly Trends ({currentYear})
                                </CardTitle>
                                <CardDescription>
                                    Books and member activity over time
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SimpleLineChart data={chartData} />
                            </CardContent>
                        </Card>

                        {/* Activity Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Users className="mr-2 h-5 w-5" />
                                    👥 Visitor Activity ({currentYear})
                                </CardTitle>
                                <CardDescription>
                                    Monthly visitors and financial collections
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <SimpleBarChart data={chartData} />
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Recent Reports and Quick Stats */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Recent Reports */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="flex items-center">
                                    <Calendar className="mr-2 h-5 w-5" />
                                    📅 Recent Reports
                                </CardTitle>
                                <Link href={route('library-reports.index')}>
                                    <Button variant="ghost" size="sm">View All</Button>
                                </Link>
                            </div>
                            <CardDescription>
                                Latest monthly reports and their key metrics
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentReports.length === 0 ? (
                                <div className="text-center py-8">
                                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">No reports yet</h3>
                                    <p className="text-gray-500">Create your first monthly report to get started.</p>
                                    <Link href={route('library-reports.create')} className="mt-4 inline-block">
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create Report
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentReports.map((report) => (
                                        <div 
                                            key={report.id} 
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <Badge variant="outline">
                                                    {report.month_name}
                                                </Badge>
                                                <div>
                                                    <p className="font-medium">{report.period}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {report.new_books} new books • {report.new_members} new members
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm font-medium text-green-600">
                                                    ${report.fine_collections}
                                                </span>
                                                <Link href={route('library-reports.show', report.id)}>
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📊 Quick Stats</CardTitle>
                            <CardDescription>
                                Key metrics at a glance
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Reports Created</span>
                                    <Badge>{yearTotals.reports_count}</Badge>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Average Books/Month</span>
                                    <Badge variant="outline">
                                        {yearTotals.reports_count > 0 
                                            ? Math.round(yearTotals.new_books / yearTotals.reports_count) 
                                            : 0}
                                    </Badge>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Average Members/Month</span>
                                    <Badge variant="outline">
                                        {yearTotals.reports_count > 0 
                                            ? Math.round(yearTotals.new_members / yearTotals.reports_count) 
                                            : 0}
                                    </Badge>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Average Revenue/Month</span>
                                    <Badge variant="outline">
                                        ${yearTotals.reports_count > 0 
                                            ? Math.round(yearTotals.fine_collections / yearTotals.reports_count) 
                                            : 0}
                                    </Badge>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-600">
                                        {((yearTotals.new_books + yearTotals.books_borrowed + yearTotals.new_members + yearTotals.total_visitors)).toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-500">Total Activity This Year</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}