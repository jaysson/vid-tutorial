import { ThrottleConfig } from '@ioc:Adonis/Addons/RequestThrottler'

export default {
  maxAttempts: 10,
  maxAttemptPeriod: 10,
  ttlUnits: 'seconds',
  cacheStorage: 'in-memory',
  useOwnCache: true,
  limitExceptionParams: {
    code: 'E_LIMIT_EXCEPTION',
    message: 'Maximum number of attempts exceeded. Please try again later.',
    status: 429,
  },
  requestKeysForRecognizing: ['method', 'hostname', 'url', 'ip'],
} as ThrottleConfig
