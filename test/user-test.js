import chai from 'chai';
const expect = chai.expect;
import User from '../src/User'
import Dashboard from '../src/Dashboard'

describe('User', function() {
  let customer1;
  let customer2;
  let customer3;
  let manager1;
  let manager2;
  beforeEach(function() {
    customer1 = new User('customer10','overlook2020');
    customer2 = new User('customer10','badpass');
    customer3 = new User('customer67','overlook2020');
    manager1 = new User('manager','overlook2020');
    manager2 = new User('manager','sadPanda')
  })

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should have a username', function() {
    expect(customer1.username).to.equal('customer10')
  });

  it('should have a password', function() {
    expect(customer1.password).to.equal('overlook2020')
  });

  it('should verify login details', function () {
    expect(customer1.verifyLogIn()).to.equal(true)
    expect(customer2.verifyLogIn()).to.equal(false)
    expect(manager2.verifyLogIn()).to.equal(false)
  });

  it('should find the type of user', function () {
    expect(customer1.findTypeOfUsER().to.be.instanceof(Customer)
    expect(manager1.findTypeOfUsER()).to.be.instanceof(Manager)
  })

  it('should update data for dashboard', function() {
    expect(manager1.goToDashboard(user)).to.be.instanceOf(Dashboard)
  })

});
