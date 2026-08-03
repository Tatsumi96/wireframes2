import { PROPERTY_IMAGES, REVIEWER_AVATARS } from './images';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AdminBookingStatus = 'en-attente' | 'confirmée' | 'en-cours' | 'terminée' | 'annulée' | 'remboursée' | 'litige';

export interface AdminBooking {
  ref: string;
  guest: string;
  avatar: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  amount: number;
  status: AdminBookingStatus;
  bookedAt: string;
}

export interface AdminProperty {
  id: string;
  title: string;
  location: string;
  status: 'publiée' | 'brouillon' | 'archivée';
  occupancy: number;
  views: number;
  revenue: number;
  rating: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'client' | 'propriétaire' | 'admin';
  bookings: number;
  joinedAt: string;
  status: 'actif' | 'suspendu' | 'nouveau';
}

export interface AdminMessage {
  id: string;
  from: string;
  avatar: string;
  subject: string;
  preview: string;
  date: string;
  status: 'nouveau' | 'en cours' | 'résolu';
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export const ADMIN_STATS = {
  revenue: 82_450,
  revenueDelta: '+12.4%',
  bookings: 298,
  bookingsDelta: '+8.1%',
  users: 1_842,
  usersDelta: '+3.7%',
  occupancy: 71,
  occupancyDelta: '+5.2 pts',
};

// ─── Monthly revenue (€) ──────────────────────────────────────────────────────

export const MONTHLY_REVENUE: { month: string; value: number }[] = [
  { month: 'Jan', value: 42_100 },
  { month: 'Fév', value: 38_400 },
  { month: 'Mar', value: 51_200 },
  { month: 'Avr', value: 46_800 },
  { month: 'Mai', value: 58_300 },
  { month: 'Juin', value: 62_700 },
  { month: 'Juil', value: 71_900 },
  { month: 'Août', value: 68_400 },
  { month: 'Sep', value: 74_600 },
  { month: 'Oct', value: 66_200 },
  { month: 'Nov', value: 59_100 },
  { month: 'Déc', value: 82_450 },
];

// ─── Booking status distribution ──────────────────────────────────────────────

export const BOOKING_DISTRIBUTION: { label: string; value: number; color: string }[] = [
  { label: 'Confirmées', value: 142, color: '#1A365D' },
  { label: 'Terminées', value: 96, color: '#B8654A' },
  { label: 'En attente', value: 28, color: '#D9C9B7' },
  { label: 'Annulées', value: 18, color: '#7A7368' },
  { label: 'Litiges', value: 5, color: '#C0392B' },
  { label: 'Remboursées', value: 9, color: '#2A9D8F' },
];

// ─── Bookings ─────────────────────────────────────────────────────────────────

export const ADMIN_BOOKINGS: AdminBooking[] = [
  { ref: 'AB1234', guest: 'Jean Dupont', avatar: REVIEWER_AVATARS.jean, propertyId: 'bastide-luberon', checkIn: '14/08/2024', checkOut: '21/08/2024', nights: 7, guests: 4, amount: 2_665, status: 'confirmée', bookedAt: '02/07/2024' },
  { ref: 'CD5678', guest: 'Sophie Lambert', avatar: REVIEWER_AVATARS.sophie, propertyId: 'villa-cannes', checkIn: '10/09/2024', checkOut: '15/09/2024', nights: 5, guests: 6, amount: 3_190, status: 'en-attente', bookedAt: '28/07/2024' },
  { ref: 'EF9012', guest: 'Thomas Bernard', avatar: REVIEWER_AVATARS.thomas, propertyId: 'chalet-chamonix', checkIn: '12/02/2024', checkOut: '19/02/2024', nights: 7, guests: 8, amount: 4_550, status: 'terminée', bookedAt: '05/01/2024' },
  { ref: 'GH3456', guest: 'Claire Fontaine', avatar: REVIEWER_AVATARS.claire, propertyId: 'loft-paris', checkIn: '05/11/2024', checkOut: '08/11/2024', nights: 3, guests: 2, amount: 1_260, status: 'en-cours', bookedAt: '12/10/2024' },
  { ref: 'IJ7890', guest: 'Marc Antoine', avatar: REVIEWER_AVATARS.jean, propertyId: 'mas-gordes', checkIn: '20/07/2024', checkOut: '27/07/2024', nights: 7, guests: 5, amount: 2_030, status: 'annulée', bookedAt: '01/06/2024' },
  { ref: 'KL1122', guest: 'Élodie Martin', avatar: REVIEWER_AVATARS.sophie, propertyId: 'villa-nice', checkIn: '22/06/2024', checkOut: '29/06/2024', nights: 7, guests: 4, amount: 3_150, status: 'terminée', bookedAt: '03/05/2024' },
  { ref: 'MN3344', guest: 'Camille Vasseur', avatar: REVIEWER_AVATARS.claire, propertyId: 'bastide-luberon', checkIn: '01/09/2024', checkOut: '04/09/2024', nights: 3, guests: 3, amount: 1_142, status: 'remboursée', bookedAt: '18/08/2024' },
  { ref: 'OP5566', guest: 'Julien Moreau', avatar: REVIEWER_AVATARS.thomas, propertyId: 'chalet-chamonix', checkIn: '18/12/2024', checkOut: '26/12/2024', nights: 8, guests: 10, amount: 5_240, status: 'en-attente', bookedAt: '10/11/2024' },
  { ref: 'QR7788', guest: 'Hélène Petit', avatar: REVIEWER_AVATARS.sophie, propertyId: 'loft-paris', checkIn: '03/10/2024', checkOut: '10/10/2024', nights: 7, guests: 2, amount: 2_940, status: 'litige', bookedAt: '20/08/2024' },
  { ref: 'ST9900', guest: 'Nicolas Dubois', avatar: REVIEWER_AVATARS.jean, propertyId: 'mas-gordes', checkIn: '28/07/2024', checkOut: '02/08/2024', nights: 5, guests: 4, amount: 1_450, status: 'terminée', bookedAt: '12/06/2024' },
];

// ─── Properties ───────────────────────────────────────────────────────────────

export const ADMIN_PROPERTIES: AdminProperty[] = PROPERTY_IMAGES.map((p, i) => ({
  id: p.id,
  title: p.title,
  location: p.location,
  status: i < 4 ? 'publiée' : i === 4 ? 'brouillon' : 'publiée',
  occupancy: [74, 68, 82, 59, 63, 71][i],
  views: [12_400, 9_800, 15_200, 7_600, 6_300, 11_100][i],
  revenue: [96_400, 78_200, 112_600, 54_300, 48_900, 81_700][i],
  rating: p.rating,
}));

// ─── Users ────────────────────────────────────────────────────────────────────

export const ADMIN_USERS: AdminUser[] = [
  { id: 'U-001', name: 'Jean Dupont', email: 'jean.dupont@exemple.fr', avatar: REVIEWER_AVATARS.jean, role: 'client', bookings: 8, joinedAt: '03/2022', status: 'actif' },
  { id: 'U-002', name: 'Sophie Lambert', email: 'sophie.lambert@exemple.fr', avatar: REVIEWER_AVATARS.sophie, role: 'propriétaire', bookings: 14, joinedAt: '06/2021', status: 'actif' },
  { id: 'U-003', name: 'Thomas Bernard', email: 'thomas.bernard@exemple.fr', avatar: REVIEWER_AVATARS.thomas, role: 'client', bookings: 5, joinedAt: '09/2023', status: 'actif' },
  { id: 'U-004', name: 'Claire Fontaine', email: 'claire.fontaine@exemple.fr', avatar: REVIEWER_AVATARS.claire, role: 'propriétaire', bookings: 11, joinedAt: '01/2022', status: 'nouveau' },
  { id: 'U-005', name: 'Marc Antoine', email: 'marc.antoine@exemple.fr', avatar: REVIEWER_AVATARS.jean, role: 'admin', bookings: 0, joinedAt: '02/2021', status: 'actif' },
  { id: 'U-006', name: 'Élodie Martin', email: 'elodie.martin@exemple.fr', avatar: REVIEWER_AVATARS.sophie, role: 'client', bookings: 21, joinedAt: '11/2020', status: 'actif' },
  { id: 'U-007', name: 'Camille Vasseur', email: 'camille.vasseur@exemple.fr', avatar: REVIEWER_AVATARS.claire, role: 'client', bookings: 3, joinedAt: '04/2024', status: 'nouveau' },
  { id: 'U-008', name: 'Julien Moreau', email: 'julien.moreau@exemple.fr', avatar: REVIEWER_AVATARS.thomas, role: 'propriétaire', bookings: 9, joinedAt: '07/2022', status: 'suspendu' },
];

// ─── Messages ─────────────────────────────────────────────────────────────────

export const ADMIN_MESSAGES: AdminMessage[] = [
  { id: 'M-01', from: 'Claire Fontaine', avatar: REVIEWER_AVATARS.claire, subject: 'Litige sur la réservation QR7788', preview: 'Bonjour, je conteste le montant des frais de ménage appliqués à mon séjour...', date: 'Aujourd\'hui, 09:24', status: 'nouveau' },
  { id: 'M-02', from: 'Hélène Petit', avatar: REVIEWER_AVATARS.sophie, subject: 'Problème de digicode à l\'arrivée', preview: 'Le code fourni ne fonctionnait pas, nous avons dû attendre 2h devant la porte...', date: 'Hier, 18:40', status: 'nouveau' },
  { id: 'M-03', from: 'Sophie Lambert', avatar: REVIEWER_AVATARS.sophie, subject: 'Vérification de mon annonce', preview: 'Pouvez-vous m\'indiquer le délai de validation de mon nouveau calendrier...', date: 'Hier, 11:05', status: 'en cours' },
  { id: 'M-04', from: 'Julien Moreau', avatar: REVIEWER_AVATARS.thomas, subject: 'Demande de remboursement partiel', preview: 'Suite aux travaux de la piscine, je souhaiterais un dédommagement de...', date: 'Lun, 15/07', status: 'en cours' },
  { id: 'M-05', from: 'Thomas Bernard', avatar: REVIEWER_AVATARS.thomas, subject: 'Facture du séjour EF9012', preview: 'Merci de bien vouloir me transmettre une facture au nom de ma société...', date: 'Lun, 15/07', status: 'résolu' },
  { id: 'M-06', from: 'Nicolas Dubois', avatar: REVIEWER_AVATARS.jean, subject: 'Changement de date', preview: 'Serait-il possible de décaler mon séjour au mois d\'août ? Je comprends...', date: 'Dim, 14/07', status: 'résolu' },
];
