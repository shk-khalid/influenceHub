export function isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  
  export function isValidSocialUrl(platform: string, url: string): boolean {
    if (!url) return true; // Empty URLs are considered valid
    if (!isValidUrl(url)) return false;
  
    const platformPatterns: Record<string, RegExp> = {
      instagram: /^https?:\/\/(www\.)?instagram\.com\/[\w.-]+\/?$/,
      twitter: /^https?:\/\/(www\.)?twitter\.com\/[\w.-]+\/?$/,
      youtube: /^https?:\/\/(www\.)?youtube\.com\/(c\/|channel\/|user\/)?[\w.-]+\/?$/,
    };
  
    return platformPatterns[platform]?.test(url) ?? false;
  }