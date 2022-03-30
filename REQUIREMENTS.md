# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Products(Art pieces)

**user token**: `"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMSIsInVzZXJuYW1lIjoiYWhtZWQiLCJmaXJzdG5hbWUiOiJhaG1lZCIsImxhc3RuYW1lIjoic2FhZWQiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkOWl1RnlyN2FPWEdMbmtWZ0RTcEpKLm1aMEYuQkZBVHpnbHp2S1dOZ2oycjBmSUlQaXVka3kifSwiaWF0IjoxNjQ2NTE1MDYwfQ.3TTbJxo5RR-RCER0G_CVLSUm0HsecjkA0kB_L6akjMU"`

- `Index`: get (localhost:3000/art)
- `Show`: get (localhost:3000/art/:id)
- `update` [token required]: put (localhost:3000/art/:id)
- `Create` [token required]: post (localhost:3000/art)
- `delete` [token required]: delete (localhost:3000/art/:id)

- `Products by category` (args: product category):get (localhost:3000/art/:category)

#### Users

- `Index` : get (localhost:3000/users)
- `Show` : get (localhost:3000/users/:id)
- `Create` [token required]: post (localhost:3000/users)
- `delete` [token required]: delete (localhost:3000/users/:id) **`kindly reminder: don't delete the user with id=1 as this is the provided token`**
- `update` [token required]: put (localhost:3000/users/:id)
- `authenticate`: post (localhost:3000/users/authenticate)

#### Orders

- `Index`: get (localhost:3000/orders)
- `Show`: get (localhost:3000/orders/:id)
- `Create` [token required]: post (localhost:3000/orders)
- `delete` [token required]: delete (localhost:3000/orders/:id)
- `add to cart` [token required]: post (localhost:3000/orders/:id/products)
- `purchase` : post (localhost:3000/orders/:id/purchase)

<!-- - Current Order by user (args: user id)[token required] -->

- `Completed Orders`: get(localhost:3000/completed)

### reviews

- `Index`: get (localhost:3000/review)
- `Show`: get (localhost:3000/review/:id)
- `update` [token required]: put (localhost:3000/review/:id)
- `Create` [token required]: post (localhost:3000/review)
- `delete` [token required]: delete (localhost:3000/review/:id)

## Database schema
