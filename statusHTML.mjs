export const statusHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OneServer Status</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
    <style>
        .pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: .5;
            }
        }
    </style>
</head>
<body class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div class="flex items-center justify-between">
                    <h1 class="text-3xl font-bold text-gray-800">OneServer Status</h1>
                    <div class="flex items-center">
                        <div class="h-3 w-3 bg-green-500 rounded-full pulse mr-2"></div>
                        <span class="text-green-500 font-semibold">System Operational</span>
                    </div>
                </div>
            </div>

            <!-- System Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">System Information</h2>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Environment</span>
                            <span class="font-medium" id="environment">Production</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Version</span>
                            <span class="font-medium" id="version">1.0.0</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Node.js Version</span>
                            <span class="font-medium" id="nodeVersion">v18.x</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Uptime</span>
                            <span class="font-medium" id="uptime">0d 0h 0m</span>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">API Status</h2>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Authentication API</span>
                            <span class="px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Operational
                            </span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">User API</span>
                            <span class="px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Operational
                            </span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Social API</span>
                            <span class="px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Operational
                            </span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Database</span>
                            <span class="px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Connected
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Documentation Link -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-semibold text-gray-800">API Documentation</h2>
                        <p class="text-gray-600 mt-1">Access the complete API documentation</p>
                    </div>
                    <a href="/api-docs" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        View Docs
                    </a>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Update uptime
        function updateUptime() {
            const uptimeElement = document.getElementById('uptime');
            let seconds = 0;

            setInterval(() => {
                seconds++;
                const days = Math.floor(seconds / (24 * 3600));
                const hours = Math.floor((seconds % (24 * 3600)) / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                uptimeElement.textContent = ${days}d ${hours}h ${minutes}m;
            }, 60000); // Update every minute
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            updateUptime();
        });
    </script>
</body>
</html>`;