describe("Server set up", () => {
  beforeEach(() => {
    cy.task("getSchema").then((schema) => {
      cy.mockGraphql({
        schema,
      });
    });
    cy.exec("yarn run db:drop");
  });

  it("connects to the graphql server and prints", () => {
    cy.log("Hello World");
    const query = `
      {
        users{
          slackID
        }
      }
    `;
    cy.task("addUser", { slackID: "TestSender" });
    cy.task("addUser", { slackID: "TestReceiver" });
    cy.request({
      method: "post",
      url: "http://localhost:4000/graphql/", // graphql endpoint
      body: { query }, // or { query: query } depending if you are writing with es6
      failOnStatusCode: false, // not a must but in case the fail code is not 200 / 400
    }).then((res) => {
      expect(res.body.data.users[0].slackID).to.equal("TestSender");
    });
  });
});
