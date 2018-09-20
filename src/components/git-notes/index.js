/** */
import { run, runSync } from '@/node-utils'

/** A button to insert notes
 * @param {String} cwd Current working directory where git command is executed in case the desktop application not runned in the project directory
 * @param {String} sha SHA-1 of commits. If not provided, it will show notes in the HEAD (current commit)
 * @return {Promise<resolve:String, reject:String>} stored notes
 * @example
 *
 * async read() {
 *  try {
 *    this.notes = await show(this.workingDirectory)
 *  } catch(e) { this.toast(e) }
 * }
 */
export const show = async (cwd, sha) => {
  const getHead = [runSync('git', ['rev-parse', 'HEAD'])]
  try {
    const result = await run('git', ['notes', '--ref=utopian', 'show', ...(sha ? [sha] : getHead)], { cwd })
    return result.stdout
  } catch (error) { throw error }
}

export const add = (notes, cwd, sha) => run('git', ['notes', '--ref=utopian', 'add', '-m', notes, ...(sha ? [sha] : [])], { cwd })
export const remove = (cwd, sha) => run('git', ['notes', '--ref=utopian', 'remove', ...(sha ? [sha] : [])], { cwd })
export const push = async (cwd) => run('git', ['push', 'origin', 'refs/notes/utopian'], { cwd })
export const fetch = async (cwd) => {
  try {
    const result = await run('git', ['fetch', 'origin', 'refs/notes/utopian:refs/notes/utopian'], { cwd })
    return result.stdout
  } catch (error) { throw error }
}
