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



db.createUser(
  {
    user: "prodUserShopping",
    pwd: "5up3rS3(ur3P44723", // or cleartext password
    roles: [ { role: "readWrite", db: "shopping" } ]
  }
)


