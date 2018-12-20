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
        groups: [{
            "id": "page-1",
            "fields": [],
            "children": [{
                "id": "personal-information-details",
                "fields": [
                    "id_field_date_of_birth",
                    "id_field_national_insurance_number"
                ],
                "children": [{
                    "id": "personal-information-details-personal",
                    "fields": [
                        "id_field_title",
                        "id_field_firstname",
                        "id_field_middle_name",
                        "id_field_lastname",
                        "id_field_have_you_ever_been_known_by_another_name",
                        "id_field_gender"
                    ],
                    "children": [{
                        "id": "personal-information-details-personal-original-name",
                        "fields": [
                            "id_field_name_known_by",
                            "id_field_previous_name",
                            "id_field_date_of_name_change",
                            "id_field_name_change_document"
                        ]
                    }]
                }, {
                    "id": "personal-information-details-address",
                    "fields": [
                        "id_field_county",
                        "id_field_city",
                        "id_field_country",
                        "id_field_address_line_1",
                        "id_field_address_line_2",
                        "id_field_address_line_3",
                        "id_field_address_line_4",
                        "id_field_postcode",
                        "id_field_proof_of_address"
                    ],
                    "children": [{
                        "id": "personal-information-details-address-alternate",
                        "fields": [
                            "id_field_is_your_permanent_postal_address_different_from_the_above",
                            "id_field_postal_address_county",
                            "id_field_postal_address_towncity",
                            "id_field_postal_address_country",
                            "id_field_postal_address_line_1",
                            "id_field_postal_address_line_2",
                            "id_field_postal_address_line_3",
                            "id_field_postal_address_line_4",
                            "id_field_postal_postcode"
                        ],
                        "children": [{
                            "id": "personal-information-details-address-alternate-details",
                            "fields": [
                                "id_field_postal_address_county",
                                "id_field_postal_address_towncity",
                                "id_field_postal_address_country",
                                "id_field_postal_address_line_1",
                                "id_field_postal_address_line_2",
                                "id_field_postal_address_line_3",
                                "id_field_postal_address_line_4",
                                "id_field_postal_postcode"
                            ]
                        }]
                    }]
                }, {
                    "id": "personal-information-details-contact",
                    "fields": [
                        "id_field_home_telephone_number",
                        "id_field_mobile_number",
                        "id_field_email"
                    ]
                }]
            }, {
                "id": "personal-information-next-of-kin",
                "fields": [
                    "id_field_contact_name",
                    "id_field_relationship",
                    "id_field_contact_telephone_number"
                ],
                "children": [{
                    "id": "personal-information-next-of-kin-emergency-contact",
                    "fields": [
                        "id_field_is_your_emergency_contact_the_same_as_your_next_of_kin"
                    ],
                    "children": [{
                        "id": "personal-information-next-of-kin-emergency-contact-details",
                        "fields": [
                            "id_field_emergency_contact_name",
                            "id_field_emergency_contact_relationship",
                            "id_field_emergency_contact_telephone"
                        ]
                    }]
                }]
            }, {
                "id": "personal-information-right-to-work",
                "fields": [
                    "id_field_what_is_your_right_to_work_status_in_the_uk",
                    "id_field_upload_rtw_document",
                    "id_field_nationality"
                ],
                "children": [{
                    "id": "personal-information-right-to-work-visa",
                    "fields": [
                        "id_field_visa_type",
                        "id_field_visa_expiry_date",
                        "id_field_visa_restrictions"
                    ]
                }]
            }, {
                "id": "personal-information-bank-details",
                "fields": [
                    "id_field_name_of_bank_or_building_society_account",
                    "id_field_bank_address_1",
                    "id_field_bank_address_2",
                    "id_field_bank_address_3",
                    "id_field_bank_address_4",
                    "id_field_bank_postcode",
                    "id_field_account_holder_name",
                    "id_field_account_number",
                    "id_field_sort_code"
                ]
            }]
        }, {
            "id": "page-2",
            "fields": [
                "id_field_how_many_qualifications_do_you_have_that_is_related_to_the_assignment"
            ],
            "children": [{
                "id": "professional-qualifications-1",
                "fields": [
                    "id_field_name_of_institution_one",
                    "id_field_qualification_level_one",
                    "id_field_course_title_one",
                    "id_field_grade_achieved_one",
                    "id_field_date_achieved_one"
                ]
            }, {
                "id": "professional-qualifications-2",
                "fields": [
                    "id_field_name_of_institution_two",
                    "id_field_qualification_level_two",
                    "id_field_course_title_two",
                    "id_field_grade_achieved_two",
                    "id_field_date_achieved_two"
                ]
            }, {
                "id": "professional-qualifications-3",
                "fields": [
                    "id_field_name_of_institution_three",
                    "id_field_qualification_level_three",
                    "id_field_course_title_three",
                    "id_field_grade_achieved_three",
                    "id_field_date_achieved_three"
                ]
            }, {
                "id": "professional-qualifications-4",
                "fields": [
                    "id_field_name_of_institution_four",
                    "id_field_qualification_level_four",
                    "id_field_course_title_four",
                    "id_field_grade_achieved_four",
                    "id_field_date_achieved_four"
                ]
            }]
        }, {
            "id": "page-3",
            "fields": [
                "id_field_do_you_have_a_criminal_conviction",
                "id_field_details_of_criminal_convictions",
                "id_field_are_you_currently_party_to_any_criminal_investigation_or_proceedings_in_any_jurisdiction",
                "id_field_details_of_criminal_investigations"
            ]
        }, {
            "id": "page-4",
            "fields": [
                "id_field_paye_additional_information",
                "id_field_paye_contractor_registration_pack_status",
                "id_field_brand"
            ]
        }],
        pages: [{
            label: "Personal Information",
            id: "page-1"
        }, {
            label: "Professional Qualifications",
            id: "page-2"
        }, {
            label: "Criminal Record Declaration",
            id: "page-3"
        }, {
            label: "Additional Information",
            id: "page-4"
        }]
    },
    content: {
        page: {
            logo: "https://www.allegisgroup.com/-/media/images/allegisgroup/global/logos/ag-horizontal-logo-png.png?h=202&la=en-GB&w=654&hash=022E3B26C9D9A0A8B4DE6E50321A0137F166BAA4",
            title: "PAYE Contractor Registration Pack"
        },
        single: {
            fields: {
                "id_field_firstname": {
                    label: "Forename"
                },
                "id_field_lastname": {
                    label: "Surname"
                },
                "id_field_postal_address_line_1": {
                    label: "Address Line 1:"
                },
                "id_field_postal_address_line_2": {
                    label: "Address Line 2:"
                },
                "id_field_postal_address_line_3": {
                    label: "Address Line 3:"
                },
                "id_field_postal_address_line_4": {
                    label: "Address Line 4:"
                },
                "id_field_postal_address_county": {
                    label: "County:"
                },
                "id_field_postal_address_towncity": {
                    label: "Town/City:"
                },
                "id_field_postal_postcode": {
                    label: "Postcode:"
                },
                "id_field_postal_address_country": {
                    label: "Country:"
                },
                "id_field_bank_address_1": {
                    label: "Address Line 1:"
                },
                "id_field_bank_address_2": {
                    label: "Address Line 2:"
                },
                "id_field_bank_address_3": {
                    label: "Address Line 3:"
                },
                "id_field_bank_address_4": {
                    label: "Address Line 4:"
                },
                "id_field_bank_postcode": {
                    label: "Postcode:"
                },
                "id_field_paye_additional_information": {
                    label: "Additional Information:"
                },
                "id_field_proof_of_address": {
                    helperText: {
                        type: 'html',
                        value: '<div class="custom-text"><p>Below is a list of documents that we accept as proof of address:</p><ul><li>Valid Driving Licence</li><li>Council Tax bill dated within current financial year</li><li>HMRC Letter</li><li>Original Personal Bank Statement (any online statements must be stamped by the bank, dated within 3 months of start date)</li><li>Original Personal Credit Card Statement (any online statements must be stamped by the bank, dated within 3 months of start date)</li><li>Mortgage statement (any online statements must be stamped by the bank, dated within 3 months of start date)</li><li>Original Utility Bill dated within 3 months of start date</li><li>Benefits statement dated within 3 months of start date</li><li>Tenancy Agreement (full document, must be signed by both parties) dated within 3 months of start date.</li></ul></div>'
                    }
                }
            },
            groups: {
                "page-1": {
                    heading: "PART I - Personal Information of the Contractor"
                },
                "page-2": {
                    heading: "PART II - Professional Qualifications",
                    description: "Please list all relevant qualifications pertinent to the assignment."
                },
                "page-3": {
                    heading: "PART III - Criminal Convictions",
                    descriptionAfter: {
                        type: 'html',
                        value: '<div class="custom-text"><p>If you cannot provide the above confirmations or you are unsure how to respond, please see the guidance notes below before providing details of any relevant convictions.</p><hr class="hr-separator"><p>Depending on the roles you are applying for, any offers of work or employment may be subject to a criminal record check including a standard or enhanced check through the DBS (Disclosure and Barring Service) or a check through Disclosure Scotland.</p><p>Pursuant to the Rehabilitation of Offenders Act, certain spent convictions and cautions may be ‘protected’. If so, you have no obligation to disclose these to us, employers or hirers and they cannot be taken into account.  Whether they should be disclosed by you is dependent on factors including the length of time which has elapsed since the crime and whether your area of work is ‘excepted’ or ‘regulated’. The full guidance cannot be reproduced in these notes as there are over 70 exceptions. The guidance and criteria on the filtering of these cautions and convictions can be found on the Disclosure and Barring Service website <a href="https://www.gov.uk/government/organisations/disclosure-and-barring-service" target="_blank">www.gov.uk/government/organisations/disclosure-and-barring-service</a></p><p>It is your responsibility to disclose all criminal history that is not subject to an exemption under the Rehabilitation of Offenders Act. If you fail to disclose any criminal activity which is not subject to an exemption then this may render your registration invalid or result in the immediate termination of your contract. If you are unsure what to disclose, please seek independent advice.  Confidential advice can be received from NACRO, a crime reduction charity. <a href="https://www.nacro.org.uk" target="_blank">www.nacro.org.uk</a></p><p>Please note that any relevant convictions and criminal record information obtained through this declaration form and record checks will not necessarily prevent you working though us. In some circumstances a risk assessment may be carried out in conjunction with further information from you. This may be in the form of a written statement or interview to determine your suitability for the nature of work that you would be engaged in.</p></div>'
                    }
                },
                "page-4": {
                    heading: "PART IV - Additional Information"
                },
                "personal-information-details-address": {
                    heading: "Address Details"
                },
                "personal-information-details-address-alternate": {
                    heading: "Permanent/Postal Address Details"
                },
                "personal-information-details-contact": {
                    heading: "Preferred Contact Details"
                },
                "personal-information-next-of-kin": {
                    heading: "Next of Kin"
                },
                "personal-information-next-of-kin-emergency-contact": {
                    heading: "Emergency Contact",
                    description: "In case of emergency, please provide details below should we need to contact someone on your behalf."
                },
                "personal-information-right-to-work": {
                    heading: "Right to Work in the UK",
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>Please ensure that your Right to Work document is compliant with Home Office guidelines. You can view the document <a href="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/378926/employers_right_to_work_checklist_november_2014.pdf" target="_blank">here</a></p></div>'
                    }
                },
                "personal-information-bank-details": {
                    heading: "Bank Details"
                },
                "professional-qualifications-1": {
                    heading: "Qualifications (1)"
                },
                "professional-qualifications-2": {
                    heading: "Qualifications (2)"
                },
                "professional-qualifications-3": {
                    heading: "Qualifications (3)"
                },
                "professional-qualifications-4": {
                    heading: "Qualifications (4)"
                }
            }
        },
        multiple: {
            fields: {
                types: [{
                    type: 'date',
                    config: {},
                    ids: [
                        "id_field_date_of_name_change",
                        "id_field_date_of_birth",
                        "id_field_visa_expiry_date",
                        "id_field_date_achieved_one",
                        "id_field_date_achieved_two",
                        "id_field_date_achieved_three",
                        "id_field_date_achieved_four"
                    ]
                }, {
                    type: 'textarea',
                    config: {
                        rows: 7
                    },
                    ids: [
                        "id_field_details_of_criminal_convictions",
                        "id_field_details_of_criminal_investigations",
                        "id_field_paye_additional_information"
                    ]
                }],
                labels: [{
                    value: "Name of Institution:",
                    ids: [
                        "id_field_name_of_institution_one",
                        "id_field_name_of_institution_two",
                        "id_field_name_of_institution_three",
                        "id_field_name_of_institution_four"
                    ]
                }, {
                    value: "Qualification Level:",
                    ids: [
                        "id_field_qualification_level_one",
                        "id_field_qualification_level_two",
                        "id_field_qualification_level_three",
                        "id_field_qualification_level_four"
                    ]
                }, {
                    value: "Course Title:",
                    ids: [
                        "id_field_course_title_one",
                        "id_field_course_title_two",
                        "id_field_course_title_three",
                        "id_field_course_title_four"
                    ]
                }, {
                    value: "Grade Achieved:",
                    ids: [
                        "id_field_grade_achieved_one",
                        "id_field_grade_achieved_two",
                        "id_field_grade_achieved_three",
                        "id_field_grade_achieved_four"
                    ]
                }, {
                    value: "Date Achieved:",
                    ids: [
                        "id_field_date_achieved_one",
                        "id_field_date_achieved_two",
                        "id_field_date_achieved_three",
                        "id_field_date_achieved_four"
                    ]
                }]
            }
        }
    },
    state: {
        single: {
            fields: {
                "id_field_details_of_criminal_convictions": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_do_you_have_a_criminal_conviction",
                            values: ["Yes"]
                        }]
                    }]
                },
                "id_field_details_of_criminal_investigations": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_are_you_currently_party_to_any_criminal_investigation_or_proceedings_in_any_jurisdiction",
                            values: ["Yes"]
                        }]
                    }]
                },
                "id_field_upload_rtw_document": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_what_is_your_right_to_work_status_in_the_uk",
                            not: [""]
                        }]
                    }]
                },
                "id_field_paye_contractor_registration_pack_status": {
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
                "personal-information-details-personal-original-name": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_have_you_ever_been_known_by_another_name",
                            values: ["Yes"]
                        }]
                    }]
                },
                "personal-information-details-address-alternate-details": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_is_your_permanent_postal_address_different_from_the_above",
                            values: ["Yes"]
                        }]
                    }]
                },
                "personal-information-next-of-kin-emergency-contact-details": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_is_your_emergency_contact_the_same_as_your_next_of_kin",
                            values: ["No"]
                        }]
                    }]
                },
                "personal-information-right-to-work-visa": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_what_is_your_right_to_work_status_in_the_uk",
                            values: ["Other/Visa"]
                        }]
                    }]
                },
                "professional-qualifications-1": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_how_many_qualifications_do_you_have_that_is_related_to_the_assignment",
                            values: ["1", "2", "3", "4"]
                        }]
                    }]
                },
                "professional-qualifications-2": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_how_many_qualifications_do_you_have_that_is_related_to_the_assignment",
                            values: ["2", "3", "4"]
                        }]
                    }]
                },
                "professional-qualifications-3": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_how_many_qualifications_do_you_have_that_is_related_to_the_assignment",
                            values: ["3", "4"]
                        }]
                    }]
                },
                "professional-qualifications-4": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_how_many_qualifications_do_you_have_that_is_related_to_the_assignment",
                            values: ["4"]
                        }]
                    }]
                }
            }
        }
    }
}