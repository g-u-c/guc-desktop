export default {
  pages: {
    interface: {
      config: {
        label: 'Config',
        steamAccount: {
          label: 'Cuenta de Steam',
          hint: 'Cuál cuenta de steam usarás a enviar?'
        },
        gitUser: {
          label: 'Nombre de Usuario de Github',
          hint: 'Introduzca su nombre de usuario , no un nombre de org!'
        },
        steamPassword: {
          label: 'Contraseña',
          hint: 'Sus cartas credenciales nunca serán almacenadas o enviadas 🤞'
        },
        usePostingKey: 'Use Clave de publicación',
        experimental: 'experimental',
        steamPostingKey: {
          label: 'Clave de publicación',
          hint: 'No use su clave maestra!'
        },
        gitRepo: {
          label: 'Repo de Git',
          hint: 'https://github.com/g-u-c/guc-desktop'
        },
        workingDirectory: {
          label: 'Directorio de Trabajo',
          hint: '¿Dónde está el proyecto situado en su máquina?'
        },
        commitId: {
          label: 'ID de Commit',
          hint: 'C0FF33'
        }
      },
      edit: {
        label: 'Editar',
        tags: 'Etiquetas',
        postTitle: 'Título de la publicación'
      },
      review: {
        label: 'Revisión'
      },
      inform: {
        label: 'Informar',
        p1: 'Git-Utopian-Contributor (G-U-C) es una herramienta que se creó para mejorar el flujo de trabajo de publicación para los desarrolladores que desean compartir su trabajo con las comunidades de Steam y Utopian.',
        p2: 'Básicamente, esta aplicación te permite agregar comentarios (y más o menos ocultarlos) en notas GIT. Podrá documentar su trabajo dentro de GIT y luego publicar este trabajo (y partes de él) en la cadena de bloques de Steam. La publicación está estructurada y etiquetada para ser relevante al tema del desarrollo de software de código abierto.',
        p3: 'Hecho en el contexto del Hackathon Utópico, septiembre de 2018. <br><br> Licencia MIT. Equipo:  nothingismagick, DrSensor, decebal'
      }
    },
    dashboard: {
      title: 'Dashboard'
    }
  }
}
