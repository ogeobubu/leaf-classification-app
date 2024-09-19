import { Request, Response } from 'express';
import { Leaf } from '../models/Leaf';
import sharp from 'sharp';
import path from 'path';

// Example species data in memory
const knownSpecies = [
    { species: 'Oak', features: { length: 10, width: 5, color: 'Green' } },
    { species: 'Maple', features: { length: 8, width: 4, color: 'Red' } },
    { species: 'Pine', features: { length: 12, width: 6, color: 'Green' } }
];

// Extract features from image
const extractImageFeatures = async (filePath: string) => {
    const { width, height } = await sharp(filePath).metadata();
    const features = {
        length: height || 0,
        width: width || 0,
        color: 'Green' // Example color, can use advanced color extraction
    };

    return features;
};

// Compare extracted features with known species
const compareFeatures = (uploadedFeatures: any, knownFeatures: any) => {
    const lengthMatch = Math.abs(uploadedFeatures.length - knownFeatures.length) <= 2;
    const widthMatch = Math.abs(uploadedFeatures.width - knownFeatures.width) <= 2;
    const colorMatch = uploadedFeatures.color === knownFeatures.color;

    return lengthMatch && widthMatch && colorMatch;
};

// Find matching species
const findMatchingSpecies = (uploadedFeatures: any) => {
    for (const speciesData of knownSpecies) {
        if (compareFeatures(uploadedFeatures, speciesData.features)) {
            return speciesData.species;
        }
    }
    return 'Unknown';
};

// Upload and process image
export const uploadImage = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '../../uploads', req.file.filename);

    // Extract features from image
    const uploadedFeatures = await extractImageFeatures(filePath);

    // Find matching species
    const matchedSpecies = findMatchingSpecies(uploadedFeatures);

    // Save to MongoDB
    const leaf = new Leaf({
        species: matchedSpecies,
        image: req.file.filename,
        features: uploadedFeatures
    });

    await leaf.save();

    return res.status(201).json({ message: 'Image uploaded successfully', leaf });
};
