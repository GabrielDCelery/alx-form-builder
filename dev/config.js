window.alx_dynamic_form_config = {
    template: 'basic',
    styling: {
        colours: {
            primary: '#10069F',
            secondary: '#fff8ff',
            text: {
                navbar: '',
                buttons: ''
            }
        }
    },
    structure: {
        groups: [
            {
                "id": "request-details",
                "fields": [
                    "id_field_agreement_type",
                    "id_field_legal_opinion_required",
                    "id_field_governing_law",
                    "id_field_if_other_please_provide_details",
                    "id_field_customer_name",
                    "id_field_lead_party_company_name",
                    "id_field_counsel_acting_for_lead_party",
                    "id_field_acting_counsel_e_mail",
                    "id_field_lead_party_country"
                ],
                "children": []
            },
            {
                "id": "aircraft-manufacturer",
                "fields": [
                    "id_field_manufacturer_serial_number",
                    "id_field_aircraft_manufacturer",
                    "id_field_engine_serial_numbers",
                    "id_field_reference_number",
                    "id_field_aircraft_type",
                    "id_field_aircraft_registration_mark",
                    "id_field_engine_type",
                    "id_field_is_the_aircraft_part_of_a_fleet",
                    "id_field_total_number_of_aircrafts_in_the_fleet",
                    "id_field_number_of_this_aircraft_in_the_fleet"
                ],
                "children": []
            },
            {
                "id": "background",
                "fields": [
                    "id_field_parties_involved",
                    "id_field_if_other_please_specify",
                    "id_field_please_specify_deal_deadline"
                ],
                "children": [
                    {
                        "id": "ewa",
                        "fields": [
                            "id_field_purpose_of_ewa",
                            "id_field_financial_structure",
                            "id_field_are_there_any_amendments",
                            "id_field_amendments_detail",
                            "id_field_are_there_any_additional_definitions",
                            "id_field_definitions_detail"
                        ],
                        "children": []
                    },
                    {
                        "id": "tewa",
                        "fields": [
                            "id_field_deg_number_of_ewa_to_be_terminated",
                            "id_field_date_of_original_ewa",
                            "id_field_please_confirm_all_parties_wish_to_terminate_the_agreement",
                            "id_field_original_executed_ewa"
                        ],
                        "children": []
                    }
                ]
            },
            {
                "id": "parties",
                "fields": [],
                "children": [
                    {
                        "id": "lessee",
                        "fields": [
                            "id_field_lessee_full_name",
                            "id_field_lessee_country_of_incorporation",
                            "id_field_lessee_address",
                            "id_field_lessee_the_above_is",
                            "id_field_lessee_name_of_authorised_signatory"
                        ],
                        "children": []
                    },
                    {
                        "id": "lessor",
                        "fields": [
                            "id_field_lessor_full_name",
                            "id_field_lessor_country_of_incorporation",
                            "id_field_lessor_address",
                            "id_field_lessor_the_above_is",
                            "id_field_lessor_name_of_authorised_signatory"
                        ],
                        "children": []
                    },
                    {
                        "id": "head-lessor",
                        "fields": [
                            "id_field_head_lessor_full_name",
                            "id_field_head_lessor_country_of_incorporation",
                            "id_field_head_lessor_address",
                            "id_field_head_lessor_the_above_is",
                            "id_field_head_lessor_name_of_authorised_signatory"
                        ],
                        "children": []
                    },
                    {
                        "id": "trustee",
                        "fields": [
                            "id_field_trustee_full_name",
                            "id_field_trustee_country_of_incorporation",
                            "id_field_trustee_address",
                            "id_field_trustee_the_above_is",
                            "id_field_trustee_name_of_authorised_signatory"
                        ],
                        "children": []
                    },
                    {
                        "id": "pdp",
                        "fields": [
                            "id_field_pdp_full_name",
                            "id_field_pdp_country_of_incorporation",
                            "id_field_pdp_address",
                            "id_field_pdp_the_above_is",
                            "id_field_pdp_name_of_authorised_signatory"
                        ],
                        "children": []
                    }
                ]
            },
            {
                "id": "current-agreements",
                "fields": [],
                "children": [
                    {
                        "id": "dw",
                        "fields": [
                            "id_field_is_there_a_direct_warranty"
                        ],
                        "children": [
                            {
                                "id": "dw-details",
                                "fields": [
                                    "id_field_dw_between",
                                    "id_field_dw_between_other",
                                    "id_field_dw_and",
                                    "id_field_dw_and_other",
                                    "id_field_dw_dated",
                                    "id_field_original_deg_number"
                                ],
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": "sa",
                        "fields": [
                            "id_field_is_there_a_security_agreement"
                        ],
                        "children": [
                            {
                                "id": "sa-details",
                                "fields": [
                                    "id_field_sa_between",
                                    "id_field_sa_between_other",
                                    "id_field_sa_and",
                                    "id_field_sa_and_other",
                                    "id_field_sa_dated"
                                ],
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": "la",
                        "fields": [
                            "id_field_is_there_a_lease_agreement"
                        ],
                        "children": [
                            {
                                "id": "la-details",
                                "fields": [
                                    "id_field_la_between",
                                    "id_field_la_between_other",
                                    "id_field_la_and",
                                    "id_field_la_and_other",
                                    "id_field_la_dated"
                                ],
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": "hl",
                        "fields": [
                            "id_field_is_there_a_head_lease"
                        ],
                        "children": [
                            {
                                "id": "hl-details",
                                "fields": [
                                    "id_field_hl_between",
                                    "id_field_hl_between_other",
                                    "id_field_hl_and",
                                    "id_field_hl_and_other",
                                    "id_field_hl_dated"
                                ],
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ],
        pages: [{
            label: "Request Details",
            id: "request-details"
        }, {
            label: "Aircraft Manufacturer",
            id: "aircraft-manufacturer"
        }, {
            label: "Background",
            id: "background"
        }, {
            label: "Parties",
            id: "parties"
        }, {
            label: "Current Agreements",
            id: "current-agreements"
        }]
    },
    content: {
        page: {
            logo: "https://www.rolls-royce.com/~/media/Images/R/Rolls-Royce/logo/rebrand-svg-logo.svg?h=96&la=en&w=59",
            title: "Engine Warranty Intake Form"
        },
        multiple: {
            fields: {},
            groups: {}
        },
        single: {
            fields: {},
            groups: {}
        }
    },
    state: {
        single: {
            fields: {
                "id_field_customer_name": {
                    "default": {
                        "validation": { 
                            "required": true 
                        }
                    }
                },
                "id_field_legal_opinion_required": {
                    "default": {
                        "visible": false,
                        "validation": {
                            "required": true
                        }
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_agreement_type",
                            "values": [
                                "Engine Warranty Agreement"
                            ]
                        }]
                    }]
                },
                "id_field_if_other_please_provide_details": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_governing_law",
                            "values": [
                                "Other"
                            ]
                        }]
                    }]
                },
                "id_field_amendments_detail": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_are_there_any_amendments",
                            "values": [
                                "Yes"
                            ]
                        }]
                    }]
                },
                "id_field_definitions_detail": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_are_there_any_additional_definitions",
                            "values": [
                                "Yes"
                            ]
                        }]
                    }]
                },
                "id_field_total_number_of_aircrafts_in_the_fleet": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_is_the_aircraft_part_of_a_fleet",
                            "values": [
                                "Yes"
                            ]
                        }]
                    }]
                },
                "id_field_number_of_this_aircraft_in_the_fleet": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_is_the_aircraft_part_of_a_fleet",
                            "values": [
                                "Yes"
                            ]
                        }]
                    }]
                },
                "id_field_if_other_please_specify": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_parties_involved",
                            "values": [
                                "Other"
                            ]
                        }]
                    }]
                },
                "id_field_dw_between_other": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_dw_between",
                            "values": [
                                "Other"
                            ]
                        }]
                    }]
                },
                "id_field_sa_between_other": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_sa_between",
                            "values": [
                                "Other"
                            ]
                        }]
                    }]
                },
                "id_field_la_between_other": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_la_between",
                            "values": [
                                "Other"
                            ]
                        }]
                    }]
                },
                "id_field_hl_between_other": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_hl_between",
                            "values": [
                                "Other"
                            ]
                        }]
                    }]
                },
                "id_field_dw_and_other": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_dw_and",
                            "values": [
                                "Other"
                            ]
                        }]
                    }]
                },
                "id_field_sa_and_other": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_sa_and",
                            "values": [
                                "Other"
                            ]
                        }]
                    }]
                },
                "id_field_la_and_other": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_la_and",
                            "values": [
                                "Other"
                            ]
                        }]
                    }]
                },
                "id_field_hl_and_other": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_hl_and",
                            "values": [
                                "Other"
                            ]
                        }]
                    }]
                }
            },
            groups: {
                "ewa": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_agreement_type",
                            "values": [
                                "Engine Warranty Agreement"
                            ]
                        }]
                    }]
                },
                "tewa": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_agreement_type",
                            "values": [
                                "Termination Engine Warranty Agreement"
                            ]
                        }]
                    }]
                },
                "parties": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_parties_involved",
                            "values": [
                                "Lessor/Lessee",
                                "Lessor/Lessee/Security Trustee",
                                "Lessor/Lessee/Head Lessor/Security Trustee",
                                "PDP Lender/Lessee"
                            ]
                        }]
                    }]
                },
                "current-agreements": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_agreement_type",
                            "values": [
                                "Engine Warranty Agreement"
                            ]
                        }]
                    }]
                },
                "lessee": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_parties_involved",
                            "values": [
                                "Lessor/Lessee",
                                "Lessor/Lessee/Security Trustee",
                                "Lessor/Lessee/Head Lessor/Security Trustee",
                                "PDP Lender/Lessee"
                            ]
                        }]
                    }]
                },
                "lessor": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_parties_involved",
                            "values": [
                                "Lessor/Lessee",
                                "Lessor/Lessee/Security Trustee",
                                "Lessor/Lessee/Head Lessor/Security Trustee"
                            ]
                        }]
                    }]
                },
                "head-lessor": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_parties_involved",
                            "values": [
                                "Lessor/Lessee/Head Lessor/Security Trustee"
                            ]
                        }]
                    }]
                },
                "trustee": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_parties_involved",
                            "values": [
                                "Lessor/Lessee/Security Trustee",
                                "Lessor/Lessee/Head Lessor/Security Trustee"
                            ]
                        }]
                    }]
                },
                "pdp": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_parties_involved",
                            "values": [
                                "PDP Lender/Lessee"
                            ]
                        }]
                    }]
                },
                "dw-details": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_is_there_a_direct_warranty",
                            "values": [
                                "Yes"
                            ]
                        }]
                    }]
                },
                "sa-details": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_is_there_a_security_agreement",
                            "values": [
                                "Yes"
                            ]
                        }]
                    }]
                },
                "la-details": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_is_there_a_lease_agreement",
                            "values": [
                                "Yes"
                            ]
                        }]
                    }]
                },
                "hl-details": {
                    "default": {
                        "visible": false
                    },
                    "other": [{
                        "visible": true,
                        "conditions": [{
                            "target": "id_field_is_there_a_head_lease",
                            "values": [
                                "Yes"
                            ]
                        }]
                    }]
                }
            }
        }
    }
}