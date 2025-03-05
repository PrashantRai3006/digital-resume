const axios = require("axios");

const getBillerList = async () => {
  try {
    const response = await axios.get("https://sandbox.cashfree.com/pg/bbps/billers", {
      headers: {
        Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with actual access token
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error("Error fetching billers:", error.response?.data);
  }
};

getBillerList();
