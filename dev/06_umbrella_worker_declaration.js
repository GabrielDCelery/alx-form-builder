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
            "id": "main",
            "field": [],
            "children": [{
                "id": "personal-information",
                "fields": [
                    "id_field_email",
                    "id_field_umbrella_declaration_form_status",
                    "id_field_brand"
                ]
            }, {
                "id": "declarations",
                "fields": [],
                "children": [{
                    "id": "declarations-working-time",
                    "fields": [
                        "id_field_working_time_regulations_1998_wtr_opt_out"
                    ]
                }, {
                    "id": "declarations-payment-declaration",
                    "fields": [
                        "id_field_all_monies_paid_to_me_by_the_umbrella_company_will_be_paid_direct_into_my_personal_uk_bank_account_only"
                    ]
                }, {
                    "id": "declarations-not-shareholder",
                    "fields": [
                        "id_field_i_am_not_a_shareholder_of_the_umbrella_company_for_which_i_work_nor_any_related_companies_or_group_companies_i_will_notify_you_if_i_receive_request_to_become_a_shareholder_of_any_company_related_to_the_umbrella_company_or_its_group_companies"
                    ]
                }]
            }, {
                "id": "previous-engagements",
                "fields": [
                    "id_field_have_you_previously_completed_two_or_more_assignments_with_the_client",
                    "id_field_have_you_previously_completed_at_least_one_assignment_with_the_client_and_one_or_more_assignments_with_a_member_of_the_clients_group",
                    "id_field_have_you_previously_either_directly_or_indirectly_worked_for_the_client_other_than_through_allegis_within_the_last_6_months",
                    "id_field_please_provide_further_information",
                    "id_field_how_did_you_supply_or_provide_services_to_the_client",
                    "id_field_other_please_specify"
                ],
                "children": [{
                    "id": "previous-engagements-jobs",
                    "fields": [
                        "id_field_umbrella_job_title",
                        "id_field_umbrella_brief_description",
                        "id_field_date_from",
                        "id_field_date_to"
                    ]
                }]
            }]
        }],
        pages: []
    },
    content: {
        page: {
            logo: "https://www.allegisgroup.com/-/media/images/allegisgroup/global/logos/ag-horizontal-logo-png.png?h=202&la=en-GB&w=654&hash=022E3B26C9D9A0A8B4DE6E50321A0137F166BAA4",
            title: "Umbrella Worker Declaration"
        },
        single: {
            fields: {
                "id_field_umbrella_job_title": {
                    label: "Job Title:"
                },
                "id_field_umbrella_brief_description": {
                    label: "Brief Description:"
                },
                "id_field_have_you_previously_either_directly_or_indirectly_worked_for_the_client_other_than_through_allegis_within_the_last_6_months": {
                    label: "Have you previously, either directly or indirectly (for example through Allegis or another entity), worked for the Client or a member of the Client’s group within the last 8 weeks?"
                }
            },
            groups: {
                "main": {
                    descriptionAfter: {
                        type: 'html',
                        value: '<div class="custom-text"><p>I declare that all information supplied in this application is true to the best of my knowledge and I agree to comply with the declarations listed above. I will immediately notify you of any changes regarding those declarations. </p></div>'
                    }
                },
                "declarations-working-time": {
                    heading: "WORKING TIME REGULATIONS 1998 ('WTR') OPT OUT",
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>I hereby confirm that s.4 (1) of the WTR, which limits the average working week per individual to 48 hours, shall <strong><u>not</u></strong> apply to any assignments I wish to undertake.</p><p><strong>Note:</strong> Should you wish to opt in (after having opted out), 3 months’ prior written notice is required.</p></div>'
                    }
                },
                "declarations-payment-declaration": {
                    heading: "UMBRELLA PAYMENT DECLARATION",
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>All monies paid to me by the Umbrella Company will be paid direct into my personal UK bank account only.</p></div>'
                    }
                },
                "declarations-not-shareholder": {
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>I am not a shareholder of the Umbrella Company for which I work, nor any related companies or group companies. I will notify you if I receive request to become a shareholder of any company related to the Umbrella Company or its group companies.</p></div>'
                    }
                },
                "previous-engagements": {
                    heading: "PREVIOUS ENGAGEMENTS / EMPLOYMENT WITH CLIENT",
                    description: "In the event that you have previously worked for the Client in the last 8 weeks, please would you provide us with further information."
                },
                "previous-engagements-jobs": {
                    description: "In what job role did you last work for the Client and what were the dates?"
                }
            }
        },
        multiple: {
            fields: {
                labels: [{
                    value: "Do you agree with the statement?",
                    ids: [
                        "id_field_working_time_regulations_1998_wtr_opt_out",
                        "id_field_all_monies_paid_to_me_by_the_umbrella_company_will_be_paid_direct_into_my_personal_uk_bank_account_only",
                        "id_field_i_am_not_a_shareholder_of_the_umbrella_company_for_which_i_work_nor_any_related_companies_or_group_companies_i_will_notify_you_if_i_receive_request_to_become_a_shareholder_of_any_company_related_to_the_umbrella_company_or_its_group_companies"
                    ]
                }],
                types: [{
                    type: 'date',
                    config: {},
                    ids: [
                        "id_field_date_from",
                        "id_field_date_to"
                    ]
                }, {
                    type: 'textarea',
                    config: {
                        rows: 7
                    },
                    ids: [
                        "id_field_please_provide_further_information",
                        "id_field_other_please_specify",
                        "id_field_umbrella_brief_description"
                    ]
                }]
            }
        }
    },
    state: {
        single: {
            fields: {
                "id_field_please_provide_further_information": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_have_you_previously_either_directly_or_indirectly_worked_for_the_client_other_than_through_allegis_within_the_last_6_months",
                            values: ["Yes"]
                        }]
                    }]
                },
                "id_field_other_please_specify": {
                    default: {
                        visible: false,
                        validation: {
                            "required": true
                        }
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_how_did_you_supply_or_provide_services_to_the_client",
                            values: ["Other"]
                        }]
                    }]
                },
                "id_field_umbrella_worker_declaration_status": {
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
            groups: {}
        },
        multiple: {
            fields: [{
                ids: [
                    "id_field_email",
                    "id_field_working_time_regulations_1998_wtr_opt_out",
                    "id_field_all_monies_paid_to_me_by_the_umbrella_company_will_be_paid_direct_into_my_personal_uk_bank_account_only",
                    "id_field_i_am_not_a_shareholder_of_the_umbrella_company_for_which_i_work_nor_any_related_companies_or_group_companies_i_will_notify_you_if_i_receive_request_to_become_a_shareholder_of_any_company_related_to_the_umbrella_company_or_its_group_companies",
                    "id_field_have_you_previously_completed_two_or_more_assignments_with_the_client",
                    "id_field_have_you_previously_completed_at_least_one_assignment_with_the_client_and_one_or_more_assignments_with_a_member_of_the_clients_group",
                    "id_field_have_you_previously_either_directly_or_indirectly_worked_for_the_client_other_than_through_allegis_within_the_last_6_months",
                    "id_field_please_provide_further_information",
                    "id_field_how_did_you_supply_or_provide_services_to_the_client",
                    "id_field_other_please_specify",
                    "id_field_umbrella_job_title",
                    "id_field_umbrella_brief_description",
                    "id_field_date_from",
                    "id_field_date_to"
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