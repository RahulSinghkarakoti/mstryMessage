
export function formatDateDifference(dateString: Date): string {
    const now: Date = new Date();
    const date: Date = new Date(dateString);
    const diff: number = now.getTime() - date.getTime(); // Difference in milliseconds
  
    const seconds: number = Math.round(diff / 1000);
    const minutes: number = Math.round(seconds / 60);
    const hours: number = Math.round(minutes / 60);
    const days: number = Math.round(hours / 24);
  
    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  }
  
 