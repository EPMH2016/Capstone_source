<?php

echo "hello world!";

function archivedata(){
exec("rm -r backup.tar.tgz");
exec ("rethinkdb dump -f backup.tar.tgz");
exec("python python/backupNotification.py");
return 1;
}

?>