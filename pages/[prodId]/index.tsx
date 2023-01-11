import Link from "next/link";
import React from "react";
import styles from "../../styles/Product.module.css";
import { useRouter } from "next/router";
type prodType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: String;
  image: string;
  rating: { rate: number; count: number };
};

type propsType = {
  data: prodType;
  ImageProcessed: any;
};

type dataType = prodType[];

const Index = (props: propsType) => {
  const router = useRouter();

  if (router.isFallback == true) {
    console.log("run loading");
    return (
      <>
        <div className={styles.content}>
          <img src="" alt="Loading" width="323" height="323" />
        </div>
        <div className={styles.content}>
          <h3>Loading ...</h3>
          <p>Price - Loading ...</p>
          <p>category - Loading ...</p>
          <p>Description - Loading ...</p>
          <p>
            Rating - Rate: Loading ... <br />
            Count: Loading ...
          </p>
          <button className={styles.buy}>Buy</button>

          <button className={styles.buy}>Home</button>
        </div>
      </>
    );
  }
  const prod = props.data;
  return (
    <>
      <div className={styles.content}>
        <img
          src={prod.image}
          alt="this is alternative"
          width="323"
          height="323"
        />
      </div>
      <div className={styles.content}>
        <h3>{prod.title}</h3>
        <p>Price - {prod.price}</p>
        <p>category - {prod.category}</p>
        <p>Description - {prod.description}</p>
        <p>
          Rating - Rate: {prod.rating.rate} <br />
          Count: {prod.rating.count}
        </p>
        <button className={styles.buy}>Buy</button>
        <Link href="/">
          <button className={styles.buy}>Home</button>
        </Link>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  /*const response = await fetch("https://fakestoreapi.com/products");
  let data = await response.json();
  const paths = data.map((prod: prodType) => {
    return {
      params: {
        prodId: `${prod.id}`,
      },
    };
  });*/
  return {
    paths: [
      { params: { prodId: "1" } },
      { params: { prodId: "2" } },
      { params: { prodId: "3" } },
      { params: { prodId: "4" } },
      { params: { prodId: "5" } },
      { params: { prodId: "6" } },
      { params: { prodId: "7" } },
      { params: { prodId: "8" } },
      { params: { prodId: "9" } },
      { params: { prodId: "10" } },
    ],
    fallback: true, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context: any) {
  const { params } = context;
  const response = await fetch(
    `https://fakestoreapi.com/products/${params.prodId}`
  );
  let data = await response.json();

  if (!data.id) {
    return {
      notFount: true,
    };
  }
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Index;
