$db = gc database_dev.txt
gc calchemy_dev.html | %{ if ($_ -match "database_dev.txt") { "<script>"; $db } else { $_ } } | sc calchemy.html
