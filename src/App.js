import { render } from "@testing-library/react";
import React from "react";
import Cart from "./Cart";
import NavBar from "./NavBar";
import firebase from "firebase/app";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
    };
    this.db = firebase.firestore();
    // this.increaseQuantity = this.increaseQuantity.bind(this);
    // this.testing();
  }
  componentDidMount() {
    // firebase
    //   .firestore()
    //   .collection("products")
    //   .get()
    //   .then((snapshot) => {
    //     console.log(snapshot);
    //     snapshot.docs.map((doc) => {
    //       console.log(doc.data());
    //     });

    //     const products = snapshot.docs.map((doc) => {
    //       const data = doc.data();
    //       data["id"] = doc.id;
    //       return data;
    //     });
    //     this.setState({ products, loading: false });
    //   });
    this.db.collection("products")
    // .where('price','>' , 99) for quering the data .orderby() for sorting the data
    .onSnapshot((snapshot) => {
      console.log(snapshot);
      snapshot.docs.map((doc) => {
        console.log(doc.data());
      });

      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      this.setState({ products, loading: false });
    });
  }
  handleIncreaseQuantity = (product) => {
    console.log("Heyy please inc the qty of ", product);
    const { products } = this.state;
    // products is object and we use {} to destructring
    // other option to write is like
    // const products= this.state.products
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //   products,
    // });

    const docRef = this.db.collection("products").doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty + 1,
      })
      .then(() => {
        console.log("updated successfully");
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  handleDecreaseQuantity = (product) => {
    console.log("Heyy please inc the qty of ", product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    // products[index].qty -= 1;

    // this.setState({
    //   products,
    // });
    const docRef = this.db.collection("products").doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty - 1,
      })
      .then(() => {
        console.log("updated successfully");
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  handleDeleteProduct = (id) => {
    const { products } = this.state;

    // const items = products.filter((item) => item.id !== id); // [{}]
    // this.setState({
    //   products: items,
    // });
    const docRef = this.db.collection("products").doc(id);

    docRef
      .delete()
      .then(() => {
        console.log("deleted successfully");
      })
      .catch((error) => {
        console.log("error in deleting:", error);
      });
  };
  getCartCount = () => {
    const { products } = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.qty;
    });
    return count;
  };
  getCartTotal = () => {
    const { products } = this.state;
    let count = 0;
    products.map((product) => {
      count += product.qty * product.price;
    });
    return count;
  };
  addProduct = () => {
    this.db
      .collection("products")
      .add({ img: "", price: 900, qty: 3, title: "washing machine" })
      .then((docRef) => {
        console.log("product has been added", docRef);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <NavBar count={this.getCartCount()} />
        <button onClick={this.addProduct}>add a product</button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div>Total:{this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
