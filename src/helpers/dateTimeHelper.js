export function formatDate(timestamp, locale = 'en-US') {
    // Check for valid timestamp
    if (!timestamp) return 'Invalid Date';

    const d = new Date(timestamp);
    
    // Handle invalid dates
    if (isNaN(d.getTime())) return 'Invalid Date';

    const time = d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    const date = d.toLocaleDateString(locale);

    return `${time} | ${date}`;
}
