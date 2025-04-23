# Exercice : L'Exploration Spatiale avec GitHub Actions

## Contexte

Vous êtes responsable d'une mission d'exploration spatiale qui gère différentes missions vers des destinations du système solaire. Chaque mission nécessite des équipements spécifiques et des activités différentes selon la destination.

## Objectifs

- Comprendre la structure des workflows GitHub Actions
- Apprendre à gérer des étapes répétitives
- Découvrir comment utiliser les matrices pour optimiser les workflows
- Voir la différence entre une approche répétitive et une approche optimisée

## Tâches à réaliser

### 1. Créer un workflow répétitif

- Créer un workflow qui se déclenche sur les push vers main
- Le workflow doit gérer trois missions différentes :
  - Mission Mars
  - Mission Lune
  - Mission Vénus
- Pour chaque mission, créer un job distinct avec :
  - Un nom explicite (ex: mission-mars, mission-lune, mission-venus)
  - Un runner ubuntu-latest
  - Une étape qui affiche les informations de la mission

#### Informations à afficher pour chaque mission

Pour Mars :

```yaml
run: |
  echo "=== Mission Mars ==="
  echo "Équipements : Rover, Combinaison spatiale"
  echo "Durée du voyage : 7 mois"
  echo "Activité principale : Analyse des roches"
  echo "Type de destination : planete"
  echo "=== Fin de la mission ==="
```

Pour la Lune :

```yaml
run: |
  echo "=== Mission Lune ==="
  echo "Équipements : Module lunaire, Combinaison spatiale"
  echo "Durée du voyage : 3 jours"
  echo "Activité principale : Collecte d'échantillons"
  echo "Type de destination : satellite"
  echo "=== Fin de la mission ==="
```

Pour Vénus :

```yaml
run: |
  echo "=== Mission Vénus ==="
  echo "Équipements : Sonde atmosphérique, Instruments scientifiques"
  echo "Durée du voyage : 5 mois"
  echo "Activité principale : Analyse atmosphérique"
  echo "Type de destination : planete"
  echo "=== Fin de la mission ==="
```

#### Vérification

1. Se placer sur la branche main
2. Créer le fichier workflow
3. Commiter et pousser les changements
4. Vérifier dans l'onglet "Actions" que :
   - Le workflow s'est déclenché
   - Les trois missions s'exécutent
   - Les informations de chaque mission sont correctement affichées

### 2. Refactoriser avec une matrice

Maintenant que vous avez un workflow fonctionnel mais répétitif, nous allons l'optimiser en utilisant une matrice.

#### Objectifs de la refactorisation

- Réduire la duplication de code
- Centraliser les informations des missions
- Utiliser une seule structure de job pour toutes les missions

#### Étapes à suivre

1. Créer une matrice qui contiendra les informations de chaque mission :

   - Le nom de la mission
   - Les équipements
   - La durée du voyage
   - L'activité principale
   - Le type de destination

2. Utiliser la syntaxe de matrice dans GitHub Actions :

   ```yaml
   strategy:
     matrix:
      mission:
        - nom : Mars
          durée: ...
        - nom: Lune
          ...
   ```

3. Accéder aux informations de la mission dans le job en utilisant :

   - `${{ matrix.mission.nom }}` pour le nom de la mission
   - Les autres variables de la matrice pour les informations spécifiques

4. Créer un seul job qui s'exécutera pour chaque mission de la matrice

### 3. Ajouter des configurations spéciales

Le Président des États-Unis a exprimé des demandes particulières pour certaines missions :

- Pour Mars : il souhaite ajouter un "Space Burger" à la cantine de la mission
- Pour la Lune : il demande d'emporter un "Télescope pour observer les aliens"
- Pour Vénus : la mission reste inchangée (le Président n'a pas encore eu d'idée)
- On va mettre ça dans un job séparé pour lui faire plaisir et on supprimera les jobs au prochain changement de président

#### Objectifs

- Créer un job séparé pour les demandes présidentielles
- Proposer une matrice avec les 3 noms de missions (Mars, Lune, Vénus)
- Utiliser la section `include` pour gérer les configurations spéciales et commentaires du président.

#### Étapes à suivre

1. Créer un nouveau job `demandes_president` qui :

   - Dépend du job d'exploration principal
   - Utilise une matrice avec les trois noms de mission (Mars, Lune, Vénus)
   - Utilise la section `include` pour ajouter les demandes spéciales:
     - Pour Mars:
       - equipement_special: "Space Burger"
       - commentaire: "Pour maintenir le moral de l'équipage"
     - Pour la Lune:
       - equipement_special: "Télescope pour observer les aliens"
       - commentaire: "Parce que les aliens existent, c'est sûr !"

2. Dans les steps du job, afficher les demandes spéciales avec des valeurs par défaut :

   ```yaml
   echo "Équipement spécial: ${{ matrix.equipement_special || 'Pas besoin' }}"
   echo "Commentaire: ${{ matrix.commentaire || 'Aucun commentaire' }}"
   ```

3. Vérifier que :
   - Le job s'exécute après le job d'exploration principal
   - Les demandes spéciales sont correctement affichées pour Mars et la Lune
   - Les valeurs par défaut sont affichées pour Vénus
