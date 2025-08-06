'use server';

import { updateCoffeeStore } from '@/lib/airtable';

type State = {
  id: string;
  voting: number;
};

export const upvoteAction = async (prevState: State | undefined) => {
  if (!prevState) return undefined;

 
  const { id } = prevState;

  const data = await updateCoffeeStore(id);
 

  if (data) {
    return {
      voting: data.length > 0 ? data[0].voting : 0,
      id,
    };
  }
  return prevState;
};