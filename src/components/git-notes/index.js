/** */
import { run } from '@/node-utils'

export const push = async (cwd) => run('git', ['push', 'origin', 'refs/notes/utopian'], { cwd })
export const fetch = async (cwd) => {
  try {
    const result = await run('git', ['fetch', 'origin', 'refs/notes/utopian:refs/notes/utopian', '-f'], { cwd })
    return result.stdout
  } catch (error) { throw error }
}

export { default as NotesCreateButton } from './CreateButton.vue'
export { default as NotesFetchButton } from './FetchButton.vue'
export { default as NotesPushButton } from './PushButton.vue'
export { default as NotesRemoveButton } from './RemoveButton.vue'
