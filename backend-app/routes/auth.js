import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, redirectTo: '/home' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.delete('/delete_user/:id', async(req, res)=>{
    try{
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId)
        if(!deletedUser){
            return res.status(404).json({error:"Utilisateur non trouvé"})
        }
        res.json({message:"Utilisateur supprimé avec succès"})
    }catch(error){
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
        res.status(500).json({error: "erreur interne du serveur, contacter le developeur"})
    }
})
export default router;