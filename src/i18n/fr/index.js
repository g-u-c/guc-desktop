export default {
  pages: {
    interface: {
      config: {
        label: 'Config',
        steemAcount: {
          label: 'Steem Compte',
          hint: 'Quel compte Steem utiliserez-vous pour publier'
        },
        gitUser: {
          label: 'Github Nom d\'utilisateur',
          hint: 'Nom d\'utilisateur, pas un nom d\'organisation'
        },
        steemPassword: {
          label: 'Mot de Passe',
          hint: 'Votre identifiant ne sera jamais stocké ou envoyé 🤞'
        },
        usePostingKey: 'Utiliser la clé de Publication',
        experimental: 'expérimental',
        steemPostingKey: {
          label: 'clé d\'affichage',
          hint: 'N\'utilisez pas votre clé principale!'
        },
        gitRepo: {
          label: 'GIT Dépôt',
          hint: 'https://github.com/g-u-c/guc-desktop'
        },
        workingDirectory: {
          label: 'Directeur de travail',
          hint: 'Où se trouve le projet sur votre machine?'
        },
        commitId: {
          label: 'Commit ID',
          hint: 'C0FF33'
        }
      },
      edit: {
        label: 'Éditer',
        tags: 'Étiquette',
        postTitle: 'Titre de l\'Article'
      },
      review: {
        label: 'Réviser'
      },
      inform: {
        label: 'Aviser',
        p1: 'Git-Utopian-Contributor (G-U-C) est un outil conçu pour améliorer le workflow de publication pour les développeurs qui souhaitent partager leur travail avec les communautés Steem et Utopian.',
        p2: 'Fondamentalement, cette application vous permet d\'ajouter des commentaires (et en quelque sorte les cacher) dans des notes git. Vous pourrez documenter votre travail dans git, puis publier ce travail (et certaines parties de celui-ci) dans la chaîne de blocs Steem. Le post est structuré et étiqueté pour être pertinent au sujet du développement de logiciels open source.',
        p3: 'Réalisé dans le cadre du Hackathon Utopian, septembre 2018. MIT Licensed'
      }
    },
    dashboard: {
      title: 'Dashboard'
    }
  }
}
