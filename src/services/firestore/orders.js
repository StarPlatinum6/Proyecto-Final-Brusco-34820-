import { doc, getDoc, getDocs, setDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseconfig";

export const getOrders = () => {
  return new Promise((resolve, reject) => {
    const collectionOrders = collection(db, "orders");
    getDocs(collectionOrders)
      .then((response) => {
        const ordersId = response.docs.map((doc) => {
          return { id: doc.id };
        });
        resolve(ordersId);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getOrderById = (orderId) => {
  return new Promise((resolve, reject) => {
    const order = doc(db, "orders", orderId);

    getDoc(order)
      .then((response) => {
        const data = response.data();
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUserOrders = (user) => {
  return new Promise((resolve, reject) => {
    getDocs(collection(db, "orders"))
      .then((response) => {
        const userOrders = response.docs.map((doc) => {
          const post = doc.data();
          return {
            id: doc.id,
            email: post.buyer.email,
            total: post.total,
            date: post.date.seconds,
          };
        });
        const userOrdersFiltered = userOrders.filter(
          (order) => order.email === user.email
        );
        const userOrdersFilteredByDate = userOrdersFiltered.sort(
          (order1, order2) => order1.date - order2.date
        );
        resolve(userOrdersFilteredByDate);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const saveOrder = async (order) => {
  const ordersCollectionRef = collection(db, "orders");
  const orderRef = doc(ordersCollectionRef);
  await setDoc(orderRef, order);
  return { ...order, id: orderRef.id };
};
