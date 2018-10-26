export default {
  pages: {
    interface: {
      config: {
        label: 'Config',
        steemAccount: {
          label: 'Steem Account',
          hint: 'Which Steem Account will you use to post?'
        },
        gitUser: {
          label: 'Github Username',
          hint: 'Enter your username, not an org name!'
        },
        steemPassword: {
          label: 'Password',
          hint: 'Your credentials will never be stored or sent 🤞'
        },
        usePostingKey: 'Use Posting Key',
        experimental: 'experimental',
        steemPostingKey: {
          label: 'Posting Key',
          hint: 'Don\'t use your master key!'
        },
        gitRepo: {
          label: 'GIT Repo',
          hint: 'https://github.com/g-u-c/guc-desktop'
        },
        workingDirectory: {
          label: 'Working Directory',
          hint: 'Where is the project located on your machine?'
        },
        commitId: {
          label: 'Commit ID',
          hint: 'e.g c0ff3, HEAD~1, or HEAD~1^2'
        }
      },
      edit: {
        label: 'Edit',
        tags: 'Tags',
        postTitle: 'Post Title'
      },
      review: {
        label: 'Review'
      },
      inform: {
        label: 'About',
        p1: 'Git-Utopian-Contributor (G-U-C) is a tool that was made to enhance the publishing workflow for developers who want to share their work with the Steem and Utopian communities.',
        p2: 'Basically, this app allows you to add comments (and sort of hide them) in GIT notes. You will be able to document your work within GIT, and then publish this work (and parts of it) to the Steem blockchain. The post is structured and tagged to be relevant to the topic of open-source software development.',
        p3: 'Made in the context of the Utopian Hackathon, September, 2018.<br><br>MIT License.<br>Team: nothingismagick, DrSensor, decebal'
      }
    },
    dashboard: {
      title: 'Dashboard'
    }
  }
}
