<?php
ob_start();
include __DIR__ . '/game.php';
$html = ob_get_clean();
file_put_contents(__DIR__ . '/index.html', $html);
echo 'index.html generado (' . strlen($html) . ' bytes)';