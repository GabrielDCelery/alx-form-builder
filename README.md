### Form Builder

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

------
### Usage

Run the following command to build a distrubutable bundle (/dist/alx-dynamic-form-builder-bundle.min.js)

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
    "title": "Main form builder configuration",
    "description": "Configuration file for the form builder",
    "type": "object",
    "properties": {
        "groups": "see Groups Configuration", 
        "pages": "see Pagination Configuration",
        "validation": "see Validation Configuration",
        "dependencies": "see Dependencies configuration",
        "inputMask": "see InputMask Configuration",
		"globalDecoratorClasses": "see Global Decorator Classes Configuration",
		"pageDecorators": "see Page Decorators Configuration",
		"groupDecorators": "see Group Decorators Configuration",
		"fieldDecorators": "see Field Decorators Configuration",
		"queryStringEvaluator": "see Query String Evaluator Configuration"
    }
}
```

------
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

##### Example Groups Configuration

```
[{
	"id": "request-details",
	"fields": ["id_field_agreement_type", "id_field_legal_opinion_required"],
	"children": []
}, {
	"id": "aircraft-manufacturer",
	"fields": ["id_field_manufacturer_serial_number", "id_field_aircraft_manufacturer"],
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
}]
```

------
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
				"type": "string"
			}
		}
	}
}
```

##### Example Pagination Configuration

```
[{
	"label": "Request Details",
	"id": "request-details"
}, {
	"label": "Aircraft Manufacturer",
	"id": "aircraft-manufacturer"
}, {
	"label": "Background",
	"id": "background"
}]
```

------
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

##### Example Validation Configuration

```
{
	"id_field_aircraft_manufacturer": {
		"required": true,
		"minlength": 10
	},
	"id_field_engine_serial_numbers": {
		"pattern": "^([0-9]{3,10}) & ([0-9]{3,10})$"
	}
}
```

------
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

##### Example InputMask Configuration

```
{
	"id_field_please_specify_deal_deadline": {
		"mask": "99/99/9999"
	}
}
```

------
#### Dependencies Configuration

Through this option you can set up default values for fields and dependencies between fields, groups and pages.

```
{
	"title": "Dependencies Configuration",
	"description": "Dependencies configuration for the fields, groups, pages",
	"properties": {
		"{{fieldId | groupId | pageId}}": {
			"description": "Configuration for a field or a group",
			"type": "object",
			"properties": {
				"type": {
					"description": "Type of the targeted element",
					"type": "string",
					"enum": ["field", "group"]
				},
				"defaultState": {
					"description": "Configuration for the field or group's default state",
					"type": "object",
					"properties": {
						"visible": {
							"description": "State of visibility of the field or group",
							"type": "boolean",
							"enum": [true, false]
						},
						"value": {
							"description": "Value of the elem (only for fields)",
							"type": "string | integer"
						}
					}
				},
				"validStates": {
					"description": "List of valid states for a field or a group",
					"type": "array",
					"items": {
						"description": "A valid state for a field or a group",
						"type": "object",
						"properties": {
							"visible": {
								"description": "State of visibility of the field or group",
								"type": "boolean",
								"enum": [true, false]
							},
							"value": {
								"description": "Value of the elem (only for fields)",
								"type": "string | integer"
							},
							"criterias": {
								"description": "A list of conditions of other fields that have to be true for the state to replace the default state",
								"type": "array",
								"items": {
									"description": "Configurations for the fields to be a valid criteria",
									"type": "object",
									"properties": {
										"target": {
											"description": "ID of the field",
											"type": "string"
										},
										"values": {
											"description": "Values of the field for it to be a valid criteria",
											"type": "array",
											"items": {
												"description": "Value of the field for it to be a valid criteria",
												"type": "string | integer"
											}
										},
										"not": {
											"description": "List of values that make the field an invalid criteria",
											"type": "array",
											"items": {
												"description": "Value that makles the field an invalid criteria",
												"type": "string | integer"
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
```

##### Example InputMask Configuration

```
{
	"id_field_if_other_please_provide_details": {
		"type": "field",
		"defaultState": {
			"visible": false
		},
		"validStates": [{
			"value": "",
			"visible": true,
			"criterias": [{
				"target": "id_field_governing_law",
				"values": ["Other"]
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
				"target": "id_submitter",
				"not": ["Rolls Royce"]
			}, {
				"target": "id_field_agreement_type",
				"values": ["Engine Warranty Agreement"]
			}]
		}]
	}
}
```

------
#### Global Decorator Classes Configuration



```
{
	"title": "Global Decorator Classes",
	"description": "Configuration for adding extra classes to certain elements",
	"type": "object",
	"properties": {
		"field": {
			"description": "Configuration for field related elems",
			"type": "object",
			"properties": {
				"field": {
					"description": "Extra classes for the field",
					"type": "array",
					"items": {
						"description": "Extra class for the field",
						"type": "string"
					}
				},
				"fieldWrapperDiv": {
					"description": "Extra classes for the div wrapping the field",
					"type": "array",
					"items": {
						"description": "Extra class for the div wrapping the field",
						"type": "string"
					}
				},
				"label": {
					"description": "Extra classes for the field's label",
					"type": "array",
					"items": {
						"description": "Extra class for the field's label",
						"type": "string"
					}
				},
				"labelWrapperDiv": {
					"description": "Extra classes for the div wrapping the label",
					"type": "array",
					"items": {
						"description": "Extra class for the div wrapping the label",
						"type": "string"
					}
				},
				"labelAndFieldWrapperDiv": {
					"description": "Extra classes for the div wrapping the label and the field",
					"type": "array",
					"items": {
						"description": "Extra class for the div wrapping the label and the field",
						"type": "string"
					}
				}
			}
		},
		"group": {
			"description": "Configuration for every group's wrapping fields",
			"type": "object",
			"properties": {
				"title": {
					"description": "Extra classes for every group's title div",
					"type": "array",
					"items": {
						"description": "Extra class for every group's title div",
						"type": "string"
					}
				},
				"description": {
					"description": "Extra classes for every group's description div",
					"type": "array",
					"items": {
						"description": "Extra class for every group's description div",
						"type": "string"
					}
				}
			}
		},
		"page": {
			"description": "Configuration for specific page elements",
			"type": "object",
			"properties": {
				"form": {
					"description": "Extra classes for the form",
					"type": "array",
					"items": {
						"description": "Extra class for the form",
						"type": "string"
					}
				},
				"logo": {
					"description": "Extra classes for the logo",
					"type": "array",
					"items": {
						"description": "Extra class for the logo",
						"type": "string"
					}
				},
				"heading": {
					"description": "Extra classes for the heading outermost wrapper",
					"type": "array",
					"items": {
						"description": "Extra class for the heading outermost wrapper",
						"type": "string"
					}
				},
				"headingInner": {
					"description": "Extra classes for the heading inner wrapper",
					"type": "array",
					"items": {
						"description": "Extra class for the heading inner wrapper",
						"type": "string"
					}
				},
				"headingInnerTitle": {
					"description": "Extra classes for the heading's title",
					"type": "array",
					"items": {
						"description": "Extra class for the heading title",
						"type": "string"
					}
				},
				"main": {
					"description": "Extra classes for the main outermost wrapper",
					"type": "array",
					"items": {
						"description": "Extra class for the main outermost wrapper",
						"type": "string"
					}
				},
				"mainInner": {
					"description": "Extra classes for the main inner wrapper",
					"type": "array",
					"items": {
						"description": "Extra class for the main inner wrapper",
						"type": "string"
					}
				},
				"mainInnerTitle": {
					"description": "Extra classes for the main title",
					"type": "array",
					"items": {
						"description": "Extra class for the main title",
						"type": "string"
					}
				},
				"footer": {
					"description": "Extra classes for the footer outermost wrapper",
					"type": "array",
					"items": {
						"description": "Extra class for the footer outermost wrapper",
						"type": "string"
					}
				},
				"footerInner": {
					"description": "Extra classes for the footer inner wrapper",
					"type": "array",
					"items": {
						"description": "Extra class for the footer inner wrapper",
						"type": "string"
					}
				},
				"footerInnerTitle": {
					"description": "Extra classes for the footer title text",
					"type": "array",
					"items": {
						"description": "Extra class for the footer title text",
						"type": "string"
					}
				},
				"saveAndLoadButtonContainer": {
					"description": "Extra classes for the save and load button container div",
					"type": "array",
					"items": {
						"description": "Extra class for the save and load button container div",
						"type": "string"
					}
				},
				"saveAndLoadButtonHelperText": {
					"description": "Extra classes for the save and load button helper text",
					"type": "array",
					"items": {
						"description": "Extra class for the save and load button helper text",
						"type": "string"
					}
				}
			}
		}
	}
}
```

##### Example Global Decorator Classes Configuration

```
{
	"page": {
		"heading": ["header"],
		"headingInner": ["header-inner"],
		"main": ["main"],
		"mainInner": ["main-inner"],
		"mainTitle": [],
		"footer": ["footer"],
		"footerInner": ["footer-inner"],
		"saveAndLoadButtonContainer": ["save-load"],
		"saveAndLoadButtonHelperText": ["sl-help"]
	},
	"group": {
		"groupDescription": ["help"]
	},
	"field": {
		"fieldWrapperDiv": ["input"],
		"labelWrapperDiv": ["label"],
		"labelAndFieldWrapperDiv": ["form-element"]
	}
}
```

------
#### Page Decorators Configuration

```
{
	"title": "Page Decorators Configuration",
	"description": "Configuration for appending extra elements to the page",
	"type": "object",
	"properties": {
		"logo": {
			"description": "Config for appending a logo",
			"type": "object",
			"properties": {
				"type": {
					"description": "Type of the injected content",
					"type": "string",
					"enum": ["img", "html"]
				},
				"value": {
					"description": "Value of the injected content",
					"type": "string"
				},
				"decoratorClasses": {
					"description": "Extra classes to the injected elem",
					"type": "array",
					"items": {
						"description": "Extra class to the injected elem",
						"type": "string"
					}
				},
				"plainTextWrapper": {
					"description": "Tag for wrapping the injected element",
					"type": "string"
				}
			}
		},
		"headingTitle": {
			"description": "Config for appending a heading",
			"type": "object",
			"properties": {
				"type": {
					"description": "Type of the injected content",
					"type": "string",
					"enum": ["text", "html"]
				},
				"value": {
					"description": "Value of the injected content",
					"type": "string"
				},
				"decoratorClasses": {
					"description": "Extra classes to the injected elem",
					"type": "array",
					"items": {
						"description": "Extra class to the injected elem",
						"type": "string"
					}
				},
				"plainTextWrapper": {
					"description": "Tag for wrapping the injected element",
					"type": "string"
				}
			}
		},
		"mainTitle": {
			"description": "Config for appending a title to the main element",
			"type": "object",
			"properties": {
				"type": {
					"description": "Type of the injected content",
					"type": "string",
					"enum": ["text", "html"]
				},
				"value": {
					"description": "Value of the injected content",
					"type": "string"
				},
				"decoratorClasses": {
					"description": "Extra classes to the injected elem",
					"type": "array",
					"items": {
						"description": "Extra class to the injected elem",
						"type": "string"
					}
				},
				"plainTextWrapper": {
					"description": "Tag for wrapping the injected element",
					"type": "string"
				}
			}
		},
		"saveAndLoadButtonHelperText": {
			"description": "Config for appending a helper text to the save and load buttons",
			"type": "object",
			"properties": {
				"type": {
					"description": "Type of the injected content",
					"type": "string",
					"enum": ["text", "html"]
				},
				"value": {
					"description": "Value of the injected content",
					"type": "string"
				},
				"decoratorClasses": {
					"description": "Extra classes to the injected elem",
					"type": "array",
					"items": {
						"description": "Extra class to the injected elem",
						"type": "string"
					}
				},
				"plainTextWrapper": {
					"description": "Tag for wrapping the injected element",
					"type": "string"
				}
			}
		},
		"footerTitle": {
			"description": "Config for appending a title to the footer",
			"type": "object",
			"properties": {
				"type": {
					"description": "Type of the injected content",
					"type": "string",
					"enum": ["text", "html"]
				},
				"value": {
					"description": "Value of the injected content",
					"type": "string"
				},
				"decoratorClasses": {
					"description": "Extra classes to the injected elem",
					"type": "array",
					"items": {
						"description": "Extra class to the injected elem",
						"type": "string"
					}
				},
				"plainTextWrapper": {
					"description": "Tag for wrapping the injected element",
					"type": "string"
				}
			}
		}
	}
}
```

##### Example Page Decorators Configuration

```
{
	"logo": {
		"type": "img",
		"value": "https://www.rolls-royce.com/~/media/Images/R/Rolls-Royce/logo/rebrand-svg-logo.svg?h=96&la=en&w=59",
		"decoratorClasses": []
	},
	"headingTitle": {
		"type": "text",
		"value": null
	},
	"mainTitle": {
		"type": "html",
		"value": "<h1>Property Management Form</h1>"
	},
	"saveAndLoadButtonHelperText": {
		"type": "text",
		"value": "Don't have time to finish? Save your work in progress! Load it again when you are ready to submit your request!"
	},
	"footerTitle": {
		"type": "text",
		"value": "©2002-2017 T-MOBILE USA, INC."
	}
}
```

------
#### Group Decorators Configuration

```
{
	"title": "Group Decorators Configuration",
	"description": "Configuration for injecting group titles and descriptions",
	"type": "object",
	"properties": {
		"{{groupId}}": {
			"description": "Configuration for injecting content for a group",
			"type": "object",
			"properties": {
				"title": {
					"description": "Configuration for injecting a title for a group",
					"type": "object",
					"properties": {
						"type": {
							"description": "Type of the injected content",
							"type": "string",
							"enum": ["text", "html"]
						},
						"value": {
							"description": "Value of the injected content",
							"type": "string"
						},
						"decoratorClasses": {
							"description": "Extra classes to the injected elem",
							"type": "array",
							"items": {
								"description": "Extra class to the injected elem",
								"type": "string"
							}
						},
						"plainTextWrapper": {
							"description": "Tag for wrapping the injected element",
							"type": "string"
						}
					}
				},
				"description": {
					"description": "Configuration for injecting a description for a group",
					"type": "object",
					"properties": {
						"type": {
							"description": "Type of the injected content",
							"type": "string",
							"enum": ["text", "html"]
						},
						"value": {
							"description": "Value of the injected content",
							"type": "string"
						},
						"decoratorClasses": {
							"description": "Extra classes to the injected elem",
							"type": "array",
							"items": {
								"description": "Extra class to the injected elem",
								"type": "string"
							}
						},
						"plainTextWrapper": {
							"description": "Tag for wrapping the injected element",
							"type": "string"
						}
					}
				}
			}
		}
	}
}
```

##### Example Group Decorators Configuration

```
{
	"site-information": {
		"title": {
			"type": "html",
			"value": "<h1>Site Information</h1>"
		},
		"description": {
			"type": "text",
			"value": "Please type the full Site ID. If this request does not have a Site ID, please type New_Site. Please ensure you do not include any spaces in this box.",
			"decoratorClasses": ["help"]
		}
	},
	"updated-site-information": {
		"title": {
			"type": "text",
			"value": "Please use the fields below to provide the correct site information.",
			"plainTextWrapper": "h3"
		}
	}
}
```

------
#### Field Decorators Configuration

```
{
	"title": "Field Decorators Configuration",
	"description": "Configuration for injecting field related elements",
	"type": "object",
	"properties": {
		"{{fieldId}}": {
			"description": "Configuration for specific field to inject elements related to it",
			"type": "object",
			"properties": {
				"bIsLookupField": {
					"description": "Marks the field as a lookup field",
					"type": "boolean",
					"enum": [true]
				},
				"placeholder": {
					"description": "Placeholder text for for field",
					"type": "string"
				},
				"label": {
					"description": "New label that replaces the default label",
					"type": "string"
				},
				"textAreaRows": {
					"description": "Sets an input field to a text area and makes it have multiple rows",
					"type": "integer"
				},
				"decoratorClasses": {
					"description": "Custom field related extra classes",
					"type": "object",
					"properties": {
						"field": {
							"description": "Extra classes for the field",
							"type": "array",
							"items": {
								"description": "Extra class for the field",
								"type": "string"
							}
						},
						"fieldWrapperDiv": {
							"description": "Extra classes for the div wrapping the field",
							"type": "array",
							"items": {
								"description": "Extra class for the div wrapping the field",
								"type": "string"
							}
						},
						"label": {
							"description": "Extra classes for the field's label",
							"type": "array",
							"items": {
								"description": "Extra class for the field's label",
								"type": "string"
							}
						},
						"labelWrapperDiv": {
							"description": "Extra classes for the div wrapping the label",
							"type": "array",
							"items": {
								"description": "Extra class for the div wrapping the label",
								"type": "string"
							}
						},
						"labelAndFieldWrapperDiv": {
							"description": "Extra classes for the div wrapping the label and the field",
							"type": "array",
							"items": {
								"description": "Extra class for the div wrapping the label and the field",
								"type": "string"
							}
						}
					}
				},
				"helperText": {
					"description": "Injector for extra helper text for the field",
					"type": "object",
					"properties": {
						"type": {
							"description": "Type of the injected content",
							"type": "string",
							"enum": ["text", "html"]
						},
						"value": {
							"description": "Value of the injected content",
							"type": "string"
						},
						"decoratorClasses": {
							"description": "Extra classes to the injected elem",
							"type": "array",
							"items": {
								"description": "Extra class to the injected elem",
								"type": "string"
							}
						},
						"plainTextWrapper": {
							"description": "Tag for wrapping the injected element",
							"type": "string"
						}
					}
				}
			}
		}
	}
}
```

##### Example Field Decorators Configuration

```
{
	"fieldDecorators": {
		"id_field_relationship_name": {
			"bIsLookupField": true,
			"decoratorClasses": {
				"labelAndFieldWrapperDiv": ["id_field_relationship_name"]
			}
		},
		"id_field_market_site_point_email": {
			"helperText": {
				"type": "text",
				"value": "Please note that this person will receive all email notifications relating to this matter going forward",
				"decoratorClasses": ["help"]
			}
		},
		"id_field_amendments_detail": {
			"textAreaRows": 5
		},
		"id_field_engine_serial_numbers": {
			"placeholder": "e.g. 12345 & 54321"
		},
		"id_field_lessee_the_above_is": {
			"label": "The above is"
		}
	}
}
```

------
#### Query String Evaluator Configuration

```
{
	"title": "Query String Evaluator Configuration",
	"description": "Configuration for using query string parameters to populate fields",
	"type": "object",
	"parameters": {
		"id": {
			"description": "Configuration for query parameter to which field to target",
			"type": "string"
		}
	}
}
```


##### Example Query String Evaluator Configuration

```
{
    "id": "id_field_manufacturer_serial_number"
}
```