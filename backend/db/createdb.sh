mongo
use shopping

db.createUser(
  {
    user: "shoppingAdmin",
    pwd: "shoppingAdminPass", // or cleartext password
    roles: [ { role: "readWrite", db: "shopping" } ]
  }
)
db.createCollection("users")
db.createCollection("lists")






