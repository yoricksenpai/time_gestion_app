import express from 'express';
import Activity from "../models/Activity.js";


const router = express.Router();
router.post('/create_activity', async (req, res) => {
    try{
        const {name, description, nature} = req.body;
        const activity= new Activity({name, description, nature})
        await activity.save();
        res.status(201).json({message:"Your task are successfully created"})
    } catch(error){
        res.status(400).json({error:error.message})
    }
})

router.get('/show_activity', async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
router.delete('/delete_activity/:id', async(req, res) =>{
    try{
        const activityId = req.params.id;
        const deletedActivity = await Activity.findByIdAndDelete(activityId);
        if(!deletedActivity){
            return res.status(404).json({error:"Activité non trouvé"})
        }
        res.json({message:"Activité supprimé avec succès"})
    }catch(error){
        console.error("Erreur lors de la suppression de l'activité:", error);
        res.status(500).json({error: "erreur interne du serveur, contacter le developeur"})
    }
})

router.update('/update_activity/:id', async(req, res) =>{
    try{
        const activityId = req.params.id;
        const updatedActivity = await Activity.findByIdAndUpdate(activityId);
        if(!updatedActivity){
            return res.status(404).json({error:"Activité non trouvé"})
        }
        res.json({message:"Activité modifié avec succès"})
    }catch(error){
        console.error("Erreur lors de la mise à jour de l'activité:", error);
        res.status(500).json({error:"erreur interne du serveur, contacter le developeur"})
    }
})
export default router;