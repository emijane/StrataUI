// lib/getLibraryImage.ts
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const BUCKET = 'library-images';
const FALLBACK = '/images/placeholders/tool-placeholder.png';

/**
 * Builds a usable image URL for a library logo/screenshot.
 * Handles:
 * - null/undefined paths → returns local fallback
 * - full URLs → returned unchanged
 * - bucket paths → resolved to Supabase public URL
 */
export function getLibraryImage(path?: string | null) {
  if (!path) return FALLBACK;

  // If it's already a full URL, return it as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Otherwise treat it as a Supabase Storage path
  if (!SUPABASE_URL) return FALLBACK;
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}
