describe("Validar login",()=>{

    beforeEach(()=>{
        cy.visit("https://www.saucedemo.com/")
        
    })
    //Teste Login 001 - Login Bloqueado
    it("Login bloqueado",()=>{
        cy.login("locked_out_user","secret_sauce")
        cy.get("h3").contains("Epic sadface: Sorry, this user has been locked out.").should('be.visible')
    })

    //Teste Login 002 - Login com sucesso 
     it("Login com sucesso",()=>{
        cy.login("standard_user","secret_sauce")
        cy.url().should('include','/inventory.html')
    })

    //Teste Login 003 - Login com problem_user
    it("Faz o login , mas existem possíveis falhas",()=>{
        cy.login("problem_user","secret_sauce")
        cy.url().should('include','/inventory.html')
        cy.get('.inventory_item').should('have.length.greaterThan',0)
        cy.get('.inventory_item_img img').first().should('be.visible').and(($img) =>{
            expect($img[0].naturalWidth).to.be.greaterThan(0)
        })
    })
    
    //2. Automação de funcionalidade
    it.only("Botão de adicionar carrinho",()=>{
        cy.login("standard_user","secret_sauce")
        cy.url().should('include','/inventory.html')

        cy.get('.inventory_item').first().within(()=>{
            cy.get("button").contains("Add to cart").click()
        })
        cy.get(".shopping_cart_badge").should("contain", "1")

    
        cy.get(".shopping_cart_link").click()
        cy.url().should("include", "/cart.html")
        cy.get(".cart_item").should("have.length", 1)
    })

})