$db = gc database_dev.txt
$e = gc engine_dev.js
gc calchemy_dev.html | %{ if ($_ -match "database_dev.txt") { "<script>"; $db } elseif ($_ -match "engine_dev.js") { "<script>"; $e } else { $_ } } | sc calchemy.html
