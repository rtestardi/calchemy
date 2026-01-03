param([switch]$exp)
$db = gc database_dev.js
$e = gc engine_dev.js
if ($exp) {
  $out = "calchemy.exp.html"
} else {
  $out = "calchemy.html"
}
gc calchemy_dev.html | %{ if ($_ -match "database_dev.js") { "<script>"; $db } elseif ($_ -match "engine_dev.js") { "<script>"; $e } else { $_ } } | sc $out
gc $out | ?{ $_.length -gt 178 }
