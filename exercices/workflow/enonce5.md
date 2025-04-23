### Consigne d'exercice

**Objectif :** Apprenez à utiliser une matrice de stratégie dans un workflow GitHub Actions pour tester différentes configurations d'environnement.

**Contexte :** Vous devez simuler un processus de test pour une application Node.js en utilisant différentes versions de Node.js et types de bases de données. L'objectif est de tester plusieurs combinaisons, tout en excluant certaines configurations.

### Consignes :

1. Créez un workflow GitHub Actions qui teste votre application avec trois versions de Node.js (`18`, `20`, `22`) et deux types de bases de données (`local`, `cloud`).
2. Utilisez la fonctionnalité de matrice pour tester toutes les combinaisons possibles de Node.js et de bases de données.
3. Excluez la combinaison où Node.js version `18` est utilisé avec une base de données `cloud`.
4. Dans chaque combinaison, affichez les informations sur la version de Node.js et le type de base de données à l'aide d'un `echo`.

Une fois le workflow configuré, chaque combinaison (sauf celle exclue) devrait s'afficher dans les logs de GitHub Actions.

### Critères de réussite :

- Le workflow doit s'exécuter correctement pour toutes les combinaisons excepté l'exclue.
- Les logs doivent afficher les informations de configuration (version de Node.js et base de données) pour chaque combinaison testée.
