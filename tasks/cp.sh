im6_dir="../im6.github.io"
repo_folder_name="${PWD##*/}"

if [ ! -d "$im6_dir" ]; then
  echo 'GitHub Page folder does not exist.'
  exit 1
fi

cd $im6_dir
git pull

cd "../${repo_folder_name}"

# copy
# cp packages/javascript-fun/dist/public/main.js "$im6_dir/assets/"
# cp packages/javascript-fun/dist/public/site.js "$im6_dir/assets/"

cp assets/* $im6_dir

cp -a packages/javascript-fun/dist/views/. $im6_dir

# push
cd $im6_dir
[ -f .DS_Store ] && rm .DS_Store
git add .
git commit -a -m "update"
git push
exit 0
