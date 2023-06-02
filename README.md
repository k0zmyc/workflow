## harmonogram


30. 3. 2023 zveřejnění harmonogramu prací na projektu (z pohledu programátora), určení repository url (nebo alespoň root např. https://github.com/hrbolek)
17. 4. 2023 projektový den - ukazka tabulky
17. 5. 2023 projektový den - verze alfa, statove komponenty, seznam nestavovych komponent
19. 6. 2023 projektový den (verze beta)
22. 6. 2023 uzavření projektu
3. 7. 2023 počátek zkouškového období,
?. 7. 2023 konec zkouškového období. 


## Úkol

    WORKFLOW 
    	https://github.com/hrbolek/_uois/blob/v2.1/gql_workflow/gql_workflow/DBFeeder.py - odkaz na datovou strukturu
    	
    	Zobrazení grafu stavů a přechodů mezi nimi ve formě svg. - https://www.w3schools.com/graphics/svg_intro.asp
            - zobrazit graf - seznam vrcholu a prechodu mezi nimi (svg. "obrazek")
    		- mam nazvy uzlu - seznam nasledovniku kazdeho vrcholu (uzlu)
    		- zobrazeni seznamu stavu (vrcholu) - komponenta (poduloha) - tabulka (seznam) "Button pro vložení nového stavu" - textbox ...
    		
    	Zobrazení seznamu stavů, zobrazení následujících stavů k danému stavu.
    		 - zobrazuje vrchol a nasledovniky - komponenta - textova reprezentace subgrafu "kam se muzu posunout z vrcholu"
    		
    	editace názvů stavů, Zobrazení (uživatele + skupina) pro stav, 
    		- "Input box pro přejmenování stavu"
    	
    	editace (uživatel + skupina) pro daný stav,
    		- "stavovy automat"
    		- umozni priradit prava k dokumentu v zavislosti na tom v jakem stavu se dokument nachazi
    			
    	zobrazení rolí ke stavu, editace rolí pro daný stav. 2 studenti
        	- reseno pozdeji v semestru
        
        Input box pro přejmenování stavu
        Input box pro přejmenování přechodu
        Button pro vložení nového stavu
        Button pro vložení nového přechodu
        Button (+select) pro vložení nové role ke stavu
        Button (+user+group) pro připojení ke stavu



## požadavek na server

query {
  workflowPage {
    id
    name
    lastchange
    states {
      id
      name
      lastchange
      nextTransitions {
        id
        name
      }
    }
    transitions {
      id
      name
      lastchange
      source {
        id
        name
      }
      destination {
        id
        name
      }
    }   
  }
}



