## Setup Instruction and Running The Application Steps 
This project uses Node.js (22.10.2 ver) with Express (5.0.0 ver).
```bash
npm i
npm run build
npm start
```
All the required packages will be installed using this command `npm i`. \
Always build first using `npm run build` and start the server using `npm start`, whenever changes done in code.



## API Endpoints List
- Clone the github repository
- Install all the given requirements as provided in the installation part.
- The database used is PostgreSQL, as the use case provided in the assignment was relational in nature.
- Hit the APIs given in Postman collection. \
  (Postman Link: `https://imf-gadget-6862.postman.co/workspace/IMF-Gadget-Workspace~2c1d2ceb-6724-4b55-abd5-23126b322058/collection/34221288-1e7921ec-0682-4bee-bdd6-3a425a12fa2b?action=share&creator=34221288` )
- After registeration and login, provide the JWT token to bearer authentication in Postman. Only after that, other APIs will be accessible.
- To start the server, use command: `npm start` \
  Hit the API's (in Postman or Thunderclient) in this order: 
- 𝗣𝗢𝗦𝗧 `https://menu-management-qx91.onrender.com/auth/register`\
  Sample input:
  ```bash
    {
      "email": "dd@example.com",
      "password": "1234dd"
    }
  ```
  Description: Registers a new user. Credentials are securely stored.
- POST `https://menu-management-qx91.onrender.com/auth/login` \
  Sample input: 
  ```bash
    {
      "email": "dd@example.com",
      "password": "1234dd"
    }
  ```
  Description: Authenticates the user and provides a JWT token. Put this token in the bearer token authetication in Postman.
  ## Category APIs
- POST `https://menu-management-qx91.onrender.com/category/` \
  Sample input:
  ```bash
    request body: {
        "name": "Desert",
        "image": "https://validFoodDesert.com/img.jpg",
        "description": "Food",
        "tax_applicability": true,
        "tax": 7,
        "tax_type": "percent"
    }
  ```
  Description: Creates a new category. Tax applicability default value is false.
- GET `https://menu-management-qx91.onrender.com/category/` \
  Sample input: No input \
  Description: Fetch list of all avavilable categories.
- GET `https://menu-management-qx91.onrender.com/category/:identifier` \
  Sample input:
  ```bash
    Params Variable: id or name 
  ```
  Description: Fetch particular category with that provided if or name.
- PUT `https://menu-management-qx91.onrender.com/category/:id` \
  Sample input:
  ```bash
    Param Variable: id
    request body: {
        "name": "Chinese",
        "image": "https://validFoodChinese.com/img.jpg",
        "description": "Food",
        "tax_applicability": true,
        "tax": 7,
        "tax_type": "percent"
    }
  ```
  Description: Updates the details of category of which the id is provided.
  ## Sub Category APIs
- POST `https://menu-management-qx91.onrender.com/subCategory/` \
  Sample input: 
  ```bash
    request body: {
        "name": "Pasta",
        "category_id": 3,
        "image": "https://validFoodPasta.com/img.jpg",
        "description": "Authetic Italian Dish"
    }
  ```
  Description: creates a sub category of corresponding category. If tax applicability if undefined, then category tax applicability is considered and sub category tax is made equal to category tax.
- 𝗚ET `https://menu-management-qx91.onrender.com/subCategory/` \
  Sample input: No input \
  Description: Fetches all the sub categories.
- 𝗚ET `https://menu-management-qx91.onrender.com/subCategory/:identifier` \
  Sample input:
  ```bash
    Params Variable: id or name 
  ```
  Description: Fetches the sub category according to given id or name.
- 𝗚ET `https://menu-management-qx91.onrender.com/subCategory/category/:categoryId` \
  Sample input:
  ```bash
    Params Variable: categoryId 
  ```
  Description: Fetches all the sub categories associated with the given category id.
- PUT `https://menu-management-qx91.onrender.com/subCategory/:id` \
  Sample input:
  ```bash
    Param Variable: id
    request body: {
        "name": "Chinese",
        "image": "https://validFoodChinese.com/img.jpg",
        "description": "Food",
        "tax_applicability": true,
        "tax": 7,
        "tax_type": "percent"
    }
  ```
  Description: Updates the details of sub category of which the id is provided.
  ## Item APIs
- POST `https://menu-management-qx91.onrender.com/item/` \
  Sample input:
  ```bash
  Request body:  {
        "name": "NonVeg Overload",
        "sub_category_id": 4,
        "base_amount": 70,
        "discount": 6,
        "image": "https://Overload.com/img.jpg",
        "description": "A veg Italian pizza",
        "tax_applicability": true,
        "tax": 10
    }
  ```
  Description: FCreates item associated with provided category id or sub category id or both.
- 𝗚ET `https://menu-management-qx91.onrender.com/item/` \
  Sample input: No input \
  Description: Fetches all the items.
- 𝗚ET `https://menu-management-qx91.onrender.com/item/search?name` \
  Sample input:
  ```bash
  Query Variable: name
  ```
  Description: Search for an item whose name is provided in the query params.
- 𝗚ET `https://menu-management-qx91.onrender.com/item/:identifier` \
  Sample input:
  ```bash
    Params Variable: id or name 
  ```
  Description: Fetch item by given id or name.
- 𝗚ET `https://menu-management-qx91.onrender.com/item/category/:categoryId` \
  Sample input:
  ```bash
    Params Variable: categoryId
  ```
  Description: Fetches all the items associated with the given category id.
  Description: Fetch item by given id or name.
- 𝗚ET `https://menu-management-qx91.onrender.com/item/subcategory/:subCategoryId` \
  Sample input:
  ```bash
    Params Variable: subCategoryId
  ```
  Description: Fetches all the items associated with the given sub category id.
- PUT `https://menu-management-qx91.onrender.com/item/:id` \
  Sample input:
  ```bash
    Param Variable: id
    request body: {
      "name": "NonVeg Overload",
      "sub_category_id": 4,
      "category_id": 3,
      "base_amount": 70,
      "discount": 6,
      "image": "https://NonVegOverload.com/img.jpg",
      "description": "A non veg Italian pizza"
  }
  ```
  Description: Updates the details of item whose id is provided.

## Deployment
- The backend project is deployed on Render (free instance; inactivity may cause ~50-second delay).
- Deployed URL: `https://menu-management-qx91.onrender.com/`
- You can directly hit the APIs using the deployed URL without starting the local server.
  
