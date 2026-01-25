/**
 * Avatar image processing utilities.
 *
 * Processes images for avatar upload:
 * - Center-crops to square
 * - Downscales to 512x512
 * - Flattens transparency to white background
 * - Encodes as WebP (with JPEG fallback)
 */

const AVATAR_OUTPUT_SIZE = 512

interface ProcessedAvatar {
  blob: Blob
  dataUrl: string
}

/**
 * Process an image file for avatar upload.
 *
 * @param file - The image file to process
 * @returns Processed image as Blob and data URL
 * @throws Error if processing fails
 */
export async function processAvatarImage(file: File): Promise<ProcessedAvatar> {
  // Load image
  const img = await loadImage(file)

  // Create canvas for processing
  const canvas = document.createElement("canvas")
  canvas.width = AVATAR_OUTPUT_SIZE
  canvas.height = AVATAR_OUTPUT_SIZE
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    throw new Error("Failed to get canvas context")
  }

  // Fill with white background (flatten transparency)
  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(0, 0, AVATAR_OUTPUT_SIZE, AVATAR_OUTPUT_SIZE)

  // Calculate center-crop dimensions
  const size = Math.min(img.width, img.height)
  const sx = (img.width - size) / 2
  const sy = (img.height - size) / 2

  // Draw center-cropped and scaled image
  ctx.drawImage(
    img,
    sx,
    sy,
    size,
    size,
    0,
    0,
    AVATAR_OUTPUT_SIZE,
    AVATAR_OUTPUT_SIZE,
  )

  // Try to encode as WebP, fallback to JPEG
  let blob = await canvasToBlob(canvas, "image/webp", 0.85)
  if (!blob || blob.type !== "image/webp") {
    blob = await canvasToBlob(canvas, "image/jpeg", 0.85)
  }

  if (!blob) {
    throw new Error("Failed to encode image")
  }

  const dataUrl = canvas.toDataURL(blob.type, 0.85)

  return { blob, dataUrl }
}

/**
 * Load an image from a File object.
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Convert canvas to Blob with specified format.
 */
function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, mimeType, quality)
  })
}

/**
 * Validate an image file for avatar upload.
 *
 * @param file - The file to validate
 * @returns Error message or null if valid
 */
export function validateAvatarFile(file: File): string | null {
  const MAX_SIZE_MB = 5
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

  const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"]

  if (!SUPPORTED_TYPES.includes(file.type)) {
    return `Unsupported file type. Please use JPEG, PNG, GIF, or WebP.`
  }

  if (file.size > MAX_SIZE_BYTES) {
    return `File is too large. Maximum size is ${MAX_SIZE_MB}MB.`
  }

  return null
}

/**
 * Get user initials for avatar fallback.
 *
 * @param fullName - User's full name
 * @param email - User's email (fallback)
 * @returns Up to 2 characters for initials
 */
export function getAvatarInitials(
  fullName: string | null | undefined,
  email: string | undefined,
): string {
  if (fullName) {
    const parts = fullName.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return fullName[0].toUpperCase()
  }

  if (email) {
    return email[0].toUpperCase()
  }

  return "?"
}
