import Dashboard from './Dashboard.js'
import CustomerDashboard from './Dashboard.js'
import ManagerDashboard from './Dashboard.js'

class User {
  constructor(username, password){
    this.username = username;
    this.password = password;
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
  goToDashboard(user){
    $('.manager-dashboard-page').toggleClass('hidden')
    let dashboard = new Dashboard(user);
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
    if (this.password === 'overlook2020'){
      console.log('Welcome, Customer!')
      return true
    } else {
      alert('Customer, please check your password!')
      return false
    }
  }
  goToDashboard(user){
    $('.customer-dashboard-page').toggleClass('hidden');
    let dashboard = new Dashboard(user);
    let customerDashboard = dashboard.dashboardPicker(user);
    return customerDashboard
  }
}

export default User
