Vagrant.configure(2) do |config|
  config.vm.box = "chef/centos-6.5"
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.provision "shell", inline: <<-SHELL
    yum -y install epel-release
    yum -y install node npm
  SHELL
end
