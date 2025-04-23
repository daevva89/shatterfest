import { defineField, defineType } from 'sanity'
import { UsersIcon, CalendarDaysIcon } from '@heroicons/react/24/outline' // Or any relevant icon
import type { SanityClient } from 'sanity' // Import SanityClient for isUnique check

// Helper function to check slug uniqueness across languages
const isSlugUniqueAcrossLanguages = (slug: string | undefined, context: any): Promise<boolean> => {
  const { document, getClient } = context

  if (!slug || !document?.language) {
    return Promise.resolve(true) // If no slug or language, it's technically unique
  }

  const client = getClient({ apiVersion: '2023-05-01' }) // Use an appropriate API version
  const id = document._id.replace(/^drafts\./, '') // Ensure we compare against the published version
  const params = {
    draft: `drafts.${id}`,
    published: id,
    language: document.language,
    slug,
  }

  // Query checks for documents of the same type, same language, different ID, and same slug
  const query = `!defined(*[
    _type == 'artist' &&
    language == $language &&
    !(_id in [$draft, $published]) &&
    slug.current == $slug
  ][0]._id)`

  return client.fetch(query, params)
}

export default defineType({
  name: 'artist',
  title: 'Artist / Band',
  type: 'document',
  icon: UsersIcon,
  // @ts-ignore -- i18n property is added by the plugin and not recognized by base types
  i18n: true, // Enable document internationalization
  fields: [
    // Add the language field required by the plugin
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'name',
      title: 'Artist/Band Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position in Lineup',
      type: 'number',
      description: 'Lower numbers appear higher on the page (e.g., 1 for headliner, 2 for second band, etc.)',
      validation: (Rule) => Rule.integer().positive(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        isUnique: isSlugUniqueAcrossLanguages, // Use the custom uniqueness checker
      },
      description: 'Used for the artist\'s page URL. Click Generate.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'day',
      title: 'Playing Day',
      type: 'string',
      options: {
        list: [
          { title: 'Friday', value: 'friday' },
          { title: 'Saturday', value: 'saturday' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      description: 'Which day is the artist playing?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country of Origin',
      type: 'string',
      // Optional: You could use a dropdown list if the number of countries is limited
      // options: {
      //   list: [
      //     { title: 'Romania', value: 'RO' },
      //     { title: 'Slovenia', value: 'SI' }, 
      //     // ... add other relevant countries
      //   ],
      // },
    }),
    defineField({
      name: 'image',
      title: 'Artist Image / Logo',
      type: 'image',
      options: {
        hotspot: true, // Enables hotspot positioning
      },
      description: 'Main promotional image or logo (e.g., the square avatar used in lineup highlights).',
      fields: [
        // Optional: Add alt text field to the image
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Biography / Description',
      type: 'text',
      rows: 4,
      description: 'Short biography or description of the band.',
    }),
    defineField({
      name: 'musicLinks',
      title: 'Music / Social Links',
      type: 'array',
      description: 'Add links to Spotify, YouTube, Facebook, Instagram, etc.',
      of: [
        {
          title: 'Link Item',
          name: 'linkItem',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Spotify', value: 'spotify' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'Bandcamp', value: 'bandcamp' },
                  { title: 'Website', value: 'website' },
                  { title: 'Other', value: 'other' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({
                scheme: ['http', 'https']
              })
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
            prepare({ title, subtitle }) {
              const displayTitle = title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Link';
              return {
                title: displayTitle,
                subtitle: subtitle,
              };
            },
          },
        }
      ],
    }),
    // You might add fields like 'genre', 'featuredVideoUrl', etc.
  ],
  // Optional: Customize document preview
  preview: {
    select: {
      title: 'name',
      subtitle: 'country',
      media: 'image',
    },
  },
}); 