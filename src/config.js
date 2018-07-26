export default {
  navigationItems: [
    {
      id: 'calculator',
      name: 'Instant calculator',
    },
    {
      id: 'rgb2hex',
      name: 'RGB to Hex to RGB',
    },
    {
      id: 'slug',
      name: 'Slug',
    },
    {
      id: 'casing',
      name: 'Casing',
    },
    {
      id: 'base64',
      name: 'Base64 Decode/Encode',
      children: [
        {
          id: 'decode',
          name: 'Decode',
        },
        {
          id: 'encode',
          name: 'Encode',
        },
      ]
    },
  ],
};
