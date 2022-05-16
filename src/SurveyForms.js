/*
 * SurveyForms.js - mini JavaScript polling library
 * @author Zakharov Andrew https://github.com/ZakharovAndrew
 */

// Defaults

var defaultSettings = {
    title: 'Default Title',
    description : 'Simple description. SurveyForms.js',
    id: '',
    questions : {},
    autosave: true,
    repeat: false
};

function SurveyForms(params) {
    let settings;
    let el;
    let cnt = 0;
    
    /**
     * Init Form
     */
    function init() {
        this.settings = loadSettings(params);
        
        if (!document.getElementById(this.settings.id)) {
            throw "Element not found!";
        }
        
        this.el = document.getElementById(this.settings.id);       
        
        console.log(this.settings, this.el);
    }
    
    function loadSettings(params) {
        return Object.assign(defaultSettings , params);
    }
    
    // init Form
    init();
}
