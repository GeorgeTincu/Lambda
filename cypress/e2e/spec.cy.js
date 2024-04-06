describe("template spec", () => {
  it("passes", () => {
    cy.visit("/");
    cy.lighthouse(
      {
        performance: 60,
        accessibility: 90,
        "best-practices": 80,
        seo: 80,
      },
      {
        formFactor: "desktop",
        screenEmulation: {
          mobile: false,
          disable: false,
          width: Cypress.config("viewportWidth"),
          height: Cypress.config("viewportHeight"),
          deviceScaleRatio: 1,
        },
      }
    );
    cy.get(".navbar-nav>li")
      .eq(0)
      .click()
      .should("have.class", "dropdown open")
      .and("be.visible");
    cy.get(".dropdown-menu>li").eq(2).click();
    cy.get(".dropdown-menu>li").eq(2).should("have.class", "active");
    cy.get("#password1").focus().should("have.class", "focus");
    cy.get(".action-form").type("mama").submit();
    cy.get(".action-form")
      .next()
      .should("have.text", "Your form has been submitted!");
    cy.get(".action-blur").click();
    cy.get(".action-blur").blur();
    cy.get(".action-blur")
      .should("have.class", "error")
      .prev()
      .should("have.attr", "style", "color: red;");
  });
});
