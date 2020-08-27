ENVPATH="tests/matcher/data/env"

arr=("$ENVPATH/PROD.env" "$ENVPATH/SANDBOX.env" "$ENVPATH/UAT.env" "$ENVPATH/TEAMS.env")
for f in "${arr[@]}"; do
    if [[ ! -f "$f" ]]; then
      cp -n "$ENVPATH/.envSample" $f
      echo "\033[32mCreated ENV file : $f \033[0m"
    fi
done
