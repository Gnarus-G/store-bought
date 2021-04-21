# store-bought
Determines if a supported store has stock of a product.

## Install
    npm install @gnarus-g/store-bought
## Usage
```ts
const storeBought = await getStoreBought();
await storeBought(storeName, itemNumber, stream => {
    //outputStream can any `Writable` stream of your preference or design.
    stream.pipe(outputStream)
});
```
or...
```ts
const storeBought = await getStoreBought();
const response = await storeBought(storeName, itemNumber);
```
## Contribute
If you'd like.
