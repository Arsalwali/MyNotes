const collection = jest.fn(() => {
  return {
    doc: jest.fn(() => {
      return {
        collection: collection,
        update: jest.fn(() => Promise.resolve(true)),
        onSnapshot: jest.fn(() => Promise.resolve(true)),
        get: jest.fn(() => Promise.resolve(true))
      }
    }),
    where: jest.fn(() => {
      return {
        get: jest.fn(() => Promise.resolve(true)),
        onSnapshot: jest.fn(() => Promise.resolve(true)),
      }
    })
  }
});

const Firestore = () => {
  return {
    collection
  }
}

Firestore.FieldValue = {
  serverTimestamp: jest.fn()
}