'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
   const trpc = useTRPC();
   const router = useRouter();
   const createProject = useMutation(
      trpc.projects.create.mutationOptions({
         onError: (error) => toast.error(error.message),
         onSuccess: (data) => {
            router.push(`/projects/${data.id}`);
         },
      })
   );
   const [input, setInput] = useState('');

   return (
      <div className='h-screen w-screen flex items-center justify-center'>
         <div className='max-w-7xl mx-auto flex items-center flex-col gap-y-4 justify-center'>
            <Input value={input} onChange={(e) => setInput(e.target.value)} />
            <Button
               className='cursor-pointer'
               disabled={createProject.isPending}
               onClick={() => createProject.mutate({ value: input })}
            >
               Submit
            </Button>
         </div>
      </div>
   );
};
export default Page;
