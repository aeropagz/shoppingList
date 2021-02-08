ssh klaas@simplelist.de <<EOF
cd ~/shoppingList/
git pull
cd backend/
npm install --production
cd ../frontend
ng build --prod
cp /home/klaas/shoppingList/frontend/dist/goLocal/* /home/klaas/websites/simplelist.de/ -r
pm2 restart all
exit
EOF