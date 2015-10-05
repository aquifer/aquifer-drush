# aquifer-drush
This extension makes it easier to run drush commands against a built site from the Aquifer project root. Without this extension you would either need to use an alias, the `-r` flag, or just cd into the build directory to run drush commands. Now you can run your drush command through Aquifer:

```bash
aquifer drush cc all
```

## Installation
To install aquifer-drush, run the below command from within your Aquifer project:

```bash
aquifer extension-add aquifer-drush
```

## Use
To run a drush command from your Aquifer project simply prepend `aquifer ` to the command. Here are some examples:

```bash
aquifer drush cc all
aquifer drush rq
aquifer drush help
```
