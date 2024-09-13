import { uptime } from "process";
import os from "os"; // Import os module

// Utility function to get vital data
export default function vitals() {
  const uptimeSeconds = uptime();
  const uptimeString = formatUptime(uptimeSeconds);

  // Memory usage in MB
  const memoryUsage =  process.memoryUsage().heapTotal / 1024 / 1024;

  // CPU usage percentages
  const cpuUsage = process.cpuUsage();

  // Additional information (optional)
  const platform = os.platform(); // Operating system platform (e.g., 'linux', 'darwin', 'win32')
  const freeMemory = os.freemem() / 1024 / 1024; // Free memory in MB
  const loadAverage = os.loadavg(); // Load average (array of 1, 5, and 15 minute averages)

  return {
    uptime: uptimeString,
    memoryUsage,
    cpuUsage,
    platform, // Optional
    freeMemory, // Optional
    loadAverage: loadAverage ? loadAverage.map(avg => Math.round(avg * 100) / 100) : null, // Optional (round to two decimals)
  };
}

// Helper function to format uptime (optional)
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  parts.push(`${remainingSeconds}s`);

  return parts.join(" ");
}
