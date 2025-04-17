import { type SchemaTypeDefinition } from 'sanity'
import artist from './artist'
import homepage from './homepage'
import siteSettings from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artist, homepage, siteSettings],
}
