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
            "fields": [
                "id_field_email",
                "id_field_select_one_of_the_following_employee_statements",
                "id_field_brand"
            ],
            "children": [{
                "id": "student-loan",
                "fields": [
                    "id_field_do_you_have_a_student_loan_which_is_not_fully_repaid",
                    "id_field_are_you_repaying_your_student_loan_direct_to_the_student_loans_company_by_agreed_monthly_payments"
                ],
                "children": [{
                    "id": "student-loan-plans",
                    "fields": [
                        "id_field_what_type_of_student_loan_do_you_have",
                        "id_field_did_you_finish_your_studies_before_the_last_6_april"
                    ]
                }]
            }]
        }],
        pages: []
    },
    content: {
        page: {
            logo: "https://www.allegisgroup.com/-/media/images/allegisgroup/global/logos/ag-horizontal-logo-png.png?h=202&la=en-GB&w=654&hash=022E3B26C9D9A0A8B4DE6E50321A0137F166BAA4",
            title: "Employee Statement"
        },
        single: {
            fields: {
            },
            groups: {
                "student-loan": {
                    heading: "STUDENT LOAN"
                },
                "student-loan-plans": {
                    heading: "STUDENT LOAN PLANS",
                    description: {
                        type: 'html',
                        value: '<div class="custom-text"><p>You will have a Plan 1 Student Loan if:</p><ul><li>You lived in Scotland or Northern Ireland when you started your course, or</li><li>You lived in England or Wales and started your course before September 2012</li></ul><p>You will have a Plan 2 Student Loan if:</p><ul><li>You lived in England or Wales and started your course on or after 1 September 2012</li></ul><p>For further guidance about repaying Student Loans go to <a href="https://www.gov.uk/new-employee/student-loans" target="_blank">www.gov.uk/new-employee/student-loans</a></p></div>'
                    }
                }
            }
        },
        multiple: {
            fields: {}
        }
    },
    state: {
        single: {
            fields: {
                "id_field_are_you_repaying_your_student_loan_direct_to_the_student_loans_company_by_agreed_monthly_payments": {
                    default: {
                        visible: false
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_do_you_have_a_student_loan_which_is_not_fully_repaid",
                            values: ["Yes"]
                        }]
                    }]
                },
                "id_field_brand": {
                    default: {
                        visible: false,
                        alwaysSubmit: true
                    }
                }
            },
            groups: {
                "student-loan-plans": {
                    default: {
                        visible: false
                    },
                    other: [{
                        visible: true,
                        conditions: [{
                            target: "id_field_are_you_repaying_your_student_loan_direct_to_the_student_loans_company_by_agreed_monthly_payments",
                            values: ["No"]
                        }, {
                            target: "id_field_do_you_have_a_student_loan_which_is_not_fully_repaid",
                            values: ["Yes"]
                        }]
                    }]
                }
            }
        }
    }
}