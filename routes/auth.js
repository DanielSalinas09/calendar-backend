const {Router} = require('express');
const {check}=require('express-validator');
const router = Router();
const {validateField} =require('../middlewares/validateField')
const { createUser,loginUser,revalidateToken } = require('../controllers/auth');
const {validateJWT}=require('../middlewares/validate-jwt');

/*
Rutas de Usuarios 
host + /api/auth
*/

router.post(
    '/new',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe tener minimo 6 caracteres').isLength({min:6}),
        validateField
    ],
    createUser);
router.post(
    '/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','La contraseña debe tener minimo 6 carateres').isLength({min:6}),
        validateField
    ],
    loginUser);
router.get('/renew',validateJWT,revalidateToken)


module.exports=router