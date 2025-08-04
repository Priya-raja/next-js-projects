import React from 'react'
import Banner from '../components/banner.client';
import Card from '@/components/card.server';

import { fetchCoffeeStores } from '@/lib/coffee-stores';
import { CoffeeStoreType } from '@/types';

async function getData(){
   const TORONTO_LONG_LAT = '-79.3789680885594%2C43.653833032607096';
  return await fetchCoffeeStores(TORONTO_LONG_LAT, 6);
}
export default async function Home (){


  const coffeeStores = await getData();
  console.log(coffeeStores);
//   const coffeeStores = [
//   {
//     "name": "Blue Bottle Coffee DIFC",
//     "imgUrl": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop"
//   },
//   {
//     "name": "Caribou Coffee Mall of the Emirates",
//     "imgUrl": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop"
//   },
//   {
//     "name": "Starbucks Dubai Mall",
//     "imgUrl": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop"
//   },
//   {
//     "name": "Tom & Serg Al Quoz",
//     "imgUrl": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop"
//   },
//   {
//     "name": "Beans & Beats JBR",
//     "imgUrl": "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&h=300&fit=crop"
//   },
//   {
//     "name": "Common Grounds Downtown",
//     "imgUrl": "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop"
//   }
// ]


  return (
    <main className="container mx-auto px-4">
      <Banner 
     
        buttonText="View nearby store"
      />
      <div>
       <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Dubai Coffee Stores
            </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {coffeeStores.map((store: CoffeeStoreType, index:number) => (
          <Card
            key={index}
            name={store.name}
            imgUrl={store.imgUrl}
            href={`/coffee-store/${store.id}`}
            
          />
        ))}
        </div>
      </div>
    </main>
  );


}

