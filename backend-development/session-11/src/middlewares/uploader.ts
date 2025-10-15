import { Request } from 'express';
import multer from 'multer';
import { join } from 'path';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const uploader = (
  type: 'memorystorage' | 'diskstorage' = 'memorystorage',
  filePrefix?: string,
  folderName?: string
) => {
  const defaultDir = join(__dirname, '../../public');

  const storage =
    type === 'memorystorage'
      ? multer.memoryStorage()
      : multer.diskStorage({
          destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
            const destination = folderName ? join(defaultDir, folderName) : defaultDir;
            cb(null, destination);
          },
          filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
            const prefix = filePrefix || 'file_';
            const originalNameParts = file.originalname.split('.');
            const fileExtension = originalNameParts[originalNameParts.length - 1];
            const newFileName = prefix + Date.now() + '.' + fileExtension;

            cb(null, newFileName);
          },
        });

  return multer({ storage });
};
