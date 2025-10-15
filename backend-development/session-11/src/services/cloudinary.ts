import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';
import 'dotenv/config';

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

export const cloudinaryUpload = (file: Express.Multer.File): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) return reject(error);
      if (result) return resolve(result);
    });

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

export const cloudinaryRemove = async (secureUrl: string) => {
  try {
    const publicId = extractPublicIdFromUrl(secureUrl);
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw error;
  }
};

export const extractPublicIdFromUrl = (url: string) => {
  const urlParts = url.split('/');
  const publicIdWithExtension = urlParts[urlParts.length - 1];
  const publicId = publicIdWithExtension.split('.')[0];
  return publicId;
};
