ssh klaas@simplelist.de <<EOF
cd ~/shoppingList/
git pull
cd backend/
npm install — production
cd ../frontend
ng build --prod
exit
EOF