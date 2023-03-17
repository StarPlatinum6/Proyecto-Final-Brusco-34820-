import { query, collection, getDocs, where, documentId } from "firebase/firestore";
import { db } from "../firebaseconfig";

export const getCartDbProducts = async (cart) => {
  const cartProductsIds = cart.map((prod) => prod.id);
  const productsRef = query(
    collection(db, "pcParts"),
    where(documentId(), "in", cartProductsIds)
  );
  const cartProductsDB = await getDocs(productsRef);
  const { docs } = cartProductsDB;
  return docs;
};