require("@4tw/cypress-drag-drop");

describe("should checkout order", () => {
  before(function () {
    cy.fixture("mockUserData").then(function (mockUserData) {
      this.mockUserData = mockUserData;
    });
  });

  it("should visit main page", () => {
    cy.visit("http://localhost:3000");
  });

  it("should open and close ingredientModal by click ingredient", function () {
    cy.get(".ingredientsBlockItem").first().click();
    cy.get(".modalCloseButton").click();
  });

  it("should make drag-and-drop ingredient and can't checkout to order without authorization", function () {
    cy.get("#bun .ingredientsBlockItem")
      .first()
      .drag(".burgerConstructorItemWrapper");

    cy.get("button").contains("Оформить заказ").should("be.disabled");

    cy.get("#sauce .ingredientsBlockItem")
      .first()
      .drag(".burgerConstructorItemWrapper");

    cy.get("#main .ingredientsBlockItem")
      .first()
      .drag(".burgerConstructorItemWrapper");

    cy.get("button").contains("Оформить заказ").click();
  });

  it("should login user", function () {
    cy.get("input[type='email']").type(this.mockUserData.email);
    cy.get("input[type='password']").type(this.mockUserData.password);

    cy.get("button").contains("Войти").click();
  });

  it("should checkout order authorizated user and show orderModal with orderNumber", function () {
    cy.get("button").contains("Оформить заказ").click();

    cy.get(".orderNumber");
  });
});
