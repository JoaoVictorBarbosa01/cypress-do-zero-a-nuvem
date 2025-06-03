Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'Johndoe@example.com.br',
    text: 'Text message',

}) => {
    cy.get('#firstName').type(data.firstName)//preenchendo o campo nome com o valor do objeto data
    cy.get('#lastName').type(data.lastName)//preenchendo o campo sobrenome com o valor do objeto data
    cy.get('#email').type(data.email)//preenchendo o campo email com o valor do objeto data
    cy.get('#open-text-area').type(data.text)//preenchendo o campo de texto com o texto longo
   
    cy.contains('button', 'Enviar').click()//clicando no botão de enviar com o texto Enviar
})