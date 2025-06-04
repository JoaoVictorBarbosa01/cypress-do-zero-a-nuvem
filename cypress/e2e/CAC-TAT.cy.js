
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')//visitando a aplicação
  }) //beforeEach é um hook do cypress que executa o código antes de cada teste
  
  it('Verifica o titulo da Aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')//verificando o título da aplicação
  })
 
  it('exibe mensagem de erro ao enviar o formulário sem preencher os campos obrigatórios', () => {
    //ação realizada
    cy.contains('button', 'Enviar').click()//clicando no botão de enviar com o texto Enviar
    
    //resultado esperado
    cy.get('.error').should('be.visible')//verificando se a mensagem de erro está visível
  })

 
  it('preenche os campos obrigatórios e envia o formulário', () => { 
    const longText = Cypress._.repeat('0123456789', 40)//gerando um texto longo com 200 caracteres
    
    //ação realizada
    cy.get('#firstName').type('Joao Victor')
    cy.get('#lastName').type('Barbosa')
    cy.get('#email').type('joao.barbosa@accesys.com.br')
    cy.get('#open-text-area').type(longText, { delay: 0 })//preenchendo o campo de texto com o texto longo
    cy.contains('button', 'Enviar').click()//clicando no botão de enviar com o texto Enviar
    
    //resultado esperado
    cy.get('.success').should('be.visible')//verificando se a mensagem de sucesso está visível
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida)', () => {
    //ação realizada
    cy.get('#firstName').type('Joao Victor')
    cy.get('#lastName').type('Barbosa')
    cy.get('#email').type('joao.barbosa.accesys.conm.br')
    cy.get('#open-text-area').type('Mensagem de teste') 
    cy.get('.button[type="submit"]').click()//clicando no botão de enviar com tipo  submit  

    //resultado esperado
    cy.get('.error').should('be.visible')//verificando se a mensagem de erro está visível
  })
  it ('campo telefone continua vazio quando preennchido com valor não-numerico', () => {
    cy.get('#phone')
    .type('abcdefgh')
   
    .should('have.value', '')//verificando se o campo telefone continua vazio quando preenchido com valor não numérico 
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido antes do envio do formulario', () => {
    //ação realizada 
    cy.get('#firstName').type('Joao Victor')
    cy.get('#lastName').type('Barbosa')
    cy.get('#email').type('joao.barbosa@accesys.com.br')
    cy.get('#phone-checkbox').check()//marcando o checkbox de telefone
    cy.get('#open-text-area').type('Mensagem de texto')//preenchendo o campo de texto com o texto longo
    cy.contains('button', 'Enviar').click()//clicando no botão de enviar com o texto Enviar
  
    //Resultado esperado
    cy.get('.error').should('be.visible')//verificando se a mensagem de erro está visível
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    //ação realizada
    cy.get('#firstName')
      .type('Joao Victor')
        .should('have.value', 'Joao Victor')//verificando se o campo nome foi preenchido corretamente
         .clear()//limpando o campo nome
          
            //resultado esperado
            .should('have.value', '')//verificando se o campo nome está vazio
    
    cy.get('#lastName')
      .type('Barbosa')
        .should('have.value', 'Barbosa')//verificando se o campo sobrenome foi preenchido corretamente
         .clear()//limpando o campo sobrenome
            
          //resultado esperado 
          .should('have.value', '')//verificando se o campo sobrenome está vazio

    cy.get('#email')
      .type('joao.barbosa@accesys.com.br')
        .should('have.value', 'joao.barbosa@accesys.com.br')//verificando se o campo email foi preenchido corretamente
         .clear()//limpando o campo email
         
            //resultado esperado
            .should('have.value', '')//verificando se o campo email está vazio
   
    cy.get('#phone')
      .type('11999999999')
        .should('have.value', '11999999999')//verificando se o campo telefone foi preenchido corretamente
         .clear()//limpando o campo telefone
          
            //resultado esperado
            .should('have.value', '')//verificando se o campo telefone está vazio
  })

  it('Envia formulario com sucesso usando um comando customizado', () => {
    //ação realizada
    cy.fillMandatoryFieldsAndSubmit()//chamando o comando customizado para preencher os campos obrigatórios e enviar o formulário
    
    //resultado esperado
    cy.get('.success').should('be.visible')//verificando se a mensagem de sucesso está visível
  })

  it('seleciona um produto (youtube) por seu texto', () => {
    //ação realizada
    cy.get('#product')
      .select('YouTube')//selecionando o produto YouTube pelo seu texto
      
      //resultado esperado
      .should('have.value', 'youtube')//verificando se o valor selecionado é youtube através do value
  })

  it('seleciona um produto (Mentoria) por seu valor', () => {
    //ação realizada
    cy.get('#product')
      .select('mentoria')//selecionando o produto Mentoria pelo seu valor
    
      //resultado esperado
      .should('have.value', 'mentoria')//verificando se o valor selecionado é Mentoria através do value
  })

  it('seleciona um produto (blog) por seu indice', () => {
    cy.get('#product')
      .select(1)//selecionando o produto Blog pelo seu índice (1)
    
      //resultado esperado
      .should('have.value', 'blog')//verificando se o valor selecionado é blog através do value
  })

  it('marca o tipo de atendimento "feedback"',() => {
    cy.get('input[type="radio"][value="feedback"]')//selecionando o tipo de atendimento feedback selector com maior especificidade e confiabilidade
      .check()//marcando o radio button feedback
    
      //resultado esperado
      .should('be.checked')//verificando se o valor selecionado é feedback através do value
  })

  it('marca cada tipo de atendimento', () => {
    //açao realizada
    cy.get('input[type="radio"]')//selecionando todos os radio buttons
      .each(typeOfService => {
        cy.wrap(typeOfService)//empacotando o elemento para poder usar o comando check
          .check()//marcando o radio button
          .should('be.checked')//verificando se o valor selecionado é feedback através do value
      })
  })

  it('marca ambos checkboxes, depois desmarca o útimo checkbox', () => {
    //ação realizada
    cy.get('input[type="checkbox"]')//selecionando todos os checkboxes
      .check()//marcando todos os checkboxes
    
      //resultado esperado
      .should('be.checked')//verificando se todos os checkboxes estão marcados
    
      //ação realizada
      .last()//pegando o último checkbox
      .uncheck()//desmarcando o último checkbox
    
      //resultado esperado
      .should('not.be.checked')//verificando se o último checkbox está desmarcado
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    //ação realizada
    cy.get('input[type="file"]')//selecionando o input file
      .selectFile('./cypress/fixtures/example.json')//selecionando o arquivo example.json da pasta fixtures
    
      //resultado esperado
      .should(file => {
        expect(file[0].files[0].name).to.equal('example.json')//verificando se o nome do arquivo selecionado é example.json
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    //ação realizada
    cy.get('input[type="file"]')//selecionando o input file
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})//simulando um drag-and-drop do arquivo example.json da pasta fixtures
    
      //resultado esperado
      .should(file => {
        expect(file[0].files[0].name).to.equal('example.json')//verificando se o nome do arquivo selecionado é example.json
      })
  })  

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    //ação realizada
    cy.fixture('example.json').as('sampleFile')//dando um alias para o arquivo example.json da pasta fixtures

      
    cy.get('input[type="file"]')//selecionando o input file
    

      .selectFile('@sampleFile')//selecionando o arquivo example.json da pasta fixtures utilizando o alias
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')//verificando se o nome do arquivo selecionado é example.json  
      })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      //ação realizada
      cy.contains('a', 'Política de Privacidade') //selecionando o link Política de Privacidade e somente a tag 'a' generica 
        .should('have.attr', 'href', 'privacy.html')//verificando se o link possui o atributo href com o valor privacy.html (se ele abre nessa pagina)
        .and('have.attr', 'target', '_blank')//verificando se o link possui o atributo target com o valor _blank (se ele abre em outra aba)

        //ou seja, aqui eu consigo verificar se o link abre em outra aba sem a necessidade de um clique de fato, pois o cypress não consegue interagir com abas diferentes da que está rodando o teste
    })
    
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      //ação realizada
      cy.contains('a', 'Política de Privacidade') //selecionando o link Política de Privacidade e somente a tag 'a' generica 
        .invoke('removeAttr', 'target')//removendo o atributo target do link para que ele possa ser aberto na mesma aba
        .click()//clicando no link
      //resultado esperado
      cy.contains('h1', 'CAC TAT - Política de Privacidade')//verificando se o título da página é CAC TAT - Política de privacidade
        .should('be.visible')//verificando se o título está visível
    })
})



    
    