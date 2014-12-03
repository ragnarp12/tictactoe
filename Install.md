# Install packages for Ubuntu

Install neccessary packages
```sh
# apt-get update
# apt-get install openjdk-7-jre unzip npm nodejs
```

Now reboot the system
```sh
# reboot
```


Then install npm packages
```sh
# npm install -g grunt
# npm install -g grunt-cli
# apt-get install node
# ln -s /usr/bin/nodejs /usr/bin/node
# npm install-g  bower
```

Now install packages to run GO server
```sh
# wget http://download.go.cd/gocd-deb/go-server-14.2.0-377.deb
# dpkg -i go-server-14.2.0-377.deb
```

Then for GO Agent
```sh
# wget http://download.go.cd/gocd-deb/go-agent-14.2.0-377.deb
# dpkg -i go-agent-14.2.0-377.deb
```