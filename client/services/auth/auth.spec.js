'use strict';

describe('Service: Auth', function () {

  beforeEach(module('bangularDemo'));

  var Auth,
    $httpBackend,
    $cookieStore;

  beforeEach(inject(function (_Auth_, _$httpBackend_, _$cookieStore_) {
    Auth = _Auth_;
    $httpBackend = _$httpBackend_;
    $cookieStore = _$cookieStore_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    $cookieStore.remove('token');
  });

  it('should log user', function () {
    expect(Auth.isLogged()).toBe(false);
    Auth.login({ _id: '123', email: 'test@test.com', password: 'test' });
    $httpBackend.expectPOST('/auth/local')
      .respond({ token: 'abcde', user: { _id: '123', email: 'test@test.com' } });
    $httpBackend.flush();
    expect($cookieStore.get('token')).toBe('abcde');
    expect(Auth.getUser().email).toBe('test@test.com');
    expect(Auth.getUser()._id).toBe('123');
    expect(Auth.isLogged()).toBe(true);
  });

});
