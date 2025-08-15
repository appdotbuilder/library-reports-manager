import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    BookOpen, 
    Users, 
    TrendingUp, 
    Calendar, 
    FileBarChart, 
    PieChart,
    BarChart3,
    DollarSign
} from 'lucide-react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="container mx-auto px-4 py-6">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-900">LibraryReports</h1>
                    </div>
                    <div className="flex space-x-4">
                        <Link href="/login">
                            <Button variant="ghost">Login</Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
                            📊 Smart Library Management
                        </Badge>
                        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            📚 Monthly Library Reports
                            <span className="block text-blue-600">Made Simple</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Transform your library data into actionable insights. Track books, members, 
                            visitors, and finances with beautiful charts and comprehensive reporting.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                                🚀 Start Managing Reports
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                                📊 View Demo
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        📈 Everything You Need to Track
                    </h2>
                    <p className="text-lg text-gray-600">
                        Comprehensive monthly reporting with visual analytics
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <CardTitle>📚 Book Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">Track new books added and books borrowed monthly</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                            <CardTitle>👥 Member Growth</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">Monitor new member registrations and visitor trends</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <DollarSign className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                            <CardTitle>💰 Financial Tracking</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">Keep tabs on fine collections and revenue streams</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                            <CardTitle>📊 Data Visualization</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">Beautiful charts showing monthly trends and patterns</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Dashboard Preview */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        🎯 Powerful Dashboard Analytics
                    </h2>
                    <p className="text-lg text-gray-600">
                        Get instant insights with interactive charts and comprehensive summaries
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Stats Cards Preview */}
                    <div className="space-y-4">
                        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">📚 Books Added This Year</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">324</div>
                                <p className="text-xs text-blue-100">+12% from last year</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">👥 New Members</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">156</div>
                                <p className="text-xs text-green-100">Growing steadily</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">💰 Fine Collections</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$2,450</div>
                                <p className="text-xs text-purple-100">Monthly average</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Chart Preview */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <TrendingUp className="mr-2 h-5 w-5" />
                                    Monthly Trends
                                </CardTitle>
                                <CardDescription>
                                    Visual representation of your library's performance
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                                    <div className="text-center space-y-4">
                                        <BarChart3 className="h-16 w-16 text-gray-400 mx-auto" />
                                        <div>
                                            <p className="text-gray-600 font-medium">Interactive Charts</p>
                                            <p className="text-sm text-gray-500">Track books, members, visitors & more</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Feature Benefits */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            🎯 Why Choose LibraryReports?
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <Calendar className="h-6 w-6 text-blue-600 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Monthly Organization</h3>
                                    <p className="text-gray-600">Easy monthly report creation with all essential metrics</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <PieChart className="h-6 w-6 text-green-600 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Visual Analytics</h3>
                                    <p className="text-gray-600">Beautiful charts that make data interpretation effortless</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <FileBarChart className="h-6 w-6 text-purple-600 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Comprehensive Reporting</h3>
                                    <p className="text-gray-600">Track books, members, visitors, and financial data in one place</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-4">
                                <TrendingUp className="h-6 w-6 text-orange-600 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Trend Analysis</h3>
                                    <p className="text-gray-600">Identify patterns and make data-driven decisions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                        <div className="text-center space-y-6">
                            <div className="text-6xl">📊</div>
                            <h3 className="text-2xl font-bold text-gray-900">Ready to Get Started?</h3>
                            <p className="text-gray-600">
                                Join libraries worldwide using our reporting system to track their progress and make informed decisions.
                            </p>
                            <Link href="/register">
                                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                    🚀 Create Your First Report
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <BookOpen className="h-8 w-8 text-blue-400" />
                        <h2 className="text-2xl font-bold">LibraryReports</h2>
                    </div>
                    <p className="text-gray-400">
                        📊 Making library management simple, visual, and effective
                    </p>
                </div>
            </footer>
        </div>
    );
}