import mongoose from 'mongoose';

const list_nature = ["Event", "Task", "Reminder"]
const activitySchema = new mongoose.Schema({
    name: {type :String, required: true, unique:true},
    description: {type: String, required: false, maxLength:40},
    nature: {type:String, required: true, enum: list_nature},
    reminderTime:{type: Date, required: function(){return this.nature === "Reminder"}},
    creationDate:{type: Date, default:Date.now, required:function(){ return this.nature === "Event" || this.nature === "Task"}},
    endDate:{type:Date, required:function(){return this.nature === "Event" || this.nature === "Task"}},
    allDay: { type: Boolean, default: false, required: function () { return this.nature === "Event" } },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true},

})

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;