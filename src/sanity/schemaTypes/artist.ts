import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@heroicons/react/24/outline' // Or any relevant icon

export default defineType({
  name: 'artist',
  title: 'Artist / Band',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Artist/Band Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      description: 'Used for the artist\'s page URL. Click Generate.',
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