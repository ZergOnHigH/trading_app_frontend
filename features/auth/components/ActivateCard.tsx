"use client";

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import React from 'react'
import { useLazyActivateQuery } from '../authApi'
import { useParams, useRouter } from 'next/navigation';

const ActivateCard = () => {

  const params = useParams();
  const router = useRouter();

  const [activate, state] = useLazyActivateQuery();

  const handleActivate = async () => {
    await activate(params.token as string);
    router.push("/autoryzacja")
  }

  return (
     <Card className=" p-4">
        <h2 className='text-2xl'>Aktywuj swoje konto</h2>
        <Button onClick={handleActivate}>{state.isLoading ? 'Ładowanie...' : 'Potwierdź'}</Button>
     </Card>
  )
}

export default ActivateCard