mongo
use admin
db.createUser(
  {
    user: "myAdmin",
    pwd: "myAdminPassword", // or cleartext password
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
use test
db.createUser(
  {
    user: "testUser",
    pwd: "testPass",
    roles: [ { role: "readWrite", db: "test" } ]
  }
)
db.createCollection("users")
db.createCollection("lists")



