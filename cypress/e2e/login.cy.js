describe('Login', () => {
  // set NODE_OPTIONS=--openssl-legacy-provider
  it('User logged in with valid Credential', () => {
    cy.fixture('example').then((user) => {
      cy.request({
        method: 'POST',
        url: `/api/login`, // Your API endpoint
        body: JSON.stringify(user.valid_email),
        headers: {
            'Content-Type': 'application/json' // Set content type to JSON
        }
      }).then((response) => {
        console.log("response", response.body)
        expect(response.body.success).to.eq(true),
          expect(response.body.message).to.eq('User logged in successfully'),
          expect(response.body.data).to.have.property('token'),
          expect(response.body.data).to.have.property('user')
      });
    });
  });
  it.only('User logged in with invalid Credential', () => {
    cy.fixture('example').then((user) => {
      cy.request({
        method: 'POST',
        url: `/api/login`, // Your API endpoint
        body: JSON.stringify({
          "email": "faw1@example.com",
          "password": "password1"
        }),
        headers: {
            'Content-Type': 'application/json' // Set content type to JSON
        }
      }).then((response) => {
        console.log("response", response.body)
      });
    });
  });
});