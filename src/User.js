import Dashboard from './Dashboard.js'
import CustomerDashboard from './Dashboard.js'
import ManagerDashboard from './Dashboard.js'

class User {
  constructor(username, password){
    this.username = username;
    this.password = password;
    this.userId = '';
  }
  findTypeOfUser() {
    if(this.username === 'manager'){
      return new Manager(this.username, this.password)
    } else if (this.username.includes('customer')){
      return new Customer(this.username, this.password)
    } else {
      alert('Please enter valid credentials')
    }
  }
}

class Manager extends User {
  constructor(username, password){
    super(username, password)
    this.password = password;
    this.username = username;
  }
  verifyLogIn(){
    if (this.password === 'overlook2020'){
      console.log('Welcome, manager!')
      return true
    } else {
      alert('Manager, please check your password!')
      return false
    }
  }

  getUserId(){
    this.userId = 'manager';
  }

  goToDashboard(user){
    $('.manager-dashboard-page').toggleClass('hidden')
    let dashboard = new Dashboard(user,this.userId);
    let managerDashboard = dashboard.dashboardPicker(user);
    return managerDashboard
  }
}

class Customer extends User {
  constructor(username, password){
    super(username, password)
    this.password = password;
    this.username = username;
  }
  verifyLogIn(){
    if (this.password === 'overlook2020' && parseInt(this.username.slice(8)) < 51 && parseInt(this.username.slice(8)) > 0) {
      console.log(parseInt(this.username.slice(8)))
      return true
    } else {
      alert('Customer, please check your password and/or your username!')
      return false
    }
  }

  getUserId(){
    this.userId = parseInt(this.username.slice(8));
  }

  goToDashboard(user){
    $('.customer-dashboard-page').toggleClass('hidden');
    let dashboard = new Dashboard(this.userId);
    console.log('dashboard', dashboard)
    let customerDashboard = dashboard.dashboardPicker(user);
    console.log('hey',customerDashboard)
    customerDashboard.welcome();
    return customerDashboard
  }
}

export default User
