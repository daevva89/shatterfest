import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@heroicons/react/24/outline'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    // Hero Section
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main hero/banner image (should be high quality, landscape orientation, 16:9 ratio like 1920x1080)',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        }),
      ],
    }),
    
    // Call To Action Button
    defineField({
      name: 'primaryCTA',
      title: 'Call-to-Action Button',
      type: 'object',
      description: 'Main action button (typically for tickets)',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          description: 'What the button says (e.g., "GET TICKETS")',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'Button URL',
          type: 'url',
          description: 'Where the button links to',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'priceInfo',
          title: 'Price Information',
          type: 'string',
          description: 'Price information shown below the button (e.g., "€46 / 230 RON - Presale")',
        }),
        defineField({
          name: 'isEnabled',
          title: 'Enable Button',
          type: 'boolean',
          description: 'Turn this button on/off',
          initialValue: true,
        }),
      ],
    }),
    
    // Intro Section
    defineField({
      name: 'introTitle',
      title: 'Intro Section Title',
      type: 'string',
      description: 'Title for the introduction section',
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Festival introduction/welcome message with rich text formatting',
    }),
    
    // Quick Info Section
    defineField({
      name: 'quickInfoTitle',
      title: 'Quick Info Section Title',
      type: 'string',
      description: 'Title for the quick info section',
    }),
    defineField({
      name: 'quickInfoItems',
      title: 'Quick Info Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'infoItem',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'iconType',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Calendar', value: 'calendar' },
                  { title: 'Location', value: 'location' },
                  { title: 'Ticket', value: 'ticket' },
                  { title: 'Music', value: 'music' },
                  { title: 'Info', value: 'info' },
                ],
              },
              description: 'Select the icon to display with this info',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
      description: 'Key information items displayed prominently on the homepage',
    }),
    
    // Lineup Highlights Section
    defineField({
      name: 'lineupHighlightsTitle',
      title: 'Lineup Highlights Title',
      type: 'string',
      description: 'Title for the lineup highlights section',
    }),
    defineField({
      name: 'featuredArtists',
      title: 'Featured Artists',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'artist' }],
        },
      ],
      description: 'Select artists to feature on the homepage (will appear in the order selected)',
    }),
    
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      description: 'Search engine optimization settings',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title used for browser tab and search results',
          validation: (Rule) => Rule.max(60).warning('Should be under 60 characters'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description that appears in search results',
          validation: (Rule) => Rule.max(160).warning('Should be under 160 characters'),
        }),
        defineField({
          name: 'shareImage',
          title: 'Social Sharing Image',
          type: 'image',
          description: 'Image used when sharing the homepage on social media',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
  // There should only be one homepage document
  preview: {
    select: {
      title: 'seo.metaTitle',
      media: 'heroImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Homepage',
        subtitle: 'Main page configuration',
        media: media,
      };
    },
  },
}) 