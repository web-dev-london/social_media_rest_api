const users = [
  { "id": "cuid12345", "username": "johndoe", "email": "johndoe@example.com", "bio": "Loves coding!" },
  { "id": "cuid12346", "username": "janedoe", "email": "janedoe@example.com", "bio": "Enjoys hiking and coffee." },
  { "id": "cuid12347", "username": "alice", "email": "alice@example.com", "bio": "Aspiring photographer." },
  { "id": "cuid12348", "username": "bob", "email": "bob@example.com", "bio": "Avid gamer and music enthusiast." },
  { "id": "cuid12349", "username": "charlie", "email": "charlie@example.com", "bio": "Tech blogger and DIY fan." }
];

const friendships = [
  { "id": "cuid22345", "requesterId": "cuid12345", "addresseeId": "cuid12346", "status": "PENDING" },
  { "id": "cuid22346", "requesterId": "cuid12346", "addresseeId": "cuid12347", "status": "ACCEPTED" },
  { "id": "cuid22347", "requesterId": "cuid12347", "addresseeId": "cuid12348", "status": "REJECTED" },
  { "id": "cuid22348", "requesterId": "cuid12348", "addresseeId": "cuid12349", "status": "PENDING" },
  { "id": "cuid22349", "requesterId": "cuid12349", "addresseeId": "cuid12345", "status": "ACCEPTED" }
];

const messages = [
  { "id": "cuid32345", "senderId": "cuid12345", "receiverId": "cuid12346", "content": "Hey, how are you?" },
  { "id": "cuid32346", "senderId": "cuid12346", "receiverId": "cuid12345", "content": "Doing well, thanks! What about you?" },
  { "id": "cuid32347", "senderId": "cuid12347", "receiverId": "cuid12348", "content": "Let is meet up tomorrow!" },
  { "id": "cuid32348", "senderId": "cuid12348", "receiverId": "cuid12347", "content": "Sure, sounds great!" },
  { "id": "cuid32349", "senderId": "cuid12349", "receiverId": "cuid12345", "content": "Check out this link I found." }
];

export { users, friendships, messages };