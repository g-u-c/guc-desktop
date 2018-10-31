export const mockBroadcastComment = jest.fn()
export const mockPredefinedState = {
  broadcastComment: {
    alwaysSuccess: null,
    withResult: '',
    withError: ''
  }
}

export const Client = jest.fn().mockImplementation(url => ({
  broadcast: {
    async comment (...args) {
      const { alwaysSuccess, withResult, withError } = mockPredefinedState.broadcastComment
      mockBroadcastComment(...args)
      if (alwaysSuccess) return withResult
      else throw withError
    }
  }
}))

export { PrivateKey } from '../node_modules/dsteem/lib' // not working 🤔
