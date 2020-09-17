describe("Server set up", () => {
  beforeEach(() => {
    cy.server();

    cy.fixture("../../src/data.ts").as("data");
    cy.route("POST", "graphql", "@data");

    cy.visit("/graphql", {
      onBeforeLoad: win => {
        console.log("In the Visit");
        win.fetch = null;
      },
    });
  });
});
