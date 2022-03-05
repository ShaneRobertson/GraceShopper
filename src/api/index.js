// axios does not need json conversion
// doesn't need .then chaining
import axios from "axios";

// adds header with user token to all auth requests
const axiosWithAuth = () => {
  const token = `Bearer ${localStorage.getItem("token")}`;
  return axios.create({ headers: { Authorization: token } });
};

export async function getUsers() {
  try {
    const { data } = await axiosWithAuth().get("/api/users");
    return data;
  } catch (error) {
    throw error;
  }
}

// get all products > products route
export async function getProducts() {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (error) {
    throw error;
  }
}

// get product by id > products/productId route
export async function getProductById(productId) {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

// grabs cart for user
export async function getCart() {
  try {
    const { data } = await axiosWithAuth().get(`/api/cart`);
    return data;
  } catch (error) {
    throw error;
  }
}

// adds product to cart
export async function addToCart(userId, productId) {
  const dataToSend = {
    userId,
    productId,
  };

  try {
    console.log(`line 58 says: ${dataToSend}`);
    if (dataToSend.userId && dataToSend.productId.length > 0) {
      const { data } = await axiosWithAuth().patch(`/api/cart`, dataToSend);
      return data;
    }
  } catch (error) {
    throw error;
  }
}

// creates user > register route/endpoint
// user object fields required
export async function createUser(username, email, role, password) {
  const dataToSend = { username, email, role, password };
  try {
    if (
      dataToSend.username.length > 0 &&
      dataToSend.email.length > 0 &&
      dataToSend.role.length > 0 &&
      dataToSend.password.length > 0
    ) {
      const { data } = await axios.post(`/api/register`, dataToSend);

      return data;
    }
  } catch (error) {
    console.dir(error);
    throw error;
  }
}

// user login
export async function loginUser(username, password) {
  const dataToSend = { username, password };
  try {
    if (dataToSend.username.length > 0 && dataToSend.password.length > 0) {
      const { data } = await axios.post(`/api/login`, dataToSend);
      return data;
    }
  } catch (error) {
    throw error;
  }
}

// Send google data token to backend
export async function sendGoogleData(googleData) {
  const token = googleData.tokenId;
  const dataToSend = { token };

  try {
    if (dataToSend.token.length > 0) {
      const { data } = await axios.post(`/api/google-login`, dataToSend);

      return data;
    }
  } catch (error) {
    throw error;
  }
}

// update user
// user object fields required
export async function updateUser(username, email, password, userId) {
  const dataToSend = { username, email, password, userId };
  try {
    const { data } = await axiosWithAuth().patch(
      `/api/users/${userId}/update`,
      dataToSend
    );
    return data;
  } catch (error) {
    throw error;
  }
}

//Update Role
export async function updateRole(userId, role) {
  try {
    const { data } = await axios.patch(`/api/users/${userId}/role`, { role });
    return data;
  } catch (error) {
    throw error;
  }
}

// get orders for admin
export async function getOrders() {
  try {
    const { data } = await axiosWithAuth().get("/api/orders/admin");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOrder() {
  try {
    const { data } = await axiosWithAuth().get("/api/orders");
    return data;
  } catch (error) {
    throw error;
  }
}

// get orders for logged in user
export async function getOrderById() {
  try {
    const { data } = await axiosWithAuth().get(`/api/orders`);
    return data;
  } catch (error) {
    throw error;
  }
}

// create product
// fields product object - no id
export async function createProduct(
  name,
  description,
  photoUrl,
  department,
  price
) {
  const dataToSend = {
    name,
    description,
    photoUrl,
    department,
    price,
  };
  try {
    if (
      dataToSend.name.length > 0 &&
      dataToSend.description.length > 0 &&
      dataToSend.photoUrl.length > 0 &&
      dataToSend.department.length > 0 &&
      dataToSend.price.length > 0
    ) {
      dataToSend.count = 1;
      dataToSend.quantity = 1;

      const { data } = await axiosWithAuth().post(`/api/products`, dataToSend);
      return data;
    }
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(
  name,
  description,
  photoUrl,
  price,
  department,
  productId
) {
  const fieldsObj = { name, description, photoUrl, price, department };

  try {
    const { data } = await axios.patch(
      `/api/products/${productId}/update`,
      fieldsObj
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(userId) {
  const dataToSend = { userId };
  try {
    const { data } = await axiosWithAuth().delete(
      `/api/users/${userId}`,
      dataToSend
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(productId) {
  const dataToSend = { productId };
  try {
    const { data } = await axiosWithAuth().delete(
      `/api/products/${productId}`,
      dataToSend
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeFromCart(userId, productId) {
  const dataToSend = {
    userId,
    productId,
  };

  try {
    if (dataToSend.userId && dataToSend.productId) {
      const { data } = await axiosWithAuth().patch(
        `/api/cart/remove`,
        dataToSend
      );
      return data;
    }
  } catch (error) {
    throw error;
  }
}

export async function addCount(id) {
  const dataToSend = {
    id,
  };

  try {
    if (dataToSend.id) {
      const { data } = await axiosWithAuth().patch(`/api/count`, dataToSend);
      return data;
    }
  } catch (error) {
    throw error;
  }
}

export async function subtractCount(id) {
  const dataToSend = {
    id,
  };

  try {
    if (dataToSend.id) {
      const { data } = await axiosWithAuth().patch(
        `/api/count/subtract`,
        dataToSend
      );
      return data;
    }
  } catch (error) {
    throw error;
  }
}

export async function sendToken(total, token) {
  const dataToSend = {
    total,
    token,
  };

  try {
    if (dataToSend.total && dataToSend.token) {
      const { data } = await axiosWithAuth().post(`/api/stripe`, dataToSend);

      return data;
    }
  } catch (error) {
    throw error;
  }
}

export async function checkout(userId, cartId) {
  const dataToSend = { userId, cartId };

  try {
    if (dataToSend.userId && dataToSend.cartId) {
      const { data } = await axios.post(`/api/checkout`, dataToSend);

      return data;
    }
  } catch (error) {
    throw error;
  }
}

export async function checkOrdersAndCart(userId) {
  try {
    const { data } = await axiosWithAuth().get(`/api/orders/${userId}`);
  } catch (error) {
    throw error;
  }
}
