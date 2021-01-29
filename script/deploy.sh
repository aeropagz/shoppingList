ssh klaas@simplelist.de <<EOF
cd ~/shoppingList/
git pull
cd backend/
npm install --production
cd ../frontend
ng build --prod
pm2 restart all
exit
EOF