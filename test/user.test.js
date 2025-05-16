const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const { v4: uuidv4 } = require('uuid');

chai.use(chaiHttp);
const expect = chai.expect;

let testUserId = null;
let testUserEmail = `${uuidv4()}@example.com`;
const testUserPassword = 'testpassword';


// add before and time delays before each test
beforeEach((done) => {
    setTimeout(done, 1000);
});

describe('User API', () => {
    before((done) => {
      // Create a user before running the tests
      const userData = {
        email: testUserEmail,
        password: testUserPassword,
        username: 'Test User'
      };
  
      chai.request(app)
        .post('/api/auth/register')
        .send(userData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          testUserId = res.body.data.id;
          done();
        });
    });
  
    after((done) => {
      // Delete the test user after all tests
      chai.request(app)
        .delete(`/api/users/${testUserId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  
    it('should get all users', (done) => {
      chai.request(app)
        .get('/api/users')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status', 'success');
          expect(res.body.users).to.be.an('array');
          done();
        });
    });
  
    it('should get a user by ID', (done) => {
      chai.request(app)
        .get(`/api/users/${testUserId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status', 'success');
          expect(res.body.user).to.include.keys('id', 'username', 'email');
          done();
        });
    });
  
    it('should get a user by email', (done) => {
      chai.request(app)
        .get(`/api/users/email/${testUserEmail}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status', 'success');
          expect(res.body.data).to.include.keys('username', 'email');
          done();
        });
    });
  
    it('should update user details', (done) => {
      chai.request(app)
        .put(`/api/users/${testUserId}`)
        .send({
          email: testUserEmail,
          username: 'Updated User'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status', 'success');
          done();
        });
    });
  
    it('should update password for the user', (done) => {
      const passwordData = {
        oldPassword: testUserPassword,
        newPassword: 'newTestPassword'
      };
  
      chai.request(app)
        .put(`/api/users/${testUserId}/password`)
        .send(passwordData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status', 'success');
          done();
        });
    });
  
    it('should return 404 for non-existent user by ID', (done) => {
      chai.request(app)
        .get(`/api/users/${uuidv4()}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  
    it('should return 404 for non-existent email', (done) => {
      chai.request(app)
        .get('/api/users/email/fake@email.com')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  
    it('should return 404 for deleting non-existent user', (done) => {
      chai.request(app)
        .delete(`/api/users/${uuidv4()}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  