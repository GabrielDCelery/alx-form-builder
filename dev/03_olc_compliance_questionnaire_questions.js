
window.alx_dynamic_form_config = {
    targetGroups: {
        parent: 1,
        children: []
    },
    plugins: {
        urlLookup: {
            id: 'id_field_email'
        }
    },
    template: 'default',
    styling: {
        colours: {
            simple: {
                primary: '#021A32',
                secondary: '#FFB612'
            },
            detailed: {
                fields: {
                    helperText: {
                        background: '#A4D7F4'
                    }
                },
                groups: {
                    description: {
                        background: '#A4D7F4'
                    }
                }
            }
        }
    },
    structure: {
        groups: [
            {
                "id": "page-1",
                "fields": [],
                "children": [{
                    "id": "olc-personal",
                    "fields": [
                        "id_field_email",
                        "id_field_limited_company_name"
                    ]
                }, {
                    "id": "olc-address",
                    "fields": [
                        "id_field_lcn_address_line_1",
                        "id_field_lcn_address_line_2",
                        "id_field_lcn_address_line_3",
                        "id_field_lcn_address_line_4",
                        "id_field_lcn_postcode",
                        "id_field_lcn_town",
                        "id_field_lcn_country"
                    ]
                }, {
                    "id": "olc-details",
                    "fields": [
                        "id_field_registration_number",
                        "id_field_is_the_supplier_vat_registered",
						"id_field_vat_registration_number"
                    ]
                }, {
                    "id": "olc-declarations",
                    "fields": [],
                    "children": [{
                        "id": "olc-declarations-incorporated",
                        "fields": [
                            "id_field_the_suppliercontractor_confirms_that_the_supplier_is_fully_incorporated_at_the_date_of_this_document"
                        ]
                    }, {
                        "id": "olc-declarations-has-uk-account",
                        "fields": [
                            "id_field_the_suppliercontractor_confirms_that_the_supplier_holds_a_uk_business_bank_account_at_the_date_of_this_document"
                        ]
                    }]
                }]
            }, {
                "id": "page-2",
                "fields": [],
                "children": [{
                    "id": "contractor-details",
                    "fields": [
                        "id_field_contractor_name"
                    ]
                }, {
                    "id": "contractor-address",
                    "fields": [
                        "id_field_is_the_contractors_correspondance_address_different_to_the_registered_office_address_given_above"
                    ],
                    "children": [{
                        "id": "contractor-address-details",
                        "fields": [
                            "id_field_cc_address_line_1",
                            "id_field_cc_address_line_2",
                            "id_field_cc_address_line_3",
                            "id_field_cc_address_line_4",
                            "id_field_cc_postcode",
                            "id_field_cc_town",
                            "id_field_cc_country"
                        ]
                    }]
                }, {
                    "id": "contractor-declarations",
                    "fields": [],
                    "children": [{
                        "id": "contractor-declarations-two-years-experience",
                        "fields": [
                            "id_field_the_contractor_confirms_that_they_have_at_least_two_years_prior_experience_in_a_role_substantially_similar_to_that_which_is_the_subject_of_this_engagement"
                        ]
                    }, {
                        "id": "contractor-declarations-previously-not-employed",
                        "fields": [
                            "id_field_the_contractor_confirms_that_heshe_has_not_previously_been_employed_by_the_client_or_any_of_its_associated_companies_ie_under_a_contract_of_employment_to_perform_work_substantially_similar_to_the_type_to_be_performed_under_this_engagement"
                        ]
                    }, {
                        "id": "contractor-declarations-not-paye-contractor",
                        "fields": [
                            "id_field_the_contractor_confirms_that_heshe_does_not_currently_operate_as_either_a_paye_contractor_or_under_an_umbrella_company_arrangement"
                        ]
                    }, {
                        "id": "contractor-declarations-resident-in-uk",
                        "fields": [
                            "id_field_the_contractor_confirms_that_heshe_is_considered_to_be_a_resident_in_the_uk_in_line_with_the_statutory_residence_test",
                            "id_field_please_confirm_which_country_you_are_a_resident_in_for_tax_purposes"
                        ]
                    }]
                }]
            }, {
                "id": "page-3",
                "fields": [],
                "children": [{
                    "id": "ownership-directors",
                    "fields": [
                        "id_field_are_you_the_sole_director_of_the_olc"
                    ],
                    "children": [{
                        "id": "ownership-directors-details",
                        "fields": [
                            "id_field_please_list_all_the_directors_and_their_relationship_to_you",
                            "id_field_does_any_directors_possess_preferential_voting_rights",
                            "id_field_provide_details_of_preferential_status"
                        ]
                    }]
                }, {
                    "id": "ownership-shareholders",
                    "fields": [
                        "id_field_do_you_own_100_of_the_shares_in_the_olc"
                    ],
                    "children": [{
                        "id": "ownership-shareholders-details",
                        "fields": [
                            "id_field_what_percentage_of_shares_do_you_own",
                            "id_field_how_many_other_shareholders_are_in_the_olc"
                        ],
                        "children": [{
                            "id": "ownership-shareholders-1",
                            "fields": [
                                "id_field_name_of_shareholder_one",
                                "id_field_relationship_to_you_one",
                                "id_field_percentage_of_shares_one"
                            ]
                        }, {
                            "id": "ownership-shareholders-2",
                            "fields": [
                                "id_field_name_of_shareholder_two",
                                "id_field_relationship_to_you_two",
                                "id_field_percentage_of_shares_two"
                            ]
                        }, {
                            "id": "ownership-shareholders-3",
                            "fields": [
                                "id_field_name_of_shareholder_three",
                                "id_field_relationship_to_you_three",
                                "id_field_percentage_of_shares_three"
                            ]
                        }, {
                            "id": "ownership-sharholders-rights",
                            "fields": [
                                "id_field_does_any_shareholders_possess_preferential_voting_rights",
                                "id_field_provide_details_of_preferential_status_shareholder"
                            ]
                        }]
                    }]
                }, {
                    "id": "ownership-signatorees",
                    "fields": [
                        "id_field_do_you_sign_contracts_for_and_on_behalf_of_the_olc",
                        "id_field_are_you_the_sole_signatory_for_all_contracts_issued_to_the_olc"
                    ],
                    "children": [{
                        "id": "ownership-signatorees-details",
                        "fields": [
                            "id_field_how_many_other_signatories_are_issued_to_the_olc"
                        ],
                        "children": [{
                            "id": "ownership-signatorees-1",
                            "fields": [
                                "id_field_signatory_name_one",
                                "id_field_signatory_relationship_one"
                            ]
                        }, {
                            "id": "ownership-signatorees-2",
                            "fields": [
                                "id_field_signatory_name_two",
                                "id_field_signatory_relationship_two"
                            ]
                        }, {
                            "id": "ownership-signatorees-3",
                            "fields": [
                                "id_field_signatory_name_three",
                                "id_field_signatory_relationship_three"
                            ]
                        }]
                    }]
                }, {
                    "id": "ownership-declarations",
                    "fields": [],
                    "children": [{
                        "id": "ownership-declarations-changing-information",
                        "fields": [
                            "id_field_please_confirm_that_you_will_notify_allegis_prior_to_changing_any_of_the_information_provided_above_including_without_being_limited_to_any_change_in_the_shareholding_or_directors_of_your_olc"
                        ]
                    }, {
                        "id": "ownership-declarations-liquiditated",
                        "fields": [
                            "id_field_please_confirm_that_you_will_notify_allegis_if_the_olc_is_or_is_likely_to_be_liquidateddissolved_or_wound_up"
                        ]
                    }, {
                        "id": "ownership-declarations-makes-payments",
                        "fields": [
                            "id_field_please_confirm_that_the_olc_makes_payments_to_individuals_in_accordance_with_applicable_law"
                        ]
                    }, {
                        "id": "ownership-declarations-breach-of-law",
                        "fields": [
                            "id_field_please_confirm_that_you_will_notify_allegis_if_you_believe_your_olc_to_be_in_breach_of_applicable_law"
                        ]
                    }, {
                        "id": "ownership-declarations-bribery-act",
                        "fields": [
                            "id_field_please_confirm_that_your_company_complies_with_the_bribery_act_2010_in_the_uk_and_where_applicable_to_any_similar_legislation_abroad"
                        ]
                    }, {
                        "id": "ownership-declarations-financial-advantages",
                        "fields": [
                            "id_field_please_confirm_that_you_do_not_offer_or_promise_to_offer_any_incentives_or_financial_or_other_advantages_to_any_employees_agents_subcontractors_or_any_service_providers_of_allegis_or_any_client_or_affiliated_entity_of_allegis"
                        ]
                    }]
                }]
            }, {
                "id": "page-4",
                "fields": [
                    "id_field_olc_compliance_questionnaire_status",
                    "id_field_brand"
                ],
                "children": [{
                    "id": "olc-insurance",
                    "fields": [],
                    "children": [{
                        "id": "olc-insurance-confirm-insurance",
                        "fields": [
                            "id_field_please_confirm_that_the_olc_holds_professional_indemnity_insurance_with_a_limit_of_at_least_1000000"
                        ]
                    }, {
                        "id": "olc-insurance-named-insured",
                        "fields": [
                            "id_field_please_confirm_that_the_olc_is_the_named_insured_in_respect_of_such_professional_indemnity_insurance_and_that_such_insurance_is_not_part_of_a_block_policy_held_by_a_third_party"
                        ]
                    }, {
                        "id": "olc-insurance-notify-on-changes",
                        "fields": [
                            "id_field_please_confirm_that_you_will_notify_allegis_if_your_insurance_provider_changes_or_your_levels_of_coverage_are_not_as_set_out_above"
                        ]
                    }, {
                        "id": "olc-insurance-genuine-copies",
                        "fields": [
                            "id_field_please_confirm_that_you_have_provided_or_will_provide_genuine_copies_of_the_following_documents_before_the_start_date_of_the_engagement_required_by_allegis"
                        ]
                    }]
                }]
            }
        ],
        pages: [{
            label: "OLC Information",
            id: "page-1"
        }, {
            label: "Contractor Information",
            id: "page-2"
        }, {
            label: "OLC Ownership, Control and Payment Information",
            id: "page-3"
        }, {
            label: "Insurance",
            id: "page-4"
        }]
    },
    content: {
        page: {
            logo: "https://www.allegisgroup.com/-/media/images/allegisgroup/global/logos/ag-horizontal-logo-png.png?h=202&la=en-GB&w=654&hash=022E3B26C9D9A0A8B4DE6E50321A0137F166BAA4",
            title: "OLC Limited Company Compliance Questionnaire"
        },
        single: {
            fields: {
                "id_field_lcn_address_line_1": {
                    label: "Address Line 1:"
                },
                "id_field_lcn_address_line_2": {
                    label: "Address Line 2:"
                },
                "id_field_lcn_address_line_3": {
                    label: "Address Line 3:"
                },
                "id_field_lcn_address_line_4": {
                    label: "Address Line 4:"
                },
                "id_field_lcn_postcode": {
                    label: "Postcode:"
                },
                "id_field_lcn_town": {
                    label: "Town"
                },
                "id_field_lcn_country": {
                    label: "Country"
                },
                "id_field_cc_address_line_1": {
                    label: "Address Line 1:"
                },
                "id_field_cc_address_line_2": {
                    label: "Address Line 2:"
                },
                "id_field_cc_address_line_3": {
                    label: "Address Line 3:"
                },
                "id_field_cc_address_line_4": {
                    label: "Address Line 4:"
                },
                "id_field_cc_postcode": {
                    label: "Postcode:"
                },
                "id_field_cc_town": {
                    label: "Town"
                },
                "id_field_cc_country": {
                    label: "Country"
                }
            },
            groups: {
                "olc-personal": {
                    heading: "Section A: OLC Information"
                },
                "olc-address": {
                    heading: "Address Details"
                },
                "olc-details": {
                    heading: "Limited Company Details"
                },
                "olc-declarations": {
                    heading: "Declarations"
                },
                "olc-declarations-incorporated": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>The Supplier/Contractor confirms that the Supplier is fully incorporated at the date of this document.</p></div>'
                    }
                },
                "olc-declarations-has-uk-account": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>The Supplier/Contractor confirms that the supplier holds a UK business bank account at the date of this document.</p></div>'
                    }
                },
                "contractor-details": {
                    heading: "Section B: Contractor Information"
                },
                "contractor-address": {
                    heading: "Address Details"
                },
                "contractor-declarations": {
                    heading: "Declarations"
                },
                "contractor-declarations-two-years-experience": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>The Contractor confirms that they have at least two years\' prior experience in a role substantially similar to that which is the subject of this engagement.</p></div>'
                    }
                },
                "contractor-declarations-previously-not-employed": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>The Contractor confirms that he/she has NOT previously been employed by the client or any of its associated companies (ie under a contract of employment) to perform work substantially similar to the type to be performed under this engagement.</p></div>'
                    }
                },
                "contractor-declarations-not-paye-contractor": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>The Contractor confirms that he/she does not currently operate as either a PAYE contractor, or under an Umbrella Company arrangement.</p></div>'
                    }
                },
                "contractor-declarations-resident-in-uk": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>The Contractor confirms that he/she is considered to be a resident in the UK in line with the Statutory Residence Test.</p></div>'
                    }
                },
                "ownership-directors": {
                    heading: "Section C: OLC Ownership, Control and Payment Information"
                },
                "ownership-shareholders": {
                    heading: "Shareholders Details"
                },
                "ownership-shareholders-1": {
                    heading: "Shareholder (1) Details"
                },
                "ownership-shareholders-2": {
                    heading: "Shareholder (2) Details"
                },
                "ownership-shareholders-3": {
                    heading: "Shareholder (3) Details"
                },
                "ownership-sharholders-rights": {
                    heading: "Shareholder Rights"
                },
                "ownership-signatorees": {
                    heading: "Signatoree Details"
                },
                "ownership-signatorees-1": {
                    heading: "Signatoree (1) Details"
                },
                "ownership-signatorees-2": {
                    heading: "Signatoree (2) Details"
                },
                "ownership-signatorees-3": {
                    heading: "Signatoree (3) Details"
                },
                "ownership-declarations": {
                    heading: "Declarations"
                },
                "ownership-declarations-changing-information": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>Please confirm that you will notify Allegis prior to changing any of the information provided above including (without being limited to) any change in the shareholding or directors of your OLC.</p></div>'
                    }
                },
                "ownership-declarations-liquiditated": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>Please confirm that you will notify Allegis if the OLC is (or is likely to be) liquidated/dissolved or wound up.</p></div>'
                    }
                },
                "ownership-declarations-makes-payments": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>Please confirm that the OLC makes payments to individuals in accordance with Applicable Law.</p></div>'
                    }
                },
                "ownership-declarations-breach-of-law": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>Please confirm that you will notify Allegis if you believe your OLC to be in breach of Applicable Law.</p></div>'
                    }
                },
                "ownership-declarations-bribery-act": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>Please confirm that your company complies with the Bribery Act 2010 in the UK and (where applicable) to any similar legislation abroad.</p></div>'
                    }
                },
                "ownership-declarations-financial-advantages": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>Please confirm that you do not offer or promise to offer any incentives or financial (or other) advantages to any employees, agents, subcontractors or any service providers of Allegis or any client or affiliated entity of Allegis (please note that this is not an exhaustive list).</p></div>'
                    }
                },
                "olc-insurance": {
                    heading: "Section D: Insurance"
                },
                "olc-insurance-confirm-insurance": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>Please confirm that the OLC holds professional indemnity insurance with a limit of at least £1,000,000.</p></div>'
                    }
                },
                "olc-insurance-named-insured": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>Please confirm that the OLC is the named insured in respect of such professional indemnity insurance (and that such insurance is not part of a block policy held by a third party).</p></div>'
                    }
                },
                "olc-insurance-notify-on-changes": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>Please confirm that you will notify Allegis if your insurance provider changes or your levels of coverage are not as set out above.</p></div>'
                    }
                },
                "olc-insurance-genuine-copies": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>Please confirm that you have provided or will provide genuine copies of the following documents before the start date of the engagement: <ul><li>Certificate of incorporation</li><li>VAT Registration certificate</li><li>Evidence of insurance coverage required by Allegis</li></ul></p></div>'
                    }
                }
            }
        },
        multiple: {
            fields: {
                labels: [{
                    value: "I confirm:",
                    ids: [
                        "id_field_the_suppliercontractor_confirms_that_the_supplier_is_fully_incorporated_at_the_date_of_this_document",
                        "id_field_the_suppliercontractor_confirms_that_the_supplier_holds_a_uk_business_bank_account_at_the_date_of_this_document",
                        "id_field_the_contractor_confirms_that_they_have_at_least_two_years_prior_experience_in_a_role_substantially_similar_to_that_which_is_the_subject_of_this_engagement",
                        "id_field_the_contractor_confirms_that_heshe_has_not_previously_been_employed_by_the_client_or_any_of_its_associated_companies_ie_under_a_contract_of_employment_to_perform_work_substantially_similar_to_the_type_to_be_performed_under_this_engagement",
                        "id_field_the_contractor_confirms_that_heshe_does_not_currently_operate_as_either_a_paye_contractor_or_under_an_umbrella_company_arrangement",
                        "id_field_the_contractor_confirms_that_heshe_is_considered_to_be_a_resident_in_the_uk_in_line_with_the_statutory_residence_test",
                        "id_field_please_confirm_that_you_will_notify_allegis_prior_to_changing_any_of_the_information_provided_above_including_without_being_limited_to_any_change_in_the_shareholding_or_directors_of_your_olc",
                        "id_field_please_confirm_that_you_will_notify_allegis_if_the_olc_is_or_is_likely_to_be_liquidateddissolved_or_wound_up",
                        "id_field_please_confirm_that_the_olc_makes_payments_to_individuals_in_accordance_with_applicable_law",
                        "id_field_please_confirm_that_you_will_notify_allegis_if_you_believe_your_olc_to_be_in_breach_of_applicable_law",
                        "id_field_please_confirm_that_your_company_complies_with_the_bribery_act_2010_in_the_uk_and_where_applicable_to_any_similar_legislation_abroad",
                        "id_field_please_confirm_that_you_do_not_offer_or_promise_to_offer_any_incentives_or_financial_or_other_advantages_to_any_employees_agents_subcontractors_or_any_service_providers_of_allegis_or_any_client_or_affiliated_entity_of_allegis",
                        "id_field_please_confirm_that_the_olc_holds_professional_indemnity_insurance_with_a_limit_of_at_least_1000000",
                        "id_field_please_confirm_that_the_olc_is_the_named_insured_in_respect_of_such_professional_indemnity_insurance_and_that_such_insurance_is_not_part_of_a_block_policy_held_by_a_third_party",
                        "id_field_please_confirm_that_you_will_notify_allegis_if_your_insurance_provider_changes_or_your_levels_of_coverage_are_not_as_set_out_above",
                        "id_field_please_confirm_that_you_have_provided_or_will_provide_genuine_copies_of_the_following_documents_before_the_start_date_of_the_engagement_required_by_allegis"
                    ]
                }],
                types: [{
                    type: 'textarea',
                    config: {
                        rows: 7
                    },
                    ids: [
                        "id_field_please_list_all_the_directors_and_their_relationship_to_you",
                        "id_field_provide_details_of_preferential_status",
                        "id_field_provide_details_of_preferential_status_shareholder"
                    ]
                }]
            }
        }
    },
    state: {
        single: {
            fields: {
				"id_field_vat_registration_number": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_is_the_supplier_vat_registered",
                            values: ["Yes"]
                        }]
                    }]
				},
                "id_field_please_confirm_which_country_you_are_a_resident_in_for_tax_purposes": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_the_contractor_confirms_that_heshe_is_considered_to_be_a_resident_in_the_uk_in_line_with_the_statutory_residence_test",
                            values: ["No"]
                        }]
                    }]
                },
                "id_field_provide_details_of_preferential_status": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_does_any_directors_possess_preferential_voting_rights",
                            values: ["Yes"]
                        }]
                    }]
                },
                "id_field_provide_details_of_preferential_status_shareholder": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_does_any_shareholders_possess_preferential_voting_rights",
                            values: ["Yes"]
                        }]
                    }]
                },
                "id_field_olc_compliance_questionnaire_status": {
                    default: {
                        visible: false,
                        alwaysSubmit: true
                    }
                },
                "id_field_brand": {
                    default: {
                        visible: false,
                        alwaysSubmit: true
                    }
                }
            },
            groups: {
                "contractor-address-details": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_is_the_contractors_correspondance_address_different_to_the_registered_office_address_given_above",
                            values: ["Yes"]
                        }]
                    }]
                },
                "ownership-directors-details": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_are_you_the_sole_director_of_the_olc",
                            values: ["No"]
                        }]
                    }]
                },
                "ownership-shareholders-details": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_do_you_own_100_of_the_shares_in_the_olc",
                            values: ["No"]
                        }]
                    }]
                },
                "ownership-shareholders-1": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_how_many_other_shareholders_are_in_the_olc",
                            values: ["1", "2", "3"]
                        }]
                    }]
                },
                "ownership-shareholders-2": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_how_many_other_shareholders_are_in_the_olc",
                            values: ["2", "3"]
                        }]
                    }]
                },
                "ownership-shareholders-3": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_how_many_other_shareholders_are_in_the_olc",
                            values: ["3"]
                        }]
                    }]
                },
                "ownership-sharholders-rights": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_how_many_other_shareholders_are_in_the_olc",
                            values: ["1", "2", "3"]
                        }]
                    }]
                },
                "ownership-signatorees-details": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_are_you_the_sole_signatory_for_all_contracts_issued_to_the_olc",
                            values: ["No"]
                        }]
                    }]
                },
                "ownership-signatorees-1": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_how_many_other_signatories_are_issued_to_the_olc",
                            values: ["1", "2", "3"]
                        }]
                    }]
                },
                "ownership-signatorees-2": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_how_many_other_signatories_are_issued_to_the_olc",
                            values: ["2", "3"]
                        }]
                    }]
                },
                "ownership-signatorees-3": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_how_many_other_signatories_are_issued_to_the_olc",
                            values: ["3"]
                        }]
                    }]
                }
            }
        },
        multiple: {
            fields: [{
                ids: [
                    "id_field_email",
                    "id_field_limited_company_name",
                    "id_field_lcn_address_line_1",
                    "id_field_lcn_postcode",
                    "id_field_lcn_town",
                    "id_field_lcn_country",
                    "id_field_registration_number",
                    "id_field_is_the_supplier_vat_registered",
                    "id_field_the_suppliercontractor_confirms_that_the_supplier_is_fully_incorporated_at_the_date_of_this_document",
                    "id_field_the_suppliercontractor_confirms_that_the_supplier_holds_a_uk_business_bank_account_at_the_date_of_this_document",
                    "id_field_contractor_name",
                    "id_field_is_the_contractors_correspondance_address_different_to_the_registered_office_address_given_above",
                    "id_field_cc_address_line_1",
                    "id_field_cc_postcode",
                    "id_field_cc_town",
                    "id_field_cc_country",
                    "id_field_the_contractor_confirms_that_they_have_at_least_two_years_prior_experience_in_a_role_substantially_similar_to_that_which_is_the_subject_of_this_engagement",
                    "id_field_the_contractor_confirms_that_heshe_has_not_previously_been_employed_by_the_client_or_any_of_its_associated_companies_ie_under_a_contract_of_employment_to_perform_work_substantially_similar_to_the_type_to_be_performed_under_this_engagement",
                    "id_field_the_contractor_confirms_that_heshe_does_not_currently_operate_as_either_a_paye_contractor_or_under_an_umbrella_company_arrangement",
                    "id_field_the_contractor_confirms_that_heshe_is_considered_to_be_a_resident_in_the_uk_in_line_with_the_statutory_residence_test",
                    "id_field_please_confirm_which_country_you_are_a_resident_in_for_tax_purposes",
                    "id_field_are_you_the_sole_director_of_the_olc",
                    "id_field_please_list_all_the_directors_and_their_relationship_to_you",
                    "id_field_does_any_directors_possess_preferential_voting_rights",
                    "id_field_provide_details_of_preferential_status",
                    "id_field_do_you_own_100_of_the_shares_in_the_olc",
                    "id_field_what_percentage_of_shares_do_you_own",
                    "id_field_how_many_other_shareholders_are_in_the_olc",
                    "id_field_name_of_shareholder_one",
                    "id_field_relationship_to_you_one",
                    "id_field_percentage_of_shares_one",
                    "id_field_name_of_shareholder_two",
                    "id_field_relationship_to_you_two",
                    "id_field_percentage_of_shares_two",
                    "id_field_name_of_shareholder_three",
                    "id_field_relationship_to_you_three",
                    "id_field_percentage_of_shares_three",
                    "id_field_does_any_shareholders_possess_preferential_voting_rights",
                    "id_field_do_you_sign_contracts_for_and_on_behalf_of_the_olc",
                    "id_field_are_you_the_sole_signatory_for_all_contracts_issued_to_the_olc",
                    "id_field_provide_details_of_preferential_status_shareholder",
                    "id_field_how_many_other_signatories_are_issued_to_the_olc",
                    "id_field_signatory_name_one",
                    "id_field_signatory_relationship_one",
                    "id_field_signatory_name_two",
                    "id_field_signatory_relationship_two",
                    "id_field_signatory_name_three",
                    "id_field_signatory_relationship_three",
                    "id_field_please_confirm_that_you_will_notify_allegis_prior_to_changing_any_of_the_information_provided_above_including_without_being_limited_to_any_change_in_the_shareholding_or_directors_of_your_olc",
                    "id_field_please_confirm_that_you_will_notify_allegis_if_the_olc_is_or_is_likely_to_be_liquidateddissolved_or_wound_up",
                    "id_field_please_confirm_that_the_olc_makes_payments_to_individuals_in_accordance_with_applicable_law",
                    "id_field_please_confirm_that_you_will_notify_allegis_if_you_believe_your_olc_to_be_in_breach_of_applicable_law",
                    "id_field_please_confirm_that_your_company_complies_with_the_bribery_act_2010_in_the_uk_and_where_applicable_to_any_similar_legislation_abroad",
                    "id_field_please_confirm_that_you_do_not_offer_or_promise_to_offer_any_incentives_or_financial_or_other_advantages_to_any_employees_agents_subcontractors_or_any_service_providers_of_allegis_or_any_client_or_affiliated_entity_of_allegis",
                    "id_field_please_confirm_that_the_olc_holds_professional_indemnity_insurance_with_a_limit_of_at_least_1000000",
                    "id_field_please_confirm_that_the_olc_is_the_named_insured_in_respect_of_such_professional_indemnity_insurance_and_that_such_insurance_is_not_part_of_a_block_policy_held_by_a_third_party",
                    "id_field_please_confirm_that_you_will_notify_allegis_if_your_insurance_provider_changes_or_your_levels_of_coverage_are_not_as_set_out_above",
                    "id_field_please_confirm_that_you_have_provided_or_will_provide_genuine_copies_of_the_following_documents_before_the_start_date_of_the_engagement_required_by_allegis"
                ],
                default: {
                    "validation": {
                        "required": true
                    }
                }
            }]
        }
    }
}