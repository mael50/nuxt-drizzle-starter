import { validateEnv } from '../utils/env'

export default defineNitroPlugin(() => {
  if (process.env.NODE_ENV !== 'test') {
    validateEnv()
  }
})
