import mongoose from 'mongoose';

const list_nature = ["Events", "Tasks", "Reminders"]
const activitySchema = new mongoose.Schema({
    name: {type :String, required: true, unique:true},
    description: {type: String, required: false},
    nature: {type:String, required: true, enum: list_nature}

})

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;