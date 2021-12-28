const { request, response } = require('express');
const Event = require('../models/EventModel');



const getEvent = async (req = request, res = response) => {
    const event= await Event.find()
                            .populate('user','name');
    try {

        res.status(201).json({
            ok: true,
            message: 'Evento encontrado con exito',
            event
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Ocurrio un error hable con el administrador'
        });
    }
    


}
const newEvent = async (req = request, res = response) => {

    const event = new Event(req.body);
    try {
        const { title} = req.body;

        const uid = req.uid;
        if (title.trim().length > 5) {
            event.user=uid;
            await event.save()
            res.status(201).json({
                ok: true,
                message: 'El evento se creo de manera exitosa',
                event
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'No se guardo en base de datos hable con el administrador',
            
        });
    }



}
const deleteEvent = async(req = request, res = response) => {
    const { id } = req.params
    
    try {
        const event=await Event.findById(id);
        const uid=req.uid;
        if(!event){
            return res.status(404).json({
                ok:false,
                message:'No existe eventos con ese id',
            })
        }
        if(event.user.toString()!==uid){
            return res.status(401).json({
                ok:false,
                message:'Usted no tiene permisos para eliminar este evento',
            })
        }
        const deleteEvent= await Event.findByIdAndDelete(id);

        res.status(201).json({
            ok: true,
            message: 'Se elimino correctamente',
            deleteEvent
    
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            message: 'Ocurrio un error hable con el admin',    
        });
    }

}
const updateEvent = async(req = request, res = response) => {
    const eventId=req.params.id;
    const uid=req.uid;
    
    try {
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({
                ok:false,
                message:'No existe evento de ese id'
            })
        }
        if(event.user.toString()!==uid){
            return res.status(401).json({
                ok:false,
                message:'No tiene privilegio de editar este evento'

            })
        }
        const newEvent={
            ...req.body,
            user:uid
        }
        const eventUpdate=await  Event.findByIdAndUpdate(eventId,newEvent,{new:true});
        res.status(201).json({
            ok: true,
            message: 'Se actualizo correctamente el evento',
            eventUpdate
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Ocurrio un error hable con el administrador'
        })
    }
}

module.exports = {
    getEvent,
    newEvent,
    deleteEvent,
    updateEvent
}
