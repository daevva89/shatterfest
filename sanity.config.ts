'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {type StructureResolver} from 'sanity/desk'
import {structureTool} from 'sanity/structure'
import { documentInternationalization } from '@sanity/document-internationalization'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Define the schema and templates
  schema: {
    types: schema.types,
    // Define initial value templates here
    templates: [
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
          // _id: `homepage-${language}`,
          language: language,
        }),
      },
      // Filter out potential null/undefined entries if merging with existing templates
    ].filter(Boolean),
  },
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'ro', title: 'Romanian' }
      ],
      schemaTypes: ['homepage', 'artist'],
    }),
  ],
})
