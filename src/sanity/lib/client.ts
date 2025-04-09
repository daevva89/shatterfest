import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export function urlFor(source: any) {
  if (!source?.asset?._ref) {
    return undefined;
  }
  return builder.image(source).auto('format')
}
