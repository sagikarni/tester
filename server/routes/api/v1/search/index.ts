import { Router } from 'express';
import { keywords, keywordsWithResults} from '@modules/gps/middlewares';
import { async } from '@server/core';

const router = Router();

router
  .route('/:keyword')
  .get(async(keywords));
  
router
  .route('/results/:keyword')
  .get(async(keywordsWithResults));

export { router as search };
