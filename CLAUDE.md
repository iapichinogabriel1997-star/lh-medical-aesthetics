# LH Medical Aesthetics — Site Web

## Projet
Site web pour l'institut de beauté **LH Medical Aesthetics** de Lola, spécialisé en épilation laser, cryolipolyse, radiofréquence et lipocavitation. Situé Rue d'Amercoeur 21/32, 4020 Liège.

## Stack technique
- **Frontend** : Next.js 16 + TypeScript
- **Styling** : Inline styles (Tailwind v4 pour quelques utilitaires + globals.css)
- **Base de données** : Turso (SQLite cloud via @libsql/client)
- **Auth admin** : JWT (jose) + bcryptjs
- **Emails** : Nodemailer (Gmail) — à configurer avec EMAIL_USER et EMAIL_PASS
- **Hébergement** : Vercel (auto-deploy depuis GitHub)
- **Repo** : github.com/iapichinogabriel1997-star/lh-medical-aesthetics

## URL production
- Site : https://lh-medical-aesthetics.vercel.app
- Admin : https://lh-medical-aesthetics.vercel.app/admin (lola / LHadmin2024)

## Structure des pages
- `/` — Accueil (hero vidéo, avantages, galerie, processus, technologie)
- `/services` — 4 services (Laser, Cryo, RF, Lipo) + galerie + technologie
- `/tarifs` — Tarifs séparés par service + forfaits + navigation sticky
- `/a-propos` — Présentation institut, engagements, technologie
- `/contact` — Coordonnées, formulaire contact, Google Maps
- `/reservation` — Système multi-étapes (choix soin → calendrier → infos → confirmation)
- `/admin` — Dashboard admin protégé (réservations, blocages, horaires)

## API routes
- `POST /api/auth/login` — Login admin
- `POST /api/auth/logout` — Logout
- `GET /api/auth/check` — Vérifier session
- `GET /api/bookings?date=&duration=` — Créneaux disponibles
- `GET /api/bookings?mode=admin` — Liste réservations (admin)
- `POST /api/bookings` — Créer réservation + emails
- `DELETE /api/bookings` — Annuler réservation (admin)
- `GET/PUT /api/availability` — Horaires d'ouverture
- `GET/POST/DELETE /api/blocked-slots` — Plages bloquées

## Base de données Turso
- URL : libsql://lh-medical-iapichinogabriel1997-star.aws-us-east-1.turso.io
- Tables : admin, bookings, availability, blocked_slots
- Init automatique au premier appel API

## Variables d'environnement (Vercel)
- `TURSO_DATABASE_URL` — URL de la base Turso
- `TURSO_AUTH_TOKEN` — Token auth Turso
- `JWT_SECRET` — Secret pour les tokens JWT admin
- `EMAIL_USER` — Gmail pour l'envoi d'emails (à configurer)
- `EMAIL_PASS` — Mot de passe d'application Gmail (à configurer)

## Assets
- Images : `/public/images/*.webp` (laser) + `/public/images/cryo/*.webp` (cryo/rf/lipo)
- Logo : `/public/images/logo.svg`
- Vidéo hero : `/public/images/video-hero.mp4` (1.2Mo, H264 8-bit, 12s boucle)

## Composants réutilisables
- `AnimateOnScroll` — Animation au scroll (fade-up, fade-left, fade-right, zoom-in, blur-in)
- `AnimatedText` — Texte animé lettre par lettre
- `HeroVideo` — Vidéo hero avec fallback image
- `Header` — Navigation sticky, transparent → blanc au scroll, hamburger mobile
- `Footer` — Coordonnées, navigation, Instagram

## Notes
- Les images sont en WebP (converties depuis PNG pour la performance)
- La vidéo hero commence à 8s de la vidéo originale, compressée en 8-bit pour compatibilité navigateurs
- Le système de réservation vérifie les conflits de créneaux en temps réel
- L'admin peut bloquer des plages horaires et modifier les jours/heures d'ouverture
- Emails de notification : 1 pour Lola (lola.lila05@hotmail.com), 1 pour le client
