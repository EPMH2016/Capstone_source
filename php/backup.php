<?php

echo "hello world!";

exec ("rethinkdb dump -f backup.tar.tgz");

?>