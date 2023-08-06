import express from "express";
import {
   registerUser,
   loginUser,
   logoutUser, getUserProfile,
   updateUserProfile, getUsers, deleteUser,
   getUserById,
   updateUserByAdmin
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router();


router.route('/').get(protect, admin, getUsers).post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(protect, logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').get(protect, admin, getUserById).put(protect, admin, updateUserByAdmin).delete(protect, admin, deleteUser)

export default router 