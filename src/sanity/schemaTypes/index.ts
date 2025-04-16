import { type SchemaTypeDefinition } from 'sanity'
import artist from './artist'
import homepage from './homepage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artist, homepage],
}
