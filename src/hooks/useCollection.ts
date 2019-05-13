import { useEffect, useState, useRef } from 'react';
import { Collection, Document } from 'firestorter';

export const useCollection = (path: string = '') => {
  const [collection, setCollection] = useState<Collection<Document<object>>>(
    []
  );
  const collectionRef = useRef(null);

  useEffect(() => {
    if (!path) return;
    const collection = new Collection(path);
    setCollection(collection);
    // const generateSet = snapshot => {
    //   const set = [];
    //   snapshot.forEach(doc => {
    //     const raw = doc.data();
    //     set.push({
    //       ...raw,
    //       uid: doc.id,
    //       date: raw.date ? new Date(raw.date.seconds * 1000) : '',
    //       ref: doc.ref,
    //     });
    //   });
    //   return set;
    // };

    // let unsubscribe = () => {};

    // async function fetchData() {

    // }
    // fetchData();

    // return () => unsubscribe();
  }, [path]);

  return [collection];
};
