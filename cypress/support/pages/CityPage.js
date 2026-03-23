// `export` means other files are allowed to use this object.
// `const` means we are making one fixed variable name called `PositionTypePage`.
// `PositionTypePage` is the name of the variable.
// `=` means we are putting a value inside that variable.
// `{ ... }` means this value is an object, like a box that can hold many actions.
// This object holds all the actions for the Position Type page.
export const CityPage = {
  getVisibleNameInput() {
    return cy.get('[name="modalField[citydesc]"]').filter(":visible").last();
  },

  // `assertPageLoaded` is the name of this action.
  // `()` means this action does not need any extra input.
  // `{ ... }` holds the code that will run for this action.
  // This checks if the page opened correctly.
  assertPageLoaded() {
    // Find the table and make sure we can see it on the screen.
    cy.get("#datatable").should("be.visible");
    // Find the Add button and make sure we can see it too.
    cy.get("#pager_default_add").should("be.visible");
  },

  // `clickAdd` is the name of this action.
  // `click` tells us it will press something.
  // `Add` tells us it is for the Add button.
  // `()` means this action does not need any extra input.
  // This presses the Add button.
  clickAdd() {
    // Find the Add button, make sure it is visible, then click it.
    cy.get("#pager_default_add").should("be.visible").click();
  },

  // `enterCity` is the name of this action.
  // `(name)` means this action needs one input called `name`.
  // That `name` will be the text we want to type.
  // This types a city into the city input box.
  enterCity(name) {
    this.getVisibleNameInput()
      .clear()
      .type(name);
  },

  assertNameValue(value) {
    this.getVisibleNameInput().should("have.value", value);
  },

  assertNameMaxLength(maxLength) {
    this.getVisibleNameInput().should("have.attr", "maxlength", `${maxLength}`);
  },

  assertNameIsLimitedTo(name, maxLength) {
    this.assertNameMaxLength(maxLength);
    this.assertNameValue(name.slice(0, maxLength));
  },

  // `clickSave` is the name of this action.
  // `()` means no extra input is needed.
  // This clicks the Save button.
  clickSave() {
    // Find the visible Save button, use the first one, and click it.
    cy.get("#btn_diag_save").filter(":visible").first().click();
  },

  // `clickUpdate` is the name of this action.
  // `()` means no extra input is needed.
  // This clicks the Update button.
  // It uses the same save button because this page uses one button for both save and update.
  clickUpdate() {
    // Find the visible save/update button, use the first one, and click it.
    cy.get("#btn_diag_save").filter(":visible").first().click();
  },

  // `createPositionType` is the name of this action.
  // `(name)` means we must give it one piece of input called `name`.
  // This does all the steps to create a new position type.
  createCity(name) {
    // Open the form.
    this.clickAdd();
    // Fill in the name.
    this.enterCity(name);
    // Save the new item.
    this.clickSave();
  },

  // `search` is the name of this action.
  // `(value)` means we give it one input called `value`.
  // `value` is the word or text we want to search for.
  // This types something into the search box.
  search(value) {
    // Find the search input using either of these selectors.
    cy.get('#txt_search, input[type="search"]')
      // Keep only the search boxes we can actually see.
      .filter(":visible")
      // Use the first visible search box.
      .first()
      // Remove old search text.
      .clear()
      // Type the new search text.
      .type(value);
  },

  // `getRowByName` is the name of this action.
  // `get` usually means find something.
  // `(name)` means we give it a name to look for.
  // This finds a table row that contains the name we want.
  getRowByName(name) {
    // Return the row in the table that has this text inside it.
    return cy.contains("#datatable .pager_tr.tr", name);
  },

  // `clickView` is the name of this action.
  // `(name)` means we give it the row name first.
  // This clicks the View button for one row.
  clickView(name) {
    // Find the row by name, then find its View button, then click it.
    this.getRowByName(name).find("#pager_default_view").click();
  },

  // `clickEdit` is the name of this action.
  // `(name)` means we give it the row name first.
  // This clicks the Edit button for one row.
  clickEdit(name) {
    // Find the row by name, then find its Edit button, then click it.
    this.getRowByName(name).find("#pager_default_edit").click();
  },

  // `clickDelete` is the name of this action.
  // `(name)` means we give it the row name first.
  // This clicks the Delete button for one row.
  clickDelete(name) {
    // Find the row by name, then find its Delete button, then click it.
    this.getRowByName(name).find("#pager_default_delete").click();
  },

  // `confirmDelete` is the name of this action.
  // `confirm` means say yes or accept.
  // `()` means no extra input is needed.
  // This says "yes" to the delete confirmation popup.
  confirmDelete() {
    // Find the visible confirmation button and click it.
    cy.get(".ajs-primary > .print").filter(":visible").first().click();
  },

  confirmSuccessfulDelete() {
    // Find the OK button in the popup, make sure we can see it, then click it.
    cy.get(
      ".ajs-in > .ajs-modal > .ajs-dialog > .ajs-footer > .ajs-primary > .ajs-button",
    ).click();
  },

  // `confirmSuccessful` is the name of this action.
  // `()` means no extra input is needed.
  // This clicks OK on the success popup.
  confirmSuccessful() {
    // Find the OK button in the popup, make sure we can see it, then click it.
    cy.get(".ajs-button").should("be.visible").click();
  },

  // `assertSuccessMessage` is the name of this action.
  // `assert` means check that something is true.
  // `(message)` means we give it the message text we expect to see.
  // This checks if a success message appears on the screen.
  assertSuccessMessage(message) {
    // Look for the message text and make sure it is visible.
    cy.contains(message).should("be.visible");
  },

  // `assertErrorMessage` is the name of this action.
  // `(message)` means we give it the message text we expect to see.
  // This checks if an error message appears on the screen.
  assertErrorMessage(message) {
    // Make sure the popup dialog is visible.
    cy.get(".ajs-dialog").should("be.visible");
    // Make sure the error message text is visible.
    cy.contains(message).should("be.visible");
  },

  // `assertRowVisible` is the name of this action.
  // `(name)` means we give it the row name we want to check.
  // This checks that a row with this name is showing in the table.
  assertRowVisible(name) {
    // Find the row with this name and make sure we can see it.
    cy.contains("#datatable .pager_tr.tr", name).should("be.visible");
  },

  // `assertRowNotVisible` is the name of this action.
  // `(name)` means we give it the row name we want to check.
  // This checks that a row with this name is not in the table anymore.
  assertRowNotVisible(name) {
    // Find the row with this name and make sure it does not exist.
    cy.contains("#datatable .pager_tr.tr", name).should("not.exist");
  },
};
// This `};` closes the object and finishes the variable.
