import React from 'react'

import Card from '@/components/card.server';
import NearbyCoffeeStores from '@/components/nearby-coffee-stores.client';
import { fetchCoffeeStores } from '@/lib/coffee-stores';
import { CoffeeStoreType } from '@/types';

async function getData() {

  if(!process.env.MAPBOX_API || !process.env.UNSPLASH_ACCESS_KEY || !process.env.AIRTABLE_TOKEN) {
    throw new Error('Missing environment variables. Please check your .env.local file.');
  }
   const JAPAN_LONG_LAT = '138.5161692869752%2C36.22212845217132';
  return await fetchCoffeeStores(JAPAN_LONG_LAT, 6);
}


export default async function Home (){
  const coffeeStores = await getData();


  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <NearbyCoffeeStores />
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Coffee Stores
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {coffeeStores.map((coffeeStore: CoffeeStoreType, idx: number) => (
              <Card
                key={`${coffeeStore.name}-${coffeeStore.id}`}
                name={coffeeStore.name}
                imgUrl={coffeeStore.imgUrl}
                href={`/coffee-store/${coffeeStore.id}?id=${idx}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );



}

