<?php

echo "hello world!";

exec("rm -r backup.tar.tgz");
exec ("rethinkdb dump -f backup.tar.tgz");
exec("pythonasjkldfhasjkfnhjkasdhfasdf backupNotification.py");
exec("asdfasdfasdf");

?>