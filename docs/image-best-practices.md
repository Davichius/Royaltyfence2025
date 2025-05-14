# Image Best Practices

This document outlines best practices for using images in the Royalty Fence website to prevent empty string errors and ensure a good user experience.

## Common Issues

The most common issue we've encountered is the `src` attribute of the `Image` component receiving an empty string, which causes errors. This can happen when:

1. A variable or prop that might be undefined or null is directly passed to `src`
2. A conditional expression returns an empty string
3. An array of image URLs contains empty strings

## Best Practices

### 1. Always Use SafeImage Component

Use our custom `SafeImage` component instead of the standard Next.js `Image` component:

\`\`\`jsx
import { SafeImage } from "@/components/safe-image";

<SafeImage
  src={imageUrl}
  alt="Description"
  width={800}
  height={600}
  fallbackSrc="/fallback-image.jpg"
/>
\`\`\`

### 2. Validate Image Sources

Use the `getValidImageSrc` utility function to ensure a valid source:

\`\`\`jsx
import { getValidImageSrc } from "@/lib/image-utils";

const validSrc = getValidImageSrc(imageSrc, "/fallback-image.jpg");
\`\`\`

### 3. Conditional Rendering

Only render the Image component when you have a valid source:

\`\`\`jsx
{imageUrl && imageUrl.trim() !== "" ? (
  <Image src={imageUrl || "/placeholder.svg"} alt="Description" width={800} height={600} />
) : (
  <div className="fallback">Image not available</div>
)}
\`\`\`

### 4. Filter Arrays of Images

When mapping over an array of image URLs, filter out any empty strings:

\`\`\`jsx
{imageUrls
  .filter(url => url && url.trim() !== "")
  .map((url, index) => (
    <Image key={index} src={url || "/placeholder.svg"} alt={`Image ${index}`} width={800} height={600} />
  ))}
\`\`\`

### 5. Use Error Boundaries

Wrap image components in error boundaries to catch and handle errors gracefully:

\`\`\`jsx
import { ImageErrorBoundary } from "@/components/error-boundary";

<ImageErrorBoundary>
  <Image src={imageUrl || "/placeholder.svg"} alt="Description" width={800} height={600} />
</ImageErrorBoundary>
\`\`\`

## Debugging

If you're still experiencing issues with images, you can run the debug script in the browser console:

\`\`\`javascript
// Load the debug script
const script = document.createElement('script');
script.src = '/debug-images.js';
document.body.appendChild(script);
\`\`\`

This will highlight any problematic images with red borders and provide guidance on how to fix them.
