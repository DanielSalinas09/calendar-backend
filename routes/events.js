const { Router } = require('express');
const { getEvent, newEvent, deleteEvent, updateEvent } = require('../controllers/events');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateField } = require('../middlewares/validateField');
const { isDate } = require('../helpers/isDate');

const router = Router();

/*
    route= api/event/

*/
//Todas tienes que pasar por la validacion JWT
//obtener eventos
router.use(validateJWT)
router.get('/', getEvent);
router.post('/newEvent', [
    check('title', 'El titulo es oblogatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validateField
], newEvent);
router.delete('/deleteEvent/:id', deleteEvent);
router.put('/updateEvent/:id', [
    check('title', 'El titulo es oblogatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validateField
], updateEvent)

module.exports = router;