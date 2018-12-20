
$(document).ready(function () {
    $('#alx-save-load-button-container').hide();
    var BRAND_CONFIGS = {
        'Allegis': {
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
            },
            logo: 'https://www.allegisgroup.com/-/media/images/allegisgroup/global/logos/ag-horizontal-logo-png.png?h=202&la=en-GB&w=654&hash=022E3B26C9D9A0A8B4DE6E50321A0137F166BAA4'
        },
        'Areotek': {
            colours: {
                simple: {
                    primary: '#021A32',
                    secondary: '#F8971D'
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
            },
            logo: 'https://www.aerotek.com/-/media/images/aerotek/logos/aerotek-social-1200x627-png.png'
        },
        'Aston Carter': {
            colours: {
                simple: {
                    primary: '#006B3F',
                    secondary: '#000000'
                },
                detailed: {
                    fields: {
                        helperText: {
                            background: '#9A9B9C'
                        }
                    },
                    groups: {
                        description: {
                            background: '#9A9B9C'
                        }
                    }
                }
            },
            logo: 'https://www.secprofessionals.org/sites/secpro/files/aston-carter-logo_0.png'
        },
        'TEKsystems': {
            colours: {
                simple: {
                    primary: '#021a32',
                    secondary: '#f8971d'
                },
                detailed: {
                    fields: {
                        helperText: {
                            background: '#a4d7f4'
                        }
                    },
                    groups: {
                        description: {
                            background: '#a4d7f4'
                        }
                    }
                }
            },
            logo: 'https://s3.amazonaws.com/culturesurvey.greatplacetowork.com/public/prd_logos_v11/TEKsystems_logotype_RGB_calogo2799.jpg'
        }
    };


    window.alx.formEvents.registerToFormEvent(window.alx.formEvents.getFormEventNames().EVENT_SWITCHED_TO_EDITMODE, function (_event) {
        _event.preventDefault();

        var _brandConfig = BRAND_CONFIGS[$('#id_field_brand').val()] || BRAND_CONFIGS['Allegis'];

        window.alx.colourAppender.appendConfig(_brandConfig.colours);
        window.alx.pageContentInjector.injectLogo(_brandConfig.logo);

        if ($('#id_field_olc_registration_pack_status').val() === 'Answered') {
            $('.form-wrapper').prepend('<div class="custom-text alx-injected-content-html alx-form-field-helper-text alx-template-basic-field-helper-text"><p>You have previously submitted this form on another assignment where you provided the information being presented. Please verify if any information has changed since the last assignment and update accordingly.</p></div>');
        }
    });
});
