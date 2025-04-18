import "server-only"

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token} from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
    token
  //usecdn - true - This is ISR - INCREMENTAL STATIC REGENERATION where next js will regenerate the page in the background if a request comes in after 60 seconds
})

if(!writeClient.config().token){
    throw new Error("Write client is not configured with a token. Please check your environment variables and ensure that SANITY_WRITE_TOKEN is set.")
}
