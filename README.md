# Puissance 4 (Connect 4)

Projet de jeu Puissance 4 réalisé en **HTML / CSS / TypeScript** avec **Vite**.

---

## Démarrage rapide

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- npm

### Installation des dépendances
```bash
npm install
```

### Lancement du serveur de développement
```bash
npm run dev
```
L'application sera accessible par défaut sur `http://localhost:5173`.

### Compilation TypeScript & Build de production
```bash
npm run build
```

---

## Fonctionnalités

- **Grille standard de Puissance 4** (6 lignes x 7 colonnes).
- **Gestion de la gravité** : le jeton descend automatiquement sur la case vide la plus basse de la colonne cliquée.
- **Alternance des joueurs** : Joueur 1 (Rouge) et Joueur 2 (Jaune).
- **Détection des conditions de fin de partie** :
  - Détection automatique de 4 jetons alignés (horizontal, vertical, diagonale descendante, diagonale montante).
  - Détection du match nul en cas de grille complète.
- **Affichage dynamique** du joueur actif et du résultat de la partie.
- **Bouton Rejouer** pour réinitialiser la grille et démarrer une nouvelle manche.

---

## Architecture du projet

Le projet est structuré pour bien séparer la logique métier du rendu graphique dans le DOM :

```text
├── src/
│   ├── types/
│   │   └── game.ts          # Moteur de règles et classe Game (gestion de l'état, détection de victoire, gravité)
│   ├── rendering/
│   │   └── grid.ts          # Composant de rendu de la grille DOM et gestion des interactions utilisateur
│   ├── styles/
│   │   └── style.css        # Styles de la grille, des pions et mise en page
│   └── main.ts              # Point d'entrée, initialisation et orchestration des modules
├── index.html               # Structure HTML de base
├── tsconfig.json            # Configuration du compilateur TypeScript
└── package.json             # Dépendances et scripts npm
```

---

## Choix techniques & conception

- **Séparation des responsabilités** : La classe `Game` est autonome et découplée de l'interface graphique (DOM). Elle peut être testée ou réutilisée indépendamment.
- **Modèle de données** : Tableau plat de 42 cellules avec projection bi-directionnelle `(row, col) <-> index` pour simplifier les calculs de voisinage.
- **Algorithme de victoire vectoriel** : Vérification des alignements par balayage directionnel (`[deltaRow, deltaCol]`).
- **Style CSS Grid & Aspect Ratio** : Garantit une grille responsive.
