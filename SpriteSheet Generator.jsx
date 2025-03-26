#target photoshop

// Spritesheet Generator
// Creates a spritesheet from visible layers or groups

// Localization strings
var strings = {
    "en": { // English (default)
        "title": "Spritesheet Generator",
        "settings": "Settings",
        "columns": "Columns:",
        "visibleLayersInfo": "Script will use only visible layers and groups",
        "layersToFrames": "Layers to Frames",
        "layersAndGroupsToFrames": "Layers & Groups to Frames",
        "groupsToRows": "Groups to Rows of Frames",
        "preview": "Preview",
        "loadingPreview": "Loading preview...",
        "cancel": "Cancel",
        "savePNG": "Save PNG",
        "createPSD": "Create PSD",
        "invalidColumns": "Please enter a valid number for columns",
        "noValidGroups": "No valid groups found!",
        "noValidFrames": "No valid frames found!",
        "totalFrames": "Total frames",
        "layout": "Layout",
        "size": "Size",
        "frameSize": "Frame size",
        "rows": "rows",
        "oneRowPerGroup": "one row per group",
        "pixels": "pixels",
        "saveSpritesheet": "Save Spritesheet as PNG"
    },
    "ru": { // Russian
        "title": "Spritesheet Generator",
        "settings": "Настройки",
        "columns": "Колонки:",
        "visibleLayersInfo": "Скрипт будет использовать только видимые слои и группы",
        "layersToFrames": "Слои в Кадры",
        "layersAndGroupsToFrames": "Слои и Группы в Кадры",
        "groupsToRows": "Группы в Ряды Кадров",
        "preview": "Предпросмотр",
        "loadingPreview": "Загрузка предпросмотра...",
        "cancel": "Отмена",
        "savePNG": "Сохранить PNG",
        "createPSD": "Создать PSD",
        "invalidColumns": "Пожалуйста, введите корректное число колонок",
        "noValidGroups": "Не найдено подходящих групп!",
        "noValidFrames": "Не найдено подходящих кадров!",
        "totalFrames": "Всего кадров",
        "layout": "Расположение",
        "size": "Размер",
        "frameSize": "Размер кадра",
        "rows": "рядов",
        "oneRowPerGroup": "один ряд на группу",
        "pixels": "пикселей",
        "saveSpritesheet": "Сохранить спрайт как PNG"
    },
    "pl": { // Polish
        "title": "Generator Spritesheet",
        "settings": "Ustawienia",
        "columns": "Kolumny:",
        "visibleLayersInfo": "Skrypt użyje tylko widocznych warstw i grup",
        "layersToFrames": "Warstwy na Klatki",
        "layersAndGroupsToFrames": "Warstwy i Grupy na Klatki",
        "groupsToRows": "Grupy na Rzędy Klatek",
        "preview": "Podgląd",
        "loadingPreview": "Ładowanie podglądu...",
        "cancel": "Anuluj",
        "savePNG": "Zapisz PNG",
        "createPSD": "Utwórz PSD",
        "invalidColumns": "Proszę wprowadzić prawidłową liczbę kolumn",
        "noValidGroups": "Nie znaleziono odpowiednich grup!",
        "noValidFrames": "Nie znaleziono odpowiednich klatek!",
        "totalFrames": "Całkowita liczba klatek",
        "layout": "Układ",
        "size": "Rozmiar",
        "frameSize": "Rozmiar klatki",
        "rows": "rzędów",
        "oneRowPerGroup": "jeden rząd na grupę",
        "pixels": "pikseli",
        "saveSpritesheet": "Zapisz arkusz sprite jako PNG"
    }
};

// Detect Photoshop language and select appropriate localization
function detectLanguage() {
    try {
        // Try to get Photoshop's language setting
        var language = app.preferences.getStringPreference("General/International/Language");
        
        // Check for Russian
        if (language.indexOf("ru") !== -1) return "ru";
        
        // Check for Polish
        if (language.indexOf("pl") !== -1) return "pl";
        
        // Default to English for all other languages
        return "en";
    } catch (e) {
        // If there's any error in detection, default to English
        return "en";
    }
}

// Get current language
var currentLang = detectLanguage();

// Helper function to get localized string
function _(key) {
    if (strings[currentLang] && strings[currentLang][key]) {
        return strings[currentLang][key];
    }
    // Fallback to English if the key doesn't exist in the current language
    return strings["en"][key];
}

var doc = app.activeDocument;
var dlg = new Window('dialog', _("title"));
dlg.orientation = 'column';
dlg.alignChildren = 'fill';

// Settings panel
var settingsPanel = dlg.add('panel', undefined, _("settings"));
settingsPanel.orientation = 'column';
settingsPanel.alignChildren = 'left';
settingsPanel.margins = 15;

// Columns input
var layoutGroup = settingsPanel.add('group');
layoutGroup.orientation = 'row';
layoutGroup.add('statictext', undefined, _("columns"));
var layoutValue = layoutGroup.add('edittext', undefined, '0');
layoutValue.characters = 5;

// Generation options
var optionsGroup = settingsPanel.add('group');
optionsGroup.orientation = 'column';
optionsGroup.alignChildren = 'left';

// Options label with bold font
var optionsLabel = optionsGroup.add('statictext', undefined, _("visibleLayersInfo"));
optionsLabel.graphics.font = ScriptUI.newFont(optionsLabel.graphics.font.name, ScriptUI.FontStyle.BOLD, optionsLabel.graphics.font.size);
optionsLabel.margins = [0, 0, 0, 5]; // Add a small bottom margin

// Radio buttons
var layersToFramesRadio = optionsGroup.add('radiobutton', undefined, _("layersToFrames"));
var layersAndGroupsToFramesRadio = optionsGroup.add('radiobutton', undefined, _("layersAndGroupsToFrames"));
var groupsToRowsRadio = optionsGroup.add('radiobutton', undefined, _("groupsToRows"));
layersToFramesRadio.value = true;

// Preview panel
var previewPanel = dlg.add('panel', undefined, _("preview"));
previewPanel.orientation = 'column';
previewPanel.alignChildren = 'left';
previewPanel.margins = 15;

var previewText = previewPanel.add('statictext', undefined, _("loadingPreview"), {multiline: true});
previewText.characters = 50;
previewText.preferredSize.height = 80;
previewText.alignment = 'left';
previewText.preferredSize.width = 300;

// Action buttons
var btnGroup = dlg.add('group');
btnGroup.orientation = 'row';
btnGroup.alignment = 'center';
var cancelBtn = btnGroup.add('button', undefined, _("cancel"));
var savePngBtn = btnGroup.add('button', undefined, _("savePNG"));
var runBtn = btnGroup.add('button', undefined, _("createPSD"));
cancelBtn.onClick = function() { dlg.close(); };

// Initialize
var allFrames = [];
updateFrameCount(true);

// Event handlers
layersToFramesRadio.onClick = function() {
    updateUIState();
    updateFrameCount(true);
};

layersAndGroupsToFramesRadio.onClick = function() {
    updateUIState();
    updateFrameCount(true);
};

groupsToRowsRadio.onClick = function() {
    updateUIState();
    updateFrameCount(true);
};

// Use onChanging which fires with each keystroke
layoutValue.onChanging = function() { 
    updatePreview(); 
};

// Update UI state based on selected option
function updateUIState() {
    layoutValue.enabled = !groupsToRowsRadio.value;
}
updateUIState();

// Save PNG button handler
savePngBtn.onClick = function() {
    var layoutVal = parseInt(layoutValue.text);
    
    if (isNaN(layoutVal) || layoutVal < 1) {
        alert(_("invalidColumns"));
        return;
    }
    
    // Generate the spritesheet document
    var sheetDoc = generateSpritesheetDocument(layoutVal);
    
    if (sheetDoc) {
        // Create PNG save options
        var pngSaveOptions = new PNGSaveOptions();
        pngSaveOptions.compression = 0; // 0-9, 0 = none, 9 = maximum
        pngSaveOptions.interlaced = false;
        
        // Show save dialog
        var saveFile = File.saveDialog(_("saveSpritesheet"), "PNG:*.png");
        if (saveFile) {
            // Add .png extension if not present
            if (!saveFile.name.match(/\.png$/i)) {
                saveFile = new File(saveFile.absoluteURI + ".png");
            }
            // Save the file
            app.activeDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE);
            
            // Close the document without saving
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        } else {
            // User canceled save dialog, close the document
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }
    }
    
    dlg.close();
};

// Generate button handler
runBtn.onClick = function() {
    var layoutVal = parseInt(layoutValue.text);
    
    if (isNaN(layoutVal) || layoutVal < 1) {
        alert(_("invalidColumns"));
        return;
    }
    
    generateSpritesheetDocument(layoutVal);
    dlg.close();
};

// Show the dialog
dlg.show();

// Update frame count and preview
function updateFrameCount(updateColumns) {
    allFrames = [];
    
    if (groupsToRowsRadio.value) {
        framesByGroup = collectFramesByGroup(doc);
        
        var maxFramesInGroup = 0;
        var totalFrames = 0;
        
        for (var i = 0; i < framesByGroup.length; i++) {
            if (framesByGroup[i].frames.length > maxFramesInGroup) {
                maxFramesInGroup = framesByGroup[i].frames.length;
            }
            totalFrames += framesByGroup[i].frames.length;
        }
        
        if (updateColumns) {
            layoutValue.text = maxFramesInGroup.toString();
        }
    } else {
        collectFrames(doc, allFrames);
        
        var frameCount = allFrames.length;
        
        if (updateColumns || parseInt(layoutValue.text) === 0 || isNaN(parseInt(layoutValue.text))) {
            layoutValue.text = frameCount.toString();
        }
    }
    
    updatePreview();
}

// Update preview information
function updatePreview() {
    var layoutVal = parseInt(layoutValue.text);
    
    if (isNaN(layoutVal) || layoutVal < 1) {
        previewText.text = _("invalidColumns");
        return;
    }
    
    var frameWidth = doc.width.as('px');
    var frameHeight = doc.height.as('px');
    
    if (groupsToRowsRadio.value) {
        if (!framesByGroup || framesByGroup.length === 0) {
            previewText.text = _("noValidGroups");
            return;
        }
        
        var totalFrames = 0;
        for (var i = 0; i < framesByGroup.length; i++) {
            totalFrames += framesByGroup[i].frames.length;
        }
        
        var cols = layoutVal;
        var rows = framesByGroup.length;
        
        var totalWidth = frameWidth * cols;
        var totalHeight = frameHeight * rows;
        
        previewText.text = _("totalFrames") + ": " + totalFrames + "\n" +
                           _("layout") + ": " + cols + " " + _("columns") + " x " + rows + " " + _("rows") + " (" + _("oneRowPerGroup") + ")\n" +
                           _("size") + ": " + totalWidth + " x " + totalHeight + " " + _("pixels") + "\n" +
                           _("frameSize") + ": " + frameWidth + " x " + frameHeight + " " + _("pixels");
    } else {
        var frameCount = allFrames.length;
        
        var cols = layoutVal;
        var rows = Math.ceil(frameCount / cols);
        
        var totalWidth = frameWidth * cols;
        var totalHeight = frameHeight * rows;
        
        previewText.text = _("totalFrames") + ": " + frameCount + "\n" +
                           _("layout") + ": " + cols + " " + _("columns") + " x " + rows + " " + _("rows") + "\n" +
                           _("size") + ": " + totalWidth + " x " + totalHeight + " " + _("pixels") + "\n" +
                           _("frameSize") + ": " + frameWidth + " x " + frameHeight + " " + _("pixels");
    }
}

// Check if a group has any visible layers
function hasVisibleLayers(group) {
    for (var i = 0; i < group.layers.length; i++) {
        if (group.layers[i].visible) {
            if (group.layers[i].typename === "LayerSet") {
                if (hasVisibleLayers(group.layers[i])) {
                    return true;
                }
            } else {
                return true;
            }
        }
    }
    return false;
}

// Collect frames from layers
function collectFrames(parent, frames) {
    for (var i = parent.layers.length - 1; i >= 0; i--) {
        var layer = parent.layers[i];
        
        if (!layer.visible) continue;
        
        if (layersAndGroupsToFramesRadio.value && layer.typename === "LayerSet") {
            if (hasVisibleLayers(layer)) {
                frames.push(layer);
            }
        } else if (layersToFramesRadio.value && layer.typename === "LayerSet") {
            collectFrames(layer, frames);
        } else if (layer.typename !== "LayerSet") {
            frames.push(layer);
        }
    }
}

// Collect frames organized by groups
function collectFramesByGroup(parent) {
    var result = [];
    var ungroupedFrames = [];
    
    for (var i = parent.layers.length - 1; i >= 0; i--) {
        var layer = parent.layers[i];
        
        if (!layer.visible) continue;
        
        if (layer.typename === "LayerSet") {
            if (hasVisibleLayers(layer)) {
                var groupFrames = [];
                collectVisibleLayersInGroup(layer, groupFrames);
                
                if (groupFrames.length > 0) {
                    result.push({
                        name: layer.name,
                        frames: groupFrames
                    });
                }
            }
        } else {
            ungroupedFrames.push(layer);
        }
    }
    
    if (ungroupedFrames.length > 0) {
        result.push({
            name: "Ungrouped",
            frames: ungroupedFrames
        });
    }
    
    return result;
}

// Collect visible layers in a group
function collectVisibleLayersInGroup(group, frames) {
    for (var i = group.layers.length - 1; i >= 0; i--) {
        var layer = group.layers[i];
        
        if (!layer.visible) continue;
        
        if (layer.typename !== "LayerSet") {
            frames.push(layer);
        }
    }
}

// Add guides to the document
function addGuides(doc, frameWidth, frameHeight, cols, rows) {
    for (var c = 0; c <= cols; c++) {
        doc.guides.add(Direction.VERTICAL, c * frameWidth);
    }
    
    for (var r = 0; r <= rows; r++) {
        doc.guides.add(Direction.HORIZONTAL, r * frameHeight);
    }
}

// Generate the spritesheet document and return it
function generateSpritesheetDocument(layoutValue) {
    var frameWidth = doc.width.as('px');
    var frameHeight = doc.height.as('px');
    
    if (groupsToRowsRadio.value) {
        if (!framesByGroup || framesByGroup.length === 0) {
            alert(_("noValidGroups"));
            return;
        }
        
        var cols = layoutValue;
        var rows = framesByGroup.length;
        
        var sheetDoc = app.documents.add(
            frameWidth * cols, 
            frameHeight * rows, 
            doc.resolution, 
            "Spritesheet", 
            NewDocumentMode.RGB, 
            DocumentFill.TRANSPARENT
        );
        
        for (var groupIdx = 0; groupIdx < framesByGroup.length; groupIdx++) {
            var group = framesByGroup[groupIdx];
            
            for (var frameIdx = 0; frameIdx < group.frames.length; frameIdx++) {
                var layer = group.frames[frameIdx];
                
                app.activeDocument = doc;
                var dup = layer.duplicate(sheetDoc, ElementPlacement.PLACEATBEGINNING);
                
                app.activeDocument = sheetDoc;
                
                var col = frameIdx % cols;
                var row = groupIdx;
                
                dup.translate(col * frameWidth, row * frameHeight);
            }
        }
        
        addGuides(sheetDoc, frameWidth, frameHeight, cols, rows);
        app.activeDocument = sheetDoc;
        return sheetDoc;
        
    } else {
        var allFrames = [];
        collectFrames(doc, allFrames);
        
        if (allFrames.length === 0) {
            alert(_("noValidFrames"));
            return null;
        }
        
        var totalFrames = allFrames.length;
        var cols = layoutValue;
        var rows = Math.ceil(totalFrames / cols);
        
        var sheetDoc = app.documents.add(
            frameWidth * cols, 
            frameHeight * rows, 
            doc.resolution, 
            "Spritesheet", 
            NewDocumentMode.RGB, 
            DocumentFill.TRANSPARENT
        );
        
        for (var j = 0; j < allFrames.length; j++) {
            app.activeDocument = doc;
            
            var tempDoc = null;
            var dup = null;
            
            if (layersAndGroupsToFramesRadio.value && allFrames[j].typename === "LayerSet") {
                tempDoc = app.documents.add(
                    frameWidth, 
                    frameHeight, 
                    doc.resolution, 
                    "Temp", 
                    NewDocumentMode.RGB, 
                    DocumentFill.TRANSPARENT
                );
                
                app.activeDocument = doc;
                
                var layerVisibility = [];
                for (var k = 0; k < allFrames[j].layers.length; k++) {
                    layerVisibility.push(allFrames[j].layers[k].visible);
                    allFrames[j].layers[k].visible = true;
                }
                
                var dupGroup = allFrames[j].duplicate(tempDoc, ElementPlacement.PLACEATBEGINNING);
                
                for (var k = 0; k < allFrames[j].layers.length; k++) {
                    allFrames[j].layers[k].visible = layerVisibility[k];
                }
                
                app.activeDocument = tempDoc;
                
                if (tempDoc.layers.length > 1) {
                    tempDoc.activeLayer = tempDoc.layers[0];
                    tempDoc.mergeVisibleLayers();
                }
                
                dup = tempDoc.layers[0].duplicate(sheetDoc, ElementPlacement.PLACEATBEGINNING);
                
                tempDoc.close(SaveOptions.DONOTSAVECHANGES);
            } else {
                dup = allFrames[j].duplicate(sheetDoc, ElementPlacement.PLACEATBEGINNING);
            }
            
            app.activeDocument = sheetDoc;
            
            var col = j % cols;
            var row = Math.floor(j / cols);
            
            dup.translate(col * frameWidth, row * frameHeight);
        }
        
        addGuides(sheetDoc, frameWidth, frameHeight, cols, rows);
        app.activeDocument = sheetDoc;
        return sheetDoc;
    }
}
