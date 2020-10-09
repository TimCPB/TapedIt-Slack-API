describe("Server set up", () => {
  it("connects to the graphql server and prints", () => {
    cy.log("Hello World");
    const query = `
      {
        notes{
          id
        }
      }
    `;
    cy.request({
      url: "http://localhost:4000/graphql/", // graphql endpoint
      body: { query }, // or { query: query } depending if you are writing with es6
      failOnStatusCode: false, // not a must but in case the fail code is not 200 / 400
    }).then((res) => {
      cy.log(res);
    });
  });
});
