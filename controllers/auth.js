const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const { generarJWT } = require('../helpers/jwt');

const createUser = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                message: 'Un usuario existe con ese correo'
            })
        }
        user = new User(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        //Generar JWT
        const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            message: 'Usuario guardado correctamente',
            uid: user.id,
            name: user.name,
            token

        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            message: 'Por favor hable con el Administrador'
        })

    }
}

const loginUser = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario no existe con ese email'
            })
        }
        //Confirmar las contraseña
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Contraseña incorrecta'
            })
        }
        //Generar nuestro JWT
        const token = await generarJWT(user.id, user.name);

        //Respuesta si todo es correcto
        res.status(201).json({
            ok: true,
            message: 'Inicio de sesion correcto',
            uid: user.id,
            name: user.name,
            token
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            message: 'Por favor hable con el Administrador'
        })
    }


}

const revalidateToken = async (req = request, res = response) => {
    try {
        const uid = req.uid;
        const name = req.name
        const renewToken = await generarJWT(uid, name)
        res.json({
            ok: true,
            message: 'renew',
            renewToken,
            uid,
            name
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Por favor hable con el Administrador'
        })
    }
}


module.exports = {
    createUser,
    loginUser,
    revalidateToken
}