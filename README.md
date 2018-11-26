### Form Builder

Upon initialization the form builder looks at the browser's `window` object's `alx_dynamic_form_config` property and will apply the changes to the form if it finds a valid Javascript Object or JSON text configuration.

The features include:

* selecting a template for layout
* nested groupings of fields
* pagination
* configuring colours
* replacing labels
* adding placeholders
* setting default values of fields
* setting conditional relations between fields, groups and pages
* validating fields
* adding input masks to fields
* setting up unique ID generation for certain fields
* using URL parameters to populate fields

------
### Usage

Run the following command to build a distrubutable bundle (/dist/alx-dynamic-form-builder-bundle.min.js), or copy-paste the latest release from the dist folder.

```
npm run build
```

Run the following command if you want to develop on your local system

```
npm run dev
```

------
### Configuration

#### Main Configuration Object

```
{
	"targetGroups": { /* */ },
	"template": { /* */ },
	"structure": { /* */ },
	"styling": { /* */ },
	"content": { /* */ },
	"state": { /* */ },
	"plugins": { /* */ }
}
```

------
#### Target Groups Configuration

This is a configuration for setting which target groups make up the form. This isn't mandatory for all the features, but necessary for most of the plugins.

##### Example

```
{
    "targetGroups": {
        "parent": 8,
        "children": [9,10]
    },
	"template": { /* */ },
	"structure": { /* */ },
	"styling": { /* */ },
	"content": { /* */ },
	"state": { /* */ },
	"plugins": { /* */ }
}
```

------
#### Template Configuration

The Template Configuration is for selecting a template for layout. If not defined the form builder uses the "default" tempalte.

##### Example

```
{
	"targetGroups": { /* */ },
    "template": "default",
	"structure": { /* */ },
	"styling": { /* */ },
	"content": { /* */ },
	"state": { /* */ },
	"plugins": { /* */ }
}
```

------
#### Structure Configuration

The Structure Configuration allows you to create nested groups and add pagination. If not defined the form builder wraps the fields in a group named "default".

##### Example

```
{
	"targetGroups": { /* */ },
	"template": { /* */ },
	"structure": {
		"groups": [{
				"id": "doctor",
				"fields": [
					"id_doctor_field_firstname",
					"id_doctor_field_lastname",
					"id_doctor_field_email",
					"id_doctor_field_is_the_doctor_incorporated"
				],
				"children": [{
					"id": "doctor-corporation",
					"fields": [
						"id_doctor_field_corporation_name",
						"id_doctor_field_corporation_description"
					]
				}]
			},
			{
				"id": "store",
				"fields": [
					"id_test_store_field_name",
					"id_test_store_field_store_id",
					"id_test_store_field_store_address_details"
				],
				"children": []
			},
			{
				"id": "sublease",
				"fields": [
					"id_sublease"
				],
				"children": []
			}
		],
		"pages": [{
				"label": "Doctor information",
				"id": "doctor"
			},
			{
				"label": "Store information",
				"id": "store"
			},
			{
				"label": "Sublease",
				"id": "sublease"
			}
		]
	},
	"styling": { /* */ },
	"content": { /* */ },
	"state": { /* */ },
	"plugins": { /* */ }
}
```

------
#### Styling Configuration 

The Styling Configuration configuration allows you to change the colours of certain elements, or simply define a primary and secondary colour for quick styling. If not defined the simple colours default to grey and black. The detailed colours default to null and will use the primary and secondary colours as fallback.

##### Example

```
{
    "colours": {
        "simple": {
            "primary": "#95275d",
            "secondary": "#083846"
        },
        "detailed": {
            "page": {
                "title": "#083846",
                "footer": "#083846"
            },
            "navigation": {
                "background": "#083846",
                "tabs": {
                    "text": "#fff",
                    "background": "#083846",
                    "active": {
                        "background": "#95275d",
                        "text": "#fff"
                    }
                },
                "buttons": {
                    "background": "#083846",
                    "text": "#fff"
                }
            },
            "controls": {
                "buttons": {
                    "border": "#083846",
                    "text": "#fff"
                }
            },
            "groups": {
                "heading": {
                    "text": "#fff",
                    "background": "#95275d"
                },
                "description": {
                    "text": "#fff",
                    "background": "#083846"
                }
            },
            "fields": {
                "helperText": {
                    "text": "#fff",
                    "background": "#083846"
                }
            }
        }
    }
}
```