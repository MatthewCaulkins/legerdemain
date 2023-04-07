const mongoose = require('mongoose')


const Schema = mongoose.Schema;
const ArmySchema = new Schema({
    units: [{
        unit: String,
        tileNum: Number
    }],
    name: {
        type: String,
        required: true
    },
    playerId: {
        type: String,
        required: true
    },
    armyId: {
        type: Number,
        unique : true
    },
    avatar: {
        type: String,
    },
    tint: { 
        type: String,
    }
});


const ArmyModel = mongoose.model('army', ArmySchema);
module.exports = ArmyModel;