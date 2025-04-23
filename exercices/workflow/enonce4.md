# Exercice : Le Zoo des Événements GitHub

## Contexte

Vous êtes responsable d'un zoo virtuel qui gère différents types d'animaux. Chaque type d'animal nécessite des soins spécifiques et des procédures différentes selon la façon dont ils arrivent ou sont modifiés dans le zoo.

## Objectifs

- Comprendre les différents types d'événements GitHub
- Maîtriser les filtres de chemins
- Apprendre à personnaliser les messages selon le type d'événement
- Voir la différence entre push et pull request

## Structure du projet

```
zoo/
├── mammiferes/
├── oiseaux/
└── reptiles/
```

## Tâches à réaliser

### 1. Workflow "Soins des mammifères"

- Créer un workflow qui se déclenche sur les push vers main
- Le workflow doit vérifier si le changement concerne les mammifères (`mammiferes/**`)
- Afficher (echo) :
  - Le message du commit
  - Les informations sur le type d'événement
  - L'auteur de l'ajout du mammifère (celui qui a créé le commit)

#### Vérification

1. Se placer sur la branche main
2. Créer un fichier `mammiferes/lion.txt`
3. Commiter et pousser les changements (choisir un nom de commit qui précise : "Attention arrivée d'un lion")
4. Vérifier dans l'onglet "Actions" que :
   - Le workflow s'est déclenché
   - L'auteur est affiché
   - Le type d'événement est affiché
   - Le message de commit est affiché
5. Créer un fichier `oiseaux/perroquet.txt`
6. Commiter et pousser les changements
7. Vérifier que le workflow ne s'est pas déclenché

### 2. Workflow "Surveillance des oiseaux"

- Créer un workflow qui se déclenche sur les pull requests vers main
- Le workflow doit vérifier si le changement concerne les oiseaux (`oiseaux/**`)
- Afficher (echo) :
  - Le titre de la PR
  - Les informations sur le type d'événement
  - L'auteur de la PR

#### Vérification

1. Créer une nouvelle branche `zoo/ajout-oiseau`
2. Créer un fichier `oiseaux/perroquet.txt`
3. Créer une Pull Request vers main
4. Vérifier dans l'onglet "Actions" que :
   - Le workflow s'est déclenché
   - Le titre de la PR est affiché
   - Le type d'événement est affiché
   - L'auteur de la PR est affiché
5. Créer une nouvelle branche `zoo/ajout-mammifere`
6. Créer un fichier `mammiferes/tigre.txt`
7. Créer une nouvelle Pull Request
8. Vérifier que le workflow ne s'est pas déclenché

### 3. Workflow "Gestion des reptiles"

- Créer un workflow qui se déclenche sur :
  - Les push vers main avec le filtre de chemin `reptiles/**`
  - Les pull requests vers main avec les types :
    - `opened` : quand une nouvelle PR est créée
    - `edited` : quand le titre ou la description de la PR est modifiée
    - `synchronize` : quand de nouveaux commits sont poussés sur la branche source de la PR
      et le filtre de chemin `reptiles/**`
- Afficher des messages différents selon le type d'événement :
  - Pour un push : "Un reptile a été ajouté au zoo"
  - Pour une PR :
    - `opened` : "Un nouveau reptile est proposé !"
    - `edited` : "Les informations d'un reptile ont été modifiées"
    - `synchronize` : "Un reptile a été mis à jour avec de nouvelles informations"

#### Vérification

1. Test des Pull Requests :
   - Créer une nouvelle branche `zoo/ajout-reptile`
   - Créer un fichier `reptiles/serpent.txt`
   - Créer une Pull Request (vérifier le message "Un nouveau reptile est proposé !")
   - Modifier le titre de la PR (vérifier le message "Les informations d'un reptile ont été modifiées")
   - Ajouter un nouveau commit (vérifier le message "Un reptile a été mis à jour avec de nouvelles informations")
   - Valider et merger la PR (vérifier le message "Un reptile a été ajouté au zoo")
   - Créer une PR modifiant `mammiferes/lion.txt`
   - Vérifier que le workflow ne s'est pas déclenché

## Aide pour les workflows

### Conditions dans les workflows

Pour faire des conditions dans un workflow, vous pouvez utiliser la syntaxe `if:` directement sur les steps. C'est la méthode recommandée car elle est plus lisible et plus maintenable.

```yaml
steps:
  - name: Étape pour les push
    if: github.event_name == 'push'
    run: |
      echo "C'est un push"

  - name: Étape pour les PR
    if: github.event_name == 'pull_request'
    run: |
      echo "C'est une pull request"

  - name: Étape pour une action spécifique de PR
    if: github.event_name == 'pull_request' && github.event.action == 'opened'
    run: |
      echo "Une nouvelle PR a été ouverte"
```

Vous pouvez combiner plusieurs conditions avec `&&` (ET) ou `||` (OU).

### Accès aux informations de contexte

Voici comment accéder aux différentes informations du contexte GitHub :

1. **Auteur d'un commit ou d'une PR** :

```yaml
echo "Auteur: ${{ github.actor }}"
```

2. **Type d'événement** :

```yaml
echo "Type d'événement: ${{ github.event_name }}"
```

3. **Message de commit** :

```yaml
echo "Message: ${{ github.event.head_commit.message }}"
```

4. **Titre d'une PR** :

```yaml
echo "Titre: ${{ github.event.pull_request.title }}"
```

5. **Action d'une PR** (opened, edited, synchronize...) :

```yaml
echo "Action: ${{ github.event.action }}"
```

### Autres informations utiles

- Pour voir toutes les informations disponibles dans le contexte, vous pouvez utiliser :

```yaml
echo "Contexte complet: ${{ toJson(github) }}"
```

- Pour déboguer un workflow, vous pouvez ajouter des `echo` à chaque étape pour voir les valeurs des variables

- Les chemins dans les filtres (`paths:`) utilisent la syntaxe glob :
  - `*.txt` : tous les fichiers .txt
  - `**/*.txt` : tous les fichiers .txt dans tous les sous-dossiers
  - `dossier/**` : tous les fichiers dans le dossier et ses sous-dossiers
