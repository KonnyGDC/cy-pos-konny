describe('Kunneeeh', () => {
  it('Login Success NGANIII', () => {
    cy.visit('/')

    //LOGIN
    cy.get('[name="gl_comcde"]').should('be.visible')
    cy.get('[name="gl_comcde"]').clear().type('QATEAM').wait(2000)
    cy.get('[name="txtusrcde"]').type('KONNY').wait(2000)
    cy.get('[name="txtusrpwd"]').type('Kg@1997').wait(2000)
    cy.get('.loginbtn > input').click()

    cy.get('.ajs-content').should('be.visible')
    cy.get('.ajs-button').click()

    //HOME
    cy.get(':nth-child(4) > .applist_gradient').click()

    //DASHBOARD
      cy.url().should('include', 'main.php')
      cy.get('#toggle').click()

      //CODE OF DEF
        cy.get('#\\33 89').click()
        cy.get('#men_201').click()

      //Adding of City
      cy.get('#pager_default_add').click()
    
      cy.get('[name="modalField[citydesc]"]').type('Ilocos Sur')
      cy.get('#btn_diag_save').click()
      cy.get('.ajs-button').click()
       cy.wait(2000)

      cy.get('#pager_default_add').click()
      cy.get('[name="modalField[citydesc]"]').click().clear().type('Montalban')
      cy.get('#btn_diag_save').click()
      cy.get('.ajs-button').click()
      cy.wait(2000)

      cy.get('#pager_default_add').click()
      cy.get('[name="modalField[citydesc]"]').click().type('ABC123')
      cy.get('#btn_diag_save').click()
      cy.get('.ajs-button').click()

      cy.wait(2000)

      cy.get('[width="38%"] > p').click()
      
  })
})