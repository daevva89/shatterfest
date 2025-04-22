import { StructureBuilder, ListItemBuilder } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Singleton for Site Settings
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      
      // Singleton for Homepage
      S.listItem()
        .title('Homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),
        
      // All other document types
      ...S.documentTypeListItems().filter(
        (listItem: ListItemBuilder) => !['siteSettings', 'homepage'].includes(listItem.getId() as string)
      ),
    ])
