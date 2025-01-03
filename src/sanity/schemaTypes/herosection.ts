export default {
    name: 'heroSection',
    title: 'Hero Section',
    type: 'document',
    fields: [
      {
        name: 'heading',
        type: 'string',
        title: 'Heading',
      },
      {
        name: 'subtext',
        type: 'text',
        title: 'Subtext',
      },
      {
        name: 'image',
        type: 'image',
        title: 'Hero Image',
        options: { hotspot: true },
      },
    ],
  };
  