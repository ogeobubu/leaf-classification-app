import { Request, Response } from "express";
import { Leaf } from "../models/Leaf";
import sharp from "sharp";
import path from "path";
import Vibrant from "node-vibrant";
import { knownSpecies } from "./data";
import colorData from "./color-name";

// Define ColorData type
type ColorData = {
  [key: string]: [number, number, number];
};

// Define known combinations type
type KnownCombinations = {
  [key: string]: string;
};

// Updated function with type for colorName
const separateColorName = (colorName: string): string => {
  const spacedName = colorName.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Known combinations for combined color names
  const knownCombinations: KnownCombinations = {
    yellowgreen: "yellow green",
    darkcyan: "dark cyan",
    darkorange: "dark orange",
    darkviolet: "dark violet",
    mediumaquamarine: "medium aquamarine",
    mediumorchid: "medium orchid",
    mediumseagreen: "medium sea green",
    mediumslateblue: "medium slate blue",
    lightgoldenrodyellow: "light goldenrod yellow",
    lightseagreen: "light sea green",
    lightslategray: "light slate gray",
    lightslategrey: "light slate grey",
    darkslategray: "dark slate gray",
    darkslategrey: "dark slate grey",
    lightgrey: "light grey",
    darkgrey: "dark grey",
    olive: "olive drab",
    palevioletred: "pale violet red",
    palegreen: "pale green",
    lightpink: "light pink",
    lightsteelblue: "light steel blue",
    firebrick: "fire brick",
    lightcoral: "light coral",
  };

  return knownCombinations[colorName] || spacedName;
};

// Define the function signature for rgbToColorName
const rgbToColorName = async (
  r: number,
  g: number,
  b: number
): Promise<string> => {
  let closestColor: string = "Unknown";
  let minDistance: number = Infinity;

  // Use a different variable name for color names
  for (const [name, rgb] of Object.entries(colorData) as [
    string,
    [number, number, number]
  ][]) {
    const distance = Math.sqrt(
      Math.pow(r - rgb[0], 2) +
        Math.pow(g - rgb[1], 2) +
        Math.pow(b - rgb[2], 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestColor = name;
    }
  }

  return closestColor.charAt(0).toUpperCase() + closestColor.slice(1);
};

// Extract features from image
const extractImageFeatures = async (filePath: string) => {
  const { width, height } = await sharp(filePath).metadata();

  // Use Vibrant to extract dominant color
  const palette = await Vibrant.from(filePath).getPalette();
  const vibrantColor = palette.Vibrant
    ? (palette.Vibrant.rgb as [number, number, number])
    : [0, 0, 0];

  const dominantColorName = await rgbToColorName(
    vibrantColor[0],
    vibrantColor[1],
    vibrantColor[2]
  );

  const features = {
    length: height ? height / 10 : 0,
    width: width ? width / 10 : 0,
    color: separateColorName(dominantColorName),
  };

  return features;
};

// Compare extracted features with known species
const compareFeatures = (uploadedFeatures: any, knownFeatures: any) => {
  const lengthMatch =
    Math.abs(uploadedFeatures.length - knownFeatures.length) <= 2;
  const widthMatch =
    Math.abs(uploadedFeatures.width - knownFeatures.width) <= 2;
  const colorMatch = separateColorName(
    uploadedFeatures.color.toLowerCase()
  ).includes(knownFeatures.color.toLowerCase());

  return lengthMatch && widthMatch && colorMatch;
};

// Find matching species
const findMatchingSpecies = (uploadedFeatures: any) => {
  for (const speciesData of knownSpecies) {
    if (compareFeatures(uploadedFeatures, speciesData.features)) {
      return speciesData.species;
    }
  }
  return "Unknown Species";
};

// Upload and process image
export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = path.join(__dirname, "../uploads", req.file.filename);

  try {
    // Extract features from image
    const uploadedFeatures = await extractImageFeatures(filePath);

    // Find matching species
    const matchedSpecies = findMatchingSpecies(uploadedFeatures);

    // Save to MongoDB (commented out for now)
    // const leaf = new Leaf({
    //   species: matchedSpecies,
    //   image: req.file.filename,
    //   features: uploadedFeatures,
    // });

    // await leaf.save();

    return res.status(201).json({
      message: "Image uploaded successfully",
      leaf: {
        species: matchedSpecies,
        image: req.file.filename,
        features: uploadedFeatures,
        imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
      },
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
