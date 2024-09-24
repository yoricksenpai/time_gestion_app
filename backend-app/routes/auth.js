import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authMiddleware from '../middlewares/auth.js';
import calculateUserStats from '../utils/profileCalculations.js';
import Activity from '../models/Activity.js';
const router = express.Router();

// Register and Login
router.post('/register', async (req, res) => {
    try {
        const { email, password,username } = req.body;
        const user = new User({ email, password, username });
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
        const token = jwt.sign(
            { 
                userId: user._id,
                email: user.email,
                username: user.username
            }, 
            process.env.JWT_SECRET,
        );
        res.json({ token, user: { id: user._id, email: user.email, username: user.username } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Log out
router.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})


router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete user
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

// Update username
router.put('/update', async (req, res) => {
    try {
        const userId = req.user.id; // Encore une fois, supposons un middleware d'auth
        const { email, password } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        if (email) user.email = email;
        if (password) user.password = password;
        await user.save();
        res.json({ message: 'Utilisateur mis à jour avec succès' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const activities = await Activity.find({ user: req.user.userId });
    const stats = calculateUserStats(activities);

    res.json({
      user,
      stats,
      goals: user.goals
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;