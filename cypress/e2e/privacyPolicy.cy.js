it('Testa a Pagina de Policitica de privacidade', () => {
    cy.visit('./src/privacy.html')

    cy.contains('h1', 'CAC TAT - Política de Privacidade')//verificando se o título da página é CAC TAT - Política de privacidade
    cy.contains('p', 'Talking About Testing').should('be.visible') //verificando se o parágrafo Talking About Testing está visível
})
