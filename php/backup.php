<?php

echo "hello world!";

exec("rm -r backup.tar.tgz");
exec ("rethinkdb dump -f backup.tar.tgz");
exec("../python/backupNotification.py");
?>