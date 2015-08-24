/**
 * @file
 * Drush wrapper for Aquifer.
 */

/* globals require, Aquifer, AquiferDrushConfig, module */

module.exports = function(Aquifer, AquiferDrushConfig) {

  'use strict';

  var AquiferDrush  = function() {},
      drush         = require('drush-node'),
      path          = require('path'),
      jsonFile      = require('jsonfile'),
      Q             = require('q');

  /**
   * Informs Aquifer of what this extension does.
   *
   * @return object
   * Details about this deployment script.
   */
  AquiferDrush.commands = function () {
    return {
      'drush': {
        description: 'Runs drush commnds against the built Aquifer project.',
        allowUnknownOption: true
      }
    };
  };

  /**
   * Run when user runs commands within this extension.
   *
   * @param string command string representing the name of the command defined in AquiferDrush.commands that should run.
   * @param object options options passed from the command.
   * @param function callback function that is called when there is an error message to send.
   */
  AquiferDrush.run = function (command, options, callback) {
    if (command !== 'drush') {
      callback('Invalid command.');
      return;
    }

    var jsonPath      = path.join(Aquifer.projectDir, 'aquifer.json'),
        json          = jsonFile.readFileSync(jsonPath),
        dir           = path.join(Aquifer.projectDir, json.paths.builds, 'work'),
        drushCommand  = process.argv.slice(3).join(' ');

    Q.when(drush.init({log: true, cwd: dir}))
      .then(function () {
        Aquifer.console.log('Executing drush command...', 'status');
        return drush.exec(drushCommand);
      })
      .then(function () {
        Aquifer.console.log('Drush command completed successfully.', 'success');
      })
      .catch(function (error) {
        Aquifer.console.log(error.message, 'error');
      });
  };

  return AquiferDrush;
};
