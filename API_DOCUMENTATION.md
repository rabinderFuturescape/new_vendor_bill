# API Documentation

## Authentication

- **Endpoint**: `/api/user`
- **Method**: GET
- **Middleware**: `auth:sanctum`
- **Description**: Retrieves the authenticated user's information.

## Album Photos

- **Endpoint**: `/api/album_photos`
- **Method**: GET
- **Controller**: `AlbumPhotosController@index`
- **Description**: Fetches all album photos.
- **Response**: Returns a list of album photos.

## Accounts Master

- **Endpoint**: `/api/chsone_accounts_master`
- **Method**: GET
- **Controller**: `AccountsMasterController@index`
- **Description**: Fetches all accounts master records.
- **Response**: Returns a list of accounts master records.

## Vendors

### Fetch Vendors

- **Endpoint**: `/api/vendors`
- **Method**: GET
- **Controller**: `VendorController@index`
- **Description**: Fetches all vendors.
- **Response**: Returns a list of vendors.

### Create Vendor

- **Endpoint**: `/api/vendors`
- **Method**: POST
- **Controller**: `VendorController@store`
- **Description**: Creates a new vendor.
- **Request Parameters**:
  - `name`: string
  - `email`: string
- **Response**: Returns the created vendor.

### Update Vendor

- **Endpoint**: `/api/vendors/{id}`
- **Method**: PUT
- **Controller**: `VendorController@update`
- **Description**: Updates an existing vendor.
- **Request Parameters**:
  - `name`: string
- **Response**: Returns the updated vendor.

### Delete Vendor

- **Endpoint**: `/api/vendors/{id}`
- **Method**: DELETE
- **Controller**: `VendorController@destroy`
- **Description**: Deletes a vendor.
- **Response**: Confirms deletion of the vendor.