import sharp from "sharp";

export const processImage = async (imagePath: string) => {
  try {
    const processedImage = await sharp(imagePath)
      .resize(500) // Resize to 500 pixels wide
      .webp({ quality: 80 }) // Convert to WebP format with 80% quality
      .toBuffer();

    return processedImage;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};
