import { Router } from 'express';
import * as userController from '../../controllers/users/user.controller';
import { isAdmin } from '../../middlewares/auth/isAdmin';
import { authMiddleware } from '../../middlewares/auth/authMiddleware';
const router = Router();
// get
router.get('/login', userController.login); //done
router.get('/logout', userController.logout); //done
router.get('/', authMiddleware, userController.getUsers); //done
router.get('/:id', authMiddleware, userController.getUserById); // done
router.get('/refresh', userController.handleRefreshToken);

// post
router.post('/registers', userController.register); // done
router.post('/reset-password', userController.resetPassword);
// put
router.put('/:id/change-password', userController.changePassword);// done
router.put('/:id', userController.updateUser); //
router.put('/:id/activate', authMiddleware, isAdmin, userController.unblockUser);
router.put('/:id/deactivate', authMiddleware, isAdmin, userController.blockUser);
// delete
router.delete('/:id', userController.deleteUser);

module.exports = router;
