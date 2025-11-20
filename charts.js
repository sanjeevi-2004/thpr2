// This script runs after the page is loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- Global Chart.js Styling ---
    // Set default colors to match the premium theme
    Chart.defaults.color = '#e0e0e0'; // var(--color-text)
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)'; // Lighter border for grids

    // Define our primary gold color from the CSS
    const primaryColor = '#8b5cf6';
    const primaryColorTransparent = '#ea0dd499';

    // --- 1. Sales Statistics (Bar Chart) ---
    const salesBarChartCtx = document.getElementById('salesBarChart');
    if (salesBarChartCtx) {
        new Chart(salesBarChartCtx, {
            type: 'bar',
            data: {
                labels: ['May', 'June', 'July', 'August', 'September', 'October'],
                datasets: [{
                    label: 'Monthly Sales (₹)',
                    data: [65000, 71000, 81000, 92000, 87000, 95000],
                    backgroundColor: primaryColorTransparent,
                    borderColor: primaryColor,
                    borderWidth: 2,
                    borderRadius: 4,
                }]
            },
            options: {
                responsive: true,
                /* maintainAspectRatio: false, (REMOVED FOR RESPONSIVENESS) */
                plugins: {
                    legend: {
                        display: false // Hide the legend as in the video
                    },
                    tooltip: {
                        backgroundColor: '#0a0a0a',
                        titleColor: primaryColor,
                        bodyColor: '#e0e0e0',
                        borderColor: primaryColor,
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            // Format as currency
                            callback: function(value) {
                                return '₹' + value / 1000 + 'k';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // --- 2. Sales by Category (Donut Chart) ---
    const categoryDonutChartCtx = document.getElementById('categoryDonutChart');
    if (categoryDonutChartCtx) {
        new Chart(categoryDonutChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['Laptops', 'Printers', 'Headphones', 'Computers', 'Accessories'],
                datasets: [{
                    label: 'Sales',
                    data: [35, 15, 20, 10, 20],
                    // A palette that matches the premium theme
                    backgroundColor: [
                        primaryColor,          // Gold
                        '#FFFFFF',             // White
                        '#9e9e9e',             // Gray
                        '#b38b2f',             // Darker Gold
                        primaryColorTransparent // Transparent Gold
                    ],
                    borderColor: '#1a1a1a', // var(--color-surface)
                    borderWidth: 4,
                }]
            },
            options: {
                responsive: true,
                /* maintainAspectRatio: false, (REMOVED FOR RESPONSIVENESS) */
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: '#0a0a0a',
                        titleColor: primaryColor,
                        bodyColor: '#e0e0e0',
                        borderColor: primaryColor,
                        borderWidth: 1
                    }
                }
            }
        });
    }

    // --- 3. Revenue by Region (Horizontal Bar Chart) ---
    const regionBarChartCtx = document.getElementById('regionBarChart');
    if (regionBarChartCtx) {
        new Chart(regionBarChartCtx, {
            type: 'bar',
            data: {
                labels: ['Chennai', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad'],
                datasets: [{
                    label: 'Revenue (₹ Lakhs)',
                    data: [11, 8.5, 10, 9.5, 7],
                    // Use the same palette
                    backgroundColor: [
                        primaryColor,
                        '#FFFFFF',
                        '#9e9e9e',
                        '#b38b2f',
                        primaryColorTransparent
                    ],
                    borderWidth: 0,
                    borderRadius: 4,
                }]
            },
            options: {
                indexAxis: 'y', // This makes the bar chart horizontal
                responsive: true,
                /* maintainAspectRatio: false, (REMOVED FOR RESPONSIVENESS) */
                plugins: {
                    legend: {
                        display: false // Hide legend
                    },
                    tooltip: {
                        backgroundColor: '#0a0a0a',
                        titleColor: primaryColor,
                        bodyColor: '#e0e0e0',
                        borderColor: primaryColor,
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + 'L';
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

});