import { type SchemaTypeDefinition } from 'sanity'
import updates from './updates'
import bugs from './bugs'

export const schemaTypes=[updates,bugs]
export const schema: { types: SchemaTypeDefinition[] } = {
  types:[updates,bugs],
}
