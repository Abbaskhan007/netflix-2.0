import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/counter/userSlice";
import { loadStripe } from "@stripe/stripe-js";

export default function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async subscription => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, []);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then(querySnapshot => {
        const products = {};
        querySnapshot.forEach(async productDoc => {
          console.log("product ----", productDoc);
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach(price => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  const onLoadCheckOut = async priceId => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async snap => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51HgrsmFQ8VNGXjFtwPUTdZUmb1P15SIGe46mCpYt7ftLHjdCdYfGc2LH9nb6SnLcw3bxHIRVbwjPJNoG4qG2YhaH00BHd7uHbg"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  console.log("Products", products);

  return (
    <div>
      {subscription && (
        <p>
          Renewal Date: {"  "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div className="flex flex-row justify-between items-start p-[20px]">
            <div>
              <h4 className="text-[16px] font-medium mb-1">
                {productData.name}
              </h4>
              <h4 className="text-sm font-light">{productData.description}</h4>
            </div>
            <button
              onClick={() => onLoadCheckOut(productData.prices.priceId)}
              className={`${
                isCurrentPackage ? "bg-[gray]" : "bg-[#e50914]"
              } px-[20px] py-[10px] rounded-sm font-[600px] text-[16px] cursor-pointer border-none outline-none `}
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
