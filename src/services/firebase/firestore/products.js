import { doc, getDoc, getDocs, collection, query, where, orderBy, writeBatch } from "firebase/firestore";
import { db } from "../firebaseconfig";

export const getProducts = (categoryId) => {
  return new Promise((resolve, reject) => {
    const collectionPc = categoryId
      ? query(
          collection(db, "pcParts"),
          where("category", "==", categoryId),
          orderBy("price", "asc")
        )
      : query(
          collection(db, "pcParts"),
          orderBy("category"),
          orderBy("price", "asc")
        );

    getDocs(collectionPc)
      .then((response) => {
        const partsAdapted = response.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        resolve(partsAdapted);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getProductById = (productId) => {
  return new Promise((resolve, reject) => {
    const collectionPc = doc(db, "pcParts", productId);
    const collectionsPc = collection(db, "pcParts");

    Promise.all([
      getDocs(collectionsPc).then((response) => {
        const partsId = response.docs.map((doc) => {
          return { id: doc.id };
        });
        return partsId;
      }),
      getDoc(collectionPc).then((response) => {
        const data = response.data();
        const partsAdapted = { id: response.id, ...data };
        return partsAdapted;
      }),
    ])
      .then(([partsId, partsAdapted]) => {
        resolve({ partsId, partsAdapted });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateProductsStock = async (cartProducts, cart) => {
  const outOfStock = [];
  const batch = writeBatch(db);
  cartProducts.forEach((cartProduct) => {
    const cartProductData = cartProduct.data();
    const stockDb = cartProductData.stock;
    const productInCart = cart.find(
      (prodCart) => prodCart.id === cartProduct.id
    );
    const prodQty = productInCart?.quantity || 0;
    if (stockDb >= prodQty) {
      batch.update(cartProduct.ref, { stock: stockDb - prodQty });
    } else {
      outOfStock.push({ id: cartProducts.id, ...cartProduct });
    }
  });
  await batch.commit();
  return outOfStock;
};
