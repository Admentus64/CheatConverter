// JavaScript Document
// Author:      Admentus

var Language = {   // Start Static Class: Language
    
    // Class Variables
    html: null,
    button: null,
    dropDown: null,
    dropDownDiv: null,
    title: null,
    clickedOnDropDown: false,
    
    
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed)
    init: function() {   // Start Function: init
        
        Language.title = document.getElementById("change_language").title;
        Language.button = document.getElementById("change_language");
        Language.dropDown = document.getElementById("dropdown_language");
        Language.dropDownDiv = document.getElementsByClassName("dropdown")[0];
        
        Event.add(Language.button, "click", Language.toggleLanguagesList);
        
        Event.add(document.getElementById("english_language"), "click", function() { Language.apply("en"); Language.localizeOffsets(); Convert.recalculateErrors(); } );
        Event.add(document.getElementById("german_language"), "click", function() { Language.apply("de"); Language.localizeOffsets(); Convert.recalculateErrors(); } );
        Event.add(document.getElementById("dutch_language"), "click", function() { Language.apply("nl"); Language.localizeOffsets(); Convert.recalculateErrors(); } );
        Event.add(document.getElementById("swedish_language"), "click", function() { Language.apply("sv"); Language.localizeOffsets(); Convert.recalculateErrors(); } );
        
        Language.apply(Language.get());
        
    }, // End Function: init
    
    
    
    immediate: function() {    // Start Function: immediate
        
        Language.html = document.documentElement;
        
        try {
            if (localStorage.language == null)
                Language.set(window.navigator.language.slice(0,2));
            else Language.set(localStorage.language);
        }
        catch(err) {
            Language.set("en");
            console.log(err.message);
        }
        
    }, // End Function: immediate
    
    
    
    set: function(language)     { Language.html.lang = language; },         // Function: setLanguage
    get: function()             { return Language.html.lang; },             // Function: getLanguage
    
    
    
    toggleLanguagesList: function() {    // Start Function: toggleLanguagesList
        
        Language.dropDown.classList.toggle("show");
		Language.button.classList.toggle("active");
        
        if (Language.button.className == "drop-button active") {
            Event.add(Language.dropDownDiv, "click", function() { Language.clickedOnDropDown = true; } );
            Event.add(document.body, "click", Language.hideLanguagesList);
        }
        else {
            Event.remove(Language.dropDownDiv, "click", function() { Language.clickedOnDropDown = true; } );
            Event.remove(document.body, "click", Language.hideLanguagesList);
        }
        
    },  // End Function: toggleLanguagesList
    
    
    
    hideLanguagesList: function() {   // Start Function: hideLanguagesList
        
        if (!Language.clickedOnDropDown) {
            Language.dropDown.className = "";
            Language.button.className = "drop-button";
            Event.remove(Language.dropDownDiv, "click", function() { Language.clickedOnDropdown = true; } );
            Event.remove(document.body, "click", Language.hideLanguagesList);
        }
        
        Language.clickedOnDropDown = false;
        
    }, // End Function: hideLanguagesList
    
    
    
    // ----------------- //
    // --- LANGUAGES --- //
    // ----------------- //
    
    apply: function(lang) {   // Start Function: apply
        
		Language.dropDown.className = "";
        Language.button.className = "drop-button";
        Language.clickedOnDropDown = false;
        
        switch(lang) {
            case "de":
                document.getElementById("change_language").title = "Sprache ändern";
                document.getElementById("dark_mode").title = "Nachtmodus (de)aktivieren";
                document.getElementById("add_offset").title = "Offset hinzufügen";
                document.getElementById("remove_offset").title = "Offset entfernen";
                document.getElementById("presetTitleFrom").textContent = "Spiel für Input wählen";
                document.getElementById("presetTitleTo").textContent = "Spiel für Output wählen";
                document.getElementById("swap_select").title = "Ausgewählte Spiele im Input und Output tauschen";
				document.getElementById("search_bar").placeholder = "Suchen...";
                document.getElementById("pre_code_textarea").placeholder = "Input...";
                document.getElementById("post_code_textarea").placeholder = "Output...";
				document.getElementById("offset_button").title = "Konvertieren";
                break;
            case "nl":
                document.getElementById("change_language").title = "Verander taal";
                document.getElementById("dark_mode").title = "Wissel donkere modus";
                document.getElementById("add_offset").title = "Voeg avstand toe";
                document.getElementById("remove_offset").title = "Verwijder afstand";
                document.getElementById("swap_select").title = "Wissel de selecteerde spelen om tussen te conventeren";
                document.getElementById("presetTitleFrom").textContent = "Selecteer een spel om van te conventeren";
                document.getElementById("presetTitleTo").textContent = "Selecteer een spel om naar te conventeren";
				document.getElementById("search_bar").placeholder = "Zoeken...";
                document.getElementById("pre_code_textarea").placeholder = "Invoer...";
                document.getElementById("post_code_textarea").placeholder = "Uitvoer...";
				document.getElementById("offset_button").title = "Converteren";
                break;
            case "sv":
                document.getElementById("change_language").title = "\u00C4ndra språk";
                document.getElementById("dark_mode").title = "Växla dark mode";
                document.getElementById("add_offset").title = "Tilläga offset";
                document.getElementById("remove_offset").title = "Radera offset";
                document.getElementById("swap_select").title = "Växla valda spel att konventera mellan ";
                document.getElementById("presetTitleFrom").textContent = "Välj att spel att konventera från";
                document.getElementById("presetTitleTo").textContent = "Välj ett spel att konventera till";
				document.getElementById("search_bar").placeholder = "Söka...";
                document.getElementById("pre_code_textarea").placeholder = "Inmattning...";
                document.getElementById("post_code_textarea").placeholder = "Utmattning...";
				document.getElementById("offset_button").title = "Konvertera";
                break;
            default:
                document.getElementById("change_language").title = "Change language";
                document.getElementById("dark_mode").title = "Toggle dark mode";
                document.getElementById("add_offset").title = "Add offset";
                document.getElementById("remove_offset").title = "Remove offset";
                document.getElementById("swap_select").title = "Swap selected games to convert between";
                document.getElementById("presetTitleFrom").textContent = "Select a game to convert from";
                document.getElementById("presetTitleTo").textContent = "Select a game to convert to";
				document.getElementById("search_bar").placeholder = "Search...";
                document.getElementById("pre_code_textarea").placeholder = "Input...";
                document.getElementById("post_code_textarea").placeholder = "Output...";
				document.getElementById("offset_button").title = "Convert";
                break;
        }
        
        try {
            localStorage.language = lang;
        }
        catch(err) {
            console.log(err.message);
        }
        
        Language.set(lang);
        
    }, // End Function: apply
    
    
    
    localizeOffsets: function() {   // Start Function: localizeOffsets
        
        for (var i=0; i<document.getElementById("offset_div").getElementsByTagName("div").length; i++) {
            
            document.getElementsByClassName("offset_lang")[i].textContent = "";
            
            if (Language.get() == "en") {
                document.getElementsByClassName("offset_lang")[i].textContent += "Offset";
                document.getElementsByClassName("offset_value_lang")[i].textContent = "Value:";
                document.getElementsByClassName("offset_from_lang")[i].textContent = "From:";
                document.getElementsByClassName("offset_to_lang")[i].textContent = "To:";
                document.getElementsByClassName("swap_space")[i].title = "Swap memory addresses: 80 " + "\u2194" + " 81";
            }
            else if (Language.get() == "de") {
                document.getElementsByClassName("offset_lang")[i].textContent += "Offset";
                document.getElementsByClassName("offset_value_lang")[i].textContent = "Wert:";
                document.getElementsByClassName("offset_from_lang")[i].textContent = "Von:";
                document.getElementsByClassName("offset_to_lang")[i].textContent = "Nach:";
                document.getElementsByClassName("swap_space")[i].title = "Speicheradressen tauschen: 80 " + "\u2194" + " 81";
            }
            else if (Language.get() == "nl") {
                document.getElementsByClassName("offset_lang")[i].textContent += "Afstand";
                document.getElementsByClassName("offset_value_lang")[i].textContent = "Waarde:";
                document.getElementsByClassName("offset_from_lang")[i].textContent = "Van:";
                document.getElementsByClassName("offset_to_lang")[i].textContent = "Tot:";
                document.getElementsByClassName("swap_space")[i].title = "Wissel plaats voor code geheugen regels: 80 " + "\u2194" + " 81";
            }
            else if (Language.get() == "sv") {
                document.getElementsByClassName("offset_lang")[i].textContent += "Offset";
                document.getElementsByClassName("offset_value_lang")[i].textContent = "Värde:";
                document.getElementsByClassName("offset_from_lang")[i].textContent = "Från:";
                document.getElementsByClassName("offset_to_lang")[i].textContent = "Till:";
                document.getElementsByClassName("swap_space")[i].title = "Växla plats för kod minne linjer: 80 " + "\u2194" + " 81";
            }
        
            if (i >= 9)
                document.getElementsByClassName("offset_lang")[i].textContent += " " + (i+1);
            else document.getElementsByClassName("offset_lang")[i].textContent += " 0" + (i+1);
            
        }
        
    }, // End Function: localizeOffsets
    
    
    
    
    // ERRORS LOCALIZATION //
    
    localizeOffsetError: function(elem, type) {   // Start Function: localizeOffsetError
        
        if (Language.get() == "en") {
            if (type == 1)
                return "Offset " + (elem+1) + ": Not defined";
            else if (type == 2)
                return "Offset value " + (elem+1) + ": Not hexadecimal";
            else if (type == 3)
                return "Offset value " + (elem+1) + ": Out of range";
            else if (type == 4)
                return "Offset condition from " + (elem+1) + ": Not hexadecimal";
            else if (type == 5)
                return "Offset condition from " + (elem+1) + ": Out of range";
            else if (type == 6)
                return "Offset condition to " + (elem+1) + ": Not hexadecimal";
            else if (type == 7)
                return "Offset condition to " + (elem+1) + ": Out of range";
        }
        
        else if (Language.get() == "de") {
            if (type == 1)
                return "Offset " + (elem+1) + ": Nicht definiert";
            else if (type == 2)
                return "Offset-Wert " + (elem+1) + ": Nicht hexadezimal";
            else if (type == 3)
                return "Offset-Wert " + (elem+1) + ": Au" + "\u00DF" + "erhalb des erlaubten Bereiches";
            else if (type == 4)
                return "Offset-Bedingung von " + (elem+1) + ": Nicht hexadezimal";
            else if (type == 5)
                return "Offset-Bedingung von " + (elem+1) + ": Au" + "\u00DF" + "erhalb des erlaubten Bereiches";
            else if (type == 6)
                return "Offset-Bedingung zu " + (elem+1) + ": Nicht hexadezimal";
            else if (type == 7)
                return "Offset-Bedingung zu " + (elem+1) + ": Au" + "\u00DF" + "erhalb des erlaubten Bereiches";
        }
        
        else if (Language.get() == "nl") {
            if (type == 1)
                return "Avstand " + (elem+1) + ": Net gedefineerd";
            else if (type == 2)
                return "Avstand waarde " + (elem+1) + ": Niet hexadecimaal";
            else if (type == 3)
                return "Avstand waarde " + (elem+1) + ": Buiten bereik";
            else if (type == 4)
                return "Avstand voorwaarde van " + (elem+1) + ": Niet hexadecimaal";
            else if (type == 5)
                return "Avstand voorwaarde van " + (elem+1) + ": Buiten bereik";
            else if (type == 6)
                return "Avstand voorwaarde tot " + (elem+1) + ": Niet hexadecimaal";
            else if (type == 7)
                return "Avstand voorwaarde tot " + (elem+1) + ": Buiten bereik";
        }
        
        else if (Language.get() == "sv") {
            if (type == 1)
                return "Offset " + (elem+1) + ": Ej definerad";
            else if (type == 2)
                return "Offset värde " + (elem+1) + ": Ej hexadecimalt";
            else if (type == 3)
                return "Offset värde " + (elem+1) + ": Utanför räckvidden";
            else if (type == 4)
                return "Offset tillstånd från " + (elem+1) + ": Ej hexadecimalt";
            else if (type == 5)
                return "Offset tillstånd från " + (elem+1) + ": Utanför räckvidden";
            else if (type == 6)
                return "Offset tillstånd till " + (elem+1) + ": Ej hexadecimalt";
            else if (type == 7)
                return "Offset tillstånd till " + (elem+1) + ": Utanför räckvidden";
        }
        
        return "";
        
    }, // End Function: localizeOffsetError
    
    
    
    localizeNoCodeLinesError: function() {   // Start Function: localizeNoCodeLinesError
        
        if (Language.get() == "en")
            return "There are no RAM code lines";
        else if (Language.get() == "de")
            return "Keine Speicheradressen eingegeben";
        else if (Language.get() == "nl")
            return "Er zijn geen RAM coderegels";
        else if (Language.get() == "sv")
            return "Det finns inga RAM kodlinjer";
        
        return "";
        
    }, // End Function: localizeNoCodeLinesError
    
    
    
    localizeCodeLineError: function(elem, type) {   // Start Function: localizeCodeLineError
        
        if (Language.get() == "en") {
            if (type == 1)
                return "Code Line " + (elem+1) + ": Must contain an address and value";
            else if (type == 2)
                return "Code Line " + (elem+1) + ": RAM address is invalid";
            else if (type == 3)
                return "Code Line " + (elem+1) + ": RAM address is not hexadecimal";
            else if (type == 4)
                return "Code Line " + (elem+1) + ": RAM value is invalid";
            else if (type == 5)
                return "Code Line " + (elem+1) + ": RAM value is not hexadecimal";
        }
        
        else if (Language.get() == "de") {
            if (type == 1)
                return "Codezeile " + (elem+1) + ": Speicheradresse und Wert vorausgesetzt";
            else if (type == 2)
                return "Codezeile " + (elem+1) + ": Speicheradresse ungültig";
            else if (type == 3)
                return "Codezeile " + (elem+1) + ": Speicheradresse nicht hexadezimal";
            else if (type == 4)
                return "Codezeile " + (elem+1) + ": Wert der Speicheradresse ungültig";
            else if (type == 5)
                return "Codezeile " + (elem+1) + ": Wert der Speicheradresse nicht hexadezimal";
        }
        
        else if (Language.get() == "nl") {
            if (type == 1)
                return "Coderegel " + (elem+1) + ": Moet een address en waarde bevatten";
            else if (type == 2)
                return "Coderegel " + (elem+1) + ": RAM address is ongeldig";
            else if (type == 3)
                return "Coderegel " + (elem+1) + ": RAM address is niet hexadecimaal";
            else if (type == 4)
                return "Coderegel " + (elem+1) + ": RAM value is ongeldig";
            else if (type == 5)
                return "Coderegel " + (elem+1) + ": RAM value is niet hexadecimaal";
        }
        
        else if (Language.get() == "sv") {
            if (type == 1)
                return "Kodlinje " + (elem+1) + ": Måste innehålle en adress och värde";
            else if (type == 2)
                return "Kodlinje " + (elem+1) + ": RAM adress är ogiltig";
            else if (type == 3)
                return "Kodlinje " + (elem+1) + ": RAM address är ej hexadecimalt";
            else if (type == 4)
                return "Kodlinje " + (elem+1) + ": RAM värde är ogiltig";
            else if (type == 5)
                return "Kodlinje " + (elem+1) + ": RAM värde är ej hexadecimalt";
        }
        
        return "";
        
    }, // End Function: localizeCodeLineError
    
}; // End Static Class: Language



Event.add(window, "DOMContentLoaded", Language.init);			    // Active function initDOMLoaded when the page is DOM Content is loaded
Language.immediate();                                               // Run immediate contents
