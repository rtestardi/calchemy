$db = gc database_dev.js
$e = gc engine_dev.js
gc calchemy_dev.html | %{ if ($_ -match "database_dev.js") { "<script>"; $db } elseif ($_ -match "engine_dev.js") { "<script>"; $e } else { $_ } } | sc calchemy.html
