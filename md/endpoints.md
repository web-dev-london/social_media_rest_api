# Social Media or Messaging API

A Social Media or Messaging API allows users to send messages and interact with each other, create profiles, add friends or followers, and more. This is essential for building a social media platform or a messaging service or any other application that requires real-time communication between users.

### Users API

The Users API allows users to create profiles, follow other users, and view their profiles. It also provides endpoints for updating profiles, getting user details, and searching for users.

#### Endpoints

-   `/users` (POST): Creates a new user profile.
-   `/users` (GET): Returns a list of all users.
-   `/users/[id]` (GET): Returns the details of a specific user.
-   `/users/[id]` (PUT): Updates the profile of a specific user.
-   `/users/[id]` (PATCH): Partially updates the profile of a specific user.
-   `/users/[id]` (DELETE): Deletes a specific user.

### Query Parameters

Query parameters are used to pass parameters to the API endpoint. They are used to filter the results or to specify the page number or page size.

-   `page`: The page number to retrieve.(default: 1)
-   `limit`: The number of items to retrieve per page.(default: 10)
-   `search`: The search query to use for filtering the results.
-   `sort`: The field to sort the results by.
-   `order`: The order to sort the results by.

#### Example

`/users?page=1&limit=10&sort=name&order=asc&search=John`

-   Fetches page 1 of 10 users sorted by name in ascending order and filtered by "John" in the name field.

### Messages API

The Messages API allows users to send and receive messages. It also provides endpoints for getting messages, sending messages, and deleting messages.

#### Endpoints

-   `/messages` (GET): Returns a list of all messages.
-   `/messages` (POST): Sends a new message.
-   `/messages/[id]` (GET): Returns a specific message.
-   `/messages/[id]` (PUT): Updates a specific message.
-   `/messages/[id]` (PATCH): Partially updates a specific message.
-   `/messages/[id]` (DELETE): Deletes a specific message.

### Query Parameters

Query parameters are used to pass parameters to the API endpoint. They are used to filter the results or to specify the page number or page size.

-   `page`: The page number to retrieve.(default: 1)
-   `limit`: The number of items to retrieve per page.(default: 10)
-   `sort`: The field to sort by (default: createdAt).
-   `order`: The order to sort by (default: asc or desc).
-   `senderId`: The ID of the sender of the message.
-   `receiverId`: The ID of the receiver of the message.

#### Example

`/messages?page=1&limit=10&sort=createdAt&order=asc&senderId=cuid12345&receiverId=cuid12346`

-   Fetches page 1 of 10 messages sorted by createdAt in ascending order and filtered by senderId and receiverId.

#### Request Body for `/messages` (POST)

```json
{
    "senderId": "cuid12345",
    "receiverId": "cuid12346",
    "content": "Hey, how are you?"
}
```

#### Response

The response is a JSON object with the following properties:

```json
{
    "id": "cuid67890",
    "senderId": "cuid12345",
    "receiverId": "cuid12346",
    "content": "Hey, how are you?",
    "createdAt": "2024-11-23T08:00:00Z"
}
```

### Friendships API

The Friendships API allows users to create friendships, accept friendships, and delete friendships. It also provides endpoints for getting friendships, accepting friendships, and deleting friendships.

#### Endpoints

-   `/friend-requests` (POST): Send a friend/follow request.
-   `/friend-requests` (GET): Get all friend/follow requests.(supports filtering, sorting, pagination).
-   `/friend-requests/[id]` (GET): Get a specific friend/follow request.
-   `/friend-requests/[id]` (PUT): Update a specific friend/follow request.(accept/reject).
-   `/friend-requests/[id]` (PATCH): Partially update a specific friend/follow request.
-   `/friend-requests/[id]` (DELETE): Delete a specific friend/follow request.

### Query Parameters

Query parameters are used to pass parameters to the API endpoint. They are used to filter the results or to specify the page number or page size.

-   `page`: The page number to retrieve.(default: 1)
-   `limit`: The number of items to retrieve per page.(default: 10)
-   `requesterId`: The ID of the requester of the friend/follow request.
-   `addresseeId`: The ID of the addressee of the friend/follow request.
-   `status`: The status of the friend/follow request.

#### Example

`/friend-requests?page=1&limit=10&requesterId=cuid12345&addresseeId=cuid12346&status=pending`

-   Fetches page 1 of 10 friend/follow requests filtered by requesterId, addresseeId, and status.;

#### Request Body for `/friend-requests` (POST)

```json
{
    "requesterId": "cuid12345",
    "addresseeId": "cuid12346"
}
```

#### Response

The response is a JSON object with the following properties:

```json
{
    "id": "cuid99999",
    "requesterId": "cuid12345",
    "addresseeId": "cuid12346",
    "status": "pending",
    "createdAt": "2024-11-23T08:00:00Z"
}
```

#### Request Body for `/friend-requests/[id]` (PUT)

```json
{
    "status": "accepted"
}
```

#### Response

The response is a JSON object with the following properties:

```json
{
    "id": "cuid99999",
    "requesterId": "cuid12345",
    "addresseeId": "cuid12346",
    "status": "accepted",
    "createdAt": "2024-11-23T08:00:00Z"
}
```

Summary of Query Parameters:

| Endpoints                        |                         Query Parameters                          |
| -------------------------------- | :---------------------------------------------------------------: |
| `/users` (GET)                   | `page`, `limit`, `search`, `sort`, `order` (username, email, bio) |
| `/messages` (GET)                |    `page`, `limit`, `sort`, `order`, `senderId`, `receiverId`     |
| `/friend-requests` (GET)         |      `page`, `limit`, `requesterId`, `addresseeId`, `status`      |
| `/friend-requests` (POST)        |                   `requesterId`, `addresseeId`                    |
| `/friend-requests/[id]` (PUT)    |                             `status`                              |
| `/friend-requests/[id]` (PATCH)  |                             `status`                              |
| `/friend-requests/[id]` (DELETE) |                               None                                |

Summary of Request Body:

| Endpoints                        |              Request Body              |
| -------------------------------- | :------------------------------------: |
| `/users` (POST)                  | `username`, `email`, `password`, `bio` |
| `/messages` (POST)               |  `senderId`, `receiverId`, `content`   |
| `/friend-requests` (POST)        |      `requesterId`, `addresseeId`      |
| `/friend-requests/[id]` (PUT)    |                `status`                |
| `/friend-requests/[id]` (PATCH)  |                `status`                |
| `/friend-requests/[id]` (DELETE) |                  None                  |

Summary of Response:

| Endpoints                        |                         Response                          |
| -------------------------------- | :-------------------------------------------------------: |
| `/users` (GET)                   |       `id`, `username`, `email`, `bio`, `createdAt`       |
| `/messages` (GET)                |  `id`, `senderId`, `receiverId`, `content`, `createdAt`   |
| `/friend-requests` (GET)         | `id`, `requesterId`, `addresseeId`, `status`, `createdAt` |
| `/friend-requests` (POST)        | `id`, `requesterId`, `addresseeId`, `status`, `createdAt` |
| `/friend-requests/[id]` (GET)    | `id`, `requesterId`, `addresseeId`, `status`, `createdAt` |
| `/friend-requests/[id]` (PUT)    | `id`, `requesterId`, `addresseeId`, `status`, `createdAt` |
| `/friend-requests/[id]` (PATCH)  | `id`, `requesterId`, `addresseeId`, `status`, `createdAt` |
| `/friend-requests/[id]` (DELETE) |                           None                            |

Summary of Query Parameters and Request Body:

| Endpoints                        |                         Query Parameters                          |              Request Body              |
| -------------------------------- | :---------------------------------------------------------------: | :------------------------------------: |
| `/users` (GET)                   | `page`, `limit`, `search`, `sort`, `order` (username, email, bio) | `username`, `email`, `password`, `bio` |
| `/messages` (GET)                |    `page`, `limit`, `sort`, `order`, `senderId`, `receiverId`     |  `senderId`, `receiverId`, `content`   |
| `/friend-requests` (GET)         |      `page`, `limit`, `requesterId`, `addresseeId`, `status`      |      `requesterId`, `addresseeId`      |
| `/friend-requests` (POST)        |                   `requesterId`, `addresseeId`                    |      `requesterId`, `addresseeId`      |
| `/friend-requests/[id]` (PUT)    |                             `status`                              |                `status`                |
| `/friend-requests/[id]` (PATCH)  |                             `status`                              |                `status`                |
| `/friend-requests/[id]` (DELETE) |                               None                                |                  None                  |

Summary of Query Parameters and Response:

| Endpoints                        |                         Query Parameters                          |                         Response                          |
| -------------------------------- | :---------------------------------------------------------------: | :-------------------------------------------------------: |
| `/users` (GET)                   | `page`, `limit`, `search`, `sort`, `order` (username, email, bio) |       `id`, `username`, `email`, `bio`, `createdAt`       |
| `/messages` (GET)                |    `page`, `limit`, `sort`, `order`, `senderId`, `receiverId`     |  `id`, `senderId`, `receiverId`, `content`, `createdAt`   |
| `/friend-requests` (GET)         |      `page`, `limit`, `requesterId`, `addresseeId`, `status`      | `id`, `requesterId`, `addresseeId`, `status`, `createdAt` |
| `/friend-requests` (POST)        |                   `requesterId`, `addresseeId`                    | `id`, `requesterId`, `addresseeId`, `status`, `createdAt` |
| `/friend-requests/[id]` (GET)    |                             `status`                              | `id`, `requesterId`, `addresseeId`, `status`, `createdAt` |
| `/friend-requests/[id]` (PUT)    |                             `status`                              | `id`, `requesterId`, `addresseeId`, `status`, `createdAt` |
| `/friend-requests/[id]` (PATCH)  |                             `status`                              | `id`, `requesterId`, `addresseeId`, `status`, `createdAt` |
| `/friend-requests/[id]` (DELETE) |                               None                                |                           None                            |

Summary of Errors:

| Error Code |      Description      |
| :--------: | :-------------------: |
|    400     |      Bad Request      |
|    401     |     Unauthorized      |
|    403     |       Forbidden       |
|    404     |       Not Found       |
|    409     |       Conflict        |
|    500     | Internal Server Error |
