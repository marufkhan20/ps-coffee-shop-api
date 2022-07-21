class UserDto {
  id;
  name;
  email;
  number;
  address;
  profile;
  roles;
  accountStatus;

  constructor(user) {
    this.id = user._id;
    this.name = `${user.firstName} ${user.lastName}`;
    this.email = user.email;
    this.number = user.number;
    this.address = user.address;
    this.profile = user.profile;
    this.roles = user.roles;
    this.accountStatus = user.accountStatus;
  }
}

module.exports = UserDto;
