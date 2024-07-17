import mongoose from "mongoose";

const truckSchema = mongoose.Schema(
    {
        trucknum:{
            type: String,
            required: true,
        },
        load:{
            type: String,
            required: true,
        },
        status:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const Truck = mongoose.model('truck', truckSchema)