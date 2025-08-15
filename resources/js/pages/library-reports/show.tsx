import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Calendar, BookOpen, Users, DollarSign, FileText } from 'lucide-react';

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
    updated_at: string;
}

interface Props {
    report: LibraryReport;
    [key: string]: unknown;
}

export default function ShowLibraryReport({ report }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const totalActivity = report.new_books + report.books_borrowed + report.new_members + report.total_visitors;

    return (
        <AppShell>
            <Head title={`Library Report - ${report.period}`} />
            
            <div className="container mx-auto p-6 max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link href={route('library-reports.index')}>
                            <Button variant="ghost" className="mb-4">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Reports
                            </Button>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Calendar className="h-8 w-8 text-blue-600" />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {report.period} Report
                                </h1>
                                <p className="text-gray-600">
                                    Library activity and statistics overview
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <Link href={route('library-reports.edit', report.id)}>
                        <Button>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Report
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center">
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    New Books
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{report.new_books.toLocaleString()}</div>
                                <p className="text-xs text-blue-100">Added this month</p>
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
                                <div className="text-3xl font-bold">{report.books_borrowed.toLocaleString()}</div>
                                <p className="text-xs text-green-100">Circulation activity</p>
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
                                <div className="text-3xl font-bold">{report.new_members.toLocaleString()}</div>
                                <p className="text-xs text-purple-100">Member growth</p>
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
                                <div className="text-3xl font-bold">{report.total_visitors.toLocaleString()}</div>
                                <p className="text-xs text-orange-100">Foot traffic</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Detailed Information */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Financial Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <DollarSign className="mr-2 h-5 w-5 text-green-600" />
                                    Financial Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Fine Collections</p>
                                        <p className="text-2xl font-bold text-green-600">
                                            ${report.fine_collections.toLocaleString()}
                                        </p>
                                    </div>
                                    <DollarSign className="h-8 w-8 text-green-600" />
                                </div>
                                
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Collection period:</span>
                                        <span className="font-medium">{report.period}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Revenue source:</span>
                                        <span className="font-medium">Late return fees</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Activity Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <FileText className="mr-2 h-5 w-5 text-blue-600" />
                                    Activity Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">📚 Books Activity</span>
                                        <Badge variant="outline">
                                            {(report.new_books + report.books_borrowed).toLocaleString()} items
                                        </Badge>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">👥 People Activity</span>
                                        <Badge variant="outline">
                                            {(report.new_members + report.total_visitors).toLocaleString()} people
                                        </Badge>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">📈 Total Activity</span>
                                        <Badge className="bg-blue-600">
                                            {totalActivity.toLocaleString()} events
                                        </Badge>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <p className="text-xs text-gray-500">
                                        Activity includes all books, members, and visitor transactions
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Notes Section */}
                    {report.notes && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <FileText className="mr-2 h-5 w-5 text-gray-600" />
                                    📝 Additional Notes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none">
                                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                        {report.notes}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Report Metadata */}
                    <Card className="bg-gray-50">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Report Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-600">Report ID:</p>
                                    <p className="font-medium">#{report.id}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Reporting Period:</p>
                                    <p className="font-medium">{report.period}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Created:</p>
                                    <p className="font-medium">{formatDate(report.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Last Updated:</p>
                                    <p className="font-medium">{formatDate(report.updated_at)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}