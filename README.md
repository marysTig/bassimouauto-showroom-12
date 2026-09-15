# BassimouAuto Showroom (12)

Crée un site web showroom complet, moderne et responsive pour un concessionnaire automobile en Algérie.

═══════════════════════════

INFORMATIONS DU CONCESSIONNAIRE

═══════════════════════════

- Nom : BassimouAuto

- Activité : Concessionnaire automobile

- Adresse : N74, Seddouk 06011, Algérie

- Téléphone / WhatsApp : 0550 68 69 39

- Localisation Google Maps : Plus Code GMWP+CV Seddouk

═══════════════════════════

STRUCTURE DU SITE PUBLIC

═══════════════════════════

1. HEADER

- Logo texte "BassimouAuto"

- Menu : Accueil, Véhicules, À propos, Contact

- Bouton "Appeler maintenant" visible en permanence

- Bouton WhatsApp flottant fixe en bas à droite sur toutes les pages

2. HERO (page d'accueil)

- Titre : "BassimouAuto — Votre concessionnaire automobile à Seddouk"

- Sous-titre percutant sur le choix et la confiance

- Boutons d'action : "Voir les véhicules" / "Appeler" / "WhatsApp"

- Section "Nos dernières arrivées" : 3-4 véhicules mis en avant (featured)

3. PAGE CATALOGUE /vehicules

- Grille de cartes véhicules avec filtres en haut de page :

  - Filtre par marque

  - Filtre par prix (fourchette)

  - Filtre par année

  - Filtre par carburant (Essence, Diesel, Hybride, Électrique)

  - Filtre par boîte (Manuelle, Automatique)

  - Filtre par état (Neuf, Occasion)

- Chaque carte véhicule affiche : photo principale, marque + modèle, année, prix, badge "Disponible" ou "Vendu"

4. FICHE VÉHICULE DÉTAILLÉE /vehicules/:id

- Galerie photo (plusieurs images, carrousel/zoom)

- Marque et modèle en titre

- Prix (DA) bien visible

- Tableau des caractéristiques :

  - Année

  - État (Neuf / Occasion)

  - Boîte (Manuelle / Automatique)

  - Carburant

  - Kilométrage (si occasion)

  - Puissance fiscale / cylindrée

  - Nombre de portes

  - Nombre de places

  - Couleur

  - Origine (Importée / Achat local)

  - Première main / Deuxième main

  - Papiers en règle (Oui/Non)

- Statut : Disponible / Réservé / Vendu

- Boutons "Appeler" et "WhatsApp" avec message pré-rempli : "Bonjour, je suis intéressé par [Marque Modèle], est-il toujours disponible ?"

5. SECTION "POURQUOI NOUS CHOISIR"

4 points forts avec icônes : Large choix de véhicules, Véhicules vérifiés et fiables, Papiers en règle, Service client réactif

6. SECTION "CONTACT"

- Adresse complète

- Carte Google Maps intégrée (embed)

- Numéro affiché et cliquable (lien tel:)

- Bouton WhatsApp

- Formulaire simple (nom, téléphone, véhicule recherché, message) qui envoie vers WhatsApp

7. FOOTER

- Coordonnées complètes

- Liens rapides vers les sections

- Mention "BassimouAuto - Seddouk"

═══════════════════════════

INTERFACE ADMIN /admin

═══════════════════════════

AUTHENTIFICATION

- Page de connexion /admin/login avec identifiant + mot de passe

- Identifiants codés en dur dans une constante du projet (ex. ADMIN_USERNAME et ADMIN_PASSWORD, valeurs par défaut à me communiquer/modifier)

- Session simple stockée en localStorage après connexion

- Toutes les routes /admin/* protégées, redirection vers /admin/login si non connecté

- Bouton "Déconnexion"

STOCKAGE DES DONNÉES

- Toutes les données (véhicules, messages, informations du concessionnaire) stockées en local (localStorage ou state global de l'app), pas de base de données externe pour le moment

- Structurer les données en tableaux d'objets JSON clairs pour faciliter une migration future

DASHBOARD /admin

- Résumé rapide : nombre total de véhicules, disponibles/vendus/réservés

- Sidebar de navigation : Dashboard, Véhicules, Messages, Informations concessionnaire, Déconnexion

GESTION DES VÉHICULES /admin/vehicules

- Tableau listant tous les véhicules (photo, marque/modèle, année, prix, statut, actions modifier/supprimer)

- Formulaire d'ajout/modification avec les champs :

  - Marque

  - Modèle

  - Année

  - État (Neuf / Occasion)

  - Boîte (Manuelle / Automatique)

  - Carburant (Essence / Diesel / Hybride / Électrique)

  - Kilométrage

  - Puissance fiscale / cylindrée

  - Nombre de portes

  - Nombre de places

  - Couleur

  - Prix (DA)

  - Négociable (Oui/Non)

  - Origine (Importée / Achat local)

  - Première main / Deuxième main

  - Papiers en règle (Oui/Non)

  - Statut (Disponible / Réservé / Vendu)

  - Mis en avant sur la page d'accueil (Oui/Non)

  - Upload de plusieurs photos (galerie)

- Confirmation avant suppression

- Les changements se reflètent immédiatement dans le catalogue public

DEMANDES DE CONTACT /admin/messages

- Liste des messages du formulaire (nom, téléphone, véhicule recherché, message, date)

- Marquer comme "Traité" / "Non traité"

- Tri du plus récent au plus ancien

INFORMATIONS CONCESSIONNAIRE /admin/parametres

Formulaire pour modifier :

- Nom du concessionnaire

- Adresse

- Téléphone/WhatsApp

- Lien Google Maps

Mise à jour automatique dans le header, footer et section contact du site public.

═══════════════════════════

DESIGN

═══════════════════════════

- Site public : palette moderne (ex. noir/gris anthracite + accent rouge ou bleu électrique, look "automobile premium")

- Cartes véhicules avec ombre légère, coins arrondis, effet hover

- Interface admin : palette neutre (gris/blanc), sidebar fixe desktop, menu déroulant mobile

- Site entièrement en français

- Design mobile-first, responsive sur mobile/tablette/desktop

- Boutons Appeler/WhatsApp toujours accessibles

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/91b58967-17b7-48ff-9f24-69567b72a916).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
