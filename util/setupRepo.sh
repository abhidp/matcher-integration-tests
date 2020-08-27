arr=("$PWD/certificates/PROD" "$PWD/certificates/SANDBOX" "$PWD/certificates/UAT" "$PWD/certificates/TEAMS")
for d in "${arr[@]}"; do
    if [ -d "$d" ]; then
        echo "Already present : $d"
    else
        echo "Creating folder : $d"
        mkdir "$d"
    fi
done