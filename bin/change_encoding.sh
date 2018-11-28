for file in ../imports/*
do
    if file -i "$file" | grep -q "8859"; then
        echo $file
        iconv -f iso-8859-1 -t utf-8 "$file" > "$file.new" && mv -f "$file.new" "$file"
    fi
done