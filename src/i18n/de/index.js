export default {
  pages: {
    interface: {
      config: {
        label: 'Konfigurieren',
        steemAccount: {
          label: 'Steem Konto',
          hint: 'Welchen Steem Account verwenden Sie zum Posten?'
        },
        gitUser: {
          label: 'Github Nutzername',
          hint: 'Geben Sie Ihren Benutzernamen und keinen Organisationsnamen ein!'
        },
        steemPassword: {
          label: 'Password',
          hint: 'Ihre Zugangsdaten werden niemals gespeichert oder gesendet 🤞'
        },
        usePostingKey: 'Verwenden Sie Ihren Veröffentlichungsschlüssel',
        experimental: 'experimental',
        steemPostingKey: {
          label: 'Veröffentlichungsschlüssel',
          hint: 'Verwenden Sie nicht Ihren Hauptschlüssel'
        },
        gitRepo: {
          label: 'GIT Repo',
          hint: 'https://github.com/g-u-c/guc-desktop'
        },
        workingDirectory: {
          label: 'Arbeitsverzeichnis',
          hint: 'Wo befindet sich das Projekt auf Ihrer Maschine?'
        },
        commitId: {
          label: 'Commit ID',
          hint: 'C0FF33'
        }
      },
      edit: {
        label: 'Editieren',
        tags: 'Tags',
        postTitle: 'Beitragstitel'
      },
      review: {
        label: 'Überprüfen'
      },
      inform: {
        label: 'Informieren',
        p1: 'Git-Utopian-Contributor (G-U-C) ist ein Tool, das entwickelt wurde, um den Publishing-Workflow für Entwickler zu verbessern, die ihre Arbeit mit den Steem- und Utopian-Communities teilen möchten.',
        p2: 'Im Grunde erlaubt diese App, Kommentare in GIT-Notizen hinzuzufügen (und sie zu verstecken). Sie können Ihre Arbeit innerhalb von GIT dokumentieren und diese Arbeit (und Teile davon) in der Steem Blockchain veröffentlichen. Der Beitrag ist strukturiert und markiert, um für das Thema Open-Source-Softwareentwicklung relevant zu sein.',
        p3: 'Im Rahmen des Utopian Hackathon, September, 2018.<br><br>MIT License.<br>Crew: nothingismagick, DrSensor, decebal'
      }
    },
    dashboard: {
      title: 'Dashboard'
    }
  }
}
