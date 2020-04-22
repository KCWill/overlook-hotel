import chai from 'chai';
const expect = chai.expect;
import Dashboard from '../src/Dashboard'

describe('Dashboard', function() {
  beforeEach(function(){
    let userId1 = 20;
    let userId2 = 'manager';
    let customerDash = new Dashboard(userId);
    let managerDas = new Dashboard(userId);
  });

  it('should be a function', function() {
    expect(Dashboard).to.be.a('function');
  });

  it('should make customer dashboard', function(){
    expect(customerDash).to.be.instanceof(CustomerDashboard);
    xpect(managerDash).to.be.instanceof(ManagerDashboard);
  })

});
