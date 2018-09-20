import { promisify } from 'util'
import { execFile } from 'child_process'

export const run = (cmd, args, opts) => promisify(execFile)(cmd, args, {
  shell: true,
  windowsHide: true,
  encoding: 'utf-8',
  ...opts
})
