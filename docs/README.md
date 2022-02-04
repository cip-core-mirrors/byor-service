## Database schema

![Click to see full size](/docs/Diagram.png?raw=true)

## Description of tables

### Blips

A blip is represented by a dot in a radar.

Each blip has an __`id`__ which is built accroding to the pattern `userId-timestamp-index` where `index` is an index in order to differentiate blips created at the same, in the same batch.

It also has a user-friendly __name__ given by the creator of the blip.

##### Column links

A blip can also have multiple columns in order to hold long text values (example : _Description_, _Current status_, _Next steps_).
These are represented by the table `column_links`.
Concatenating all column values related to a blip, a __`hash`__ is generated (see [here](https://github.com/cip-core-mirrors/byor-service/blob/95a6b4b7a7114f68db9da9535f7e9cb834881b84/src/router/database.js#L1124) how) which is used to determine if a blip has been edited between 2 save attempts.

##### Blip rights

A blip is also linked to multiple `blip_rights` in order to give a certain set of rights to some user for this blip.
The __`rights`__ value is a coma-separated string list of rights (currently `owner` and `edit` are supported).

### Blip links

A blip link matches a blip with a radar version.

Moreover, it also refers to the position of a blip within a radar version, for example the `sector`, the `ring` and also the `value` of the blip (which then determines the icon of the blip).
For now, only values from 1 to 7 are supported.

### Radar versions

It is a version of a radar.
However, versions are structured as follows :
- __Version__: a stable snapshot of a radar. It cannot be directly edited, it has to be forked in order to work with.
- __Fork__: a branch that deviates from a stable radar version. It can ben edited.
- __Fork version__: Each edition of a fork generates a new fork version. Once the user is done adding changes to a fork, the current fork/fork version is used in order to generate a new radar version.

##### Radar tags

A pointer that references to a version or version/fork/fork version.
A radar version can have multiple tags, but cannot have duplicate tags.
If an already existing tag is created, it will replace the old one.

### Radars

It is represented by a visual radar.
This table does not hold any information except the state of a radar which is any integer.

##### Radar rights

Same as [Blip rights](#blip-rights) but for radar.

### Radar parameters

Similar to [Blip links](#blip-links), key/value based parameters data.
Each parameter points to a radar version.

### Themes

A theme sets and tunes the color/font palets used in the visualization of a radar.
One of the radar parameters is `theme-id`, which refers to an __`id`__ in this table.

##### Theme parameters

Same as [Radar parameters](#radar-parameters) but for theme.

##### Theme rights

Same as [Blip rights](#blip-rights) but for theme.
