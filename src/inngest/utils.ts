import Sandbox from '@e2b/code-interpreter';
import { AgentResult, TextMessage } from '@inngest/agent-kit';

export async function getSandbox(sandboxId: string) {
   return await Sandbox.connect(sandboxId);
}

export const lastAssisatanceTextMessageContent = (result: AgentResult) => {
   const lastAssisatanceTextMessageIndex = result.output.findLastIndex(
      (message) => (message.role = 'assistant')
   );

   const message = result.output[lastAssisatanceTextMessageIndex] as
      | TextMessage
      | undefined;

   return message?.content
      ? typeof message.content === 'string'
         ? message.content
         : message.content.map((c) => c.text).join('')
      : undefined;
};
