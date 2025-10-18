import { inngest } from '@/inngest/client';
import { createAgent, openai } from '@inngest/agent-kit';
export const helloWorld = inngest.createFunction(
   { id: 'hello-world' },
   { event: 'test/hello.world' },
   async ({ event, step }) => {
      const codeAgent = createAgent({
         name: 'code-agent',
         system:
            'You are an expert Next.JS developer and you write readable and maintainable code. You wrire simple Next.js and React snippets.',
         model: openai({ model: 'gpt-4o' }),
      });

      const { output } = await codeAgent.run(
         `write the following snippet: ${event.data.input}`
      );
      console.log(output);

      return { output };
   }
);
