import { AirtableRecordType, CoffeeStoreType } from '@/types';
import Airtable, { FieldSet, Record, Records } from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  'appPd93fHqaLm79H0'
);

const table = base('coffee-stores');

// Define the fields interface for type safety


const getMinifiedRecords = (records: Records<FieldSet>) => {
  return records.map((record: Record<FieldSet>) => {
    return {
      recordId: record.id,
      voting: record.fields.voting ?? 0,
      ...record.fields,
    };
  });
};

const findRecordByFilter = async (id: string) => {
  const findRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return getMinifiedRecords(findRecords);
};

export const createCoffeeStore = async (
  coffeeStore: CoffeeStoreType,
  id: string
) => {
  const { name, address, voting = 0, imgUrl } = coffeeStore;

  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length === 0) {
        const createRecords = await table.create([
          {
            fields: {
              id,
              name,
              address,
              voting,
              imgUrl,
            },
          },
        ]);
        if (createRecords.length > 0) {
         
          return getMinifiedRecords(createRecords);
        }
      } else {
        
        return records;
      }
    } else {
      console.error('Store id is missing');
    }
  } catch (error) {
    console.error('Error creating or finding a store', error);
  }
};

export const updateCoffeeStore = async (id: string) => {
  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length !== 0) {
        const record = records[0];
        const updatedVoting = Number(record.voting) + 1;

        const updatedRecords = await table.update([
          {
            id: record.recordId,
            fields: {
              voting: updatedVoting,
            },
          },
        ]);

        if (updatedRecords.length > 0) {
         
          return getMinifiedRecords(updatedRecords);
        }
      } else {
        console.log('Coffee store does not exist');
      }
    } else {
      console.error('Store id is missing');
    }
  } catch (error) {
    console.error('Error upvoting a coffee store', error);
  }
};