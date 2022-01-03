import axios from 'axios';

/**
* Client for the Shopify API
*/
class API {

  /**
  * Add products to cart
  * @param {object} items – Products to add
  * @param {string} sectionId – ID of the section that will get the HTML markup
  * @returns {object} Line items associated with the added items and sections
  */
  async addToCart(items, sectionId) {
    const formData = {
      items: items,
      sections: sectionId,
    };

    try {
      const { data } = await axios({
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        url: `${routes.cart_add_url}.js`,
        data: JSON.stringify(formData),
      });
      return data;
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  /**
  * Update the cart's line item quantities
  * @param {{
  *   id: number,
  *   quantity: number,
  *   sectionId: string
  * }} config – Contains the product variant,
  * the quantity and section to update
  */
  async updateCart(config) {
    const {
      id,
      quantity,
      sectionId,
    } = config;

    const formData = {
      updates: {
        [id]: quantity,
      },
      sections: sectionId,
    };

    try {
      const { data } = await axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        url: `${routes.cart_update_url}.js`,
        data: JSON.stringify(formData),
      });
      return data;
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  /**
  * Update a specific section with the use of Section Rendering API
  * @param {string} sectionId – Section ID
  * @returns {object} Section ID and its corresponding rendered HTML
  */
  async updateShopifySection(sectionId) {
    try {
      const {
        data: html
      } = await axios.get(`?section_id=${sectionId}`);
      return html;
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  /**
  * It is used to recommend related products for a specific product
  * @param {string} id – Product ID
  * @param {number} limit – Limits the number of results
  * @param {string} sectionId – section with which product
  *   recommendations will be rendered
  * @returns {string} HTML from a section rendered with
  *   product recommendations
  */
  async getRecommendedProducts(id, limit, sectionId) {
    try {
      const url = `/recommendations/products?section_id=${sectionId}&product_id=${id}&limit=${limit}`;
      const { data: html } = await axios.get(url);
      return html;
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  /**
  * Get data from a resource
  * @param {string} url – The path of the resource to obtain
  * @returns {object} Data from a resource
  */
  async read(url) {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
}

export default new API();
