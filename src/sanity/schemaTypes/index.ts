import { type SchemaTypeDefinition } from 'sanity'
import artist from './artist' // Import the artist schema

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artist], // Add the artist schema to the types array
}
