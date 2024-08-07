rem call npm run generate

cd ".output/public"

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/Deztar/deztar.github.io.git master

cd ..