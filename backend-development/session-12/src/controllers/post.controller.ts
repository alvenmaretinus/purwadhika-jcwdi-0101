import { Request, Response, NextFunction } from 'express';
import { memcachedClient } from '../lib/memcached';
import { AppError } from '../errors/AppError';

export class PostController {
  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    // create - read - update - delete
    // usually we only cache on READ
    try {
      // example throw error
      // throw new AppError('random error here');

      let data = [];

      // check if cache exists
      const cacheKey = 'posts';
      const cacheResult = await memcachedClient.get(cacheKey);

      if (cacheResult.value) {
        /* if cache hit */
        req.log.info(`cache hit for ${cacheKey}, returning cache...`);

        data = JSON.parse(cacheResult.value.toString());
      } else {
        /* if cache miss */
        req.log.info(`cache miss for ${cacheKey}, doing db query...`);

        // do a db query.....
        data = [{ id: 1 }, { id: 2 }, { id: 3 }];

        // update cache
        await memcachedClient.set(cacheKey, JSON.stringify(data), { expires: 3600 }); // cache ttl is valid for 1hr
      }

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
