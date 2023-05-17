import { QueryClient } from "react-query"

// Don't import this directly for modify the cache,
// this should only be used as value for ReactQueryCacheProvider, NotificationsConfig
// for modifying cache import useQueryCache from 'react-query'
const queryClient = new QueryClient()

export default queryClient
