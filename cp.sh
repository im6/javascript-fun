im6_dir="../im6.github.io"

# copy
cp dist/public/main.js "$im6_dir/assets/"
cp dist/public/site.js "$im6_dir/assets/"
cp -a dist/views/. $im6_dir
cp -a assets/. $im6_dir

# push
cd $im6_dir
git add .
git commit -a -m "update"
git push
exit 0