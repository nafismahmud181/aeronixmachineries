import { config, collection, fields } from '@keystatic/core';

// Icons available for categories (Lucide icon names).
const categoryIcons = [
  'beef', 'croissant', 'apple', 'popcorn', 'soup', 'nut', 'snowflake',
  'cookie', 'cup-soda', 'fish', 'milk', 'wheat', 'egg', 'candy', 'coffee', 'factory'
];

export default config({
  // 'local' saves edits straight into this folder while running `npm run dev`.
  // For editing on the live site, change to { kind: 'github', repo: 'owner/repo' }.
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Aeronix Machinery' },
    navigation: { Catalog: ['products', 'categories'] }
  },
  collections: {
    categories: collection({
      label: 'Categories',
      slugField: 'name',
      path: 'src/content/categories/*',
      format: { data: 'json' },
      columns: ['name', 'order'],
      schema: {
        name: fields.slug({
          name: { label: 'Name' },
          slug: { label: 'Web address', description: 'Used in the page URL, e.g. /machines/meat-processing/' }
        }),
        subtitle: fields.text({ label: 'Short description', description: 'One line shown on the category tile, e.g. "Mixers, dividers, ovens"' }),
        icon: fields.select({
          label: 'Icon',
          options: categoryIcons.map(i => ({ label: i, value: i })),
          defaultValue: 'factory'
        }),
        image: fields.image({
          label: 'Photo',
          directory: 'public/images/categories',
          publicPath: '/images/categories/'
        }),
        order: fields.integer({ label: 'Sort order', defaultValue: 99 })
      }
    }),
    products: collection({
      label: 'Products',
      slugField: 'name',
      path: 'src/content/products/*',
      format: { data: 'json' },
      columns: ['name', 'model', 'category'],
      schema: {
        name: fields.slug({
          name: { label: 'Product name' },
          slug: { label: 'Web address', description: 'Used in the page URL' }
        }),
        model: fields.text({ label: 'Model number', validation: { isRequired: true } }),
        category: fields.relationship({ label: 'Category', collection: 'categories', validation: { isRequired: true } }),
        image: fields.image({
          label: 'Main photo',
          description: 'Square or 4:3 photo of the machine, ideally on a plain background',
          directory: 'public/images/products',
          publicPath: '/images/products/'
        }),
        description: fields.text({ label: 'Short description', multiline: true }),
        capacity: fields.text({ label: 'Capacity', description: 'e.g. 300–800 kg/h' }),
        power: fields.text({ label: 'Power', description: 'e.g. 4 kW' }),
        voltage: fields.text({ label: 'Voltage', description: 'e.g. 220V / 380V' }),
        weight: fields.text({ label: 'Weight' }),
        dimensions: fields.text({ label: 'Dimensions' }),
        scale: fields.select({
          label: 'Business size',
          options: [
            { label: 'Small business and factory', value: 'both' },
            { label: 'Small business', value: 'small' },
            { label: 'Factory', value: 'factory' }
          ],
          defaultValue: 'both'
        }),
        featured: fields.checkbox({ label: 'Show in "Popular machines" on the home page', defaultValue: false }),
        features: fields.array(fields.text({ label: 'Feature' }), {
          label: 'Why customers choose it',
          itemLabel: props => props.value || 'Feature'
        }),
        bestFor: fields.text({ label: 'Best for', multiline: true }),
        order: fields.integer({ label: 'Sort order', defaultValue: 99 })
      }
    })
  }
});
