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
            "id": "personal-information",
            "fields": [
                "id_field_email",
                "id_field_olc_declaration_form_status",
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
                "id": "declarations-no-conflict",
                "fields": [
                    "id_field_declaration_of_no_conflict"
                ]
            }, {
                "id": "declarations-independent-contractor",
                "fields": [
                    "id_field_ir35_independent_contractor_status"
                ]
            }, {
                "id": "declarations-conduct-regulations",
                "fields": [
                    "id_field_conduct_regulations_opt_out_notification_opt_out"
                ]
            }]
        }],
        pages: []
    },
    content: {
        page: {
            logo: "https://www.allegisgroup.com/-/media/images/allegisgroup/global/logos/ag-horizontal-logo-png.png?h=202&la=en-GB&w=654&hash=022E3B26C9D9A0A8B4DE6E50321A0137F166BAA4",
            title: "OLC Declaration Form"
        },
        single: {
            fields: {
            },
            groups: {
                "declarations-working-time": {
                    heading: "WORKING TIME REGULATIONS 1998 ('WTR') OPT OUT",
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>The Supplier confirms that s.4 (1) of the WTR, which limits the average working week per individual to 48 hours, shall <u><strong>not</strong></u> apply to the Contractor for any assignments.</p><p><strong>Note:</strong> Should the Supplier/Contractor wish to opt in (after having opted out), 3 months’ prior written notice is required.</p></div>'
                    }
                },
                "declarations-no-conflict": {
                    heading: "DECLARATION OF NO CONFLICT",
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>The Supplier and Contractor confirm there are no reasons, whether contractual or otherwise, that would prevent them from accepting the particular Assignment.</p><p>They warrant that there are no contractual restrictions (commonly referred to as “non-compete clauses” or “post-termination restrictions”) preventing them from providing services to either Allegis Group Limited, or the relevant group company with whom it is anticipated that you will be contracting with, its Client or any applicable End-User.</p></div>'
                    }
                },
                "declarations-independent-contractor": {
                    heading: "IR35 INDEPENDENT CONTRACTOR STATUS",
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>The Supplier confirms that it provides services on a business to business basis on its own account and that the Supplier’s services to Allegis and Allegis’s clients are those of independent professional consultancy services as customers of its business. The Supplier also confirms that it is operating <strong>outside</strong> of IR35.</p><p><strong>Note:</strong> You may wish to seek independent expert advice or review HMRC related guidance prior to giving the above confirmation. Under Allegis’s terms of engagement, the Supplier must immediately notify Allegis should its IR35 status change or if it can no longer provide this confirmation.  </p></div>'
                    }
                },
                "declarations-conduct-regulations": {
                    heading: "CONDUCT REGULATIONS OPT OUT NOTIFICATION (“OPT OUT”)",
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>Please view the CONDUCT REGULATIONS OPT OUT NOTIFICATION ("OPT OUT") document HERE</p></div><div class="custom-text"><p>The Supplier and Contractor confirm and agree that the Conduct Regulations do not apply to the services to be supplied and have read and signed the Opt Out notification below.</p></div>'
                    }
                }
            }
        },
        multiple: {
            fields: {
                labels: [{
                    value: "Do you agree with the statement:",
                    ids: [
                        "id_field_working_time_regulations_1998_wtr_opt_out",
                        "id_field_declaration_of_no_conflict",
                        "id_field_ir35_independent_contractor_status",
                        "id_field_conduct_regulations_opt_out_notification_opt_out"
                    ]
                }]
            }
        }
    },
    state: {
        single: {
            fields: {
                "id_field_olc_declaration_form_status": {
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
                    "id_field_declaration_of_no_conflict",
                    "id_field_ir35_independent_contractor_status",
                    "id_field_conduct_regulations_opt_out_notification_opt_out"
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