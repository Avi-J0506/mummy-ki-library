import express from 'express';
import { Truck } from '../models/truckModel.js';

const router = express.Router();


//Adding a new truck
router.post('/', async(req,res)=>{
    try{
        if(
            !req.body.trucknum || !req.body.load || !req.body.status
        ){
            return res.status(400).send({
                message : 'Fill all the required fields',
            })
        }
        const newBook = {
            trucknum: req.body.trucknum,
            load: req.body.load,
            status: req.body.status
        };
        const truck = await Truck.create(newTruck);
        res.status(201).send(truck);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

//Route to get all trucks from database
router.get('/', async(req,res)=>{
    try {
        const trucks = await Truck.find({});
        return res.status(200).json({
            count: trucks.length,
            data: trucks
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

//Route to get one truck from database by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const truck = await Truck.findById(id);

        if (!truck) {
            return res.status(404).json({ message: "Truck not found" });
        }

        return res.status(200).json(truck);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
});

//Updating the truck
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body.trucknum || !req.body.load || !req.body.status) {
            return res.status(400).json({
                message: "Send all required fields"
            });
        }

        const result = await Truck.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: "Truck not found" });
        }

        return res.status(200).json({ message: "Truck updated" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Truck not found" });
    }
});

//Deleting a truck
router.delete('/:id', async(req,res) =>{
    try {
        const { id } = req.params;
        const result = await Truck.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message: 'Truck not found'});
        }
        return res.status(200).send({message: 'Truck successfully deleted'});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
})

export default router;