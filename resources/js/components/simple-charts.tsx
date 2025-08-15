import React from 'react';

interface ChartDataPoint {
    month_name: string;
    new_books: number;
    books_borrowed: number;
    new_members: number;
    total_visitors: number;
    fine_collections: number;
}

interface SimpleLineChartProps {
    data: ChartDataPoint[];
    width?: string;
    height?: number;
}

export function SimpleLineChart({ data, width = "100%", height = 300 }: SimpleLineChartProps) {
    if (data.length === 0) return null;

    const maxBooks = Math.max(...data.map(d => Math.max(d.new_books, d.books_borrowed)));
    const maxMembers = Math.max(...data.map(d => d.new_members));
    const maxValue = Math.max(maxBooks, maxMembers);

    const padding = 40;
    const chartWidth = 600;
    const chartHeight = height - padding * 2;

    const xStep = chartWidth / (data.length - 1);
    const yScale = chartHeight / maxValue;

    const createPath = (values: number[]) => {
        return values
            .map((value, index) => {
                const x = padding + index * xStep;
                const y = padding + chartHeight - (value * yScale);
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ');
    };

    return (
        <div className="w-full" style={{ width, height }}>
            <svg viewBox={`0 0 ${chartWidth + padding * 2} ${height}`} className="w-full h-full">
                {/* Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                    const y = padding + chartHeight - (ratio * chartHeight);
                    return (
                        <line
                            key={ratio}
                            x1={padding}
                            y1={y}
                            x2={chartWidth + padding}
                            y2={y}
                            stroke="#e5e7eb"
                            strokeDasharray="2,2"
                        />
                    );
                })}

                {/* X-axis labels */}
                {data.map((point, index) => {
                    const x = padding + index * xStep;
                    return (
                        <text
                            key={index}
                            x={x}
                            y={height - 10}
                            textAnchor="middle"
                            fontSize="12"
                            fill="#6b7280"
                        >
                            {point.month_name.substring(0, 3)}
                        </text>
                    );
                })}

                {/* Lines */}
                <path
                    d={createPath(data.map(d => d.new_books))}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                />
                <path
                    d={createPath(data.map(d => d.new_members))}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                />
                <path
                    d={createPath(data.map(d => d.books_borrowed))}
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                />

                {/* Legend */}
                <g transform={`translate(${padding}, 20)`}>
                    <rect x="0" y="0" width="12" height="3" fill="#3b82f6" />
                    <text x="20" y="8" fontSize="12" fill="#374151">New Books</text>
                    
                    <rect x="100" y="0" width="12" height="3" fill="#10b981" />
                    <text x="120" y="8" fontSize="12" fill="#374151">New Members</text>
                    
                    <rect x="220" y="0" width="12" height="3" fill="#8b5cf6" />
                    <text x="240" y="8" fontSize="12" fill="#374151">Books Borrowed</text>
                </g>
            </svg>
        </div>
    );
}

interface SimpleBarChartProps {
    data: ChartDataPoint[];
    width?: string;
    height?: number;
}

export function SimpleBarChart({ data, width = "100%", height = 300 }: SimpleBarChartProps) {
    if (data.length === 0) return null;

    const maxVisitors = Math.max(...data.map(d => d.total_visitors));
    const maxCollections = Math.max(...data.map(d => d.fine_collections));
    
    const padding = 40;
    const chartWidth = 600;
    const chartHeight = height - padding * 2;

    const barWidth = chartWidth / (data.length * 2.5);
    const xStep = chartWidth / data.length;

    return (
        <div className="w-full" style={{ width, height }}>
            <svg viewBox={`0 0 ${chartWidth + padding * 2} ${height}`} className="w-full h-full">
                {/* Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                    const y = padding + chartHeight - (ratio * chartHeight);
                    return (
                        <line
                            key={ratio}
                            x1={padding}
                            y1={y}
                            x2={chartWidth + padding}
                            y2={y}
                            stroke="#e5e7eb"
                            strokeDasharray="2,2"
                        />
                    );
                })}

                {/* Bars */}
                {data.map((point, index) => {
                    const x = padding + index * xStep + xStep / 4;
                    const visitorsHeight = (point.total_visitors / maxVisitors) * chartHeight * 0.8;
                    const collectionsHeight = (point.fine_collections / maxCollections) * chartHeight * 0.8;
                    
                    return (
                        <g key={index}>
                            {/* Visitors bar */}
                            <rect
                                x={x}
                                y={padding + chartHeight - visitorsHeight}
                                width={barWidth}
                                height={visitorsHeight}
                                fill="#f59e0b"
                            />
                            {/* Collections bar */}
                            <rect
                                x={x + barWidth + 2}
                                y={padding + chartHeight - collectionsHeight}
                                width={barWidth}
                                height={collectionsHeight}
                                fill="#ef4444"
                            />
                        </g>
                    );
                })}

                {/* X-axis labels */}
                {data.map((point, index) => {
                    const x = padding + index * xStep + xStep / 2;
                    return (
                        <text
                            key={index}
                            x={x}
                            y={height - 10}
                            textAnchor="middle"
                            fontSize="12"
                            fill="#6b7280"
                        >
                            {point.month_name.substring(0, 3)}
                        </text>
                    );
                })}

                {/* Legend */}
                <g transform={`translate(${padding}, 20)`}>
                    <rect x="0" y="0" width="12" height="12" fill="#f59e0b" />
                    <text x="20" y="10" fontSize="12" fill="#374151">Visitors</text>
                    
                    <rect x="100" y="0" width="12" height="12" fill="#ef4444" />
                    <text x="120" y="10" fontSize="12" fill="#374151">Fine Collections ($)</text>
                </g>
            </svg>
        </div>
    );
}