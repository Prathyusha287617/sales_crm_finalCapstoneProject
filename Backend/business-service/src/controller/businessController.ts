import { Request, Response } from 'express';
import Business from '../models/businessModel'; // Adjust path to your model

export const createBusiness = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract fields from the request body
    const { businessOrganizationName, businessDescription, businessUniqueId } = req.body;

    // Check if required fields are present
    if (!businessOrganizationName || !businessDescription || !businessUniqueId) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // Create a new Business document
    const newBusiness = new Business({
      businessOrganizationName,
      businessDescription,
      businessUniqueId,
    });

    // Save to the database
    const savedBusiness = await newBusiness.save();

    // Send the saved document as the response
    res.status(201).json(savedBusiness);
  } catch (error) {
    console.error("Error creating business:", error);
    res.status(500).json({ message: "Server error" });
  }
};
