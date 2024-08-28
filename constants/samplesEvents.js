// sampleEvents.js

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

export const sampleEvents = [
  {
    id: '1',
    title: 'Réunion d\'équipe',
    startDate: today.toISOString(),
    endDate: new Date(today.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    notes: 'Discuter des objectifs du trimestre'
  },
  {
    id: '2',
    title: 'Déjeuner avec un client',
    startDate: new Date(today.getTime() + 4 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(today.getTime() + 5 * 60 * 60 * 1000).toISOString(),
    notes: 'Restaurant Le Gourmet'
  },
  {
    id: '3',
    title: 'Présentation du projet',
    startDate: tomorrow.toISOString(),
    endDate: new Date(tomorrow.getTime() + 1.5 * 60 * 60 * 1000).toISOString(),
    notes: 'Préparer les slides'
  },
  {
    id: '4',
    title: 'Cours de yoga',
    startDate: new Date(tomorrow.getTime() + 10 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(tomorrow.getTime() + 11 * 60 * 60 * 1000).toISOString(),
    notes: 'N\'oubliez pas votre tapis'
  }
];