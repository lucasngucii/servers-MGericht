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
//router.get('/verify-email', userController.verifyEmail);
router.post('/verify-otp', userController.verifyOTP);

// post
router.post('/registers', userController.register); // done
router.post('/reset-password', userController.resetPassword);
router.post('/send-otp', userController.sendOTP);
// put
router.put('/:id/change-password', userController.changePassword); // done
router.put('forgot-password-token', userController.resetPassword);
router.put('/:id', userController.updateUser); // done
router.put('/:id/activate', authMiddleware, isAdmin, userController.unblockUser); // done
router.put('/:id/deactivate', authMiddleware, isAdmin, userController.blockUser); // done
// delete
router.delete('/:id', isAdmin, userController.deleteUser);

// customer
//get
//router.get('/customer', authMiddleware, isAdmin, userController.getAllCustomer);
router.get('/customer/:id', authMiddleware, isAdmin, userController.getCustomerById);// done
//post
router.post('/customer', authMiddleware, isAdmin, userController.createCustomer);// done
//put
router.put('/customer/:id', authMiddleware, isAdmin, userController.updateCustomer);// done
/* router.put('/customer/change-password',  userController.changePasswordCustomer);// done */
// delete
router.delete('/customer/:id', authMiddleware, isAdmin, userController.deleteCustomer);// done

module.exports = router;
