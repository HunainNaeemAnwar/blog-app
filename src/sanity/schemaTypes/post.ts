export default {
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    // Title of the blog
    {
      name: "title",
      title: "Title",
      type: "string",
    },

    // Slug for the blog (used in URLs)
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },

    // Short description for the blog
    {
      name: "description",
      title: "Description",
      type: "string",
    },

    // Main image for the blog
    {
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true, // Allows cropping in Sanity Studio
      },
    },

    // Long description for the blog
    {
      name: "longDescription",
      title: "Long Description",
      type: "string",
    },
    {
      name: "summary",
      title: "Summary",
      type: "string",
    },
  ],
};
