const baseUrl = "https://fakestoreapi.com";

export default {
  async getAllProducts() {
    const response = await fetch(`${baseUrl}/products`);
    const result = await response.json();
    return result;
  },

  async getProduct(id) {
    const response = await fetch(`${baseUrl}/products/${id}`);
    const result = await response.json();
    return result;
  },

  async authUser(username, password) {
    console.log("hum");
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    console.log("hum1");
    const result = await response.json();
    return result;
  },
};
