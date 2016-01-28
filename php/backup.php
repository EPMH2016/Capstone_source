<?php

echo "hello world!";

exec("rm -r php/backup.tar.tgz");
exec ("rethinkdb dump -f backup.tar.tgz");

?>