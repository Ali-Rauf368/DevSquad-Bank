import multer from 'multer';
import path from 'path';
import FinanceContent from '../models/FinanceContent.js';

// Set up multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

// Initialize multer
const upload = multer({ storage });

// Create new content (Admin only, with token)
export const createContent = async (req, res) => {
  try {
    const { title, content, type, date } = req.body;
    let imageUrl = '';

    // Check for required fields
    if (!title || !content || !type || !date) {
      return res.status(400).json({ error: 'All fields are required except image' });
    }

    // Handle image upload or online image URL
    if (req.file) {
      imageUrl = req.file.path; // Use local file path
    } else if (req.body.image) {
      imageUrl = req.body.image; // If an online image URL is provided
    } else {
      return res.status(400).json({ error: 'Image file or image URL is required' });
    }

    // Save content to database
    const newContent = new FinanceContent({
      title,
      content,
      type,
      image: imageUrl,
      date,
    });

    await newContent.save();
    res.status(201).json({ message: 'Content created successfully' });
  } catch (error) {
    console.error('Content Creation Error:', error);
    res.status(500).json({ error: error.message || 'Server Error' });
  }
};

// Get all content
export const getAllContent = async (req, res) => {
  try {
    const content = await FinanceContent.find();
    res.status(200).json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};

// Update content
export const updateContent = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { title, content, type, image, date } = req.body;

    const updatedContent = await FinanceContent.findByIdAndUpdate(
      contentId,
      { title, content, type, image, date },
      { new: true } // Return the updated document
    );

    if (!updatedContent) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.status(200).json(updatedContent);
  } catch (error) {
    console.error('Content Update Error:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
};

// Delete content
export const deleteContent = async (req, res) => {
  try {
    const { contentId } = req.params;

    const deletedContent = await FinanceContent.findByIdAndDelete(contentId);

    if (!deletedContent) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Content Deletion Error:', error);
    res.status(500).json({ error: 'Failed to delete content' });
  }
};

// Image upload route (if needed separately)
export const uploadImage = upload.single('image');