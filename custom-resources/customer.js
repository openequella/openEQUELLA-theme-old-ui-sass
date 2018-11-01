$(document).ready(function() {
  var $bodyNode = $('body');
  var $bodyInnerNode = $('#body-inner');

  var routeMappings = {
    logon : 'login',
    home : 'dashboard',
    favourites : 'favourites',
    myresources : 'my-resources',
    searching : 'search',
    contribute : 'contribute',
    hierarchy: 'resources', // for both Browse Mini Resources and Learning Resources
    managetasks: 'manage-tasks',
    manageconnectors: 'manage-external-resources',
    itemadmin: 'manage-resources',
    activations: 'manage-activations',
    reports: 'reports',
    settings: 'settings',
    // others
    other: 'other', // handle unrecognized routes
    runwizard: 'editing',
    shortcuturlssettings: 'shortcut-url-settings',
  }

  /** Actual Paths
   * Login : /eq-inst/logon.do
   * Dashboard : /eq-inst/home.do
   * Favourites : /eq-inst/access/favourites.do
   * My Resources : /eq-inst/access/myresources.do
   * Search : /eq-inst/searching.do
   * *** also have types of standard, gallery, and video -- ?type=standard, ?type=gallery, ?type=video
   * Contribute : /eq-inst/access/contribute.do
   * Browse Mini Resources : /eq-inst/hierarchy.do
   * Learning Resources : /eq-inst/hierarchy.do
   * Manage Tasks : /eq-inst/access/managetasks.do
   * Manage External Resources : /eq-inst/access/manageconnectors.do
   * Manage Resources : /eq-inst/access/itemadmin.do
   * Manage Activations : /eq-inst/access/activations.do
   * Reports : /eq-inst/access/reports.do
   * Settings : /eq-inst/access/settings.do
   */

  // Method sets global variable 
  function getCurrentPathName() {
    pathName = window.location.pathname;
    return pathName;
  }

  // Method examines the window.location.path and extracts the route name from path before the .do
  // For example, the location.path of the Settings page is /eq-inst/access/settings.do
  // Regex grabs the 'settings' from this path
  function getRouteName( pathName ) {
    var routeRegex = /\/.+\/(\w+)\.do$/;
    var regexExecArray = routeRegex.exec( pathName );

    if (!regexExecArray) {
      return 'other';
    }

    browserRouteName = regexExecArray[1];
    return browserRouteName;
  }

  // Method takes the actual url pathname route name and returns a more user-friendly name that is related ot titles on the view
  // Example - input of 'itemadmin' output is friendly class name 'manage-resources', which relates to the Manage Resources page and Sass file
  function getUserFriendlyClassName( routeName ) {
    // check routeMapping object if has this key, else use routeName passed as class name
    var friendlyName = routeMappings[ routeName ] ? routeMappings[ routeName ] : routeName;

    return friendlyName;
  }

  /** Window event listener */
  $(window).on("load", function(){
    var pathName = getCurrentPathName();
    var routeName = getRouteName( pathName );
    var friendlyName = getUserFriendlyClassName( routeName );
    
    // add pathName class to body
    $bodyNode.addClass( friendlyName );
    $bodyInnerNode.addClass('reveal');
  });

});
