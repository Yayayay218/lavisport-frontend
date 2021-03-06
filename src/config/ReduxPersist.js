import immutablePersistenceTransform from '../store/ImmutablePersistenceTransform'
import { persistentStoreBlacklist } from '../reducers/'

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '2',
  storeConfig: {
    whitelist: [ 'livestreams', 'matches'],
    blacklist: ['app','nav'],
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
