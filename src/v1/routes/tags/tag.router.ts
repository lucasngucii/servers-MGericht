import { Router } from 'express';
const router = Router();
import * as tagController from '../../controllers/tags/tag.controller';
// tags Router
router.get("/", tagController.getAllProductByTags)
module.exports = router;