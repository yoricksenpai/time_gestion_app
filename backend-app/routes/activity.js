import express from 'express';
import Activity from "../models/Activity.js";
import authMiddleware from "../middlewares/auth.js";
const router = express.Router();

router.post('/create_activity', authMiddleware, async (req, res) => {

    try {
        const userId = req.user.userId;
        const {name, description, nature, allDay, endDate, reminderTime} = req.body;
        const activityData= new Activity({name, description, nature,allDay, endDate, reminderTime, user: userId});
            if(nature === "Reminder" && reminderTime) {
                activityData.reminderTime = new Date(reminderTime)

        }
        if (['Tasks', 'Events'].includes(nature) && endDate) {
            activityData.endDate = new Date(endDate);
        }
            if (nature === "Event"){
                activityData.allDay = allDay  || false;
            }

        await activityData.save();
        res.status(201).json({message:"Your activity are successfully created"})
    } catch(error){
        res.status(400).json({error:error.message})
    }
})

router.get('/show_activity/:id',  async (req, res) => {
    try {
        const activityId = req.params.id;
        const activity = await Activity.findById(activityId);
        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
router.get('/all_activities', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const activities = await Activity.find({userId}).sort({ creationDate: -1 });
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
router.delete('/delete_activities', async(req, res) => {
    try {
        const { activityIds } = req.body;
        
        if (!Array.isArray(activityIds) || activityIds.length === 0) {
            return res.status(400).json({ error: "Liste d'IDs d'activités invalide" });
        }

        const deleteResults = await Activity.deleteMany({ _id: { $in: activityIds } });

        if (deleteResults.deletedCount === 0) {
            return res.status(404).json({ error: "Aucune activité trouvée pour suppression" });
        }

        res.json({
            message: `${deleteResults.deletedCount} activité(s) supprimée(s) avec succès`,
            deletedCount: deleteResults.deletedCount
        });
    } catch (error) {
        console.error("Erreur lors de la suppression des activités:", error);
        res.status(500).json({ error: "Erreur interne du serveur, contactez le développeur" });
    }
});

router.put('/update_activity/:id',  async(req, res) =>{
    try{
        const activityId = req.params.id;
        const updatedActivity = await Activity.findByIdAndUpdate(activityId, req.body, { new: true });
        if (!updatedActivity) {
            return res.status(404).json({error:"Activité non trouvé"})
        }
        res.json({ message: "Activité modifiée avec succès", activity: updatedActivity });
    }catch(error){
        console.error("Erreur lors de la mise à jour de l'activité:", error);
        res.status(500).json({error:"erreur interne du serveur, contacter le developeur"})
    }
})
export default router;