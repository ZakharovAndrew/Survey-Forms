/*!
 * SurveyForms.js - Survey JavaScript library v0.0.11
 * Copyright (c) 2022 Zakharov Andrew https://github.com/ZakharovAndrew
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

// Defaults

var defaultSettings = {
    title: 'Default Title',
    description : 'Simple description. SurveyForms.js',
    id: '',
    questions : {},
    autosave: true,
    repeat: false,
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
        this.el.className += 'survey-forms'; //support Internet Explorer 9 or lower
        if (typeof this.settings.background_color !== 'undefined') {
            document.getElementById(this.settings.id).style.backgroundColor = this.settings.background_color;
        }
        loadHeader();
        loadSurveys();
        loadFooter();
        
        document.getElementById(this.settings.id + '-button').onclick = function() {
            console.log('send JSON')
        };
        
        console.log('SurveyForms.js loaded');
    }
    
    /**
     * Append head-block to form
     */
    function loadHeader() {
        this.el.insertAdjacentHTML(
            'afterbegin',
            `<div class="form-header"><h1>${this.settings.title}</h1><div class="form-header-description">${this.settings.description}</div>`
        );
    }
    
    /**
     * Append Surveys
     */
    function loadSurveys() {
        this.settings.questions.forEach(
            element => addSurvey(element)
        );
    }
    
    function addSurvey(survey) {
        options = '';
        survey.options.forEach(function(item, i) {
                if (typeof survey.type === 'undefined' || survey.type == 'radio') {
                    options += `<label><input name="${survey.name}" type="radio" value="${item}">${item}</label>`;
                } else if (survey.type == 'select') {
                    options += `<option>${item}</option>`;
                }
            }
        );
        if (survey.type == 'select') {
            options = `<select name="${survey.name}">${options}</select>`;
        }
        if (survey.type == 'text') {
            options = `<textarea name="${survey.name}" autofocus maxlength="500"></textarea>`;
        }

        let req = (survey.required) ? '<span class="req-survey" aria-label="Required survey"> *</span>' : '';
        let score = (survey.score) ? survey.score + '&nbsp; points' : '';
        
        let html = 
        `<div class="blocks">
            <div class="survey-block">
                <div class="survey-header">
                    <div class="survey-title">${survey.title} ${req}</div>
                    <div class="survey-score" aria-label="Max score">${score}</div>
                </div>
                <div class="survey-body">${options}</div>
            </div>
        </div>`;
        this.el.insertAdjacentHTML('beforeend', html);
        this.cnt++;
    }
    
    function loadFooter()
    {
        this.el.insertAdjacentHTML('beforeend', '<div class="survey-complete-block"><button id="'+this.settings.id+'-button" class="survey-complete-btn">Complete</button></div>');
    }
    
    function loadSettings(params) {
        return Object.assign(defaultSettings , params);
    }
    
    // init Form
    init();
}
