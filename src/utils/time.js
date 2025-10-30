export function timeAgo(timestamp) {
  if (!timestamp) return "";

  const diffMs = Date.now() - timestamp;
  const seconds = diffMs / 1000;

  if (seconds < 60) {
    const s = Math.trunc(seconds);
    return `${s} second${s !== 1 ? "s" : ""} ago`;
  } else if (seconds < 3600) {
    const m = Math.trunc(seconds / 60);
    return `${m} minute${m !== 1 ? "s" : ""} ago`;
  } else if (seconds < 86400) {
    const h = Math.trunc(seconds / 3600);
    return `${h} hour${h !== 1 ? "s" : ""} ago`;
  } else if (seconds < 2592000) {
    const d = Math.trunc(seconds / 86400);
    return `${d} day${d !== 1 ? "s" : ""} ago`;
  } else if (seconds < 31104000) {
    const mo = Math.trunc(seconds / 2592000);
    return `${mo} month${mo !== 1 ? "s" : ""} ago`;
  } else {
    const y = Math.trunc(seconds / 31104000);
    return `${y} year${y !== 1 ? "s" : ""} ago`;
  }
}
