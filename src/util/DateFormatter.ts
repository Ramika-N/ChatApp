export function formatChatTime(timestamp: string): string {

    const date = new Date(timestamp);
    const now = new Date();

    const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();

    const timeStr = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    if (isToday) return timeStr;                    // 11:00 AM
    if (isYesterday) return `Yesterday ${timeStr}`; // Yesterday 11:00 AM
    return `${date.toLocaleDateString} ${timeStr}`; // 2025-09-25 11:00 AM

}