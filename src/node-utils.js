import { promisify } from 'util'
import { execFile, execFileSync } from 'child_process'

const elecOpts = {
  shell: true,
  windowsHide: true,
  encoding: 'utf-8'
}

export const run = (cmd, args, opts) => promisify(execFile)(cmd, args, {
  ...elecOpts,
  ...opts
})

export const runSync = (cmd, args, opts) => promisify(execFileSync)(cmd, args, {
  ...elecOpts,
  ...opts
})
