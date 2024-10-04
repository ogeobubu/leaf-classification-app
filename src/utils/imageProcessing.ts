import sharp from "sharp";

export const processImage = async (imagePath: string) => {
  try {
    const processedImage = await sharp(imagePath)
      .resize(500)
      .webp({ quality: 80 })
      .toBuffer();

    return processedImage;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};
