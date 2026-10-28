# Izina Frontend

Interface web de **Izina**, la plateforme communautaire dédiée aux prénoms africains. Elle permet de découvrir, rechercher et explorer le catalogue de prénoms dans une expérience claire, fluide et responsive.

**Démo :** https://izina-frontend.onrender.com
**API (documentation) :** https://izina-backend.onrender.com/api/docs

> Si la démo est hébergée sur une offre gratuite, le premier chargement après une période d'inactivité peut prendre environ une minute.

## Fonctionnalités

- Navigation dans le catalogue des prénoms
- Recherche et filtrage des données
- Expérience moderne et responsive, du mobile à l'ordinateur
- Composants d'interface dynamiques avec animations
- Intégration d'éléments visuels et export en image

## Stack technique

| Domaine | Technologies |
|---|---|
| Framework | Next.js, React |
| Langage | TypeScript |
| Style | Tailwind CSS |
| Animations | Motion |
| Export d'images | html-to-image |

## Démarrage

### Prérequis

- Node.js [version à préciser, 20 ou plus récent recommandé]
- Un gestionnaire de paquets (npm, pnpm ou yarn)
- Le backend [Izina Backend](https://github.com/dzidulasolutions/izina-backend) lancé en local, ou l'adresse de l'API déployée

### Installation

```bash
git clone https://github.com/dzidulasolutions/izina-frontend.git
cd izina-frontend
npm install
```

### Configuration

Crée un fichier `.env.local` à la racine et renseigne l'adresse de l'API :

```bash
# [À adapter : utilise le nom de variable réellement lu par le projet]
NEXT_PUBLIC_API_URL=https://izina-backend.onrender.com
```

Ne commite jamais ce fichier.

### Lancement

```bash
npm run dev        # développement : http://localhost:3000
npm run build      # build de production
npm run start      # lancement du build
npm run lint       # analyse du code
```

*[Vérifie que ces scripts correspondent à ton `package.json`.]*

## Défis techniques

- **Une interface claire pour un catalogue culturel riche et multiforme** : mise en forme lisible, recherche et filtres qui restent simples malgré la diversité des données.
- **Une UX fluide sur plusieurs écrans** avec une base technique légère et maintenable.

## Projets liés

- **Izina Backend** (API NestJS, authentification, modération communautaire, notifications temps réel) : https://github.com/dzidulasolutions/izina-backend
- **Izina**, version complète (front et back) : voir le portfolio

## Auteur

Projet personnel conçu et développé en solo par [Ton nom].

## Licence

[À préciser : par exemple MIT, ou « Tous droits réservés »]