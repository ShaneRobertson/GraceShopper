import React from "react";
import Routes from "./utils/Routes";

const App = () => {
<<<<<<< HEAD
  const [products, setProducts] = useState([]);

  const [token, setToken] = useState("")
  const [role, setRole] = useState("")
 // console.log("token in app from login", token)
  //console.log("role in app from login", role)

  //const [productCount, setProductCount] = useState(0) consider storing productCount in App.js so the cart can access

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response.allProducts);
      })
      .catch((error) => {
        setProducts(error.message);
      });
  }, []);
 

  return (
    <div className="app">
      <PageHeader setToken={setToken} setRole={setRole} token={token} />

      <DisplayAllProducts
        products={
          products
        } /*  setProductCount={setProductCount} productCount={productCount}  */
      />
    <DisplayAllUsers />
      {/* return only needs to display Routes 
       it contains all components with respective paths */}
      {/*  <Routes></Routes> */}
    </div>
  );
=======
  return <Routes />;
>>>>>>> master
};

export default App;
