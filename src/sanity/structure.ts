import { StructureBuilder, ListItemBuilder } from 'sanity/structure'

// Define supported languages (matching your config)
const supportedLanguages = [
  {id: 'en', title: 'English'},
  {id: 'ro', title: 'Romanian'}
];

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Singleton for Site Settings (Not localized)
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings') // Assuming a single global settings document
        ),
      
      // Localized Singleton Group for Homepage
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(
          S.list()
            .title('Homepage Translations')
            .items(
              supportedLanguages.map(language =>
                S.listItem()
                  .title(`Homepage (${language.title})`)
                  .id(`homepage-${language.id}`) // Unique ID for the list item
                  .child(
                    S.document()
                      .schemaType('homepage')
                      // IMPORTANT: Adjust documentId if your IDs aren't 'homepage-en', 'homepage-ro'
                      .documentId(`homepage-${language.id}`) 
                      .title(`Homepage (${language.title})`)
                      // Set initial value for the language field when creating new from here (if applicable)
                      // Note: Requires the template to be defined in sanity.config.ts
                      .initialValueTemplate('homepage-with-language', { language: language.id })
                  )
              )
            )
        ),

      // Divider
      S.divider(),

      // Localized List Group for Artists
      S.listItem()
        .title('Artists / Bands')
        .id('artist')
        .child(
          S.list()
            .title('Artists by Language')
            .items(
              supportedLanguages.map(language =>
                S.listItem()
                  .title(`Artists (${language.title})`)
                  .id(`artist-${language.id}`) // Unique ID for the list item
                  .child(
                    S.documentList()
                      .title(`Artists (${language.title})`)
                      .schemaType('artist')
                      .filter(`_type == "artist" && language == $language`)
                      .params({ language: language.id })
                      .canHandleIntent(S.documentTypeList('artist').getCanHandleIntent())
                      // Set initial value template for new documents in this list
                      // Note: Requires the template to be defined in sanity.config.ts
                      .initialValueTemplates([
                        S.initialValueTemplateItem('artist-with-language', { language: language.id })
                      ])
                  )
              )
            )
        ),
        
      // Filter out the types we handled manually from the main list
      ...S.documentTypeListItems().filter(
        (listItem: ListItemBuilder) => !['siteSettings', 'homepage', 'artist'].includes(listItem.getId() as string)
      ),
    ]);

// NOTE: You might need to define these Initial Value Templates in sanity.config.ts
// under the `document: { initialValueTemplates: [...] }` key if you want the '+' 
// button in these lists to work correctly by pre-filling the language.
/*
// Example for sanity.config.ts:
import {defineConfig} from 'sanity'

export default defineConfig({ 
  // ... other config
  document: {
    initialValueTemplates: [
      // Template for Artist
      {
        id: 'artist-with-language',
        title: 'Artist with language',
        schemaType: 'artist',
        parameters: [{ name: `language`, title: `Language`, type: `string` }],
        value: ({ language }: { language: string }) => ({
          language: language,
        }),
      },
      // Template for Homepage
      {
        id: 'homepage-with-language',
        title: 'Homepage with language',
        schemaType: 'homepage',
        parameters: [{ name: `language`, title: `Language`, type: `string` }],
        value: ({ language }: { language: string }) => ({
          // Assuming IDs like homepage-en, adjust if necessary
          _id: `homepage-${language}`,
          language: language,
        }),
      },
      // ... any other pre-existing templates
    ].filter(Boolean), // Ensure removal of potential null/undefined entries
  }
})
*/
