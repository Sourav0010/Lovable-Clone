'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
   const trpc = useTRPC();
   const { data: messages } = useQuery(trpc.messages.getMany.queryOptions());
   const createMessage = useMutation(
      trpc.messages.create.mutationOptions({
         onSuccess: () => {
            toast.success('Background Job Started');
         },
      })
   );
   const [input, setInput] = useState('');

   return (
      <div className='p-2 max-w-9xl mx-auto'>
         <Input value={input} onChange={(e) => setInput(e.target.value)} />
         <Button
            className='cursor-pointer'
            disabled={createMessage.isPending}
            onClick={() => createMessage.mutate({ value: input })}
         >
            createMessage Backgeound Job
         </Button>
         {JSON.stringify(messages)}
      </div>
   );
};
export default Page;
