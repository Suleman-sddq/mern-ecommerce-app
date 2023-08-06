import User from '../models/userModel.js'
import asyncHandler from '../middleware/asyncHandler.js'
import createJWT from '../utils/createJwt.js';


// @desc    Register user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {

   const { name, email, password } = req.body;

   const userExist = await User.findOne({ email });

   if (userExist) {
      res.status(401);
      throw new Error('User already exists')
   } else {

      const user = await User.create({ name, email, password });

      // Auth the user with JWT cookie
      createJWT(res, user._id);

      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin
      })
   }
})


// @desc    Auth user  and get token
// @route   POST /api/users/login
// @access  public
const loginUser = asyncHandler(async (req, res) => {

   const { email, password } = req.body;

   const user = await User.findOne({ email });

   if (user && (await user.matchPassword(password))) {

      createJWT(res, user._id)

      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin
      })
   } else {
      res.status(401);
      throw new Error('Invalid credentials')
   }
})


// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  private
const logoutUser = asyncHandler(async (req, res) => {

   res.cookie('jwt', '', {
      httpOnly: true,
      expiresIn: new Date(0),
   })
   res.status(200).json({
      message: 'Logged out successfully'
   });
})


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  private
const getUserProfile = asyncHandler(async (req, res) => {

   const user = await User.findById(req.user.id);
   if (user) {
      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin
      })
   } else {
      res.status(500)
      throw new Error('User not found')

   }
})


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  private
const updateUserProfile = asyncHandler(async (req, res) => {

   const user = await User.findById(req.user._id);

   if (user) {

      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      // Only update the password if recieved in body
      if (req.body.password) {
         user.password = req.body.password;
      }
      const updatedUser = await user.save();

      res.status(200).json({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         isAdmin: updatedUser.isAdmin,
      })
   } else {
      res.status(400)
      throw new Error('User not found')
   }
})


// @desc    Get all users 
// @route   GET /api/users
// @access  private/ Admin
const getUsers = asyncHandler(async (req, res) => {

   const users = await User.find({});
   res.status(200).json(users)
})


// @desc    Delete user 
// @route   DELETE /api/users/:id
// @access  private/ Admin
const deleteUser = asyncHandler(async (req, res) => {

   const user = await User.findById(req.params.id);
   if (user) {
      if (user.isAdmin) {
         res.status(400)
         throw new Error('Cannot delete admin user')
      }

      await User.deleteOne({ _id: user._id })
      res.status(200).json({ message: 'User deleted successfully' })

   } else {
      res.status(404)
      throw new Error('User not found')
   }
})


// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  private/ Admin
const getUserById = asyncHandler(async (req, res) => {

   const user = await User.findById(req.params.id).select('-password');

   if (user) {
      res.status(200).json(user)
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})


// @desc    Update user by ID
// @route   PUT /api/users/:id
// @access  private/ Admin
const updateUserByAdmin = asyncHandler(async (req, res) => {

   const user = await User.findById(req.params.id);

   if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);

      const updatedUser = await user.save();

      res.status(200).json({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         isAdmin: updatedUser.isAdmin
      })
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})


export {
   registerUser,
   loginUser,
   logoutUser, getUserProfile,
   updateUserProfile, deleteUser,
   getUserById,
   updateUserByAdmin, getUsers
}