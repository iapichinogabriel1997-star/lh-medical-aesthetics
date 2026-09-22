# LH Medical Aesthetics — Site Web

## Projet
Site web pour l'institut de beauté **LH Medical Aesthetics** de Lola, spécialisé en épilation laser, cryolipolyse, radiofréquence et lipocavitation. Situé Rue d'Amercoeur 21/32, 4020 Liège.

## Stack technique
- **Frontend** : Next.js 16 + TypeScript
- **Styling** : Inline styles (Tailwind v4 pour quelques utilitaires responsive + globals.css)
- **Base de données** : Turso (SQLite cloud via @libsql/client)
- **Auth admin** : JWT (jose) + bcryptjs
- **Emails** : Nodemailer (Gmail) — à configurer avec EMAIL_USER et EMAIL_PASS
- **Hébergement** : Vercel (auto-deploy depuis GitHub)
- **Repo** : github.com/iapichinogabriel1997-star/lh-medical-aesthetics

## URL production
- Site : https://lh-medical-aesthetics.vercel.app
- Admin : https://lh-medical-aesthetics.vercel.app/admin (lola / LHadmin2024)

## Structure des pages
- `/` — Accueil (hero vidéo, carousel soins, promo cryo mobile/desktop, galerie laser 3+2, CTA, processus, technologie)
- `/epilation-laser` — Page dédiée épilation laser (hero, description mobile/desktop, galerie 3+2, technologie 4 longueurs d'ondes, zones, processus, FAQ, CTA)
- `/cryolipolyse` — Page dédiée amincissement : cryo + RF + lipo (hero, intro, 3 traitements mobile/desktop, avant/après bento grid, zones, processus, FAQ, CTA)
- `/services` — 4 services (Laser, Cryo, RF, Lipo) avec versions mobile/desktop + galerie + technologie
- `/tarifs` — Tarifs séparés par service + forfaits + navigation sticky
- `/a-propos` — Présentation institut, engagements, technologie
- `/contact` — Coordonnées, formulaire contact, Google Maps
- `/reservation` — Système multi-étapes (choix soin → calendrier → infos → confirmation)
- `/admin` — Dashboard admin protégé (réservations, blocages, horaires)

## Navigation
Menu avec sous-menu "Nos Services" (dropdown desktop hover, toggle mobile) :
- Épilation définitive → `/epilation-laser`
- Cryolipolyse → `/cryolipolyse`
- Radiofréquence → `/cryolipolyse`
- Lipocavitation → `/cryolipolyse`

Autres liens : Accueil, Tarifs, À propos, Contact, Rendez-vous

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
- Images laser : `/public/images/laser/*.webp` (5 photos traitement laser)
- Images cryo/RF/lipo : `/public/images/cryo/*.webp` (7 photos + 4 avant/après ba1-ba4)
- Images générales : `/public/images/*.webp`
- Logo : `/public/images/logo.svg`
- Vidéo hero : `/public/images/video-hero.mp4` (1.2Mo, H264 8-bit, 12s boucle)

## Composants réutilisables
- `AnimateOnScroll` — Animation au scroll (fade-up, fade-left, fade-right, zoom-in, blur-in)
- `AnimatedText` — Texte animé lettre par lettre
- `HeroVideo` — Vidéo hero avec fallback image
- `Header` — Navigation sticky avec sous-menu dropdown, transparent → blanc au scroll, hamburger mobile
- `Footer` — Coordonnées, navigation, Instagram
- `ServicesCarousel` — Carousel centré avec carte active, voisines visibles, autoplay 4s, flèches + dots

## Pattern mobile/desktop
Les sections de contenu (services, descriptions) utilisent un pattern dual :
- **Mobile** (`md:hidden`) : image plein écran en fond + calque fondu noir + texte blanc par-dessus (badge, titre, description, checkmarks)
- **Desktop** (`hidden md:!block`) : layout grid côte à côte classique (texte + image)
- Hauteur mobile : `minHeight: "70vh"` pour les cartes de service
- Galeries : grille 3+2 responsive avec `clamp()` pour les hauteurs
- `overflow-x: hidden` sur html et body pour éviter tout débordement horizontal

## Notes
- Les images sont en WebP (converties depuis PNG avec cwebp pour la performance)
- La vidéo hero commence à 8s de la vidéo originale, compressée en 8-bit pour compatibilité navigateurs
- Le système de réservation vérifie les conflits de créneaux en temps réel
- L'admin peut bloquer des plages horaires et modifier les jours/heures d'ouverture
- Emails de notification : 1 pour Lola (lola.lila05@hotmail.com), 1 pour le client
