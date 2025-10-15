import { Request, Response, NextFunction } from 'express';
import { cloudinaryRemove, cloudinaryUpload } from '../services/cloudinary';
import { transporter } from '../services/nodemailer';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';

export class SampleController {
  async getSampleData(req: Request, res: Response, next: NextFunction) {
    // some logic here

    return res.status(200).json({
      success: true,
      data: [],
    });
  }

  async createSampleData(req: Request, res: Response, next: NextFunction) {
    const { name, email, code } = req.body;

    // some logic here

    return res.status(200).json({
      success: true,
      data: {
        message: 'Create sample data success!',
      },
    });
  }

  async addNewImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = req;

      if (!file) throw new Error('No file uploaded!');

      return res.status(200).send(`File ${file.filename} successfully uploaded`);
    } catch (error) {
      next(error);
    }
  }

  async addNewImages(req: Request, res: Response, next: NextFunction) {
    try {
      const { files } = req;

      if (!files?.length) throw new Error('No file uploaded!');

      return res.status(200).send(`File(s) successfully uploaded`);
    } catch (error) {
      next(error);
    }
  }

  async addImageCloudinary(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = req;

      if (!file) throw new Error('No file uploaded!');

      const { secure_url } = await cloudinaryUpload(file);

      // you should store file url in db

      return res.status(200).json({
        success: true,
        message: `File successfully uploaded: ${secure_url}`,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeImageCloudinary(req: Request, res: Response, next: NextFunction) {
    try {
      const { secureUrl } = req.body;

      await cloudinaryRemove(secureUrl);

      return res.status(200).json({ success: true, message: 'Delete file success' });
    } catch (error) {
      next(error);
    }
  }

  async sendEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name } = req.body;

      const templatePath = path.join(__dirname, '../email/templates/confirmation.hbs');
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({ name });

      await transporter.sendMail({
        from: 'Barrett Lowe <barrett.lowe@ethereal.email>',
        to: email,
        subject: 'Welcome to Purwadhika!',
        html,
      });

      return res.status(200).json({ success: true, message: 'Email sent!' });
    } catch (error) {
      next(error);
    }
  }
}
