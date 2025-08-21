export function shorten(pubkey: string): string {
  if (pubkey.length <= 8) return pubkey;
  return `${pubkey.slice(0, 4)}…${pubkey.slice(-4)}`;
}

export async function copyToClipboard(value: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(value);
    // Note: In a real app, you'd show a toast here
    // For now, we'll just log success
    console.log('Copied to clipboard:', value);
  } catch (err) {
    console.error('Failed to copy:', err);
    throw err;
  }
}