export default {
  navigationItems: [
    {
      id: 'calculator',
      component: 'Calculator',
      name: 'Instant calculator',
    },
    {
      id: 'rgb2hex',
      component: 'Rgb2Hex',
      name: 'RGB to Hex to RGB',
    },
    {
      id: 'slug',
      component: 'Slug',
      name: 'Slug',
    },
    {
      id: 'casing',
      component: 'Casing',
      name: 'Casing',
    },
    {
      id: 'base64',
      component: 'Base64',
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
    {
      id: 'mailtoencoder',
      component: 'MailTo Encoder',
      name: 'MailTo Encoder',
    },
    {
      id: 'favicons',
      component: 'Favicons',
      name: 'Favicons',
    },
    {
      id: 'snippets',
      component: 'Snippets',
      name: 'Snippets',
    },
  ],
};
