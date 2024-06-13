# API Documentation

This document outlines the endpoints available in the API, including details on the expected inputs and outputs.

## Base URL

http://localhost:8000


### Endpoints

#### 1. Get Coffee Data

- **GET** `/data`
  - **Description**: Retrieve all coffee product data.
  - **Response**:
    - **200 OK**: Returns an array of coffee products.
    - **500 Internal Server Error**: Error message "Failed to retrieve data."

#### 2. Get Cart Items

- **GET** `/cart`
  - **Description**: Fetch all items currently in the cart.
  - **Response**:
    - **200 OK**: Returns an array of cart items.
    - **500 Internal Server Error**: Error message "Failed to retrieve cart items."

#### 3. Get Reviews

- **GET** `/review`
  - **Description**: Fetch all reviews.
  - **Response**:
    - **200 OK**: Returns an array of reviews.
    - **500 Internal Server Error**: Error message "Failed to retrieve reviews."

#### 4. Get User Data

- **GET** `/user`
  - **Description**: Retrieve user login details.
  - **Response**:
    - **200 OK**: Returns an array of user details.
    - **500 Internal Server Error**: Error message "Failed to retrieve user details."

#### 5. Add to Cart

- **POST** `/addToCart`
  - **Description**: Add a new product to the cart.
  - **Body**:
    ```json
    {
      "name": "Product Name",
      "quantity": "Product Quantity",
      "flavor": "Product Flavor",
      "image": "Product Image URL",
      "price": "Product Price"
    }
    ```
  - **Response**:
    - **200 OK**: Success message "Product added to cart successfully."
    - **400 Bad Request**: Error message "Missing product information."
    - **500 Internal Server Error**: Error message "Failed to add product to cart."

#### 6. Add to Contact

- **POST** `/addToContact`
  - **Description**: Submit contact information.
  - **Body**:
    ```json
    {
      "name": "Contact Name",
      "date": "Contact Date",
      "info": "Contact Information"
    }
    ```
  - **Response**:
    - **200 OK**: Success message "Contact information submitted successfully."
    - **400 Bad Request**: Error message "Missing contact information."
    - **500 Internal Server Error**: Error message "Failed to submit contact information."

#### 7. Remove from Cart

- **POST** `/removeCart`
  - **Description**: Remove a product from the cart.
  - **Body**:
    ```json
    {
      "name": "Product Name",
      "flavor": "Product Flavor",
      "quantity": "Product Quantity"
    }
    ```
  - **Response**:
    - **200 OK**: Success message "Product removed from cart successfully."
    - **400 Bad Request**: Error message "Missing product details for removal."
    - **500 Internal Server Error**: Error message "Failed to remove product from cart."

#### 8. Add Review

- **POST** `/addToReviews`
  - **Description**: Add a new review.
  - **Body**:
    ```json
    {
      "name": "Reviewer's Name",
      "coffee": "Coffee Name",
      "review": "Review Text"
    }
    ```
  - **Response**:
    - **200 OK**: Success message "Review added successfully."
    - **400 Bad Request**: Error message "Missing review details."
    - **500 Internal Server Error**: Error message "Failed to add review."

### Running the Server

Run the server using the following command:

node app.js

The server listens on port 8000 by default, but this can be configured via the `PORT` environment variable.
