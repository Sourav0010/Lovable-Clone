'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
   const trpc = useTRPC();
   const invoke = useMutation(
      trpc.invoke.mutationOptions({
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
         disabled={invoke.isPending}
         onClick={() => invoke.mutate({ input })}
      >
         Invoke Backgeound Job
      </Button>
   </div>
);
};
export default Page;
