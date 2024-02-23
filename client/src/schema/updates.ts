import { defineType } from 'sanity';
import style from 'styled-jsx/style';
import { height } from 'tailwindcss/defaultTheme';

export default defineType({
  name: 'Updates',
  title: 'Updates',
  type: 'document',
  fields: [
    {
      name: 'update',
      title: 'Update',
      type: 'string',
    },
    {
      name: 'updateDesc', // Change from 'UpdateDesc' to 'updateDesc'
      title: 'Update Description',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    },
    // Add other fields as needed
  ],
  
});
