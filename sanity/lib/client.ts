import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation

  //usecdn - true - This is ISR - INCREMENTAL STATIC REGENERATION where next js will regenerate the page in the background if a request comes in after 60 seconds
})
