ENVPATH="tests/omnivore/data/env"

arr=("$ENVPATH/.env")
for f in "${arr[@]}"; do
    if [[ ! -f "$f" ]]; then
      cp -n "$ENVPATH/.envSample" $f
      echo "\033[32mCreated ENV file : $f \033[0m"
    fi
done
