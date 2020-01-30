// JavaScript Document
// Author:      Admentus

var Language = {   // Start Static Class: Language
    
    // Class Variables
    html: null,
    button: null,
    dropdown: null,
    title: null,
    
    
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed)
    init: function() {   // Start Function: init
        
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
        
        switch(Language.get()) {
            case "de":
                Language.applyGerman();
                break;
            case "nl":
                Language.applyDutch();
                break;
            case "sv":
                Language.applySwedish();
                break;
            default:
                Language.applyEnglish();
                break;
        }
        
        Language.title = document.getElementById("change_language").title;
        Language.button = document.getElementById("change_language");
        Language.dropDown = document.getElementById("dropdown_language");
        
        Event.add(Language.button, "click", Language.toggleLanguagesList);
        Event.add(document.getElementById("english_language"), "click", Language.applyEnglish);
        Event.add(document.getElementById("german_language"), "click", Language.applyGerman);
        Event.add(document.getElementById("dutch_language"), "click", Language.applyDutch);
        Event.add(document.getElementById("swedish_language"), "click", Language.applySwedish);
        
    }, // End Function: init
    
    
    
    set: function(language)   { Language.html.lang = language; },   // Function: setLanguage
    get: function()           { return Language.html.lang; },       // Function: getLanguage
    
    
    
    toggleLanguagesList: function() {    // Start Function: toggleLanguagesList
        
        console.log(this);
        Language.dropDown.classList.toggle("show");
		Language.button.classList.toggle("active");
        
    },  // End Function: toggleLanguagesList
    
    
    
    // ----------------- //
    // --- LANGUAGES --- //
    // ----------------- //
    
    apply: function(lang) {   // Start Function: apply
        
        try {
            localStorage.language = lang;
        }
        catch(err) {
            console.log(err.message);
        }
        
        Language.set(lang);
        
        console.log(Language.get());
        
    }, // End Function: apply
    
    
    
    applyEnglish: function() {   // Start Function: applyEnglish
        
        Language.apply("en");
        console.log("English");
		
		document.getElementById("change_language").title = "Change language";
		document.getElementById("dark_mode").title = "Toogle dark mode";
		document.getElementById("add_offset").title = "Add offset";
		document.getElementById("remove_offset").title = "Remove offset";
		document.getElementById("presetTitleFrom").textContent = "Select a game to convert from";
		document.getElementById("presetTitleTo").textContent = "Select a game to convert to";
		document.getElementById("swap_select").title = "Swap selected games to convert between";
        
    }, // End Function: applyEnglish
    
    
    
    applyGerman: function() {   // Start Function: applyGerman
        
        Language.apply("de");
        console.log("Deutsch");
		
		document.getElementById("change_language").title = "Sprache ändern";
		document.getElementById("dark_mode").title = "Nachtmodus (de)aktivieren";
		document.getElementById("add_offset").title = "Offset hinzufügen";
		document.getElementById("remove_offset").title = "Offset entfernen";
		document.getElementById("presetTitleFrom").textContent = "Spiel für Input wählen";
		document.getElementById("presetTitleTo").textContent = "Spiel für Output wählen";
		document.getElementById("swap_select").title = "Ausgewählte Spiele im Input und Output tauschen";
        
    }, // End Function: applyGerman
    
    
    
    applyDutch: function() {   // Start Function: applyDutch
        
        Language.apply("nl");
        console.log("Nederlands");
        
    }, // End Function: applyDutch
    
    
    
    applySwedish: function() {   // Start Function: applySwedish
        
        Language.apply("sv");
        console.log("Svenska");
        
    }, // End Function: applySwedish
    
}; // End Static Class: Language



Event.add(window, "DOMContentLoaded", Language.init);			    // Active function initDOMLoaded when the page is DOM Content is loaded