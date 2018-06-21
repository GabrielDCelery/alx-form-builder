### Form Builder
------

Upon initialization the form builder looks at the browser's `window` object's `alx_dynamic_form_config` property and if it finds a valid Javascript object or JSON text configuration, will apply the changes to the form.

The features include: 

* nested groupings of fields
* pagination
* decorating fields and groups with extra classes
* replacing labels
* adding placeholders
* setting default values of fields
* setting conditional relations between fields, groups and pages
* validating fields
* adding input masks to fields

### Usage
------


Run the following command to build a distrubutable bundle (/dist/alx-dynamic-form-builder-bundle.min.js)

```
npm run build
```

Run the following command if you want to develop on your local system

```
npm run dev
```

### Configuration
------

#### Main Configuration Object



```
{
    "title": "Main form builder configuration",
    "description": "Configuration file for the form builder",
    "type": "object",
    "properties": {
        "groups": "see Groups Configuration", 
        "pages": "see Pagination Configuration",
        "validation": "see Validation Configuration",
        "dependencies": "see Dependencies configuration",
        "inputMask": "see InputMask Configuration"
    },
    "required": ["groups"]
}
```


#### Groups Configuration

This option allows you to group fields wrapped by div elements and to generate multi-level nesting.

```
{
    "title": "Groups Configuration",
    "description": "Configuration for generating nested groups",
    "type": "array",
    "items": {
        "description": "Configuration of a single group",
        "type": "object",
        "properties": {
            "id": {
                "description": "Unique identifier of the group e.g. site-details",
                "type": "string"
            },
            "fields": {
                "description": "Field ids belonging to the group",
                "type": "array",
                "items": {
                    "description": "field id e.g. id_field_head_lessor_full_name",
                    "type": "string"
                }
            },
            "children": {
                "description": "Configuration for generating nested child groups",
                "type": "array",
                "items": {
                    "description": "Group Configuration",
                    "type": "object"
                }
            }
        }
    }
}
```

#### Pagination Configuration

After generating the nested groups of the fields you can paginate the top/first level groups. The groups should be defined through the "Group Configuration" in order for the pagination to work.

```
{
    "title": "Pagination Configuration",
    "description": "Configuration for generating navigable pages",
    "type": "array",
    "items": {
        "description": "Page configuration",
        "type": "object",
        "properties": {
            "label": {
                "description": "Label for the page e.g. Site Details",
                "type": "string"
            },
            "id": {
                "description": "ID of the group e.g. site-details",
                type": "string"
            }
        }
    }
}
```

#### Validation Configuration

The form builder uses the JQuery Validation plugin. For the built-in validation methods read the docs at https://jqueryvalidation.org/documentation Custom validators added to the plugin through the form builder:

* pattern: RegExp string

```
{
    "title": "Validation Configuration",
    "description": "Validation configuration for the individual fields",
    "type": "object",
    "properties": {
        "{{fieldID}}": {
            "description": "Configuration for a field, e.g. { required: true, minlength: 10 }",
            "type": "object"
        }
    }
}
```

#### Dependencies Configuration

Through this option you can set up default values for fields and dependencies between fields, groups and pages.

```
{
    "title": "Dependencies Configuration",
    "description": "Dependencies configuration for the fields, groups, pages",
    "properties": {
        "{{fieldId | groupId | pageId}}": {
            "descryption": ""
        }
    }
}

```

#### InputMask Configuration

The form builder uses the inputmask plugin via the `Inputmask` class. For details see the documentation at https://github.com/RobinHerbots/Inputmask

```
{
    "title": "InputMask Configuration",
    "description": "InputMask configuration for the individual fields",
    "type": "object",
    "properties": {
        "{{fieldID}}": {
            "description": "Configuration for a field, e.g. { mask: '99/99/9999' }",
            "type": "object"
        }
    }
}
```


### Example Configuration

```
{
	"globalDecoratorClasses": {
		"page": {
			"form": ["pure-form"]
		},
		"group": {},
		"field": {
			"field": ["pure-input-1"],
			"fieldWrapperDiv": ["pure-u-2-3"],
			"labelWrapperDiv": ["pure-u-1-3"],
			"labelAndFieldWrapperDiv": ["pure-g"]
		}
	},
	"pageDecorators": {
		"logo": {
			"type": "img",
			"value": "https://www.rolls-royce.com/~/media/Images/R/Rolls-Royce/logo/rebrand-svg-logo.svg?h=96&la=en&w=59",
			"decoratorClasses": []
		},
		"headingTitle": {
			"type": "text",
			"value": "Engine Warranty Intake Form"
		}
	},
	"groupDecorators": {},
	"fieldDecorators": {
		"id_field_reference_number": {
			"bIsLookupField": true
		},
		"id_field_definitions_detail": {
			"textAreaRows": 5
		},
		"id_field_engine_serial_numbers": {
			"placeholder": "e.g. 12345 & 54321"
		},
		"id_field_lessee_the_above_is": {
			"label": "The above is"
		}
	},
	"elemsToRelocate": {},
	"pages": [{
		"label": "Request Details",
		"id": "request-details"
	}, {
		"label": "Aircraft Manufacturer",
		"id": "aircraft-manufacturer"
	}, {
		"label": "Background",
		"id": "background"
	}, {
		"label": "Parties",
		"id": "parties"
	}, {
		"label": "Current Agreements",
		"id": "current-agreements"
	}],
	"groups": [{
		"id": "request-details",
		"fields": ["id_field_agreement_type", "id_field_legal_opinion_required"],
		"children": []
	}, {
		"id": "aircraft-manufacturer",
		"fields": ["id_field_manufacturer_serial_number", "id_field_aircraft_manufacturer", "id_field_engine_serial_numbers", "id_field_aircraft_type", "id_field_aircraft_registration_mark", "id_field_engine_type", "id_field_is_the_aircraft_part_of_a_fleet", "id_field_total_number_of_aircrafts_in_the_fleet", "id_field_number_of_this_aircraft_in_the_fleet"],
		"children": []
	}, {
		"id": "background",
		"fields": ["id_field_parties_involved", "id_field_if_other_please_specify", "id_field_please_specify_deal_deadline"],
		"children": [{
			"id": "ewa",
			"fields": ["id_field_purpose_of_ewa", "id_field_financial_structure", "id_field_are_there_any_amendments"],
			"children": []
		}, {
			"id": "tewa",
			"fields": ["id_field_deg_number_of_ewa_to_be_terminated", "id_field_date_of_original_ewa"],
			"children": []
		}]
	}, {
		"id": "parties",
		"fields": [],
		"children": [{
			"id": "lessee",
			"fields": ["id_field_lessee_full_name", "id_field_lessee_country_of_incorporation"],
			"children": []
		}, {
			"id": "lessor",
			"fields": ["id_field_lessor_full_name", "id_field_lessor_country_of_incorporation", "id_field_lessor_address"],
			"children": []
		}, {
			"id": "head-lessor",
			"fields": ["id_field_head_lessor_full_name", "id_field_head_lessor_country_of_incorporation"],
			"children": []
		}, {
			"id": "trustee",
			"fields": ["id_field_trustee_full_name", "id_field_trustee_country_of_incorporation", "id_field_trustee_address"],
			"children": []
		}, {
			"id": "pdp",
			"fields": ["id_field_pdp_full_name", "id_field_pdp_country_of_incorporation", "id_field_pdp_address"],
			"children": []
		}]
	}, {
		"id": "current-agreements",
		"fields": [],
		"children": [{
			"id": "dw",
			"fields": ["id_field_is_there_a_direct_warranty"],
			"children": [{
				"id": "dw-details",
				"fields": ["id_field_dw_between", "id_field_dw_between_other", "id_field_dw_and"],
				"children": []
			}]
		}, {
			"id": "sa",
			"fields": ["id_field_is_there_a_security_agreement"],
			"children": [{
				"id": "sa-details",
				"fields": ["id_field_sa_between", "id_field_sa_between_other", "id_field_sa_and", "id_field_sa_and_other", "id_field_sa_dated"],
				"children": []
			}]
		}, {
			"id": "la",
			"fields": ["id_field_is_there_a_lease_agreement"],
			"children": [{
				"id": "la-details",
				"fields": ["id_field_la_between", "id_field_la_between_other", "id_field_la_and", "id_field_la_and_other", "id_field_la_dated"],
				"children": []
			}]
		}, {
			"id": "hl",
			"fields": ["id_field_is_there_a_head_lease"],
			"children": [{
				"id": "hl-details",
				"fields": ["id_field_hl_between", "id_field_hl_between_other", "id_field_hl_and", "id_field_hl_and_other", "id_field_hl_dated"],
				"children": []
			}]
		}]
	}],
	"dependencies": {
		"id_field_legal_opinion_required": {
			"type": "field",
			"defaultState": {
				"visible": false
			},
			"validStates": [{
				"value": "",
				"visible": true,
				"criterias": [{
					"target": "id_field_agreement_type",
					"values": ["Engine Warranty Agreement"]
				}]
			}]
		},
		"ewa": {
			"type": "group",
			"defaultState": {
				"visible": false
			},
			"validStates": [{
				"visible": true,
				"criterias": [{
					"target": "id_field_agreement_type",
					"not": ["Termination Of Engine Warranty Agreement"]
				}]
			}]
		},
		"parties": {
			"type": "group",
			"defaultState": {
				"visible": false
			},
			"validStates": [{
				"visible": true,
				"criterias": [{
					"target": "id_field_parties_involved",
					"values": ["Lessor/Lessee", "Lessor/Lessee/Security Trustee", "Lessor/Lessee/Head Lessor/Security Trustee", "PDP Lender/Lessee"]
				}]
			}]
		}
	},
	"validation": {
		"id_field_agreement_type": {
			"required": true
		},
		"id_field_if_other_please_provide_details": {
			"minlength": 10
		},
		"id_field_engine_serial_numbers": {
			"pattern": "^([0-9]{3,10}) & ([0-9]{3,10})$"
		}
	},
	"inputMask": {
		"id_field_please_specify_deal_deadline": {
			"mask": "99/99/9999"
		}
	},
	"queryStringEvaluator": {
		"id": "id_field_manufacturer_serial_number"
	}
}
```