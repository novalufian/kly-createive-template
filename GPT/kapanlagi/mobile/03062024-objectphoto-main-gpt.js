[%REMOVE_ADSENSE%]
[%CONTEXTUAL_TWEAK%]
// berita foto
// TOPFRAME V8
var _adsvisible_ = {
    "topframe": false,
    "topframeClassTweak": false,
    "topframeScrollBackToTop": false,
}

var _CONTAINER_TARGET_ = null;
var _PARENT_BODY_TARGET_ = null;
var _HEADER_ELEMENT_ = null;
var _TOPFRAME_PARENT_WRAPPER_ = null;
var _TOPFRAME_WRAPPER_ = null;
var _TOPFRAME_STICKY_ = false;
var _TOPFRAME_STICKY_END_ = false;
var _TOPFRAME_STICKY_LAST_SCROLL_ = 0;
var _TOPFRAME_STICKY_LAST_SCROLL_END_ = 0;
var _TOPFRAME_STICKY_SCROLL_SPEED_ = 10;
var _TOPFRAME_STICKY_TIME_ = 7;
var _TOPFRAME_STICKY_IS_READY_ = false;
var _TOPFRAME_STICKY_TYPE_ = null;
var _TOPFRAME_STICKY_ADUNIT_TARGET_ = "#div-gpt-ad-topfrm";
var _turnOff_ = false;
var _IS_IOS_ = parent.window.navigator.platform.match(/iPhone|iPod|iPad/);
var _ORINETATION_ = (_IS_IOS_) ? parent.window.orientation : parent.screen.orientation.angle;
var _TOPFRAME_STICKY_CUSTOM_STYLE_ = document.createElement("style");
// TOPFRAME V8

/* SHOWCASE FLYING CARPET STYLE 300x600*/
document.addEventListener("DOMContentLoaded", _SCFlyingCarpetStyle_)

function _SCFlyingCarpetStyle_() {
    var _style_ = document.createElement("style");
    _style_.textContent = `.banner-inner div[id*="ad-showcase"].flying-carpet{ position: relative; clear: both; overflow: hidden; clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%) !important; min-height: 270px; width: 100%; display: flex; justify-content: center; } .banner-inner div[id*="ad-showcase"].flying-carpet .ad-content { top: 50%; transform: translateY(-50%); position: fixed; z-index: 2; }`;
    document.querySelector("body").appendChild(_style_)
}

/* SHOWCASE FLYING CARPET EFFECT 300x600*/
function _SCFlyingCarpetEffect_(event) {
    var _domId_ = event.slot.getSlotId().getDomId();

    var _domTarget_ = document.getElementById(_domId_)
    var _is300x600_ = JSON.stringify(event.size) == '[300,600]'
    if (_is300x600_ && _domId_.includes("showcase")) {
        _domTarget_.classList.add("flying-carpet")
        _domTarget_.querySelector("div").classList.add("ad-content")
    }
}


/*PROTOTYPE CUSTOM FILTERING*/
String.prototype.klyFiltering = function(delimiter) {
    return this.trim().split(delimiter).map(function(t) {
        return t.trim().toLowerCase()
    }).filter(x => x != "");
};

var gptadslots = [];
var googletag = googletag || {};
var pbjs = pbjs || {};

pbjs.que = pbjs.que || [];
googletag.cmd = googletag.cmd || [];
/** END - PREBID INIT, CONFIGURATION & GOOGLE INIT   */
/** LOAD PREBID - END */

var gpt_gam_site = window.location.hostname.toUpperCase(),
    gpt_gam_ver = 'V2.8-ADS-BF';

window.dataLayer = window.dataLayer || [];
window.GAMLibrary = {};
window.GAMLibrary = {
    dfpBottomFrame: '/36504930/KLY/MOBILE/KAPANLAGI.COM/BOTTOM_FRAME',
    dfpFloatingPin: '/36504930/KLY/MOBILE/KAPANLAGI.COM/FLOATING_PIN',
    dfpTopframe: '/36504930/KLY/MOBILE/KAPANLAGI.COM/MASTHEAD',
    dfpInterstitial: '/36504930/KLY/MOBILE/KAPANLAGI.COM/INTERSTITIAL',
    dfpPageNum: 1,
    topFrameFixedSize: 1,
    timedBottomFrm: null,
    timedFloatingPin: null,
    tags: '',
    articleType: {
        "TextTypeArticle": {
            'scroll': 50
        },
        "VideoGallery": {
            'scroll': 50
        },
        "PhotoGallery": {
            'scroll': 0
        },
        "photoObjectLoader": {
            'scroll': 50
        },
        "default": {
            'scroll': 50
        },
    },
    /*NEW LAZZY LOADS ADS RENDER */
    adsList: [],
    refreshKey: 'refresh',
    refreshValue: 'true',
    /** ============ PREBID ============ */
    prebidNewAdunit: {},
    get prebidDisplay() {
        return [{
            code: "div-gpt-ad-kapanlagi-sc",
            mediaTypes: {
                banner: {
                    sizes: [
                        [300, 250],
                        [250, 250],
                        [200, 200],
                    ],
                },
            },
            bids: [{
                bidder: "teads",
                params: {
                    pageId: 151762,
                    placementId: 167821
                }
            }, {
                bidder: 'rubicon',
                params: {
                    accountId: 12534,
                    siteId: 377460,
                    zoneId: 2082390
                }
            }, {
                bidder: "innity",
                params: {
                    zone: 97836,
                    pub: 536
                }
            }, {
                bidder: "pubmatic",
                params: {
                    publisherId: '156536',
                    adSlot: 'Prebid-Kapanlagi-Mobile-300x250_1',
                }
            }, {
                bidder: 'unruly',
                params: {
                    siteId: 243584
                }
            }, {
                bidder: 'medianet',
                params: {
                    cid: '8CUWX4UX4',
                    crid: '576550861'
                }
            }, {
                bidder: 'smartadserver',
                params: {
                    domain: 'https://prg-apac.smartadserver.com',
                    networkId: 4221,
                    siteId: 498333,
                    pageId: 1556525,
                    formatId: 111310
                }
            }, {
                bidder: "openx",
                params: {
                    delDomain: "emtek-d.openx.net",
                    unit: "556894080"
                }
            }, {
                bidder: 'ix',
                params: {
                    siteId: '683432'
                }
            }, {
                bidder: "oftmedia",
                params: {
                    placementId: "27497183"
                }
            }, {
                bidder: "yahoossp",
                params: {
                    dcn: '8a969d80018383b1b722c625301f0230',
                    pos: '8a96992f018383b1c311c6259957023d'
                }
            }, {
                bidder: "taboola",
                params: {
                    tagId: 'showcase_homepage_1',
                    publisherId: '1501405',
                }
            }, {
                bidder: "triplelift",
                params: {
                    inventoryCode: 'Kapanlagi_Mobile_300x250_Prebid'
                }
            }, {
                bidder: "adnuntius",
                params: {
                    auId: '00000000001093e8'
                }
            }, 
            { bidder: 'criteo', params: { zoneId: 1789607 }},
        ],
        }, {
            code: "div-gpt-ad-kapanlagi-hl",
            mediaTypes: {
                banner: {
                    sizes: [
                        [320, 50],
                        [320, 100],
                    ],
                },
            },
            bids: [{
                bidder: "rubicon",
                params: {
                    accountId: 12534,
                    siteId: 377460,
                    zoneId: 2082390
                }
            }, {
                bidder: "innity",
                params: {
                    zone: 97835,
                    pub: 536
                }
            }, {
                bidder: "pubmatic",
                params: {
                    publisherId: '156536',
                    adSlot: 'Prebid-Kapanlagi-Mobile-320x50_1',
                }
            }, {
                bidder: 'medianet',
                params: {
                    cid: '8CUWX4UX4',
                    crid: '888142531'
                }
            }, {
                bidder: 'smartadserver',
                params: {
                    domain: 'https://prg-apac.smartadserver.com',
                    networkId: 4221,
                    siteId: 498333,
                    pageId: 1556525,
                    formatId: 111312
                }
            }, {
                bidder: "openx",
                params: {
                    delDomain: "emtek-d.openx.net",
                    unit: "556894077"
                }
            }, {
                bidder: "ix",
                params: {
                    siteId: "683431"
                }
            }, {
                bidder: "oftmedia",
                params: {
                    placementId: "27497182"
                }
            }, {
                bidder: "yahoossp",
                params: {
                    dcn: '8a969d80018383b1b722c625301f0230',
                    pos: '8a969d80018383b1b722c6261a900233'
                }
            }, {
                bidder: "taboola",
                params: {
                    tagId: 'headline_homepage_1',
                    publisherId: '1501405',
                }
            }, {
                bidder: "triplelift",
                params: {
                    inventoryCode: 'Kapanlagi_HDX_Prebid'
                }
            }, {
                bidder: "adnuntius",
                params: {
                    auId: '00000000001093e7'
                }
            }, 
            { bidder: 'criteo', params: { zoneId: 1789607 }},
        ],
        }, {
            code: "div-gpt-ad-kapanlagi-bottomfrm",
            mediaTypes: {
                banner: {
                    sizes: [
                        [320, 50],
                        [320, 100],
                    ],
                },
            },
            bids: [{
                bidder: "innity",
                params: {
                    zone: 97106,
                    pub: 536
                }
            }, {
                bidder: "rubicon",
                params: {
                    accountId: 12534,
                    siteId: 377460,
                    zoneId: 2082390
                }
            }, {
                bidder: 'medianet',
                params: {
                    cid: '8CUWX4UX4',
                    crid: '986414413'
                }
            }, {
                bidder: 'smartadserver',
                params: {
                    domain: 'https://prg-apac.smartadserver.com',
                    networkId: 4221,
                    siteId: 498333,
                    pageId: 1556525,
                    formatId: 111312
                }
            }, {
                bidder: "openx",
                params: {
                    delDomain: "emtek-d.openx.net",
                    unit: "556894075"
                }
            }, {
                bidder: "ix",
                params: {
                    siteId: "683433"
                }
            }, {
                bidder: "oftmedia",
                params: {
                    placementId: "27497184"
                }
            }, {
                bidder: "yahoossp",
                params: {
                    dcn: '8a969d80018383b1b722c625301f0230',
                    pos: '8a96908c018383b1ce9ac6266a9d0233'
                }
            }, {
                bidder: "taboola",
                params: {
                    tagId: 'bottomfrm_homepage_1',
                    publisherId: '1501405',
                }
            }, {
                bidder: "triplelift",
                params: {
                    inventoryCode: 'Kapanlagi_HDX_Prebid'
                }
            }, {
                bidder: "adnuntius",
                params: {
                    auId: '00000000001093eb'
                }
            }, 
            { bidder: 'criteo', params: { zoneId: 1789607 }},
        ],
        }, {
            code: "div-gpt-ad-kapanlagi-dfp-exposer-slot1-oop",
            mediaTypes: {
                banner: {
                    sizes: [
                        [300, 250],
                        [300, 600],
                        [320, 480],
                        [160, 600],
                        [250, 250],
                    ],
                },
            },
            bids: [{
                bidder: "teads",
                params: {
                    pageId: 153508,
                    placementId: 167820
                }
            }, {
                bidder: "innity",
                params: {
                    zone: 97107,
                    pub: 536
                }
            }, {
                bidder: "rubicon",
                params: {
                    accountId: 12534,
                    siteId: 377460,
                    zoneId: 2082390
                }
            }, {
                bidder: "pubmatic",
                params: {
                    publisherId: '156536',
                    adSlot: 'Prebid-Kapanlagi-Mobile-300x600'
                }
            }, {
                bidder: 'unruly',
                params: {
                    siteId: 243584
                }
            }, {
                bidder: 'medianet',
                params: {
                    cid: '8CUWX4UX4',
                    crid: '123558562'
                }
            }, {
                bidder: "openx",
                params: {
                    delDomain: "emtek-d.openx.net",
                    unit: "556894076"
                }
            }, {
                bidder: "oftmedia",
                params: {
                    placementId: "27497185"
                }
            }, {
                bidder: "yahoossp",
                params: {
                    dcn: '8a969d80018383b1b722c625301f0230',
                    pos: '8a969d80018383b1b722c625d62a0232'
                }
            }, {
                bidder: "taboola",
                params: {
                    tagId: 'exposer_homepage_1',
                    publisherId: '1501405',
                }
            }, {
                bidder: "triplelift",
                params: {
                    inventoryCode: 'Kapanlagi_Mobile_300x250_Prebid'
                }
            }, { 
              	bidder: "adnuntius", 
              	params: { 
                  	auId: '000000000023535d' } 
            }, 
            { bidder: 'criteo', params: { zoneId: 1789607 }},
        ],
        }, ];
    },
    get prebidVideo() {
        const SPOTX_OUTSTREAM_FUNCTION = function(bid) {
            var bMobile = function() {
                var check = false;
                (function(a) {
                    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                            a
                        ) ||
                        /1207|6310|6590|3gso|4thp|50[1 6]i|770s|802s|a wa|abac|ac(er|oo|s\ )|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\ m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\ (n|u)|c55\/|capi|ccwa|cdm\ |cell|chtm|cldc|cmd\ |co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\ s|devi|dica|dmob|do(c|p)o|ds(12|\ d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4 7]0|os|wa|ze)|fetc|fly(\ |_)|g1 u|g560|gene|gf\ 5|g\ mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\ (m|p|t)|hei\ |hi(pt|ta)|hp( i|ip)|hs\ c|ht(c(\ | |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\ (20|go|ma)|i230|iac( |\ |\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\ |kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\ [a w])|libw|lynx|m1\ w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\ cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\ | |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0 2]|n20[2 3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\ |on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\ ([1 8]|c))|phil|pire|pl(ay|uc)|pn\ 2|po(ck|rt|se)|prox|psio|pt\ g|qa\ a|qc(07|12|21|32|60|\ [2 7]|i\ )|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\ |oo|p\ )|sdk\/|se(c(\ |0|1)|47|mc|nd|ri)|sgh\ |shar|sie(\ |m)|sk\ 0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\ |v\ |v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\ |tdg\ |tel(i|m)|tim\ |t\ mo|to(pl|sh)|ts(70|m\ |m3|m5)|tx\ 9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0 3]|\ v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\ | )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\ |your|zeto|zte\ /i.test(
                            a.substr(0, 4)
                        ))
                        check = true;
                })(navigator.userAgent || navigator.vendor || window.opera);
                return check;
            };

            if (bMobile()) {
                var playerWidth = 300;
                var playerHeight = 169;
            } else {
                var playerWidth = 640;
                var playerHeight = 360;
            }

            const videoDiv = bid.adUnitCode;
            let script = window.document.createElement("script");
            script.type = "text/javascript";
            script.src = "//cdn.spotxcdn.com/website/integration_test/media/asia/EASI.js";
            script.setAttribute("data-spotx_channel_id", "" + bid.channel_id);
            script.setAttribute("data-spotx_vast_url", "" + bid.vastUrl);
            script.setAttribute("data-spotx_content_width", playerWidth);
            script.setAttribute("data-spotx_content_height", playerHeight);
            script.setAttribute("data-spotx_content_page_url", bid.renderer.config.content_page_url);
            script.setAttribute("data-spotx_ad_unit", "incontent");
            script.setAttribute("data-spotx_autoplay", "1");
            script.setAttribute("data-spotx_continue_out_of_view", "1");
            script.setAttribute("data-spotx_content_container_id", videoDiv);
            var vid_contain = window.document.getElementById(videoDiv);
            vid_contain.style.cssText = "display: none; margin-bottom: 20px";
            vid_contain.appendChild(script);
        }
        return [{
            code: "div-gpt-ad-kapanlagi-sc",
            mediaTypes: {
                video: {
                    playerSize: [640, 360],
                    context: "outstream",
                    protocols: [2, 3, 5, 6, 7],
                    api: [2, 3, 7],
                    minduration: 4,
                    maxduration: 30,
                    mimes: ["video/mp4", "video/x-ms-wmv", "application/javascript", "video/3gpp", "application/x-mpegURL", "video/quicktime", "video/x-msvideo", "video/x-flv", "video/webm"],
                    placement: 3
                },
            },
            bids: [{
                bidder: "spotx",
                params: {
                    channel_id: 285432,
                    ad_unit: "outstream",
                    outstream_function: SPOTX_OUTSTREAM_FUNCTION
                }
            }, {
                bidder: 'ix',
                params: {
                    siteId: '683432'
                }
            }, ],
        }, {
            code: "div-gpt-ad-kapanlagi-hl",
            mediaTypes: {
                video: {
                    playerSize: [640, 360],
                    context: "outstream",
                    protocols: [2, 3, 5, 6, 7],
                    api: [2, 3, 7],
                    minduration: 4,
                    maxduration: 30,
                    mimes: ["video/mp4", "video/x-ms-wmv", "application/javascript", "video/3gpp", "application/x-mpegURL", "video/quicktime", "video/x-msvideo", "video/x-flv", "video/webm"],
                    placement: 3
                },
            },
            bids: [{
                bidder: "spotx",
                params: {
                    channel_id: 285432,
                    ad_unit: "outstream",
                    outstream_function: SPOTX_OUTSTREAM_FUNCTION
                }
            }, {
                bidder: "ix",
                params: {
                    siteId: "683431"
                }
            }, ],
        }, {
            code: "div-gpt-ad-kapanlagi-bottomfrm",
            mediaTypes: {
                video: {
                    playerSize: [640, 360],
                    context: "outstream",
                    protocols: [2, 3, 5, 6, 7],
                    api: [2, 3, 7],
                    minduration: 4,
                    maxduration: 30,
                    mimes: ["video/mp4", "video/x-ms-wmv", "application/javascript", "video/3gpp", "application/x-mpegURL", "video/quicktime", "video/x-msvideo", "video/x-flv", "video/webm"],
                    placement: 3
                },
            },
            bids: [{
                bidder: "spotx",
                params: {
                    channel_id: 285432,
                    ad_unit: "outstream",
                    outstream_function: SPOTX_OUTSTREAM_FUNCTION
                }
            }, {
                bidder: 'pubmatic',
                params: {
                    publisherId: '156536',
                    videoAdUnit: '4045181',
                    adSlot: 'kly_prebid_outstream_mobile_kapanlagi',
                    outstreamAU: 'kly_prebid_outstream_mobile_kapanlagi',
                    video: {
                        skippable: true,
                        playbackmethod: [2],
                        context: "outstream",
                        api: [2, 7],
                        minduration: 5,
                        maxduration: 30,
                        mimes: ["video/mp4", "video/x-ms-wmv", "application/javascript", "video/3gpp", "application/x-mpegURL", "video/quicktime", "video/x-msvideo", "video/x-flv", "video/webm"],
                        placement: 3
                    }
                }
            }, ],
        }, {
            code: "div-gpt-ad-kapanlagi-dfp-exposer-slot1-oop",
            mediaTypes: {
                video: {
                    playerSize: [640, 360],
                    context: "outstream",
                    protocols: [2, 3, 5, 6, 7],
                    api: [2, 3, 7],
                    minduration: 4,
                    maxduration: 30,
                    mimes: ["video/mp4", "video/x-ms-wmv", "application/javascript", "video/3gpp", "application/x-mpegURL", "video/quicktime", "video/x-msvideo", "video/x-flv", "video/webm"],
                    placement: 3
                },
            },
            bids: [{
                bidder: "spotx",
                params: {
                    channel_id: 285432,
                    ad_unit: "outstream",
                    outstream_function: SPOTX_OUTSTREAM_FUNCTION
                }
            }, ],
        }, ];

    },
    set prebidAdunit(gamParams) {
        /** default adunit object */
        var newPrebidAdunit = {
            'display': {
                'obj': this.prebidDisplay,
                'definedSlot': [],
                'containerName': [], // to set rendered status
            },
            'video': {
                'obj': this.prebidVideo,
                'definedSlot': [],
                'containerName': [], // to set rendered status
            },
        };

        /** 
         * default : using `newPrebidAdunit` as default adunit object 
         * other request : using `gamParams` as adunit parameters
         */
        for (var [key, values] of Object.entries(newPrebidAdunit)) {
            var containerName = !gamParams.containerName.length ? values.containerName : gamParams.containerName;

            values.obj = values.obj.map((ob) => {
                containerName.map(function(el) {
                    /** filter showcase in paging */
                    if (el && el.replace(/\-\d$/ig, '').match(`${ob.code}`)) {
                        ob.code = el;
                    }
                });
                if (containerName.indexOf(`${ob.code}`) > -1) {
                    return ob;
                }
            }).filter(function(element) {
                return element !== undefined;
            });

            values.definedSlot = !gamParams.containerName.length ? values.definedSlot : gamParams.definedSlot;
            values.containerName = !gamParams.containerName.length ? values.containerName : gamParams.containerName;
        }

        this.prebidNewAdunit = newPrebidAdunit;

        this.consoleLog({
            'text': "PARAMS & FILTERED PREBID ADUNIT ( DISPLAY & VIDEO ): ",
            'variable': [gamParams, this.prebidNewAdunit]
        });

    },
    get prebidAdUnit() {
        return this.prebidNewAdunit;
    },
    prebidInitAdserver: function() {
        var displayAdUnitCodes = [];
        this.prebidAdUnit.display.obj.forEach(function(adUnit) {
            displayAdUnitCodes.push(adUnit.code);
        });
        googletag.cmd.push(function() {
            pbjs.que.push(function() {
                var codeName = this.prebidAdUnit.display.containerName[0];
                pbjs.setTargetingForGPTAsync(displayAdUnitCodes);
                if (this.prebidAdUnit.display.definedSlot.length > 0) {
                    googletag.pubads().refresh(this.prebidAdUnit.display.definedSlot);
                }
                this.consoleLog({
                    'text': 'PBJS SUCEESS!',
                    'variable': [displayAdUnitCodes, this.prebidAdUnit.display.definedSlot]
                });
            }.bind(this));
        }.bind(this));
    },
    prebidInstantiate: function(params) {
        const PRICE_GRANULARITY_CONFIG = {
            buckets: [{
                precision: 2,
                min: 0.02,
                max: 0.99,
                increment: 0.01
            }, {
                precision: 2,
                min: 1,
                max: 10,
                increment: 0.1
            }, ],
        };
        const TIMEOUT = 1000;
        const FS_TIMEOUT = 3000;
        /** 
         *  params = {
         *      containerName: 'xxx',
         *      definedSlot: [xxx,xxx,xxx],  
         *  }
         */
        this.prebidAdunit = params;

        pbjs.bidderSettings = {
            teads: { storageAllowed: true},
            rubicon: { storageAllowed: true},
            innity: { storageAllowed: true},
            pubmatic: { storageAllowed: true},
            unruly: { storageAllowed: true},
            medianet: { storageAllowed: true},
            smartadserver: { storageAllowed: true},
            openx: { storageAllowed: true},
            ix: { storageAllowed: true},
            // oftmedia: { storageAllowed: true},
            yahoossp: { storageAllowed: true},
            taboola: { storageAllowed: true},
            triplelift: { storageAllowed: true},
            adnuntius: { storageAllowed: true},
            criteo: { storageAllowed: true},
            spotx: { storageAllowed: true}
        }
      
        var initAdserver = this.prebidInitAdserver.bind(this);

        pbjs.que.push(() => {
            pbjs.addAdUnits(this.prebidAdUnit.display.obj);
            pbjs.addAdUnits(this.prebidAdUnit.video.obj);
            pbjs.setConfig({
                priceGranularity: PRICE_GRANULARITY_CONFIG,
                enableSendAllBids: true,
                cache: {
                    url: 'https://prebid.adnxs.com/pbc/v1/cache'
                },
                // bidderTimeout: 2000,
              	enableTIDs: true, deviceAccess: true, storageAllowed: true,
            });
            pbjs.requestBids({
                bidsBackHandler: initAdserver,
                timeout: TIMEOUT,
            });
        });

        setTimeout(function() {
            initAdserver;
        }.bind(this), FS_TIMEOUT);
    },
    /** ============ PREBID ============ */
    setGamBFInterval: function(active = true) {
        if (!active) {
            clearInterval(window.GAMLibrary.gamBFInterval);
            return;
        }
        window.GAMLibrary.gamBFInterval = setInterval(function() {
            let spinCont = document.querySelector('#div-gpt-ad-kapanlagi-bottomfrm-cont');
            /** Init prebid  */
            this.prebidInstantiate({
                containerName: ['div-gpt-ad-kapanlagi-bottomfrm'],
                definedSlot: [this.refreshSlot]
            });
            typeof SPAFreezeBody == 'function' ? SPAFreezeBody(false) : '';
            spinCont && spinCont.remove();
        }.bind(this), 60000);
    },
    documentMeta: function(metaName) {
        var metaResult = '';
        var metas = document.getElementsByTagName('meta');
        if (metas) {
            for (var x = 0, y = metas.length; x < y; x++) {
                if (metas[x].name.toLowerCase() == metaName) {
                    metaResult += metas[x].content;
                }
            }
        }
        return metaResult != '' ? metaResult : '';
    },
    scrollBottomFrame: function() {
        this.scroll = function() {
            var scrollNode = document.scrollingElement || document.documentElement;
            var scrollTop = scrollNode.scrollTop;
            var pageType = kly.gtm.type == '' ? 'default' : kly.gtm.type;
            if (scrollTop >= this.articleType[pageType].scroll) {
                if (!this.timedBottomFrm) {
                    this.timedBottomFrm = googletag.defineSlot(this.dfpBottomFrame, [
                        [320, 50],
                        [320, 100]
                    ], 'div-gpt-ad-kapanlagi-bottomfrm').addService(googletag.pubads()).setTargeting('pagingNum', '1');

                    /** Init prebid  */
                    this.prebidInstantiate({
                        containerName: ['div-gpt-ad-kapanlagi-bottomfrm'],
                        definedSlot: [this.timedBottomFrm]
                    })

                    this.refreshSlot = this.timedBottomFrm;
                    this.setGamBFInterval();
                } else {
                    window.removeEventListener("scroll", this.scroll);
                }
            }
        };
        this.scrollHandler = this.scroll.bind(this);
        window.addEventListener("scroll", this.scrollHandler);
    },
    scrollFloatingPin: function() {
        this.scroll = function() {
            var scrollNode = document.scrollingElement || document.documentElement;
            var scrollTop = scrollNode.scrollTop;
            var pageType = kly.gtm.type == '' ? 'default' : kly.gtm.type;
            // if (scrollTop >= this.articleType[pageType].scroll) {
            if (scrollTop >= 1000) {
                if (!this.timedFloatingPin) {
                    this.timedFloatingPin = googletag.defineOutOfPageSlot(this.dfpFloatingPin, 'div-gpt-ad-kapanlagi-floating-pin').addService(googletag.pubads()).setTargeting('pagingNum', '1');
                    googletag.pubads().refresh([this.timedFloatingPin]);
                } else {
                    window.removeEventListener("scroll", this.scroll);
                }
            }
        };
        this.scrollHandler = this.scroll.bind(this);
        window.addEventListener("scroll", this.scrollHandler);
    },
    exposerInterscroller: function(event) {
        var _domId_ = event.slot.getSlotId().getDomId();

        var _domTarget_ = document.getElementById(_domId_)
        var _is300x250_ = JSON.stringify(event.size) == '[300,250]'
        if (_is300x250_ && _domId_.includes("exposer")) {
            var interscrollerStyle = document.createElement("style");
            interscrollerStyle.textContent = ".interscroller-wrapper{min-height: 600px;} .interscroller{position: sticky; top: 160px;}";

            _domTarget_.parentElement.classList.add("interscroller");
            _domTarget_.parentElement.parentElement.classList.add("interscroller-wrapper");

            if (document.querySelectorAll(".interscroller-wrapper").length <= 1) {
                document.head.appendChild(interscrollerStyle);
            }
        }
    },
    brandSafetyChecker: function() {
        var _klyObject = typeof window.kly !== 'undefined' ? window.kly : window.kmklabs,
            _articlePages = _klyObject && _klyObject.article,
            _isAdultContent = _articlePages && _articlePages.isAdultContent,
            isMatcont = "0",
            isViolateBrandSafety = "0",

            //POPULATE META DATA
            bsKeyword = [],
            dfp_pageTitle = _articlePages && _articlePages.title.klyFiltering(' '),
            dfp_titles = (typeof dfp_pageTitle !== 'undefined') ? dfp_pageTitle : '',
            dfp_keyword = this.documentMeta("keywords"),
            dfp_desc = this.documentMeta("description"),
            /*tagForAds = _klyObject.gtm.tag.replace(/[^A-Za-z0-9|\- ]/ig, "").klyFiltering("|");*/
            dfp_tag = _klyObject.gtm.tag || _klyObject.tag && _klyObject.tag.name,
            tagForAds = typeof dfp_tag === 'undefined' ? [] : dfp_tag.replace(/[^A-Za-z0-9|\- ]/ig, "").klyFiltering("|");
            this.tags = tagForAds;
        const bsKeywordList = {
            [%brandSafetyKeyword%]
        };

        /*change this acording to the site page layout*/
        var siteContentObject = document.getElementsByClassName("pages-item");
        var siteContentText = "";

        if (siteContentObject.length) {
            siteContentText = siteContentObject[0].innerText;
        }
        siteContentText = dfp_keyword.concat(dfp_titles, ' ', dfp_desc, ' ', tagForAds, ' ', siteContentText);

        /*Iterate for all keyword list category to find match word*/
        for (var bsKey in bsKeywordList) {
            var subKeywordList = bsKeywordList[bsKey];
            if (subKeywordList.length > 0) {
                if (matchString = new RegExp("\\b(" + subKeywordList.join("|") + ")\\b", "ig").exec(siteContentText)) {
                    bsKeyword.push(bsKey);
                }
            }
        }

        if (bsKeyword.length > 0) {
            googletag.pubads().setTargeting("bsKeyword", bsKeyword);
            /*Temporary preserve the previous brand safety targeting*/
            googletag.pubads().setTargeting("isMatcont", isMatcont);
            googletag.pubads().setTargeting("brandsafety", isViolateBrandSafety);
        }
    },
    onMessageReceivedGPTUpdateCreativeStyle: function() {
        this.onMessageReceivedGetStyle = function(e) {
            /** filter only correct origin and setStyle command */
            if (!(e.origin.match(/safeframe.googlesyndication.com/ig)) ||
                typeof e.data !== 'object' ||
                typeof e.data.id !== 'string' ||
                e.data.cmd !== 'setStyle' ||
                typeof e.data.params !== 'object'
            ) {
                return;
            }

            /* remove # character from id, we don't use jquery*/
            var elementId = e.data.id.replace(/#/, "");

            var wrapperEl = document.getElementById(elementId);
            if (wrapperEl === null) {
                return;
            }

            var elements = [wrapperEl];
            /*target on KLY authorized element child ( div and iframe ) */
            if (typeof e.data.query === 'string' && e.data.query) {
                let el = null;
                if (el = e.data.query.match(/(div|iframe)/ig)) {
                    elements = wrapperEl.querySelectorAll(el.join(", "));
                }
            }

            /** target on KLY authorized attribute ( display, heigth, width ) */
            elements.forEach(function(element) {
                Object.keys(e.data.params).forEach(function(param) {
                    let allowedAttr = ['display', 'height', 'width'];
                    allowedAttr.indexOf(param) > -1 ? (element.style[param] = e.data.params[param]) : '';
                });
            });

        }
        if (window.addEventListener) {
            window.addEventListener('message', this.onMessageReceivedGetStyle, false);
        } else {
            if (window.attachEvent) {
                window.attachEvent('onmessage', this.onMessageReceivedGetStyle);
            } else {
                window.onmessage = this.onMessageReceivedGetStyle;
            }
        }
    },
    /** ============ TOOLS ============ */
    /** 
     * `showConsole` Logger for debuging
     * cookie key : gamlibLogger
     * cookie value : `true` ( display all gamlib console log ), `false` ( turn off all gamlib console log )
     * */
    pageLogger: {},
    set consoleToggle(stat) {
        document.cookie = `gamlibLogger=${stat}`;
    },
    /* Set console format msg : { text: Text, variable: Array } */
    set showConsole(msg) {
        this.pageLogger = msg;
    },
    /* Get console */
    get showConsole() {
        var getLog = document.cookie.split("gamlibLogger")[1] ? document.cookie.split("gamlibLogger")[1] : ';';
        var loggerCookies = getLog.split(';')[0].match(/(true)/ig) !== null ? true : false;
        if (loggerCookies) {
            console.log(this.pageLogger.text, this.pageLogger.variable);
        }
    },
    consoleLog: function(msg) {
        /* CONSOLE BLOCK */
        this.showConsole = msg;
        this.showConsole;
        /* CONSOLE BLOCK */
    },
    /** ============ TOOLS ============ */
    counterAhoy: 0,
    get increamentCounterAhoy() {
        this.counterAhoy++;
    },
}

/* DMP CATEGORY LIST */
window.createDMPTracker = function(adsCatList, dfpTracker, macro) {
    window.createCDPTracker(adsCatList, macro);
    parent.window.open(dfpTracker, '_blank');
};
window.createCDPTracker = function(cat, macro) {
    var cName = 'ahoy_visitor=',
        cVisitorId = document.cookie.split(';').find(v => {
            return v.match(cName);
        }),
        partnerUID = cVisitorId ? decodeURIComponent(cVisitorId).trim().replace(cName, '') : 0,
        gamMacro = typeof macro === "string" ? JSON.parse(macro) : macro,
        defaultKey = {
            adunitId: "ads_adunit_id",
            advertiserId: "ads_advertiser_id",
            creativeId: "ads_creative_id",
            lineitemId: "ads_lineitem_id",
            orderId: "ads_order_id",
        };
    actionDetails = Object.keys(gamMacro).reduce((obj, k) => Object.assign(obj, defaultKey[k] ? {
            [defaultKey[k]]: gamMacro[k]
        } : {
            [k]: gamMacro[k]
        }), {}),
        cdpData = {
            action: actionDetails.action ? actionDetails.action : 'ads_click',
            action_category: cat,
            action_details: actionDetails.action ? (delete actionDetails.action, actionDetails = actionDetails) : actionDetails,
            visitor_id: partnerUID
        };
    /*partnerUID ? window.AhoyEvent.sendPersonalizationUserEvent(cdpData) : '';*/
    (actionDetails.action == 'ads_click') ? (partnerUID ? window.AhoyEvent.sendPersonalizationUserEvent(cdpData) : '') : '';
};
/* DMP CATEGORY LIST */

var isReadPage = kly.pageType === "ReadPage";
googletag.cmd.push(function() {
    var urlPath = document.URL;

    /*SET NEW BRAND SAFETY LOGIC*/
    GAMLibrary.brandSafetyChecker();
	 /** STICKY BF - 22052024 */
    setHLSticky();
  
    if (GAMLibrary.topFrameFixedSize) {
        window.GAMLibrary.topframe = googletag.defineSlot(GAMLibrary.dfpTopframe, [[1, 1], [336, 280]], 'div-gpt-ad-topfrm').addService(googletag.pubads()).setTargeting('pagingNum', '1');
    } else {
        window.GAMLibrary.topframe = googletag.defineOutOfPageSlot(GAMLibrary.dfpTopframe, 'div-gpt-ad-topfrm').addService(googletag.pubads()).setTargeting('pagingNum', '1');
    }
    /* INTERSTITIAL ADS */
  	if (!_IS_IOS_) {
    	window.GAMLibrary.interstitial = googletag.defineOutOfPageSlot(GAMLibrary.dfpInterstitial, googletag.enums.OutOfPageFormat.INTERSTITIAL);
    	window.GAMLibrary.interstitial ? window.GAMLibrary.interstitial.addService(googletag.pubads()) : '';
    }
    /* INTERSTITIAL ADS */

    /* START - Send Impression Tracker Data To CDP */
    googletag.pubads().addEventListener('slotOnload', function(event) {
        var dfp_slotDelivered = event.slot.getResponseInformation() ? 'block' : 'none'; /* check wheter there is ads or not*/
        if (dfp_slotDelivered == 'block') {
            cdpData = {
                action: 'ads_impression',
                action_details: {
                    slotElementId: event.slot.getSlotElementId(),
                    ResponseInformation: event.slot.getResponseInformation(),
                    sizes: event.slot.getSizes(),
                    adunitPath: event.slot.getAdUnitPath(),
                    outOfPage: event.slot.getOutOfPage()
                }
            };

            let ahoyInterval = setInterval(function(e) {
                if (window.AhoyEvent && typeof window.AhoyEvent.sendPersonalizationUserEvent === 'function') {
                    try {
                        GAMLibrary.consoleLog({
                            'text': 'AHOY SAVED',
                            'variable': [cdpData]
                        });
                        window.AhoyEvent.sendPersonalizationUserEvent(cdpData);
                        clearInterval(ahoyInterval);
                    } catch (error) {
                        GAMLibrary.consoleLog({
                            'text': 'AHOY FAILED! : ' + error,
                            'variable': []
                        });
                        clearInterval(ahoyInterval);
                    }
                }
                if (GAMLibrary.counterAhoy > 20) {
                    clearInterval(ahoyInterval)
                }
                GAMLibrary.increamentCounterAhoy;
            }, 100);
        }
    });
    /* END - Send Impression Tracker Data To CDP */

    googletag.pubads().addEventListener('slotRenderEnded', function(event) {
        GAMLibrary.exposerInterscroller(event);

        /*sc 300x600 flying carpet*/
        _SCFlyingCarpetEffect_(event);
        
        var containerId = event.slot.getSlotElementId();
        var containerEl = document.getElementById(containerId);

        GAMLibrary.adsList[containerId] ? GAMLibrary.adsList[containerId].isRendering = true : '';

      
      	if (containerId.includes("topfrm")) {
            if (JSON.stringify(event.size) == '[336,280]') {
                var parallaxEl = document.getElementById("div-gpt-ad-topfrm-parallax-wrapper");
                var topfrmEl = document.getElementById("div-gpt-ad-topfrm");
                if (parallaxEl && topfrmEl) {
                    parallaxEl.style.display = "flex";
                    parallaxEl.style.alignItems = "center";
                    topfrmEl.style.position = "absolute";
                  	topfrmEl.style.width = "100vw";
                }
            }
        }

        // TOPFRAME SHRINKING V8
        if (containerId.includes("topfrm") && !_adsvisible_.topframe) {
            window.addEventListener("scroll", _SET_STICKY_v2_SCROLL_)
            setTimeout(() => {
                if (!_TOPFRAME_STICKY_) {
                    window.removeEventListener("scroll", _SET_STICKY_v2_SCROLL_)
                    _TOPFRAME_STICKY_END_ = true
                }
            }, 2000);
        }
        // END TOPFRAME SHRINKING V8

        if (containerEl === null) return;

        var iframeEl = containerEl.querySelectorAll('iframe')[0];

        /* it's delayed by 10 milliseconds, because iframe is not yet fully rendered
        and limited to max to 10 seconds to wait*/
        var timeoutFunction = function() {
            var src = "#" + containerId;
            /* `src` attribute is null, when iframe is FriendlyIframe, and
             when it's present, then it's SafeFrame */
            if (iframeEl) {
                if ((iframeEl.getAttribute('src') !== null)) {
                    src = iframeEl.getAttribute('src').replace(/#.*/, "") + src;
                } else {
                    var name = iframeEl.getAttribute('name') + "#" + containerId;
                    iframeEl.setAttribute('name', name);
                }
                iframeEl.setAttribute('src', src);
            }
        };
        setTimeout(timeoutFunction, 10);
    });

    /*Bottom Frame Scrolling*/
    GAMLibrary.scrollBottomFrame();
    /*Bottom Frame Scrolling*/

    GAMLibrary.scrollFloatingPin();

    // topframe shirnking tweak
    var _adsvisible_ = {
            "topframe": false
        }
        // topframe shirnking tweak

    googletag.pubads().addEventListener('slotVisibilityChanged', function(event) {
        var slot = event.slot,
            vrslotName = slot.getSlotElementId();

        // topframe shirnking tweak
        if (vrslotName.includes("topfrm") && event.inViewPercentage >= 70) {
            if (_TOPFRAME_STICKY_TIME_ > 2 && !_adsvisible_.topframe && document.querySelector(".topframe-sticky-counter")) {
                _TOPFRAME_STICKY_TIME_ = 4
                _adsvisible_.topframe = true
            }
        }
        // topframe shirnking tweak
    })

    /*  START TARGETING BLOCK   */
    googletag.pubads().setTargeting("tags", GAMLibrary.tags);
    googletag.pubads().setTargeting("articleTitle", kly.gtm.articleTitle);
	googletag.pubads().setTargeting("articlePath", window.location.pathname);
    googletag.pubads().setTargeting("type", kly.gtm.type);
    googletag.pubads().setTargeting("pageType", kly.pageType);
    googletag.pubads().setTargeting("channel", kly.gtm.subCategory);
    googletag.pubads().setTargeting("audience", typeof(audience = kly.gtm.audience && kly.gtm.audience.split("|")) === "undefined" ? "false" : audience);
    googletag.pubads().setTargeting("isAdvertorial", typeof(isAdvertorial = kly.article && kly.article.isAdvertorial.toString()) === "undefined" ? "false" : isAdvertorial);
    googletag.pubads().setTargeting("isMultipage", typeof(isMultipage = kly.article && kly.article.isMultipage.toString()) === "undefined" ? "false" : isMultipage);
    googletag.pubads().setTargeting("articleId", kly.gtm.articleId.toString());
    googletag.pubads().setTargeting("newExp", typeof(newExp = kly.gtm.new_exp) === "undefined" ? "false" : kly.gtm.new_exp.toString());
    googletag.pubads().setTargeting("site", kly.site);
    googletag.pubads().setTargeting("age", typeof(age = kly.gtm.age) === "undefined" ? "false" : kly.gtm.age.toString());
    googletag.pubads().setTargeting("gender", typeof(gender = kly.gtm.gender) === "undefined" ? "false" : kly.gtm.gender.toString());
    googletag.pubads().setTargeting("IsObjectPage", "1");
    googletag.pubads().setTargeting("subcategory", kly.gtm.subCategory);
    /*  END TARGETING BLOCK   */
    /* SET VISITOR ID AS PUBLISHER PROVIDED ID - START*/
    var cVisitorId = (visId = document.cookie.split("ahoy_visitor")[1]) ? visId.split(';')[0].replace(/[^a-zA-Z0-9]/ig, '') : false;
    if (cVisitorId) {
        googletag.pubads().setPublisherProvidedId(cVisitorId + 'kly');
    }
    /* SET VISITOR ID AS PUBLISHER PROVIDED ID - END*/
    googletag.pubads().setCentering(true);
    googletag.pubads().enableSingleRequest();
    googletag.pubads().disableInitialLoad();
    googletag.enableServices();
    /* REFRESH ON DEMAND */
  	if (!_IS_IOS_) {
    	googletag.pubads().refresh([window.GAMLibrary.interstitial]);
    }
    googletag.pubads().refresh([window.GAMLibrary.topframe]);

});
/* INITIATE PREBID */
GAMLibrary.prebidInstantiate({
    containerName: [],
    definedSlot: []
});

window.showAds = function(adsContainer, size, adunit) {

    if (!(adsContainer && size && adunit)) return;

    var slotName = adsContainer.match(/\b(headline|showcase|exposer|contextual)\b/ig);
    var slotElementId = slotName ? slotName[0] : false;
    var sizes = [];
    var adunitPath = '';
    var adunit = '';
    var banner = document.querySelector(`#${adsContainer}`);
    const observerOptions = {
        rootMargin: '0px',
        threshold: 0.05
    }
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (slotElementId) {
        switch (slotElementId) {
            case "headline":
                adunit = "HEADLINE";
                slotElementId = "div-gpt-ad-kapanlagi-hl";
                break;
            case "showcase":
                adunit = "SHOWCASE";
                slotElementId = "div-gpt-ad-kapanlagi-sc";
                break;
            case "exposer":
                adunit = "EXPOSER";
                slotElementId = "div-gpt-ad-kapanlagi-dfp-exposer-slot1-oop";
                break;
            case "contextual":
                adunit = "CONTEXTUAL";
                slotElementId = "div-gpt-ad-contextual";
                break;
        }
    }
    adunitPath = '/36504930/KLY/MOBILE/KAPANLAGI.COM/' + adunit;
    GAMLibrary.dfpPageNum++;
    size.split(",").forEach(function(item, index) {
        if (item == 'fluid') {
            sizes[index] = item;
        } else {
            sizes[index] = item.split("x").map(Number);
        }
    });

    googletag.cmd.push(function() {
        var SECONDS_TO_WAIT_AFTER_VIEWABILITY = 60;
        GAMLibrary.adsList[adsContainer] = {
            slot: googletag.defineSlot(adunitPath, sizes, adsContainer)
                .addService(googletag.pubads())
                .setTargeting(GAMLibrary.refreshKey, GAMLibrary.refreshValue)
                .setTargeting('pagingNum', GAMLibrary.dfpPageNum),
            isRendering: false
        };
        googletag.display(adsContainer);
    })

    function observerCallback(entries, observer) {
        var elSlotId = slotElementId; // due to scope restriction
        entries.forEach(entry => {
            let visibilityRatio = Math.floor(entry.intersectionRatio * 100);
            let slotElementId = entry.target.id;
            let definedSlot = null;
            if (entry.isIntersecting) {
                let container = GAMLibrary.adsList[slotElementId]
                if (container) {
                    if (!container.isRendering) {
                        GAMLibrary.prebidInstantiate({
                            containerName: [elSlotId],
                            definedSlot: [container.slot],
                        });
                    } else {
                        observer.unobserve(banner)
                    }
                }
            }
        });
    };
    observer.observe(banner);
}

/* BILLBOARD V7 */

document.addEventListener("DOMContentLoaded", _INIT_STICKY_TOPFRAME_);

function _INIT_STICKY_TOPFRAME_() {
    _CONTAINER_TARGET_ = document.querySelectorAll(".container");
    _HEADER_ELEMENT_ = _CONTAINER_TARGET_[0];
    _PARENT_BODY_TARGET_ = _CONTAINER_TARGET_[2];
    _TOPFRAME_PARENT_WRAPPER_ = document.querySelector("#div-gpt-ad-topfrm-parallax-wrapper");
    _TOPFRAME_WRAPPER_ = document.querySelector("#div-gpt-ad-topfrm-parallax-wrapper");
    //edit end
    _PARENT_BODY_TARGET_.style = '';
    document.addEventListener("scroll", _TOPFRAME_STICKY_SCROLL_);
    _TOPFRAME_STICKY_STYLE_();
    _TOPFRAME_STICKY_TWEAK_();
    _TOPFRAME_STICKY_IS_READY_ = true;
}

window.addEventListener("orientationchange", _ORIENTATION_CHANGE_);

function _ORIENTATION_CHANGE_() {
    _ORINETATION_ = (_IS_IOS_) ? window.orientation : screen.orientation.angle;
    if (_ORINETATION_ == 0) {
        return;
    }
    _turnOff_ = true;
    _UNSET_TOPFRAME_STICKY_();
}

function _TOPFRAME_STICKY_SCROLL_() {
    var _scrolltop_ = document.documentElement.scrollTop;
    if (_scrolltop_ >= 0 && "v7" == _TOPFRAME_STICKY_TYPE_) {
        if (_TOPFRAME_STICKY_) {
            var _H_ = _CONTAINER_TARGET_[2].clientHeight;
            var _HEIGHT = _CONTAINER_TARGET_[2].clientHeight;
            var _BODY_ = document.querySelector("body");
            _BODY_.style.setProperty("height", (_H_ * 10) + "px");
            _BODY_.style.setProperty("scroll-behavior", "smooth");
            _BODY_.style.setProperty("width", "100vw");

            _TOPFRAME_STICKY_ = false;
            _TOPFRAME_PARENT_WRAPPER_.classList.add("sticky");
            _TOPFRAME_WRAPPER_.classList.add("sticky");

            _TOPFRAME_STICKY_COUNTDOWN_();
            document.removeEventListener("scroll", _TOPFRAME_STICKY_SCROLL_);
            _PARENT_BODY_TARGET_.classList.add("topframe_is_sticky");
            document.addEventListener("scroll", _UPDATE_SCROLL_);
        }
    }
}

function _UNSET_TOPFRAME_STICKY_() {
    document.removeEventListener("scroll", _TOPFRAME_STICKY_SCROLL_);
    _TOPFRAME_STICKY_END_ = true;
    _TOPFRAME_STICKY_CUSTOM_STYLE_.remove();
    if (_TOPFRAME_PARENT_WRAPPER_ !== null) {
        _TOPFRAME_PARENT_WRAPPER_.classList.remove("sticky");
    }
    if (_TOPFRAME_WRAPPER_ !== null) {
        _TOPFRAME_WRAPPER_.classList.remove("sticky");
    }
    if (_PARENT_BODY_TARGET_ !== null) {
        _PARENT_BODY_TARGET_.classList.remove("topframe_is_sticky");
    }

    setTimeout(function() {
        document.querySelector("body").style = '';
        if (_PARENT_BODY_TARGET_ !== null) {
            _PARENT_BODY_TARGET_.style = '';
        }
        if (_TOPFRAME_PARENT_WRAPPER_ !== null) {
            _TOPFRAME_PARENT_WRAPPER_.style = '';
        }
        /*document.documentElement.scrollTo(0, _TOPFRAME_STICKY_LAST_SCROLL_END_);*/
        _ROLLBACK_TOPFRAME_STICKY_TWEAK_();
    }, 100); /*30000*/
}

function _TOPFRAME_STICKY_COUNTDOWN_() {
    _TOPFRAME_STICKY_LAST_SCROLL_ = document.documentElement.scrollTop;
    var _target_ = document.querySelector(".topframe-sticky-counter");
    var countdown = setInterval(function() {

        _target_.textContent = 'Penawaran sponsor berakhir setelah ( ' + _TOPFRAME_STICKY_TIME_ + ' )';
        if (_TOPFRAME_STICKY_TIME_ <= 0 || _turnOff_) {
            _TOPFRAME_PARENT_WRAPPER_.style.top = '-100vh';
            _TOPFRAME_PARENT_WRAPPER_.style.transition = 'top .5s ease';

            setTimeout(function() {
                _UNSET_TOPFRAME_STICKY_();
            }, 700); /*700*/
            clearInterval(countdown);
            _target_.remove();
        }
        _TOPFRAME_STICKY_TIME_--;
    }, 1000); /*1000*/
}

function _UPDATE_SCROLL_() {
    if (!_TOPFRAME_STICKY_END_) {
        var scrollTop = document.documentElement.scrollTop;
        _TOPFRAME_STICKY_LAST_SCROLL_END_ = _TOPFRAME_STICKY_LAST_SCROLL_ + (scrollTop / (_TOPFRAME_STICKY_SCROLL_SPEED_ / 4));
        document.querySelector('.topframe_is_sticky').style.transform = 'translateY(' + -(_TOPFRAME_STICKY_LAST_SCROLL_END_) + 'px)';
        if (_TOPFRAME_STICKY_LAST_SCROLL_END_ >= (_CONTAINER_TARGET_[2].clientHeight - 700)) {
            _TOPFRAME_STICKY_END_ = true;
        }
    }
};

function _TOPFRAME_STICKY_STYLE_() {
    var _P_ = document.createElement("p");
    _P_.classList.add("topframe-sticky-counter");
    _P_.textContent = "Penawaran sponsor berakhir setelah (7)";
    _TOPFRAME_PARENT_WRAPPER_.appendChild(_P_)
        // edit start
    _TOPFRAME_STICKY_CUSTOM_STYLE_.textContent = '.topframe_is_sticky::before {content: "";position: relative;height: 70.416667vw !important;display: block;} .topframe_is_sticky{position:fixed ; top : 0px; left:0px;transition: all 1s ease; width: 100vw;} .layout__ads{ transition: all 1s ease; } .topframe-sticky-counter {display : none;} .layout__ads.sticky { position: fixed; z-index: 99; height: calc(100vw *(267 / 414) + 25px ); } #div-gpt-ad-topfrm-parallax-wrapper.sticky::after , #div-gpt-ad-topfrm-parallax-wrapper.sticky::before { position: absolute; height: 25px; width: 100vw; left: 0; } #div-gpt-ad-topfrm-parallax-wrapper.sticky::after { content: ""; top: calc(100vw *(267 / 414) ); background: #0072FF; z-index: 100; animation: progress-bar 7s forwards linear; } #div-gpt-ad-topfrm-parallax-wrapper.sticky::before { content: ""; top: calc(100vw *(267 / 414) ); background: #212121; z-index: 99; } .sticky .topframe-sticky-counter { display : block; top: calc((100vw *(267 / 414) ) + 8px); color : #fff; line-height : 14px; z-index: 101; -webkit-animation: webkit-progress-count 7s forwards linear; animation: progress-count 7s forwards linear; width: 100%; margin: 0px; position: absolute; text-align: center; font-family: sans-serif; } div#div-gpt-ad-topfrm-parallax-wrapper, div#div-gpt-ad-topfrm-parallax-wrapper.sticky #div-gpt-ad-topfrm iframe { transition: all .3s ease; } div#div-gpt-ad-topfrm-parallax-wrapper.sticky { height: calc(112vw *(267 / 414)) !important; position: fixed !important; top: 0px; z-index : 11; } div#div-gpt-ad-topfrm-parallax-wrapper.sticky #div-gpt-ad-topfrm iframe { transform: scale(.55); top: calc((-110.41666666666667vw * .42) / 2) !important; } @keyframes progress-bar{ from {width: 0px;} to{width: 100vw;} }';
    _PARENT_BODY_TARGET_.appendChild(_TOPFRAME_STICKY_CUSTOM_STYLE_);

}

function _TOPFRAME_STICKY_TWEAK_() {
    _PARENT_BODY_TARGET_.insertAdjacentElement("afterbegin", _HEADER_ELEMENT_);
}

function _ROLLBACK_TOPFRAME_STICKY_TWEAK_() {
    _PARENT_BODY_TARGET_.insertAdjacentElement("beforebegin", _HEADER_ELEMENT_);
}

// SHRINKING V8
function _SET_STICKY_v2_SCROLL_() {

    if (_TOPFRAME_STICKY_TYPE_ != "v8") {
        window.removeEventListener("scroll", _SET_STICKY_v2_SCROLL_)
        return
    }

    var _scrollTop_ = window.document.scrollingElement.scrollTop || window.document.documentElement.scrollTop
    if (_scrollTop_ == 0 && _adsvisible_.topframeClassTweak) {
        _adsvisible_.topframeScrollBackToTop = true
    }

    if ((document.documentElement.scrollTop > (document.querySelector(_TOPFRAME_STICKY_ADUNIT_TARGET_).clientHeight / 3)) && !_adsvisible_.topframeClassTweak && _TOPFRAME_STICKY_ && !_TOPFRAME_STICKY_END_) {
        _SET_STICKY_V2_STYLE_()
        _adsvisible_.topframeClassTweak = true;
        _SET_STICKY_V2_()
    }

}

function _SET_STICKY_V2_() {
    if (document.querySelector(".topframe-sticky-counter")) {
        document.querySelector(".topframe-sticky-counter").remove()
    }

    document.querySelector(_TOPFRAME_STICKY_ADUNIT_TARGET_).classList.add("puller")
    document.querySelector(_TOPFRAME_STICKY_ADUNIT_TARGET_).style = "position : fixed !important;top : -60px !important;"

    if (_TOPFRAME_STICKY_END_) {
        document.querySelector(_TOPFRAME_STICKY_ADUNIT_TARGET_).style.opacity = 0;
        return;
    }

    var _COUNTDOWN_STICKY_V2_NUMBER = 0
    var _COUNTDOWN_STICKY_V2 = setInterval(() => {
        if (_COUNTDOWN_STICKY_V2_NUMBER >= 75 || _adsvisible_.topframeScrollBackToTop && !_TOPFRAME_STICKY_END_) {
            clearInterval(_COUNTDOWN_STICKY_V2)
            _adsvisible_.topframe = true
            _TOPFRAME_STICKY_END_ = true
            _UNSET_STICKY_V2_()
        }

        _COUNTDOWN_STICKY_V2_NUMBER++;
    }, 100);

}

function _UNSET_STICKY_V2_() {
    document.querySelector(_TOPFRAME_STICKY_ADUNIT_TARGET_).classList.remove("puller")
    document.querySelector(_TOPFRAME_STICKY_ADUNIT_TARGET_).style.setProperty("position", "relative", "important");
    document.querySelector(_TOPFRAME_STICKY_ADUNIT_TARGET_).style.setProperty("top", "");
    document.querySelector(_TOPFRAME_STICKY_ADUNIT_TARGET_).style.opacity = 1;
    window.removeEventListener("scroll", _SET_STICKY_v2_SCROLL_)
}

function _SET_STICKY_V2_STYLE_() {
    _TOPFRAME_STICKY_CUSTOM_STYLE_.textContent = `div${_TOPFRAME_STICKY_ADUNIT_TARGET_}.puller { position: fixed !important; z-index: 999; transform: scale(.55) translateX(38%); border-radius: 20px; overflow: hidden; } div${_TOPFRAME_STICKY_ADUNIT_TARGET_}.puller::after { content: ""; position: absolute; height: 5px; width: 100%; background: yellow; left: 0; animation: tf-puller-loading 7s forwards; } @keyframes tf-puller-loading { 0% { width: 0px } 100% { width: 100% } }`;
    document.querySelector(_TOPFRAME_STICKY_ADUNIT_TARGET_).appendChild(_TOPFRAME_STICKY_CUSTOM_STYLE_);
}

function setHLSticky() {
    const hlContainer = document.querySelector("#div-gpt-ad-headline-page-2");
    const hlTopParent = hlContainer.parentElement.parentElement.parentElement;
    const setStylesOnElement = function(styles, element, rem = 0) {
        if (rem) {
            element.removeAttribute("style");
        } else {
            Object.assign(element.style, styles);
        }
    }
    const hlFixedStyle = {
        position: "fixed",
        "z-index": "99999",
        width: "100%",
        left: "0",
        top: "5px"
    };
    var isHLSticky = 0;
    var hlStickyTimeout = null;

    const checkInView = new IntersectionObserver((event) => {
        const coverage = event[0].intersectionRatio;
        let tBCR = event[0].target.getBoundingClientRect();
        if (tBCR.top < 0 && tBCR.bottom > 0) {
            setStylesOnElement(hlFixedStyle, hlContainer, 0);
            isHLSticky = 1;
            !hlStickyTimeout && (hlStickyTimeout = setTimeout(function() {
                checkInView.disconnect();
                setStylesOnElement(hlFixedStyle, hlContainer, 1);
                isHLSticky = 0;
            }, 7000));
        }
        if (coverage >= 1) {
            setStylesOnElement(hlFixedStyle, hlContainer, 1);
            isHLSticky = 0;
        }
        if (!isHLSticky && tBCR.bottom < 0) {
            setStylesOnElement(hlFixedStyle, hlContainer, 0);
        }
    }, {
        root: null,
        threshold: [0.5, 1],
    });

    checkInView.observe(hlTopParent);
}
