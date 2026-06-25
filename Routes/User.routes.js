const express = require('express');
const router = express.Router();
const UserController = require('../controller/User.controller');
const { authenticate } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req , file , cb)=>{
        cb(null,'uploads/');
    },
    filename:(req , file ,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    },
})
const upload = multer ({storage});

router.post('/signup',upload.single('Image'), UserController.signup);
router.post('/login', UserController.login);

router.get('/', authenticate, UserController.GetAllUser);
router.get('/:id', authenticate, UserController.GetByIdUser);
router.put('/:id', authenticate, UserController.UpdateUser);
router.delete('/:id', authenticate, UserController.DeleteUser);

module.exports = router;
