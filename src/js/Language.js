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
        
        Event.add(document.getElementById("english_language"), "click", function() { Language.apply("en"); Language.localizeOffsets(); } );
        Event.add(document.getElementById("german_language"), "click", function() { Language.apply("de"); Language.localizeOffsets(); } );
        Event.add(document.getElementById("dutch_language"), "click", function() { Language.apply("nl"); Language.localizeOffsets(); } );
        Event.add(document.getElementById("swedish_language"), "click", function() { Language.apply("sv"); Language.localizeOffsets(); } );
        
        Language.apply(Language.get());
        
        //Event.add(document.body, "click", hideOnClickOutside);
        
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
                break;
            case "nl":
                document.getElementById("change_language").title = "Verander taal";
                document.getElementById("dark_mode").title = "Wissel donkere modus";
                document.getElementById("add_offset").title = "Voeg avstand toe";
                document.getElementById("remove_offset").title = "Verwijder afstand";
                document.getElementById("swap_select").title = "Wissel de selecteerde spelen om tussen te conventeren";
                document.getElementById("presetTitleFrom").textContent = "Selecteer een spel om van te conventeren";
                document.getElementById("presetTitleTo").textContent = "Selecteer een spel om naar te conventeren";
				document.getElementById("search_bar").placeholder = "Search...";
                document.getElementById("pre_code_textarea").placeholder = "Invoer...";
                document.getElementById("post_code_textarea").placeholder = "Uitvoer...";
                break;
            case "sv":
                document.getElementById("change_language").title = "\u00C4ndra språk";
                document.getElementById("dark_mode").title = "Växla dark mode";
                document.getElementById("add_offset").title = "Tilläga offset";
                document.getElementById("remove_offset").title = "Radera offset";
                document.getElementById("swap_select").title = "Växla valda spel att konventera mellan ";
                document.getElementById("presetTitleFrom").textContent = "Välj att spel att konventera från";
                document.getElementById("presetTitleTo").textContent = "Välj ett spel att konventera till";
				document.getElementById("search_bar").placeholder = "Search...";
                document.getElementById("pre_code_textarea").placeholder = "Inmattning...";
                document.getElementById("post_code_textarea").placeholder = "Utmattning...";
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
        
            if (i > 9)
                document.getElementsByClassName("offset_lang")[i].textContent += " " + (i+1);
            else document.getElementsByClassName("offset_lang")[i].textContent += " 0" + (i+1);
            
        }
        
    }, // End Function: localizeOffsets
    
}; // End Static Class: Language



Event.add(window, "DOMContentLoaded", Language.init);			    // Active function initDOMLoaded when the page is DOM Content is loaded
Language.immediate();                                               // Run immediate contents
