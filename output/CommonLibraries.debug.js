//! CommonLibraries.debug.js
//

(function() {

Type.registerNamespace('CommonLibraries');

////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.GameAnswer

CommonLibraries.GameAnswer = function CommonLibraries_GameAnswer() {
    /// <field name="value" type="Number" integer="true">
    /// </field>
    /// <field name="lineNumber" type="Number" integer="true">
    /// </field>
}
CommonLibraries.GameAnswer.prototype = {
    value: 0,
    lineNumber: 0
}


////////////////////////////////////////////////////////////////////////////////
// CommonLibraries.Size

CommonLibraries.Size = function CommonLibraries_Size() {
    /// <field name="width" type="Number" integer="true">
    /// </field>
    /// <field name="height" type="Number" integer="true">
    /// </field>
}
CommonLibraries.Size.prototype = {
    width: 0,
    height: 0
}


CommonLibraries.GameAnswer.registerClass('CommonLibraries.GameAnswer');
CommonLibraries.Size.registerClass('CommonLibraries.Size');
})();

//! This script was generated using Script# v0.7.4.0
