describe("Server set up", () => {
  beforeEach(() => {
    cy.exec("yarn run db:drop");
  });

  it("returns users when user query is fired", () => {
    const query = `
      {
        users{
          slackID
        }
      }
    `;
    cy.task("addUser", { slackID: "TestUser" });
    cy.task("addUser", { slackID: "TestUser2" });
    cy.request({
      method: "post",
      url: "http://localhost:4000/graphql/", // graphql endpoint
      body: { query }, // or { query: query } depending if you are writing with es6
      failOnStatusCode: false, // not a must but in case the fail code is not 200 / 400
    }).then((res) => {
      expect(res.body.data.users[0].slackID).to.equal("TestUser");
      expect(res.body.data.users[1].slackID).to.equal("TestUser2");
    });
  });
});

