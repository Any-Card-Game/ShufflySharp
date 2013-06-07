

Setup
------------
apt-get update
apt-get install build-essential
apt-get install make
cd ../usr/local/src

Mongo
------------
apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
wget http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen
apt-get update
apt-get install mongodb-10gen
mongo

or

apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | tee -a /etc/apt/sources.list.d/10gen.list
apt-get -y update
apt-get -y install mongodb-10gen
mongo




		sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
		Create a the /etc/apt/sources.list.d/10gen.list file and include the following line for the 10gen repository.

		If you use an Ubuntu version with “Upstart” (i.e. any since version 9.10 “Karmic,”) or are running with Upstart on Debian, use the following line:

		deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen
		If you are using Debian or Ubuntu that uses SysV style init process, use the following line:

		deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen
		Now issue the following command to reload your repository:

		sudo apt-get update
		Install Packages
		Issue the following command to install the latest stable version of MongoDB:

		sudo apt-get install mongodb-10gen






Memcached
------------
	  http://www.bookofzeus.com/articles/how-to-install-memcached-in-ubuntu/

Redis
------------

# download and unpack the sources (see http://redis.io/download for the latest stable version)
wget http://redis.googlecode.com/files/redis-2.6.2.tar.gz
tar -zxvf redis-2.6.2.tar.gz

# build
cd redis-2.6.2/
make

# test
# I needed to install tcl8.5 to run the tests: sudo apt-get install tcl8.5
make test

#install
sudo make install
cd utils
sudo ./install_server.sh

# run the redis cli (/usr/local/bin/redis-cli)
redis-cli

NodeJS
-----------

apt-get install python-software-properties python g++ make
add-apt-repository ppa:chris-lea/node.js
apt-get update
apt-get install nodejs npm



Nginx
---------
apt-get install nginx
service nginx start

/etc/init.d/nginx reload

http://usefulmix.com/install-upgrade-to-latest-nginx-without-compiling-from-source/
/etc/nginx
http://nginx.org/en/docs/http/websocket.html
