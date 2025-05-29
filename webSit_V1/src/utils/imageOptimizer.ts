import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

interface OptimizeImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'webp';
}

export async function optimizeImage(
  inputPath: string,
  outputPath: string,
  options: OptimizeImageOptions = {}
): Promise<string> {
  const {
    width = 800,
    height,
    quality = 80,
    format = 'webp'
  } = options;

  try {
    // Ensure the output directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Process the image
    const image = sharp(inputPath);
    
    // Resize if dimensions are provided
    if (width || height) {
      image.resize(width, height, {
        fit: 'cover',
        position: 'center'
      });
    }

    // Convert to specified format and optimize
    if (format === 'webp') {
      await image.webp({ quality }).toFile(outputPath);
    } else {
      await image.jpeg({ quality }).toFile(outputPath);
    }

    return outputPath;
  } catch (error) {
    console.error('Error optimizing image:', error);
    throw error;
  }
}

// Generate optimized image paths
export function getOptimizedImagePath(originalPath: string, format: 'jpeg' | 'webp' = 'webp'): string {
  const parsedPath = path.parse(originalPath);
  return path.join(
    parsedPath.dir,
    'optimized',
    `${parsedPath.name}.${format}`
  );
} 