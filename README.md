# ecommerce-microservices-app
This is an Inventory, Order and Users service for a microservices e-commerce application.

The project structure is of type Model-Service-Controller pattern, essential for maintaining clean, modular, and scalable code:

## system architecture

![image](https://github.com/user-attachments/assets/de15049a-e290-4afe-aab8-0309ad184ad8)


## steps to running the project
  ### 1. clone the project to your local machine
      git clone https://github.com/MlondiMchunu/ecommerce-microservices-app.git
  ### 2. install docker and navigate to the project directory and run (run locally): 
      docker compose up --build 

## testing apis
  ### 1. inventory service
  ##### 1.1 Create product
        Method: POST
        URL: http://localhost:3000/products
        Body (raw JSON):
        {   
          "name": "Apple Phone",
          "price": 399.99,   
          "description": "Iphone 7"
        }
   ##### 1.2. GET all products
         Method: GET
         URL: http://localhost:3000/products
   ##### 1.3 Get a Product by ID
         Method: GET
        URL: http://localhost:3000/products/{productId} (Replace {productId} with an actual ID from the previous request)
   ##### 1.4 Update a Product
         Method: PUT
         URL: http://localhost:3000/products/{productId}
         Body (raw JSON):
   ##### 1.5 Delete a Product
         Method: DELETE
         URL: http://localhost:3000/products/{productId} 

  ### 2. orders service
  ### 3. users service
