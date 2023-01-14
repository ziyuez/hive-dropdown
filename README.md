# Hive-Dropdown

## Getting Started
For help getting this project + all demos up and running, please refer to https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository.

For source code to the dropdown itself, navigate to `src->Components`.

## Documentation

### Required Props
For the following two props (Option and setOptions), we strongly suggest you utilize React.useState to help your parent component keep track of changes in the dropdown selection.

#### Options
Dropdown requires `options` to be passed as an array of the following object
```
  { id: int,
    title: string,
    selected: boolean }
```
where `id` is unique for every object and `title` is the text that will display as an option in the dropdown. You may set `selected` to any value you prefer.

#### SetOptions
Dropdown requires `setOptions` to be passed as a function to call when the user selects or deselects a value in the dropdown menu. A sample implementation of a function to pass into `setOptions` might look like this:
```
const handleDropdown = (updateOptions) => {
    setValues(updateOptions);
  }
```

### Optional Props
#### Single/Multi Selection
Dropdown can be configured as a single-select dropdown or a multi-select dropdown through the property `isMultiselect`. This property is *optional* and the dropdown will default to a single-select dropdown if unspecified.

#### Search Bar
For large dropdown lists, the dropdown can render an optional search bar to help users find their selections quickly through the property `searchBar`. This property is *optional* and the dropdown not render a search bar if unspecified.

#### Text and Styling
For flexible usage, Dropdown provides the option to customize text and menu height through the following properties with the corresponding defaults: 
- `placeholder = 'Select options'`
- `label = 'Options'`
- `clearMessage = 'Clear Selected'`
- `selectMessage = 'Select All'`
- `maxDropdownHeight = '25vh'`

These properties are *optional*.

## Demos
Clone and launch the React app to see Dropdown in use.

![Demo without Search](/demo1.png "Demo without Search")

![Demo with Search](/demo2.png "Demo with Search")

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
