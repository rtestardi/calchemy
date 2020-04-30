$db = gc database_dev.js
$e = gc calchemy_dev.js
gc calchemy_dev.html | %{ if ($_ -match "database_dev.js") { "<script>"; $db } elseif ($_ -match "calchemy_dev.js") { "<script>"; $e } else { $_ } } | sc calchemy.html
