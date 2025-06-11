[%REMOVE_ADSENSE%]
// TOPFRAME V8
var _adsvisible_ = {
    "topframe" : false,
    "topframeClassTweak" : false,
    "topframeScrollBackToTop" : false,
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
var _TOPFRAME_STICKY_ADUNIT_TARGET_ = "#div-gpt-ad-kapanlagi-topfrm-oop";
var _turnOff_ = false;
var _IS_IOS_ = parent.window.navigator.platform.match(/iPhone|iPod|iPad/);
var _ORINETATION_ = (_IS_IOS_) ? parent.window.orientation : parent.screen.orientation.angle;
var _TOPFRAME_STICKY_CUSTOM_STYLE_ = document.createElement("style");
// TOPFRAME V8

/*TTD SETTINGS - START*/
window.uid2_settings={UID2_BASE_URL:"https://sg.prod.uidapi.com",SERVER_PUBLIC_KEY:"UID2-X-P-MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAErJteoXafwuvaFfhbPyHrM28q1ndSq4z4ozoTTo10K7LUPq2BaD6I548x8in/hNwEV6JvCaofdFOJtsV3WGrV2g==",SUBSCRIPTION_ID:"gk8wCgxku5"};const GET_UID2_COOKIE=document.cookie.split(";").find(a=>a.match(/(kly_uidmail|kly_uidphone)=/ig)),KLY_UID2=!!GET_UID2_COOKIE&&GET_UID2_COOKIE.trim().split(/(kly_uidmail|kly_uidphone)=/ig).filter(a=>a);
window.getUid2AdvertisingToken=async()=>{let a;try{a=JSON.parse(localStorage.getItem("__uid2_advertising_token")).latestToken.advertising_token}catch(a){console.log(a)}return a};
/*TTD SETTINGS - END */

/* PROTOTYPE CUSTOM FILTERING*/
String.prototype.klyFiltering = function(delimiter) {
    return this.trim().split(delimiter).map(function(t) { return t.trim().toLowerCase() }).filter(x => x != "");
};

/** START - PREBID INITIATE CLASS  */
class PrebidInstantiate {
    constructor(timeout, fstimeout, hbtimeout, adunitDisplay, adunitVideo, price) {
        this.PREBID_TIMEOUT = timeout;
        this.FAILSAFE_TIMEOUT = fstimeout;
        this.HB_TIMEOUT = hbtimeout;
        this.ADUNITDISPLAY = adunitDisplay;
        this.ADUNITVIDEO = adunitVideo;
        this.PRICE = price;
        this.pushBid();
        this.failsafePrebid();
    }

    failsafePrebid() {
        let that = this;
        setTimeout(function() {
            that.initAdserver();
        }, this.FAILSAFE_TIMEOUT);
    }
    pushBid() {
        pbjs.que.push(() => {
            const uidType = KLY_UID2 && KLY_UID2[0] === 'kly_uidmail' ? {
                emailHash: KLY_UID2[1]
            } : {
                phoneHash: KLY_UID2[1]
            };
        
            const cstgParams = KLY_UID2 ? {
                ...uidType,
                subscriptionId: `${window.uid2_settings.SUBSCRIPTION_ID}`,
                serverPublicKey: `${window.uid2_settings.SERVER_PUBLIC_KEY}`,
            } : {};
            const uid2Params = {
                uid2ApiBase: `${window.uid2_settings.UID2_BASE_URL}`,
                ...cstgParams,
            };

            pbjs.addAdUnits(this.ADUNITDISPLAY);
            pbjs.addAdUnits(this.ADUNITVIDEO);
            pbjs.setConfig({
                userSync: {
                    userIds: [{
                        name: 'uid2',
                        params: uid2Params,
                    }, ],
                    syncDelay: 5000,
                    auctionDelay: 1000,
                },
                priceGranularity: this.PRICE,
                enableSendAllBids: true,
                cache: {
                    url: 'https://prebid.adnxs.com/pbc/v1/cache'
                },
              	enableTIDs: true, deviceAccess: true, storageAllowed: true,
                // bidderTimeout: 2000,
            });
            pbjs.requestBids({
                bidsBackHandler: this.initAdserver,
                timeout: this.PREBID_TIMEOUT,
            });
        });
    }

    initAdserver() {
        if (pbjs.initAdserverSet) return;
        pbjs.initAdserverSet = true;

        // Get all of the adUnit codes for the display adUnits
        var displayAdUnitCodes = [];
        adUnitsDisplay.forEach(function(adUnit) {
            displayAdUnitCodes.push(adUnit.code);
            // console.log(adUnit.code);
        });

        googletag.cmd.push(function() {
            pbjs.que.push(function() {
                pbjs.setTargetingForGPTAsync(displayAdUnitCodes);
                /*googletag.pubads().refresh([window.GAMLibrary.headline]);*/
                googletag.pubads().refresh([window.GAMLibrary.showcase]);
                googletag.pubads().refresh([window.GAMLibrary.exposer1]);
            });
        });

    }
}
/** START - PREBID INITIATE CLASS  */

/** START - PREBID INIT, CONFIGURATION & GOOGLE INIT   */
const priceGranularityConfig = { buckets: [{ precision: 2, min: 0.02, max: 0.99, increment: 0.01 }, { precision: 2, min: 1, max: 10, increment: 0.1 }, ], };
var gptadslots = [];
var googletag = googletag || {};
var pbjs = pbjs || {};
var adUnitsDisplay = [{
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
        bids: [
            { bidder: "teads", params: { pageId: 151762, placementId: 167821 } },
            { bidder: 'rubicon', params: { accountId: 12534, siteId: 377460, zoneId: 2082390 } },
            { bidder: "innity", params: { zone: 97836, pub: 536 } },
            { bidder: "pubmatic", params: { publisherId: '156536', adSlot: 'Prebid-Kapanlagi-Mobile-300x250_1', } },
            { bidder: 'unruly', params: { siteId: 243584 } },
            { bidder: 'medianet', params: { cid: '8CUWX4UX4', crid: '576550861' } },
            { bidder: 'smartadserver', params: { domain: 'https://prg-apac.smartadserver.com', networkId: 4221, siteId: 498333, pageId: 1556525, formatId: 111310 } },
            { bidder: "openx", params: { delDomain: "emtek-d.openx.net", unit: "556894080" } },
            { bidder: 'ix', params: { siteId: '683432' } },
            { bidder: "yahoossp", params: { dcn: '8a969d80018383b1b722c625301f0230', pos: '8a96992f018383b1c311c6259957023d' } },
          	{ bidder: "taboola", params: { tagId: 'showcase_homepage_1', publisherId: '1501405', } },
            { bidder: 'criteo', params: { zoneId: 1789607 }},
            { bidder: 'smilewanted', params: { zoneId: 'emtek.digital_hb_display' }},
            { bidder: 'eskimi', params: { placementId: 2011 }},
            { bidder: 'r2b2',params: {pid: 'm.kapanlagi.com/prebid/300x250/1'}},
            { bidder: 'adkernel',params: {zoneId: '230696',host: 'cpm.appocean.media'}}
        ],
    },
    {
        code: "div-gpt-ad-kapanlagi-hl",
        mediaTypes: {
            banner: {
                sizes: [
                    [320, 50],
                    [320, 100],
                ],
            },
        },
        bids: [
            { bidder: "rubicon", params: { accountId: 12534, siteId: 377460, zoneId: 2082390 } },
            { bidder: "innity", params: { zone: 97835, pub: 536 } },
            { bidder: "pubmatic", params: { publisherId: '156536', adSlot: 'Prebid-Kapanlagi-Mobile-320x50_1', } },
            { bidder: 'medianet', params: { cid: '8CUWX4UX4', crid: '888142531' } },
            { bidder: 'smartadserver', params: { domain: 'https://prg-apac.smartadserver.com', networkId: 4221, siteId: 498333, pageId: 1556525, formatId: 111312 } },
            { bidder: "openx", params: { delDomain: "emtek-d.openx.net", unit: "556894077" } },
            { bidder: "ix", params: { siteId: "683431" } },
            { bidder: "yahoossp", params: { dcn: '8a969d80018383b1b722c625301f0230', pos: '8a969d80018383b1b722c6261a900233' } },
            { bidder: "taboola", params: { tagId: 'headline_homepage_1', publisherId: '1501405', } },
          	{ bidder: 'criteo', params: { zoneId: 1789607 }},
            { bidder: 'r2b2',params: {pid: 'm.kapanlagi.com/prebid/320x100_2/1'}},
            { bidder: 'adkernel',params: {zoneId: '230696',host: 'cpm.appocean.media'}}
        ],
    },
    {
        code: "div-gpt-ad-kapanlagi-bottomfrm",
        mediaTypes: {
            banner: {
                sizes: [
                    [320, 50],
                    [320, 100],
                ],
            },
        },
        bids: [
            { bidder: "innity", params: { zone: 97106, pub: 536 } },
            { bidder: "rubicon", params: { accountId: 12534, siteId: 377460, zoneId: 2082390 } },
            { bidder: 'medianet', params: { cid: '8CUWX4UX4', crid: '986414413' } },
            { bidder: 'smartadserver', params: { domain: 'https://prg-apac.smartadserver.com', networkId: 4221, siteId: 498333, pageId: 1556525, formatId: 111312 } },
            { bidder: "openx", params: { delDomain: "emtek-d.openx.net", unit: "556894075" } },
            { bidder: "ix", params: { siteId: "683433" } },
            { bidder: "yahoossp", params: { dcn: '8a969d80018383b1b722c625301f0230', pos: '8a96908c018383b1ce9ac6266a9d0233' } },
            { bidder: "taboola", params: { tagId: 'bottomfrm_homepage_1', publisherId: '1501405', } },
          	{ bidder: 'criteo', params: { zoneId: 1789607 }},
            { bidder: 'smilewanted', params: { zoneId: 'emtek.digital_hb_display' }},
            { bidder: 'eskimi', params: { placementId: 2010 }},
            { bidder: 'r2b2',params: {pid: 'm.kapanlagi.com/prebid/320x100/1'}},
            { bidder: 'adkernel',params: {zoneId: '230696',host: 'cpm.appocean.media'}}
        ],
    },
    {
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
        bids: [
            { bidder: "teads", params: { pageId: 153508, placementId: 167820 } },
            { bidder: "innity", params: { zone: 97107, pub: 536 } },
            { bidder: "rubicon", params: { accountId: 12534, siteId: 377460, zoneId: 2082390 } },
            { bidder: "pubmatic", params: { publisherId: '156536', adSlot: 'Prebid-Kapanlagi-Mobile-300x600' } },
            { bidder: 'unruly', params: { siteId: 243584 } },
            { bidder: 'medianet', params: { cid: '8CUWX4UX4', crid: '123558562' } },
            { bidder: "openx", params: { delDomain: "emtek-d.openx.net", unit: "556894076" } },
            { bidder: "yahoossp", params: { dcn: '8a969d80018383b1b722c625301f0230', pos: '8a969d80018383b1b722c625d62a0232' } },
            { bidder: "taboola", params: { tagId: 'exposer_homepage_1', publisherId: '1501405', } },
            { bidder: 'criteo', params: { zoneId: 1789607 }},
            { bidder: 'smilewanted', params: { zoneId: 'emtek.digital_hb_display' }},
            { bidder: 'eskimi', params: { placementId: 2013 }},
            {bidder: 'r2b2',params: {pid: 'm.kapanlagi.com/prebid/300x600/1'}},
            {bidder: 'adkernel',params: {zoneId: '230696',host: 'cpm.appocean.media'}}
        ],
    },
];
var adUnitsVideo = [{
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
        bids: [
            { bidder: 'ix', params: { siteId: '683432' } },
        ],
    },
    {
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
        bids: [
            { bidder: "ix", params: { siteId: "683431" } },
        ],
    },
    {
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
        bids: [
            {
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
            },
        ],
    },
];

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
    yahoossp: { storageAllowed: true},
    taboola: { storageAllowed: true},
    criteo: { storageAllowed: true}
}

pbjs.que = pbjs.que || [];
googletag.cmd = googletag.cmd || [];
/** END - PREBID INIT, CONFIGURATION & GOOGLE INIT   */

/** LOAD PREBID - END */

var gpt_gam_site = window.location.hostname.toUpperCase(),
    gpt_gam_ver = 'V5-ADS';

window.dataLayer = window.dataLayer || [];
window.GAMLibrary = {};
window.GAMLibrary = {
    dfpExposer1: '/36504930/KLY/MOBILE/KAPANLAGI.COM/EXPOSER',
    dfpBottomFrame: '/36504930/KLY/MOBILE/KAPANLAGI.COM/BOTTOM_FRAME',
    dfpFloatingPin: '/36504930/KLY/MOBILE/KAPANLAGI.COM/FLOATING_PIN',
    dfpTopframe: '/36504930/KLY/MOBILE/KAPANLAGI.COM/MASTHEAD',
    dfpHeadline: '/36504930/KLY/MOBILE/KAPANLAGI.COM/HEADLINE',
    scSlot: '/36504930/KLY/MOBILE/KAPANLAGI.COM/SHOWCASE',
    dfpInterstitial: '/36504930/KLY/MOBILE/KAPANLAGI.COM/INTERSTITIAL',
    generatedScrollAdunit: 0,
    topFrameFixedSize: 1,
    timedBottomFrm: null,
    timedFloatingPin: null,
    tags: '',
    articleType: {
        "TextTypeArticle": { 'scroll': 50 },
        "VideoGallery": { 'scroll': 50 },
        "PhotoGallery": { 'scroll': 0 },
        "default": { 'scroll': 50 },
    },
    setGamBFInterval: function(active = true, intervalTime = 60000) {
        if (!active) {
            clearInterval(window.GAMLibrary.gamBFInterval);
            return;
        }
        if (window.GAMLibrary.gamBFInterval) {
            clearInterval(window.GAMLibrary.gamBFInterval);
        }
        window.GAMLibrary.gamBFInterval = setInterval(function() {
            document.querySelector("#dfp-bframe-cont").style.display = "block";
            document.querySelector("#dfp-spinads") && document.querySelector("#dfp-spinads").parentElement.remove();
            pbjs.setTargetingForGPTAsync(['div-gpt-ad-kapanlagi-bottomfrm']);
            googletag.pubads().refresh([window.GAMLibrary.refreshSlot]);
            typeof SPAFreezeBody == 'function' ? SPAFreezeBody(false) : '';
        }, intervalTime);
    },
    setGamBFCloseBtn: function() {
        let buttonCloseBframeClick = document.createElement("a");
        buttonCloseBframeClick.setAttribute("href", "#");
        buttonCloseBframeClick.setAttribute("id", "dfp-bframe-close");
        buttonCloseBframeClick.setAttribute("onclick", "document.getElementById('dfp-bframe-cont').style.display='none'; return false;");
        buttonCloseBframeClick.setAttribute("style", "width: 20px; position: absolute; margin-left: 150px; top: -22px; z-index: 99999;");
        let buttonCloseBframeImg = document.createElement("img");
        buttonCloseBframeImg.setAttribute("src", "https://cdns.klimg.com/d.kapanlaginetwork.com/banner/preview/2019/08/20/close.png");
        buttonCloseBframeImg.setAttribute("style", "width: 20px; border: none;");
        buttonCloseBframeClick.appendChild(buttonCloseBframeImg);
        let checkBframeContainer = setInterval(function() {
            if (document.querySelector("#dfp-bframe-cont") !== null) {
                document.querySelector("#dfp-bframe-cont").style.textAlign = "center";
                document.querySelector("#dfp-bframe-cont").insertAdjacentElement("afterBegin", buttonCloseBframeClick);
                clearInterval(checkBframeContainer);
            }
        }, 500);
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
                    ], 'div-gpt-ad-kapanlagi-bottomfrm').addService(googletag.pubads());
                    setTimeout(() => {
                        if (pbjs) {
                            pbjs.setTargetingForGPTAsync(['div-gpt-ad-kapanlagi-bottomfrm']);
                            googletag.pubads().refresh([this.timedBottomFrm]);
                            this.refreshSlot = this.timedBottomFrm;
                            this.setGamBFInterval();
                            this.setGamBFCloseBtn();
                        }
                    }, 400);
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
                    // this.timedFloatingPin = googletag.defineSlot(this.dfpFloatingPin, [[1, 1], ['fluid']], 'div-gpt-ad-kapanlagi-floating-pin').addService(googletag.pubads());
                    this.timedFloatingPin = googletag.defineOutOfPageSlot(this.dfpFloatingPin, 'div-gpt-ad-kapanlagi-floating-pin').addService(googletag.pubads());
                    googletag.pubads().refresh([this.timedFloatingPin]);
                } else {
                    window.removeEventListener("scroll", this.scroll);
                }
            }
        };
        this.scrollHandler = this.scroll.bind(this);
        window.addEventListener("scroll", this.scrollHandler);
    },
    initiateSCReadPage: function() {
        var gaonviewInterval = null;
        gaonviewInterval = setInterval((e) => {
            var parentElement = document.querySelector(".deskrip-img"),
                pagingElement = parentElement ? parentElement.querySelectorAll(".page-item.gaonview, .page-item.onpageview") : 0;
            if (pagingElement) {
                pagingElement.forEach((element, index) => {
                    let SC = null;
                    if (index % 2 !== 0) {
                        let containerID = "gpt-ad-kapanlagi-sc-" + (index + 1);
                        let scPagingPlaceholder = element.querySelector("#div-gpt-ad-sc-paging-placeholder");
                        let containerSCArticle = document.createElement('div');

                        containerSCArticle.setAttribute("id", containerID);
                        containerSCArticle.setAttribute('class', 'article-ad');
                        /*Dok*/
                        scPagingPlaceholder && scPagingPlaceholder.insertAdjacentElement("beforeEnd", containerSCArticle);

                        if (SC = googletag.defineSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/SHOWCASE', [
                                [300, 600],
                                [300, 250],
                                [250, 250],
                                [200, 200]
                            ], containerID)) {
                            SC.addService(googletag.pubads()).setTargeting("pagetype", kly.pageType).setTargeting("position", (index + 1));
                            googletag.display(containerID);
                            setTimeout(() => {
                                if (pbjs) {
                                    pbjs.setTargetingForGPTAsync(['div-gpt-ad-kapanlagi-sc']);
                                }
                            }, 400);
                            googletag.pubads().refresh([SC]);
                        }
                    }
                })

                clearInterval(gaonviewInterval);
            }
        }, 100);
    },
    exposerInterscroller: function(event) {
        var _domId_ = event.slot.getSlotId().getDomId();

        var _domTarget_ = document.getElementById(_domId_)
        var _is300x250_ = JSON.stringify(event.size) == '[300,250]'
        if (_is300x250_ && _domId_.includes("exposer")) {
            var interscrollerStyle = document.createElement("style");
            interscrollerStyle.textContent = ".interscroller-wrapper{display: block !important;} .interscroller{position: sticky; top: 160px;}";
            document.head.appendChild(interscrollerStyle);

            _domTarget_.classList.add("interscroller")

            if (_domTarget_.parentElement.id.includes("placeholder")) {
                _domTarget_.parentElement.classList.add("interscroller-wrapper")
            }
        }
    },
    _SCFlyingCarpetStyle_: function() {
        var _style_ = document.createElement("style");
        _style_.textContent = `.advertisement-placeholder div[id*="kapanlagi-sc"].flying-carpet{ position: relative; clear: both; overflow: hidden; clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%) !important; min-height: 270px; width: 100%; display: flex; justify-content: center; } .advertisement-placeholder div[id*="kapanlagi-sc"].flying-carpet .ad-content { top: 50%; transform: translateY(-50%); position: fixed; z-index: 2; }`;
        document.querySelector("body").appendChild(_style_)
    },
    _SCFlyingCarpetEffect_: function(event) {
        var _domId_ = event.slot.getSlotId().getDomId();

        var _domTarget_ = document.getElementById(_domId_)
        var _is300x600_ = JSON.stringify(event.size) == '[300,600]'
        if (_is300x600_ && _domId_.includes("sc")) {
            _domTarget_.classList.add("flying-carpet")
            _domTarget_.querySelector("div").classList.add("ad-content")
        }
    },
    generateViewabilityTracker: function() {
        let isFotoGallery = kly && kly.gtm.type.match(/PhotoGallery/ig);
        let vTrackEl = null;
        if (isFotoGallery) {
            vTrackEl = document.createElement('img');
            vTrackEl.setAttribute('src', 'https://pubads.g.doubleclick.net/gampad/clk?id=5255364166&iu=/36504930');
            vTrackEl.setAttribute('width', '0');
            vTrackEl.setAttribute('height', '0');
            vTrackEl.setAttribute('id', 'gam-viewability-tracker-kl-berita-foto');
            vTrackEl.setAttribute('alt', '');
            parent.window.document.body.appendChild(vTrackEl);
        }

    },
    eventTrackingImpression: function(subCat, auPath) {
        window.dataLayer.push({
            event: "impression",
            feature_name: "ads",
            feature_location: subCat,
            /*==> diambil dari kly.gtm.subCategory, Example : showbiz|korea*/
            feature_position: auPath /* ==> diambil dari adunit path ( e.slot.getSlotId().getAdUnitPath(); ), Example: "/36504930/m.kapanlagi.com/dfp-bottomfrm"*/
        });
    },
    brandSafetyChecker: function() {
        _klyObject = typeof window.kly !== 'undefined' ? window.kly : window.kmklabs,
            _articlePages = _klyObject && _klyObject.article,
            _isAdultContent = _articlePages && _articlePages.isAdultContent;
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
        var siteContentObject = document.getElementsByClassName("detail__box");
        var siteContentText = "";

        if (siteContentObject.length) {
            siteContentText = siteContentObject[0].innerText;

            /*removing BACA JUGA box since it unrelated with main content*/
            /*change this acording to the site page layout*/
            var baca_juga_elements = siteContentObject[0].getElementsByClassName("detail__crosslink_link");
            for (var i in baca_juga_elements) {
                bacajuga = baca_juga_elements[i].innerText;
                siteContentText = siteContentText.replace(bacajuga, '');
            }
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
            googletag.pubads().setTargeting("brandsafety", isViolateBrandSafety);
        }
      
        googletag.pubads().setTargeting("isMatcont", (typeof _klyObject !== 'undefined' && typeof _klyObject.article !== 'undefined' && _klyObject.article.isAdultContent === true) ? "1" : isMatcont);
    },
    onMessageReceivedGPTUpdateCreativeStyle: function() {
        this.onMessageReceivedGetStyle = function(e) {
            /** filter only correct origin and setStyle or setHlStickyActive command */
            if (!(e.origin.match(/safeframe.googlesyndication.com/ig)) || typeof e.data !== 'object' || typeof e.data.id !== 'string' || typeof e.data.params !== 'object') {
                if (e.data.cmd !== 'setStyle' && e.data.cmd !== 'setHlStickyActive') {
                    return;
                }
            }

            /** execute actions based on the command type */
            if (e.data.cmd === 'setStyle' && typeof e.data.params === 'object') {
                /* remove # character from id, we don't use jquery */
                var elementId = e.data.id.replace(/#/, "");

                var wrapperEl = document.getElementById(elementId);
                if (wrapperEl === null) {
                    return;
                }

                var elements = [wrapperEl];
                /* target on KLY authorized element child (div and iframe) */
                if (typeof e.data.query === 'string' && e.data.query) {
                    let el = null;
                    if (el = e.data.query.match(/(div|iframe)/ig)) {
                        elements = wrapperEl.querySelectorAll(el.join(", "));
                    }
                }

                /** target on KLY authorized attribute (display, height, width) */
                elements.forEach(function(element) {
                    Object.keys(e.data.params).forEach(function(param) {
                        let allowedAttr = ['display', 'height', 'width'];
                        allowedAttr.indexOf(param) > -1 ? (element.style[param] = e.data.params[param]) : '';
                    });
                });
            } else if (e.data.cmd === 'setHlStickyActive') {
                /** set hlStickyActive parameter in GAMLibrary to true */
                if (typeof GAMLibrary !== 'undefined') {
                    GAMLibrary.hlStickyActive = true;
                    window.addEventListener("scroll", headlineStickyScrollEventV2);
                }
            }
        }
        ;

        /** add event listener to receive messages */
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
    /* ============ RENDER HEADLINE V2 ============ */
    hlStickyActive: false,
    renderHeadlineV2: function() {
        let hlv1 = document.getElementById("div-gpt-ad-kapanlagi-hl");
        let isTFShrinking = null;
        let catchTFShrinking = 0;
        if (hlv1) {
            isTFShrinking = setInterval(function() {
                if (window._TOPFRAME_STICKY_END_) {
                    this.injectHeadlineV2();
                    clearInterval(isTFShrinking);
                }
            }.bind(this), 300);
        }
    },
    injectHeadlineV2: function() {
        let headlineSlotContainer = document.querySelector("#div-gpt-ad-kapanlagi-hl");
        let urlParams = new URLSearchParams(window.location.search);
        let myParam = JSON.parse(urlParams.get('interval'));

        headlineStickyV2(myParam);
        if ((headlineSlotContainer.getClientRects() && ~~headlineSlotContainer.getClientRects()[0].top) <= (window.screen.height - 50)) {
            this.activateHeadlineV2();
            setTimeout(() => {
                headlineStickyScrollEventV2();
            }, 1000);

        }
        this.scrollHLV2 = function() {
            this.activateHeadlineV2() ? window.removeEventListener("scroll", this.scrollHandlerV2) : '';
        };
        this.scrollHandlerV2 = this.scrollHLV2.bind(this);
        window.addEventListener("scroll", this.scrollHandlerV2);
    },
    activateHeadlineV2: function() {
        if (!this.headline) {
            this.headline = googletag.defineSlot(GAMLibrary.dfpHeadline, [
                [320, 50],
                [320, 100]
            ], 'div-gpt-ad-kapanlagi-hl').addService(googletag.pubads());
            var countPbjsObj = 0;
            var intervalPbjs = setInterval(function() {
                if (typeof pbjs.setTargetingForGPTAsync === 'function') {
                    pbjs.setTargetingForGPTAsync(['div-gpt-ad-kapanlagi-hl']);
                    clearInterval(intervalPbjs);
                }
                if (countPbjsObj > 10) {
                    clearInterval(intervalPbjs);
                }
                countPbjsObj++;
            }, 300);
            googletag.pubads().refresh([this.headline]);
        }

        return this.headline;

    },
    /* ============ RENDER HEADLINE V2 ============ */
    /* ============ IN-IMAGE ============ */
    inImageAdsInject: function() {
        let inImageArticleItems = document.querySelectorAll(".infinite-paging-item .page-item");
        let inImageTargetWrapper, inImageTargetImageWrapper;

        for (let i = 0; i < inImageArticleItems.length; i++) {
            inImageTargetWrapper = inImageArticleItems[i];
            inImageTargetImageWrapper = inImageTargetWrapper?.querySelector("p.text-center");
            if (inImageTargetImageWrapper) {
                break;
            }
        }

        let inImageTargetTitle = inImageTargetWrapper?.querySelector(".pages-img-desc");
        let inImageTargetImage = inImageTargetWrapper?.querySelector(".image_pagging_on");
        let checks = [inImageTargetWrapper, inImageTargetImageWrapper, inImageTargetImage];
        
        if (checks.some(check => check == null))
            return;

        let inImageElement = document.createElement("div")
        let inImageStyle = document.createElement("style")
        inImageElement.setAttribute("id", "in-image-ads")
        inImageElement.innerHTML = `
            <div class="banner-wrapper-in-image">
                <div class="in-image-ads-close">
                    <img src="https://cdns.klimg.com/d.kapanlaginetwork.com/banner/preview/2019/08/20/close.png">
                </div>
                <div id='div-gpt-ad-kapanlagi-inimage' style='height:auto; width:320px;' data-info='ad'> </div>
            </div>
        `
        inImageStyle.textContent = `div#in-image-ads { position: absolute; width: inherit; height: auto; top: ${inImageTargetImageWrapper.offsetTop}px; background: transparent; transition: all .5s ease; overflow: hidden; aspect-ratio: ${inImageTargetImage.clientWidth} / ${inImageTargetImage.clientHeight}; z-index: 10; } div#in-image-ads.in-image { overflow: hidden; } div#in-image-ads::after { content: ""; width: 100%; height: auto; position: absolute; aspect-ratio: ${inImageTargetImage.clientWidth} / ${inImageTargetImage.clientHeight}; z-index: -1; bottom: 0; opacity: 0; background: linear-gradient(0deg, black, transparent); transition: all .5s ease 2.2s; } div#in-image-ads.active::after {opacity: 1;} div#in-image-ads.lr div#div-gpt-ad-kapanlagi-inimage { transform: scale(${(inImageTargetImage.clientHeight / 280 > 1) ? 1 : inImageTargetImage.clientHeight / 280}); transform-origin: bottom; width: 100% !important;} div#in-image-ads.active { animation: dimOverlay 2.5s ease forwards; } @keyframes dimOverlay { 0% { background: transparent; } 70% { background: #00000099; } 100% { background: transparent; } } .banner-wrapper-in-image { width: inherit; height: auto; position: absolute; bottom: -150%; transition: all 2s ease; display: flex; justify-content: center; } div#in-image-ads.active .banner-wrapper-in-image { bottom: 0px; } div#in-image-ads .banner-wrapper-in-image .in-image-ads-close img { width: 100%; } div#in-image-ads.active .banner-wrapper-in-image .in-image-ads-close { opacity: 1; } div#in-image-ads .banner-wrapper-in-image .in-image-ads-close { opacity: 0; position: absolute; left: 50%; top: -25px; width: 25px; height: 25px; transform: translateX(147.5px); } div#in-image-ads.lr .in-image-ads-close { display: none; }`;
        inImageTargetImageWrapper.insertAdjacentElement('afterend', inImageElement);
        inImageTargetImageWrapper.insertAdjacentElement('afterend', inImageStyle);

        this.inImageAdsActive();
    },
    inImageAdsActive: function() {
        this.inImageAds = googletag.defineSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/IN-IMAGE', [[320, 50], [320, 100], [1, 1]], 'div-gpt-ad-kapanlagi-inimage').addService(googletag.pubads());

        window.addEventListener('scroll', this.inImageAdsScrollevent)
    },
    inImageAdsScrollevent: function() {
        var inImageAds = document.querySelector("#in-image-ads");
        var inImageAdsClose = document.querySelector("#in-image-ads .in-image-ads-close");
        var isInViewport = GAMLibrary.inImageElementOnviewPort(inImageAds);

        if (isInViewport) {
            const imagePaggingOn = inImageAds.parentElement.querySelector('.image_pagging_on');
            const nativeVideoElement = document.querySelector('.native_video_1.no-print');

            let lazyLoadNum = 0;
            let applyStyle = false;
            let showInImage = false;

            const lazyLoadCheck = setInterval(() => {
                lazyLoadNum++;
                if (imagePaggingOn.src !== 'https://cdns.klimg.com/kapanlagi.com/v5/m/i/assets/img/blank.png' && !showInImage) {
                    if (!inImageAds.classList.contains('active')) {
                        setTimeout(() => {
                            inImageAds.classList.add('active');
                            googletag.pubads().refresh([GAMLibrary.inImageAds]);
                        }, 1000);
                    }
                    applyStyle = true;
                    showInImage = true;
                }

                if (nativeVideoElement == null || nativeVideoElement.clientHeight > 0) {
                    console.log(nativeVideoElement.clientHeight);
                    clearInterval(lazyLoadCheck);
                    applyStyle = true;
                }

                if (applyStyle) {
                    setTimeout(() => {
                        const aspectRatio = imagePaggingOn.clientWidth / imagePaggingOn.clientHeight;
                        inImageAds.style.top = document.querySelectorAll('.page-item.onviewpoint.onpageview')[0].querySelector('p.text-center').offsetTop + 'px';
                        inImageAds.style.aspectRatio = aspectRatio;
                        inImageAds.style.width = imagePaggingOn.clientWidth + 'px';
                    }, 500);
                }

                if (lazyLoadNum >= 1000) {
                    clearInterval(lazyLoadCheck);
                }
            }, 100);

            window.removeEventListener('scroll', GAMLibrary.inImageAdsScrollevent)
        }

        inImageAdsClose.addEventListener("click", function() {
            inImageAds.classList.remove("active")
        })
    },
    inImageElementOnviewPort: function(el) {
        let rect = el.getBoundingClientRect();
        return (rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight / 3 * 2 || document.documentElement.clientHeight / 3 * 2));
    },
    /* ============ IN-IMAGE ============ */
    /* ============ PICTUREFIRST ============ */
     pictureFirstAdsTweakPosition: function() {
        // const adElement = document.getElementById("div-gpt-ad-kapanlagi-picturefirst");
        const hcPictureFirstElement = document.querySelector("#div-gpt-ad-kapanlagi-picturefirst");
        hcPictureFirstElement && hcPictureFirstElement.remove();

        var pictureFirstElement = document.createElement("div")
        pictureFirstElement.setAttribute("id", "div-gpt-ad-kapanlagi-picturefirst")
        pictureFirstElement.setAttribute("data-info", "ad")

        var pictureFirstScriptElement = document.createElement("script")
        pictureFirstScriptElement.textContent = `googletag.cmd.push(function() { googletag.display('div-gpt-ad-kapanlagi-picturefirst'); });`
        pictureFirstElement.appendChild(pictureFirstScriptElement)

        let targetElement, ChannelTargetElement;

        if (kly.pageType === 'Homepage') {
            targetElement = document.querySelector(".new-KL-box-v2.most_popular");
        } else if (kly.pageType === 'ReadPage') {
            targetElement = document.querySelector(".detail__box.wrapper.relatedtag.relatedtag-collapsed");
        } else if (kly.pageType === 'ChannelPage') {
            ChannelTargetElement = document.querySelector("body > div:nth-child(10) > div.main-kl.main-tag.main-ip > div.paging, body > div:nth-child(10) > div > div.paging.clearfix, body > div.container > div > div > div > div.custom_body > div:nth-child(5) + div.box, body > div:nth-child(10) > div.main-kl > div > div.m-ls-artikel-hastag > div, body > div:nth-child(10) > div.main-kl.main-tag.main-ip > div > div.paging.clearfix");
        }

        if (pictureFirstElement && targetElement) {
            const parentElement = targetElement.parentNode;
            parentElement.insertBefore(pictureFirstElement, targetElement.nextSibling);
        }

        if (pictureFirstElement && ChannelTargetElement) {
            ChannelTargetElement.insertAdjacentElement("afterend", pictureFirstElement);
        }
    },
    /* ============ PICTUREFIRST ============ */
    /* ============ FEEDBOARD ============ */
    feedboardAdsInject: function() {
        const targetElement = document.getElementById('div-gpt-ad-kapanlagi-feedboard');
        if (targetElement) {
            if ('IntersectionObserver'in window) {
                const observer = new IntersectionObserver( (entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !this.feedboardAds) {
                            this.feedboardAds = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/FEEDBOARD', 'div-gpt-ad-kapanlagi-feedboard').addService(googletag.pubads());
                            googletag.pubads().refresh([this.feedboardAds]);
                            observer.unobserve(targetElement);
                        }
                    }
                    );
                }
                ,{
                    rootMargin: '200px 0px',
                    threshold: 0.1
                });
                observer.observe(targetElement);
            }
        }
    },
    /* ============ FEEDBOARD ============ */
  	HeavyAdsResolver: class {
        constructor() {
            this.checkCount = 0;
            this.checkInterval = null;
            this.player = null;
            this.volumeButton = null;
            this.playButton = null;
            this.init();
        }

        init() {
            this.checkInterval = setInterval(() => this.checkForVideo(), 100);
        }

        checkForVideo() {
            this.checkCount++;
            const videoWrapper = document.querySelector("div[id^='kly-masthead-video-ouststream-'], div[id^='kly-masthead-desktop-video-ouststream-']");
            const videoFrame =  videoWrapper && videoWrapper.querySelector("iframe");
            if (videoWrapper && videoFrame) {
                this.setupPlayer(videoWrapper);
                clearInterval(this.checkInterval);
            } else if (this.checkCount > 500) {
                clearInterval(this.checkInterval);
            }
        }

        setupPlayer(videoWrapper) {
            const container = videoWrapper.querySelector("#video-wrapper");
            const uniqId = videoWrapper.id;
            const currentVideo = container.querySelector("iframe");
            const videoType = container.dataset.videoType;
            const videoId = container.dataset.videoId;


            switch (videoType) {
                case "youtube":
                    currentVideo.remove();
                    const playerDiv = document.createElement("div");
                    playerDiv.id = "youtube-player";
                    container.appendChild(playerDiv);
                    if (!window.YT || !YT.Player) {
                        const tag = document.createElement("script");
                        tag.src = "https://www.youtube.com/iframe_api";
                        document.body.appendChild(tag);
                    }

                    window.onYouTubeIframeAPIReady = () => {
                        this.player = new YT.Player("youtube-player", {
                            width: "320",
                            height: "180",
                            videoId: videoId,
                            playerVars: {
                                autoplay: 1,
                                mute: 1,
                                controls: 0,
                                playsinline: 1,
                                enablejsapi: 1,
                            },
                            events: {
                                onReady: (event) => this.onPlayerReady(event),
                            },
                        });
                    };
                    break;
                case "vidiocom":
                    const cloneIframe = currentVideo.cloneNode(true);
                    Object.entries({
                        src: videoId,
                        scrolling: 'no',
                        frameborder: '0',
                        width: '320',
                        height: '180',
                        id: 'embed-' + uniqId,
                        class: 'embed-vidiocom',
                        name: 'embed-' + uniqId
                    }).forEach(([k, v]) => cloneIframe.setAttribute(k, v));
                    currentVideo.remove();
                    container.querySelector("#player-wrapper").remove();
                    this.player = cloneIframe;
                    container.appendChild(cloneIframe);
                    break;
            }

        }

        onPlayerReady(event) {
            this.volumeButton = parent.document.querySelector("div#player-wrapper div#btn-volume");
            this.playButton = parent.document.querySelector("div#player-wrapper div#btn-play");

            this.volumeButton.addEventListener("click", () => this.volumeAction());
            this.playButton.addEventListener("click", () => this.playAction());
        }

        volumeAction(state) {
            const currentState = typeof state === "string" ?
                state :
                this.volumeButton.classList.contains("mute") ? "mute" : "unmute";

            if (currentState === "mute") {
                this.player.unMute();
                this.volumeButton.setAttribute("class", "unmute");
            } else {
                this.player.mute();
                this.volumeButton.setAttribute("class", "mute");
            }
        }

        playAction(state) {
            const currentState = typeof state === "string" ?
                state :
                this.playButton.classList.contains("play") ? "play" : "pause";

            if (currentState === "pause") {
                this.player.pauseVideo();
                this.playButton.setAttribute("class", "play");
            } else {
                this.player.playVideo();
                this.playButton.setAttribute("class", "pause");
            }
        }
    }, 
}

document.addEventListener("DOMContentLoaded", function() {
    // if("Lirik" === kly.channel.name) {
    //         const hlSlot = document.querySelector('#div-gpt-ad-hl-placeholder');
    //         const scSlot = document.querySelector('#div-gpt-ad-sc-placeholder');
    //         const scNewSlotParent = document.querySelector('.searchmusic19');
    //         let scClone = scSlot.cloneNode(true);
    //         hlSlot && hlSlot.remove();
    //         scSlot && scSlot.remove();
    //         scNewSlotParent && scNewSlotParent.insertAdjacentElement("afterend",scClone);
    // }

    if( kly.pageType === "ReadPage" && "Lirik" !== kly.channel.name ){
            const scPlaceholder = document.querySelector("#div-gpt-ad-sc-paging-placeholder");
            const exposerPlaceholder = document.querySelector("#div-gpt-ad-exposer-placeholder");
            const scNewSlotParent = document.querySelector("div.box.box--popular");
            const cloneSC = scPlaceholder && scPlaceholder.cloneNode(true);
            const cloneExposer = exposerPlaceholder && exposerPlaceholder.cloneNode(true);
			const newCloneClass = "slots-replacement";
			cloneSC.classList.add(newCloneClass);
            /* REMOVE ORIGINAL SC */
            exposerPlaceholder && exposerPlaceholder.remove();
            scPlaceholder && scPlaceholder.insertAdjacentElement("beforebegin",cloneExposer) && scPlaceholder.remove();
            scNewSlotParent && scNewSlotParent.insertAdjacentElement("beforebegin", cloneSC);
            var haltSearch = 0;
            var googletagExists = setInterval(function(){
                    if(googletag.defineSlot){
                        const getAllSCPaging = document.querySelectorAll(`.${newCloneClass}`);
                        getAllSCPaging && getAllSCPaging.forEach((v,k)=>{
                            if(!v.querySelector("iframe")){
                                let containerSCArticle = document.createElement('div');
                                let containerID = 'div-gpt-ad-sc-paging-'+k
                                containerSCArticle.setAttribute("id", containerID);
                                containerSCArticle.setAttribute('class', 'article-ad');
                    
                                v.insertAdjacentElement("beforeEnd", containerSCArticle);
                    
                                if (SC = googletag.defineSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/SHOWCASE', [[300, 600],[300, 250],[250, 250],[200, 200]], containerID)) {
                                    SC.addService(googletag.pubads()).setTargeting("pagetype", kly.pageType).setTargeting("position", (k + 1));
                                    googletag.display(containerID);
                                    googletag.pubads().refresh([SC]);
                                }
                            }
                        })
                        clearInterval(googletagExists);
                    }
                
                if(haltSearch > 200) clearInterval(googletagExists);
                
                    haltSearch++;
                },50);
    }

    GAMLibrary._SCFlyingCarpetStyle_();
    GAMLibrary.pictureFirstAdsTweakPosition();
    GAMLibrary.feedboardAdsInject();
});

/* DMP CATEGORY LIST */
window.createDMPTracker = function(adsCatList, dfpTracker, macro) {
    parent.window.open(dfpTracker, '_blank');
};
/* DMP CATEGORY LIST */

var isReadPage = kly.pageType === "ReadPage",
    isLirik = "Lirik" === kly.channel.name;

googletag.cmd.push(function() {
    var urlPath = document.URL;

    /* SECURE SIGNAL UID2 */
	window.googletag.secureSignalProviders = window.googletag.secureSignalProviders || [];
  	window.googletag.secureSignalProviders.clearAllCache();
  	// TURN OFF LIRIK ADS
	//if("Lirik" === kly.channel.name) return;
  
    /*SET NEW BRAND SAFETY LOGIC*/
    GAMLibrary.brandSafetyChecker();

    if( !isLirik ){

        if (GAMLibrary.topFrameFixedSize) {
            window.GAMLibrary.topframe = googletag.defineSlot(GAMLibrary.dfpTopframe, [[1, 1], [336, 280], [300, 250], [320, 480]], 'div-gpt-ad-kapanlagi-topfrm-oop').addService(googletag.pubads());
        } else {
            window.GAMLibrary.topframe = googletag.defineOutOfPageSlot(GAMLibrary.dfpTopframe, 'div-gpt-ad-kapanlagi-topfrm-oop').addService(googletag.pubads());
        }
            
        /*OUT OF PAGE SLOTS*/
        window.GAMLibrary.newsTag1 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/NEWS_TAG_1', 'div-gpt-ad-kapanlagi-dfp-newsTag1-oop').addService(googletag.pubads());
        window.GAMLibrary.newsTag2 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/NEWS_TAG_2', 'div-gpt-ad-kapanlagi-dfp-newsTag2-oop').addService(googletag.pubads());
        window.GAMLibrary.crmHeadline = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/HEADLINE_CRM', 'div-gpt-ad-kapanlagi-crm-headline-oop').addService(googletag.pubads());
        window.GAMLibrary.crmOrganic1 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/ORGANIC_FEED_CRM_1', 'div-gpt-ad-kapanlagi-crm1-oop').addService(googletag.pubads());
        window.GAMLibrary.crmOrganic2 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/ORGANIC_FEED_CRM_2', 'div-gpt-ad-kapanlagi-crm2-oop').addService(googletag.pubads());
        window.GAMLibrary.crmOrganic3 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/ORGANIC_FEED_CRM_3', 'div-gpt-ad-kapanlagi-crm3-oop').addService(googletag.pubads());
        window.GAMLibrary.pictureFirst = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/CONTENT_CAROUSEL', 'div-gpt-ad-kapanlagi-picturefirst').addService(googletag.pubads());
        window.GAMLibrary.widget = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/WIDGET', 'div-gpt-ad-kapanlagi-widget').addService(googletag.pubads());

        document.querySelector('#div-gpt-ad-kapanlagi-mgid-inarticle')  && ( window.GAMLibrary.slideup = googletag.defineSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/SLIDE_UP', [1, 1], 'div-gpt-ad-kapanlagi-mgid-inarticle').addService(googletag.pubads()) );

        if (isReadPage) {
            window.GAMLibrary.inreadnative = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/IN-READ_NATIVE', 'div-gpt-ad-kapanlagi-in-read-native').addService(googletag.pubads());
            window.GAMLibrary.insertion = googletag.defineSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/INSERTION', [1, 1], 'div-gpt-ad-kapanlagi-mgid-underarticle').addService(googletag.pubads());
            /** Dok. 1st Sc Paging  */
            window.GAMLibrary.showcasePaging = googletag.defineSlot(GAMLibrary.scSlot, [
                [300, 600],
                [300, 250],
                [250, 250],
                [200, 200]
            ], 'div-gpt-ad-sc-paging-placeholder').addService(googletag.pubads());

            // window.GAMLibrary.insertion = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/INSERTION', 'div-gpt-ad-kapanlagi-insertion-oop').addService(googletag.pubads());
        } else if (kly.pageType === "Homepage") {
            window.GAMLibrary.advHeadline1 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/ADVERTORIAL_HEADLINE_1', 'div-gpt-ad-kapanlagi-advertorial-headline1').addService(googletag.pubads());
            window.GAMLibrary.advHeadline2 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/KAPANLAGI.COM/ADVERTORIAL_HEADLINE_2', 'div-gpt-ad-kapanlagi-advertorial-headline2').addService(googletag.pubads());
        }

        /* INTERSTITIAL ADS */
        if (!_IS_IOS_) {
            window.GAMLibrary.interstitial = googletag.defineOutOfPageSlot(GAMLibrary.dfpInterstitial, googletag.enums.OutOfPageFormat.INTERSTITIAL);
            window.GAMLibrary.interstitial ? window.GAMLibrary.interstitial.addService(googletag.pubads()) : '';    
        }
        /* INTERSTITIAL ADS */

        /*DEFINE ALL SLOT*/
        window.GAMLibrary.exposer1 = googletag.defineSlot(GAMLibrary.dfpExposer1, [[1, 1],[300, 250],[300, 600],[320, 480],[160, 600],[250, 250]], 'div-gpt-ad-kapanlagi-dfp-exposer-slot1-oop').addService(googletag.pubads());

        // topframe shirnking tweak
        var _adsvisible_ = {
                "topframe": false
            }
            // topframe shirnking tweak
        GAMLibrary.renderHeadlineV2();
        GAMLibrary.inImageAdsInject();
    }
    
    /*Bottom Frame Scrolling*/
    GAMLibrary.scrollBottomFrame();
    
    window.GAMLibrary.showcase = googletag.defineSlot(GAMLibrary.scSlot, [[300, 600],[300, 250],[250, 250],[200, 200]], 'div-gpt-ad-kapanlagi-sc').addService(googletag.pubads());
    
    googletag.pubads().addEventListener('slotVisibilityChanged', function(event) {
        var slot = event.slot,
            vrslotName = slot.getSlotElementId();

        // topframe shirnking tweak
        if(event.inViewPercentage >= 70){
            if (window.GAMLibrary.interstitial === slot) {
               var ins = document.querySelectorAll("ins");
               Array.prototype.find.call(ins,isInt=>{
                  if(isInt.id.match(/interstitial/ig) !== null){
                     const iframe = isInt.querySelector("iframe[id^='google_ads_iframe_']");
                     if(!iframe.src.match(/safeframe/ig)){
                        iframe.contentWindow.postMessage("activateTracker", "*");
                     }
                  }    
               })      
            }
            if (vrslotName.includes("topfrm")) {
                  if (_TOPFRAME_STICKY_TIME_ > 2 && !_adsvisible_.topframe && document.querySelector(".topframe-sticky-counter")) {
                     _TOPFRAME_STICKY_TIME_ = 4
                     _adsvisible_.topframe = true
                  }
            }
         }
    })

    googletag.pubads().addEventListener('slotResponseReceived', function(event) {
        var dfp_slotDelivered = event.slot.getResponseInformation() ? 'block' : 'none'; /* check wheter there is ads or not*/
        var dfp_slotAdUnitPath = event.slot.getSlotId().getAdUnitPath(); /* get adunit path */

        /*check if native ads creative was delivered*/
        if (dfp_slotDelivered == 'block') {

            /* tracking impression */
            GAMLibrary.eventTrackingImpression(kly.gtm.subCategory, dfp_slotAdUnitPath);
        } else {
            var dfp_slotElementId = event.slot.getSlotId().getDomId();
            if (dfp_slotElementId.match(/newsTag|recommend/)) {
                if (document.getElementById(dfp_slotElementId) && document.getElementById(dfp_slotElementId).getElementsByTagName('iframe')[0] && document.getElementById(dfp_slotElementId).getElementsByTagName('iframe')[0].getAttribute('height') == 1) {
                    document.getElementById(dfp_slotElementId).getElementsByTagName('iframe')[0].style.display = "none";
                }

            }

            if (dfp_slotElementId.match(/crm\d/)) {
                (crmEl = document.querySelector("#" + dfp_slotElementId)) ? (crmEl.parentElement.style.display = "none") : '';
            }
        }
    });
    
    /* START - SET CONTAINER ID ON SAFEFRAME SRC */
    googletag.pubads().addEventListener('slotRenderEnded', function(event) {
        !isLirik && GAMLibrary.exposerInterscroller(event);
        !isLirik && GAMLibrary._SCFlyingCarpetEffect_(event);

        var containerId = event.slot.getSlotElementId();
        var containerEl = document.getElementById(containerId);
        if(containerId.includes("bottomfrm") && !event.isEmpty){
            let bfContainer = document.querySelector(".dfp-bframe-cont");
            bfContainer && (bfContainer.style.display = 'block');
        }

        if (containerId.includes("topfrm")) {
            if ([[336,280], [300,250], [320,480]].some(size => JSON.stringify(event.size) === JSON.stringify(size))) {
                var parallaxEl = document.getElementById("div-gpt-ad-topfrm-parallax-wrapper");
                var topfrmEl = document.getElementById("div-gpt-ad-kapanlagi-topfrm-oop");
                if (parallaxEl && topfrmEl) {
                    parallaxEl.style.display = "flex";
                    parallaxEl.style.alignItems = "center";
                    topfrmEl.style.position = "absolute";
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

        if (!GAMLibrary.generatedScrollAdunit) {
            GAMLibrary.scrollFloatingPin();
            GAMLibrary.generatedScrollAdunit = 1;
        }
        // END TOPFRAME SHRINKING V8
      
        // AUTO CLOSE IN IMAGE 336 X 280
        if (containerId == "div-gpt-ad-kapanlagi-inimage" && JSON.stringify(event.size) == '[336,280]') {
            document.querySelector("#in-image-ads").classList.add("lr")

            setTimeout(function() {
                document.querySelector("#in-image-ads").classList.remove("active")
            }, 10000)
        }
        // AUTO CLOSE IN IMAGE 336 X 280

        if (containerEl === null) return;

        // var iframeEl = containerEl.querySelectorAll('iframe')[0];

        // /* it's delayed by 10 milliseconds, because iframe is not yet fully rendered
        // and limited to max to 10 seconds to wait*/
        // var timeoutFunction = function() {
        //     var src = "#" + containerId;
        //     /* `src` attribute is null, when iframe is FriendlyIframe, and
        //      when it's present, then it's SafeFrame */
        //     if (iframeEl) {
        //         if ((iframeEl.getAttribute('src') !== null)) {
        //             src = iframeEl.getAttribute('src').replace(/#.*/, "") + src;
        //         } else {
        //             var name = iframeEl.getAttribute('name') + "#" + containerId;
        //             iframeEl.setAttribute('name', name);
        //         }
        //         iframeEl.setAttribute('src', src);
        //     }
        // };
        // setTimeout(timeoutFunction, 10);
    });
    /* END - SET CONTAINER ID ON SAFEFRAME SRC */

    GAMLibrary.generateViewabilityTracker();

    /*  START TARGETING BLOCK   */
    googletag.pubads().setTargeting("tags", GAMLibrary.tags);
    googletag.pubads().setTargeting("articleTitle", kly.gtm.articleTitle);
    googletag.pubads().setTargeting("articlePath", window.location.pathname);
    googletag.pubads().setTargeting("platform", kly.platform);
    googletag.pubads().setTargeting("type", kly.gtm.type);
    googletag.pubads().setTargeting("pageType", kly.pageType);
    googletag.pubads().setTargeting("channel", kly.gtm.subCategory);
    googletag.pubads().setTargeting("audience", typeof(audience = kly.gtm.audience && kly.gtm.audience.split("|")) === "undefined" ? "false" : audience);
    googletag.pubads().setTargeting("isAdvertorial", typeof(isAdvertorial = kly.article && kly.article.isAdvertorial.toString()) === "undefined" ? "false" : isAdvertorial);
    googletag.pubads().setTargeting("isMultipage", typeof(isMultipage = kly.article && kly.article.isMultipage.toString()) === "undefined" ? "false" : isMultipage);
    googletag.pubads().setTargeting("articleId", kly.gtm.articleId.toString());
    googletag.pubads().setTargeting("pagingNum", typeof(pageParam = kly.gtm.pageParam && kly.gtm.pageParam.toString()) === "undefined" ? "false" : pageParam);
    googletag.pubads().setTargeting("newExp", typeof(newExp = kly.gtm.new_exp) === "undefined" ? "false" : kly.gtm.new_exp.toString());
    googletag.pubads().setTargeting("site", kly.site);
    googletag.pubads().setTargeting("age", typeof(age = kly.gtm.age) === "undefined" ? "false" : kly.gtm.age.toString());
    googletag.pubads().setTargeting("gender", typeof(gender = kly.gtm.gender) === "undefined" ? "false" : kly.gtm.gender.toString());
    googletag.pubads().setTargeting("subcategory", kly.gtm.subCategory);
    /*  END TARGETING BLOCK   */
    googletag.pubads().setCentering(true);
    googletag.pubads().enableSingleRequest();
    googletag.pubads().disableInitialLoad();
    googletag.enableServices();
    /* REFRESH ON DEMAND */
    if (!_IS_IOS_) {
        googletag.pubads().refresh([window.GAMLibrary.interstitial]);
    }
   if( !isLirik ){
        googletag.pubads().refresh([window.GAMLibrary.topframe, window.GAMLibrary.newsTag1, window.GAMLibrary.newsTag2, window.GAMLibrary.crmHeadline, window.GAMLibrary.crmOrganic1, window.GAMLibrary.crmOrganic2, window.GAMLibrary.crmOrganic3, window.GAMLibrary.pictureFirst, window.GAMLibrary.slideup, window.GAMLibrary.widget]); 
        if (isReadPage) {
            /** Dok. ADD SC PAGING */
            googletag.pubads().refresh([window.GAMLibrary.showcasePaging, window.GAMLibrary.inreadnative, window.GAMLibrary.insertion]);
        } else if (kly.pageType === "Homepage") {
            googletag.pubads().refresh([window.GAMLibrary.advHeadline1, window.GAMLibrary.advHeadline2]);
        }
        
        /*INITIATE ADS ON CONTINOUS PAGE */
        GAMLibrary.initiateSCReadPage();
    }else{ 
        // Lirik Page
       !pbjs.libLoaded && googletag.pubads().refresh([window.GAMLibrary.showcase]);
    }
});

/* INITIATE PREBID */
var prebidObject = new PrebidInstantiate(1000, 3000, 1000, adUnitsDisplay, adUnitsVideo, priceGranularityConfig);

// added before content loaded
requestAnimationFrame(() => {
      const gptMKapanlagiStyle = document.createElement('style');
      const list = [];
      gptMKapanlagiStyle.textContent = '.dfp-bframe-cont{display: none;}.div-gpt-ad-kapanlagi-sc-continous{margin-bottom:30px}div#div-gpt-ad-hl-placeholder{margin-left:0px!important;min-height:135px!important;width:unset!important}';
      document.head.appendChild(gptMKapanlagiStyle);
});

/** GET MESSAGE FROM SAFEFRAME CONTAINER */
GAMLibrary.onMessageReceivedGPTUpdateCreativeStyle();
/** GET MESSAGE FROM SAFEFRAME CONTAINER */

var HeavyAdsResolver = new GAMLibrary.HeavyAdsResolver();

/* ============ HEADLINE STICKY - DEFAULT 7s ============ */
var headlineStickyInterval = 7,
    headlineStickyStatus = !1,
    headlineStickyPaused = !1,
    headlineStickyCounterStatus = !1;
/*------------------ VERSI 2 ----------------------*/
function headlineStickyV2(a) {
    null != a && (headlineStickyInterval = a);
    var b = document.getElementById("div-gpt-ad-kapanlagi-hl"),
        c = document.createElement("div"),
        d = document.querySelector("div.advertisement-banner");
    if (/iPhone|iPod/i.test(navigator.userAgent)) {
        // b.firstElementChild && b.firstElementChild.style.setProperty("width", "unset", "important");
        d & d.style.setProperty("margin", "unset", "important");
        d & d.style.setProperty("width", "unset", "important");
    }
    !document.getElementById("div-gpt-ad-kapanlagi-hl-shadow") ? (c.setAttribute("id", "div-gpt-ad-kapanlagi-hl-shadow"), b.parentElement.insertBefore(c, b)) : '', injectStickyStyleAndAnimationV2(), window.addEventListener("scroll", headlineStickyScrollEventV2)
}

function headlineStickyScrollEventV2() {
    if (!GAMLibrary.hlStickyActive) {
        window.removeEventListener("scroll", headlineStickyScrollEventV2);
        return;
    }
  
    var a = document.getElementById("div-gpt-ad-kapanlagi-hl").firstElementChild,
        b = document.getElementById("div-gpt-ad-kapanlagi-hl-shadow").getBoundingClientRect().top;
    document.documentElement.scrollTop || document.body.scrollTop;
    headlineStickyStatus ? 0 >= b ? (a.classList.add("hl-navbar-hanging"), headlineStickyPaused = !1) : (a.classList.remove("hl-active-sticky"), a.classList.remove("hl-navbar-hanging"), headlineStickyPaused = !0, headlineStickyStatus = !1) : 0 >= b && (a.classList.add("hl-active-sticky"), !headlineStickyCounterStatus && (headlineStickyCounterStatus = !0, removeStickyHeadlineV2(a, !1)), headlineStickyStatus = !0)
}

function removeStickyHeadlineV2(a, b) {
    var d = document.querySelector("div.advertisement-banner");
    var c = setInterval(function() {
        headlineStickyPaused || (0 >= headlineStickyInterval ? (a.classList.remove("hl-active-sticky"), a.classList.remove("hl-navbar-hanging"), a.style.margin = "10px 0", clearInterval(c), window.removeEventListener("scroll", headlineStickyScrollEventV2),d & d.style.setProperty("margin", "auto")) : headlineStickyInterval--)
    }, 1e3);
    !headlineStickyPaused && b && (clearInterval(c), a.classList.remove("hl-active-sticky"), a.classList.remove("hl-navbar-hanging"))
}

function injectStickyStyleAndAnimationV2() {
    var a = document.createElement("style");
    a.textContent = "\n\t\t.hl-active-sticky {\n\t\t\tposition: fixed;\n\t\t\ttop: -100%;\n\t\t\tz-index: 9999;\n\t\t\tleft: 50%;\n\t\t\ttransform: translateX(-50%);\n\t\t\tmargin: 0;\n\t\t\ttransition : margin-top .5s ease;\n\t\t\tanimation: hlSlideDown .5s forwards;\n\t\t}\n\n\t\t.hl-navbar-hanging{\n\t\t\tmargin-top : 5px !important;\n\t\t}\n\n\t\t@keyframes hlSlideDown{\n\t\t\t0%{top : -100px;}\n\t\t\t100%{top : 0px;}\n\t\t}\n\t\t.headline_ad__box {display: flex;justify-content: center;align-items: center;}", document.head.appendChild(a)
}
/*------------------ VERSI 2 ----------------------*/
function headlineSticky(a) {
    null != a && (headlineStickyInterval = a);
    var b = document.getElementById("div-gpt-ad-kapanlagi-hl"),
        c = document.createElement("div");
    c.setAttribute("id", "div-gpt-ad-kapanlagi-hl-shadow"), b.parentElement.insertBefore(c, b), injectStickyStyleAndAnimation(), window.addEventListener("scroll", headlineStickyScrollEevent)
}

function headlineStickyScrollEevent() {
    var a = document.getElementById("div-gpt-ad-kapanlagi-hl").firstElementChild,
        b = document.getElementById("div-gpt-ad-kapanlagi-hl-shadow").getBoundingClientRect().top;
    document.documentElement.scrollTop || document.body.scrollTop;
    headlineStickyStatus ? 0 >= b ? (a.classList.add("hl-navbar-hanging"), headlineStickyPaused = !1) : (a.classList.remove("hl-active-sticky"), a.classList.remove("hl-navbar-hanging"), a.style.margin = "10px 0", headlineStickyPaused = !0, headlineStickyStatus = !1) : 0 >= b && (a.classList.add("hl-active-sticky"), !headlineStickyCounterStatus && (headlineStickyCounterStatus = !0, removeStickyHeadline(a, !1)), headlineStickyStatus = !0)
}

function removeStickyHeadline(a, b) { var c = setInterval(function() { headlineStickyPaused || (0 >= headlineStickyInterval ? (a.classList.remove("hl-active-sticky"), a.classList.remove("hl-navbar-hanging"), a.style.margin = "10px 0", clearInterval(c), window.removeEventListener("scroll", headlineStickyScrollEevent)) : headlineStickyInterval--) }, 1e3);!headlineStickyPaused && b && (clearInterval(c), a.classList.remove("hl-active-sticky"), a.classList.remove("hl-navbar-hanging")) }

function injectStickyStyleAndAnimation() {
    var a = document.createElement("style");
    a.textContent = "\n\t\t.hl-active-sticky {\n\t\t\tposition: fixed;\n\t\t\ttop: -100%;\n\t\t\tz-index: 9999;\n\t\t\tleft: 50%;\n\t\t\ttransform: translateX(-50%);\n\t\t\tmargin: 0;\n\t\t\ttransition : margin-top .5s ease;\n\t\t\tanimation: hlSlideDown .5s forwards;\n\t\t}\n\n\t\t.hl-navbar-hanging{\n\t\t\tmargin-top : 5px !important;\n\t\t}\n\n\t\t@keyframes hlSlideDown{\n\t\t\t0%{top : -100px;}\n\t\t\t100%{top : 0px;}\n\t\t}\n\t\t.headline_ad__box {display: flex;justify-content: center;align-items: center;}", document.head.appendChild(a)
}
/* ============ HEADLINE STICKY - DEFAULT 7s ============ */

var _HEADER_ = null;
var _FOOTER_ = null;
var _CHILDS_ = [];
var _IS_READPAGE_ = kly.pageType.toLowerCase() == 'readpage' && kly.gtm.subCategory !== "video-terbaru";

!isLirik && document.addEventListener("DOMContentLoaded", _INIT_STICKY_TOPFRAME_);

function _INIT_STICKY_TOPFRAME_() {
    //edit start 
    _PARENT_BODY_ = document.querySelector("body");
    _GET_PARENT_BODY_TARGET_();
    _TOPFRAME_PARENT_WRAPPER_ = document.querySelector("#div-gpt-ad-topfrm-parallax-wrapper");
    _TOPFRAME_WRAPPER_ = document.querySelector("#div-gpt-ad-topfrm-parallax-wrapper");
    //edit end
    _PARENT_BODY_TARGET_.style = '';
    document.addEventListener("scroll", _TOPFRAME_STICKY_SCROLL_);
    document.addEventListener("scroll", _UPDATE_SCROLL_);
    _TOPFRAME_STICKY_STYLE_();
    _TOPFRAME_STICKY_IS_READY_ = true;

}

window.addEventListener("orientationchange", _ORIENTATION_CHANGE_);

function _GET_PARENT_BODY_TARGET_() {
    if (_IS_READPAGE_) {
        _PARENT_BODY_TARGET_ = document.querySelector("MAIN");
        _HEADER_ = document.querySelector("HEADER");
        _FOOTER_ = document.querySelector("FOOTER");
    } else {
        document.querySelectorAll(".container").forEach(el => {
            if (el.classList.length == 1) {
                _PARENT_BODY_TARGET_ = el;
            } else {
                _CHILDS_.push(el);
            }
        })
    }
}

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
            document.querySelector('body').style.height = (document.querySelector("body").clientHeight * 20) + "px";
            _TOPFRAME_STICKY_TWEAK_();
            _TOPFRAME_STICKY_ = false;
            _TOPFRAME_PARENT_WRAPPER_.classList.add("sticky");
            _TOPFRAME_WRAPPER_.classList.add("sticky");
            _TOPFRAME_STICKY_COUNTDOWN_();
            document.removeEventListener("scroll", _TOPFRAME_STICKY_SCROLL_);
            _PARENT_BODY_TARGET_.classList.add("topframe_is_sticky");
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
    }, 200);
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
            }, 700);
            clearInterval(countdown);
            _target_.remove();
        }
        _TOPFRAME_STICKY_TIME_--;
    }, 1000);
}

function _UPDATE_SCROLL_() {
    if (!_TOPFRAME_STICKY_END_) {
        var scrollTop = document.documentElement.scrollTop;
        _TOPFRAME_STICKY_LAST_SCROLL_END_ = _TOPFRAME_STICKY_LAST_SCROLL_ + (scrollTop / (_TOPFRAME_STICKY_SCROLL_SPEED_ / 4));
        document.querySelector('.topframe_is_sticky') && (document.querySelector('.topframe_is_sticky').style.transform = 'translateY(' + -(_TOPFRAME_STICKY_LAST_SCROLL_END_) + 'px)');
    }
}

function _TOPFRAME_STICKY_STYLE_() {
    var _P_ = document.createElement("p");
    _P_.classList.add("topframe-sticky-counter");
    _P_.textContent = "Penawaran sponsor berakhir setelah (7)";
    _TOPFRAME_PARENT_WRAPPER_.appendChild(_P_);

    // edit start
    _TOPFRAME_STICKY_CUSTOM_STYLE_.textContent = 'body{scroll-behavior: smooth;width : 100vw} .topframe_is_sticky::before {content: "";position: relative;height: 110.41666666666667vw !important;display: block;} .topframe_is_sticky{position:fixed ; top : 0px; left:0px;transition: all 1s ease; width: 100vw;} .layout__ads{ transition: all 1s ease; } .topframe-sticky-counter {display : none;} .layout__ads.sticky { position: fixed; z-index: 99; height: calc(100vw *(267 / 414) + 25px ); } #div-gpt-ad-topfrm-parallax-wrapper.sticky::after , #div-gpt-ad-topfrm-parallax-wrapper.sticky::before { position: absolute; height: 25px; width: 100vw; left: 0; } #div-gpt-ad-topfrm-parallax-wrapper.sticky::after { content: ""; top: calc(100vw *(267 / 414) ); background: #0072FF; z-index: 100; animation: progress-bar 7s forwards linear; } #div-gpt-ad-topfrm-parallax-wrapper.sticky::before { content: ""; top: calc(100vw *(267 / 414) ); background: #212121; z-index: 99; } .sticky .topframe-sticky-counter { display : block; top: calc((100vw *(267 / 414) ) + 8px); color : #fff; line-height : 14px; z-index: 101; -webkit-animation: webkit-progress-count 7s forwards linear; animation: progress-count 7s forwards linear; width: 100%; margin: 0px; position: absolute; text-align: center; font-family: sans-serif; } div#div-gpt-ad-topfrm-parallax-wrapper, div#div-gpt-ad-topfrm-parallax-wrapper.sticky #div-gpt-ad-kapanlagi-topfrm-oop iframe { transition: all .3s ease; } div#div-gpt-ad-topfrm-parallax-wrapper.sticky { height: calc(100vw *(267 / 414)) !important; position: fixed !important; top: 0px; z-index : 9; } div#div-gpt-ad-topfrm-parallax-wrapper.sticky #div-gpt-ad-kapanlagi-topfrm-oop iframe { transform: scale(.55); top: calc((-110.41666666666667vw * .42) / 2) !important; } @keyframes progress-bar{ from {width: 0px;} to{width: 100vw;} }';
    // edit end
    _PARENT_BODY_TARGET_.appendChild(_TOPFRAME_STICKY_CUSTOM_STYLE_);

}

function _TOPFRAME_STICKY_TWEAK_() {
    // edit start
    var _CONTAINER_TARGET_ = document.querySelectorAll(".container");
    if (_IS_READPAGE_) {
        var _FIRST_CHILD_ELEMENT_ = _PARENT_BODY_TARGET_.firstElementChild;
        _PARENT_BODY_TARGET_.insertBefore(_HEADER_, _FIRST_CHILD_ELEMENT_);
        _PARENT_BODY_TARGET_.appendChild(_FOOTER_);
    } else {
        var _FIRST_CHILD_ELEMENT_ = _PARENT_BODY_TARGET_.firstElementChild;
        _PARENT_BODY_TARGET_.insertBefore(document.querySelector(".navbar"), _FIRST_CHILD_ELEMENT_);
        if (_CHILDS_.length > 0) {
            _PARENT_BODY_TARGET_.insertBefore((!_CHILDS_[1] ? _CHILDS_[0] : _CHILDS_[1]), _FIRST_CHILD_ELEMENT_);
        }
    }
    // edit end
}

// SHRINKING V8
function _SET_STICKY_v2_SCROLL_() {

    if( _TOPFRAME_STICKY_TYPE_ != "v8"){
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
    if(document.querySelector(".topframe-sticky-counter")){
        document.querySelector(".topframe-sticky-counter").remove()
    }
    document.querySelector(_TOPFRAME_STICKY_ADUNIT_TARGET_).classList.add("puller")
    document.querySelector(_TOPFRAME_STICKY_ADUNIT_TARGET_).style = "position : fixed !important; top : -60px !important;"

    if(_TOPFRAME_STICKY_END_){
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

function _UNSET_STICKY_V2_(){
    document.querySelector(_TOPFRAME_STICKY_ADUNIT_TARGET_).classList.remove("puller")
    document.querySelector(_TOPFRAME_STICKY_ADUNIT_TARGET_).style.setProperty("position", "relative", "important");
    document.querySelector(_TOPFRAME_STICKY_ADUNIT_TARGET_).style.setProperty("top", "");
    document.querySelector(_TOPFRAME_STICKY_ADUNIT_TARGET_).style.opacity = 1;
    
    window.removeEventListener("scroll", _SET_STICKY_v2_SCROLL_)
}

function _SET_STICKY_V2_STYLE_() {
    _TOPFRAME_STICKY_CUSTOM_STYLE_.textContent  = `div${_TOPFRAME_STICKY_ADUNIT_TARGET_}.puller { position: fixed !important; z-index: 999; transform: scale(.55) translateX(38%); border-radius: 20px; overflow: hidden; } div${_TOPFRAME_STICKY_ADUNIT_TARGET_}.puller::after { content: ""; position: absolute; height: 5px; width: 100%; background: yellow; left: 0; animation: tf-puller-loading 7s forwards; } @keyframes tf-puller-loading { 0% { width: 0px } 100% { width: 100% } }`
    document.querySelector(_TOPFRAME_STICKY_ADUNIT_TARGET_).appendChild(_TOPFRAME_STICKY_CUSTOM_STYLE_)
}
