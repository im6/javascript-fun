# copy
cp dist/public/main.js ../im6.github.io/assets/
cp dist/public/site.js ../im6.github.io/assets/
cp -a dist/views/. ../im6.github.io/
cp -a assets/. ../im6.github.io/

# push
cd ../im6.github.io/
git add .
git commit -a -m "update"
git push
exit 0