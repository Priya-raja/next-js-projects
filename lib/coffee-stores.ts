import { MapboxType } from "@/types";

const getListOfCoffeeStorePhotos = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query="coffee shop"&page=1&perPage=10&orientation=landscape`
    );
    const photos = await response.json();
    const results = photos?.results || [];
    return results?.map((result: { urls: string }) => result.urls["small"]);
  } catch (error) {
    console.error("Error retrieving a photo", error);
  }
};

const transformCoffeeData = (
  idx: number,
  result: MapboxType,
  photos: Array<string>
) => {
  return {
    id: result.id,
    address: result.properties?.full_address || "",
    name: result.properties?.name,
    imgUrl: photos.length > 0 ? photos[idx] : "",
  };
};

export const fetchCoffeeStores = async (longLat: string, limit: number) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=coffee&proximity=${longLat}&limit=${limit}&access_token=${process.env.MAPBOX_API}`
    );
    const data = await response.json();
    const photos = await getListOfCoffeeStorePhotos();

    const coffeeStore =
      data?.features?.map((result: MapboxType, idx: number) =>
        transformCoffeeData(idx, result, photos)
      ) || [];
    return coffeeStore.length > 0 ? coffeeStore : {};
  } catch (error) {
    console.error("Error while fetching coffee stores", error);
  }
};

export const fetchCoffeeStore = async (id: string, queryId: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${id}&proximity=ip&access_token=${process.env.MAPBOX_API}`
    );
    const data = await response.json();
    const photos = await getListOfCoffeeStorePhotos();

    const coffeeStore = data.features.map((result: MapboxType) =>
      transformCoffeeData(parseInt(queryId), result, photos)
    );
    return coffeeStore.length > 0 ? coffeeStore[0] : {};
  } catch (error) {
    console.error("Error while fetching coffee stores", error);
  }
};
