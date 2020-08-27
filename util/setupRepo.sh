arr=("$PWD/certificates/PROD" "$PWD/certificates/SANDBOX" "$PWD/certificates/UAT" "$PWD/certificates/TEAMS")
for d in "${arr[@]}"; do
    if [ -d "$d" ]; then
        echo "\033[33mFolder exists : $d \033[0m"
    else
        mkdir "$d"
        echo "\033[32mFolder created : $d \033[0m"
    fi
done