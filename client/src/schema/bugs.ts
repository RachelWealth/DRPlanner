import { defineType } from 'sanity';

export default defineType({
  name: 'BugsFix',
  title: 'Bugs fix',
  type: 'document',
  fields: [
    {
        name: 'BugDesc',
        title: 'Bug desc',
        type: 'string',
      },
      {
        name: 'BugsFix', // Change from 'bugs fix' to 'bugsFix' or 'bugs_fix'
        title: 'Bug fix',
        type: 'text',
      },
  ],
  
});
