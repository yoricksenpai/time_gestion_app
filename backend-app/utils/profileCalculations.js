import { startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

// Fonction pour calculer le pourcentage de gestion du temps
function calculateTimeManagement(activities) {
  const now = new Date();
  const startOfCurrentWeek = startOfWeek(now);
  const endOfCurrentWeek = endOfWeek(now);
  
  const thisWeekActivities = activities.filter(activity => 
    isWithinInterval(new Date(activity.createdAt), { start: startOfCurrentWeek, end: endOfCurrentWeek })
  );
  
  const totalActivities = thisWeekActivities.length;
  const completedActivities = thisWeekActivities.filter(activity => 
    (activity.nature === 'Task' && activity.completed) || 
    (activity.nature === 'Event' && new Date(activity.endDate) < now) ||
    (activity.nature === 'Reminder' && new Date(activity.reminderTime) < now)
  ).length;
  
  return totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 100;
}

// Fonction pour calculer le nombre d'activités suivies
function calculateActivityTracked(activities) {
  const now = new Date();
  const startOfCurrentWeek = startOfWeek(now);
  const endOfCurrentWeek = endOfWeek(now);
  
  return activities.filter(activity => 
    isWithinInterval(new Date(activity.createdAt), { start: startOfCurrentWeek, end: endOfCurrentWeek })
  ).length;
}

// Fonction pour calculer le nombre de réalisations
function calculateAchievements(activities) {
  const now = new Date();
  return activities.filter(activity => 
    (activity.nature === 'Task' && activity.completed) || 
    (activity.nature === 'Event' && new Date(activity.endDate) < now) ||
    (activity.nature === 'Reminder' && new Date(activity.reminderTime) < now)
  ).length;
}

// Fonction principale pour calculer toutes les statistiques
function calculateUserStats(activities) {
  return {
    timeManagement: calculateTimeManagement(activities),
    activityTracked: calculateActivityTracked(activities),
    achievements: calculateAchievements(activities)
  };
}

export default calculateUserStats;