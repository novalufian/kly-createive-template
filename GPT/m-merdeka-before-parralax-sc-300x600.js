/*PROTOTYPE CUSTOM FILTERING*/
String.prototype.klyFiltering = function(delimiter) {
    return this.trim().split(delimiter).map(function(t) {
        return t.trim().toLowerCase()
    }).filter(x => x != "");
};

/** START - PREBID FUNCTION LIST */
function spotxOutstreamFunc(bid) {
    function mobileAndTabletcheck() {
        var check = false;
        (function(a) {
            if (
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                    a
                ) ||
                /1207|6310|6590|3gso|4thp|50[1 6]i|770s|802s|a wa|abac|ac(er|oo|s\ )|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\ m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\ (n|u)|c55\/|capi|ccwa|cdm\ |cell|chtm|cldc|cmd\ |co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\ s|devi|dica|dmob|do(c|p)o|ds(12|\ d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4 7]0|os|wa|ze)|fetc|fly(\ |_)|g1 u|g560|gene|gf\ 5|g\ mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\ (m|p|t)|hei\ |hi(pt|ta)|hp( i|ip)|hs\ c|ht(c(\ | |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\ (20|go|ma)|i230|iac( |\ |\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\ |kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\ [a w])|libw|lynx|m1\ w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\ cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\ | |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0 2]|n20[2 3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\ |on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\ ([1 8]|c))|phil|pire|pl(ay|uc)|pn\ 2|po(ck|rt|se)|prox|psio|pt\ g|qa\ a|qc(07|12|21|32|60|\ [2 7]|i\ )|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\ |oo|p\ )|sdk\/|se(c(\ |0|1)|47|mc|nd|ri)|sgh\ |shar|sie(\ |m)|sk\ 0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\ |v\ |v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\ |tdg\ |tel(i|m)|tim\ |t\ mo|to(pl|sh)|ts(70|m\ |m3|m5)|tx\ 9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0 3]|\ v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\ | )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\ |your|zeto|zte\ /i.test(
                    a.substr(0, 4)
                )
            )
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }
    var bMobile = mobileAndTabletcheck();
    if (bMobile) {
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
/** END - PREBID FUNCTION LIST */


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
            pbjs.addAdUnits(this.ADUNITDISPLAY);
            pbjs.addAdUnits(this.ADUNITVIDEO);
            pbjs.setConfig({
                priceGranularity: this.PRICE,
                enableSendAllBids: true,
                cache: {
                    url: 'https://prebid.adnxs.com/pbc/v1/cache'
                },
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
                googletag.pubads().refresh([window.GAMLibrary.headline]);
                googletag.pubads().refresh([window.GAMLibrary.showcase1]);
                googletag.pubads().refresh([window.GAMLibrary.showcase2]);
                googletag.pubads().refresh([window.GAMLibrary.exposer1]);
            });
        });

    }
}
/** START - PREBID INITIATE CLASS  */

/** START - PREBID INIT, CONFIGURATION & GOOGLE INIT   */
const priceGranularityConfig = { buckets: [{ precision: 2, min: 0.02, max: 2.99, increment: 0.01 }, { precision: 2, min: 3, max: 10, increment: 0.1 }, ], };
var gptadslots = [];
var googletag = googletag || {};
var pbjs = pbjs || {};
var adUnitsDisplay = [{
        code: "div-gpt-ad-merdeka-sc",
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
            { bidder: "innity", params: { zone: 97851, pub: 539 } },
            { bidder: "teads", params: { pageId: 153526, placementId: 167838 } },
            { bidder: "grid", params: { uid: 73361, bidFloor: 0.2 } },
            { bidder: 'rubicon', params: { accountId: 12534, siteId: 377458, zoneId: 2082388 } },
            { bidder: 'pubmatic', params: { publisherId: '156536', adSlot: 'Prebid-Merdeka-Mobile-300x250_1' } },
            { bidder: 'unruly', params: { siteId: 243584 } },
            { bidder: 'medianet', params: { cid: '8CUWX4UX4', crid: '576550861' } },
            { bidder: 'smartadserver', params: { domain: 'https://prg-apac.smartadserver.com', networkId: 4221, siteId: 498335, pageId: 1556527, formatId: 111310 } },
            { bidder: "openx", params: { delDomain: "emtek-d.openx.net", unit: "556894089" } },
            { bidder: 'jixie', params: { unit: '1000215-fU2HA6onsL', accountid: 'Me215gHaKM' } },
            { bidder: 'ix', params: { siteId: '683428' } },
        ],
    },
    {
        code: "div-gpt-ad-merdeka-hl",
        mediaTypes: {
            banner: {
                sizes: [
                    [320, 50],
                    [320, 100],
                ],
            },

        },
        bids: [
            { bidder: "innity", params: { zone: 97850, pub: 539 } },
            { bidder: "grid", params: { uid: 73363, bidFloor: 0.2 } },
            { bidder: 'rubicon', params: { accountId: 12534, siteId: 377458, zoneId: 2082388 } },
            { bidder: 'pubmatic', params: { publisherId: '156536', adSlot: 'Prebid-Merdeka-Mobile-320x50_1' } },
            { bidder: 'medianet', params: { cid: '8CUWX4UX4', crid: '888142531' } },
            { bidder: 'smartadserver', params: { domain: 'https://prg-apac.smartadserver.com', networkId: 4221, siteId: 498335, pageId: 1556527, formatId: 111312 } },
            { bidder: "openx", params: { delDomain: "emtek-d.openx.net", unit: "556894086" } },
            { bidder: 'jixie', params: { unit: '1000215-kYQaaSQVSC', accountid: 'Me215gHaKM' } },
            { bidder: 'ix', params: { siteId: '683427' } },
            { bidder: "teads", params: { pageId: 153525, placementId: 167837 } },
        ],
    },
    {
        code: "div-gpt-ad-merdeka-bottomfrm",
        mediaTypes: {
            banner: {
                sizes: [
                    [320, 50],
                    [320, 100],
                ],
            },
        },
        bids: [
            { bidder: "innity", params: { zone: 98045, pub: 539 } },
            { bidder: "grid", params: { uid: 55689, bidFloor: 0.25 } },
            { bidder: 'rubicon', params: { accountId: 12534, siteId: 377458, zoneId: 2082388 } },
            { bidder: 'medianet', params: { cid: '8CUWX4UX4', crid: '986414413' } },
            { bidder: 'smartadserver', params: { domain: 'https://prg-apac.smartadserver.com', networkId: 4221, siteId: 498335, pageId: 1556527, formatId: 111312 } },
            { bidder: "openx", params: { delDomain: "emtek-d.openx.net", unit: "556894081" } },
            { bidder: 'jixie', params: { unit: '1000215-uDRTWKr0HP', accountid: 'Me215gHaKM' } },
            { bidder: 'ix', params: { siteId: '683429' } },
            { bidder: "teads", params: { pageId: 153526, placementId: 167838 } },
        ],
    },
    {
        code: "div-gpt-ad-merdeka-dfp-exposer-slot1-oop",
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
            { bidder: "teads", params: { pageId: 153525, placementId: 167837 } },
            { bidder: "grid", params: { uid: 55685, bidFloor: 0.2 } },
            { bidder: "innity", params: { zone: 98046, pub: 539 } },
            { bidder: 'rubicon', params: { accountId: 12534, siteId: 377458, zoneId: 2082388 } },
            { bidder: 'pubmatic', params: { publisherId: '156536', adSlot: 'Prebid-Merdeka-Mobile-300x600' } },
            { bidder: 'unruly', params: { siteId: 243584 } },
            { bidder: 'medianet', params: { cid: '8CUWX4UX4', crid: '123558562' } },
            { bidder: 'smartadserver', params: { domain: 'https://prg-apac.smartadserver.com', networkId: 4221, siteId: 498335, pageId: 1556527, formatId: 111311 } },
            { bidder: "openx", params: { delDomain: "emtek-d.openx.net", unit: "556894084" } },
            { bidder: 'jixie', params: { unit: '1000215-Gz0QCQan7l', accountid: 'Me215gHaKM' } },
            { bidder: 'ix', params: { siteId: '683430' } },
        ],
    },
];
var adUnitsVideo = [{
        code: "div-gpt-ad-merdeka-sc",
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
            { bidder: "spotx", params: { channel_id: 285432, ad_unit: "outstream", outstream_function: spotxOutstreamFunc } },
            { bidder: 'ix', params: { siteId: '683428' } },
        ],
    },
    {
        code: "div-gpt-ad-merdeka-hl",
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
            { bidder: "spotx", params: { channel_id: 285432, ad_unit: "outstream", outstream_function: spotxOutstreamFunc } },
            { bidder: 'ix', params: { siteId: '683427' } },
        ],
    },
    {
        code: "div-gpt-ad-merdeka-bottomfrm",
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
            { bidder: "spotx", params: { channel_id: 285432, ad_unit: "outstream", outstream_function: spotxOutstreamFunc } },
            {
                bidder: 'pubmatic',
                params: {
                    publisherId: '156536',
                    videoAdUnit: '4045177',
                    adSlot: 'kly_prebid_outstream_mobile_merdeka',
                    outstreamAU: 'kly_prebid_outstream_mobile_merdeka',
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
    {
        code: "div-gpt-ad-merdeka-dfp-exposer-slot1-oop",
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
            { bidder: "spotx", params: { channel_id: 285432, ad_unit: "outstream", outstream_function: spotxOutstreamFunc } },
            { bidder: 'ix', params: { siteId: '683430' } },
        ],
    },
];

pbjs.que = pbjs.que || [];
googletag.cmd = googletag.cmd || [];
/** END - PREBID INIT, CONFIGURATION & GOOGLE INIT   */

/** LOAD PREBID - END */

/** GPT START */
var gpt_gam_site = window.location.hostname.toUpperCase(),
    gpt_gam_ver = 'V3.4-ADS';

window.GAMLibrary = {};
window.GAMLibrary = {
    dfpSlideup: '/36504930/KLY/MOBILE/MERDEKA.COM/SLIDE_UP',
    dfpExposer1: '/36504930/KLY/MOBILE/MERDEKA.COM/EXPOSER',
    dfpBottomFrame: '/36504930/KLY/MOBILE/MERDEKA.COM/BOTTOM_FRAME',
    dfpFloatingPin: '/36504930/KLY/MOBILE/MERDEKA.COM/FLOATING_PIN',
    dfpTopframe: '/36504930/KLY/MOBILE/MERDEKA.COM/MASTHEAD',
    dfpHeadline: '/36504930/KLY/MOBILE/MERDEKA.COM/HEADLINE',
    scSlot: '/36504930/KLY/MOBILE/MERDEKA.COM/SHOWCASE',
    timedBottomFrm: null,
    timedFloatingPin: null,
    topFrameFixedSize: 1,
    articleType: {
        "TextTypeArticle": { 'scroll': 50 },
        "VideoGallery": { 'scroll': 50 },
        "PhotoGallery": { 'scroll': 0 },
        "default": { 'scroll': 50 },
    },
    setGamBFInterval: function(active = true) {
        if (!active) {
            clearInterval(window.GAMLibrary.gamBFInterval);
            return;
        }
        window.GAMLibrary.gamBFInterval = setInterval(function() {
            document.querySelector("#dfp-bframe-cont-transparent").style.display = "block";
            document.querySelector("#dfp-spinads") && document.querySelector("#dfp-spinads").parentElement.remove();
            pbjs.setTargetingForGPTAsync([window.GAMLibrary.dfpBottomFrame]);
            googletag.pubads().refresh([window.GAMLibrary.refreshSlot]);
            typeof SPAFreezeBody == 'function' ? SPAFreezeBody(false) : '';
        }, 60000);
    },
    setGamBFCloseBtn: function() {
        let buttonCloseBframeClick = document.createElement("a");
        buttonCloseBframeClick.setAttribute("href", "#");
        buttonCloseBframeClick.setAttribute("id", "dfp-bframe-close");
        buttonCloseBframeClick.setAttribute("onclick", "document.getElementById('dfp-bframe-cont-transparent').style.display='none'; return false;");
        buttonCloseBframeClick.setAttribute("style", "width: 20px; position: absolute; margin-left: 150px; top: -15px; z-index: 999999;");
        let buttonCloseBframeImg = document.createElement("img");
        buttonCloseBframeImg.setAttribute("src", "https://cdns.klimg.com/d.kapanlaginetwork.com/banner/preview/2019/08/20/close.png");
        buttonCloseBframeImg.setAttribute("style", "width: 20px; border: none;");
        buttonCloseBframeClick.appendChild(buttonCloseBframeImg);
        let checkBframeContainer = setInterval(function() {
            if (document.querySelector("#dfp-bframe-cont-transparent") !== null) {
                document.querySelector("#dfp-bframe-cont-transparent").style.textAlign = "center";
                document.querySelector("#dfp-bframe-cont-transparent").insertAdjacentElement("afterBegin", buttonCloseBframeClick);
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
                    ], 'div-gpt-ad-merdeka-bottomfrm').addService(googletag.pubads());
                    setTimeout(() => {
                        if (pbjs) {
                            pbjs.setTargetingForGPTAsync([this.dfpBottomFrame]);
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
            if (scrollTop >= this.articleType[pageType].scroll) {
                if (!this.timedFloatingPin) {
                    this.timedFloatingPin = googletag.defineSlot(this.dfpFloatingPin, [
                        [1, 1],
                        ['fluid']
                    ], 'div-gpt-ad-merdeka-floating-pin').addService(googletag.pubads());
                    googletag.pubads().refresh([this.timedFloatingPin]);
                } else {
                    window.removeEventListener("scroll", this.scroll);
                }
            }
        };
        this.scrollHandler = this.scroll.bind(this);
        window.addEventListener("scroll", this.scrollHandler);
    },
    initiateSCReadPageV2: function() {
        placeHolderlement = document.querySelectorAll("#div-gpt-ad-sc-paging-placeholder");
        if (placeHolderlement) {
            placeHolderlement.forEach((placeholder, index) => {
                if (index < 2) {
                    let SC = null;
                    let containerID = "gpt-ad-merdeka-sc-" + (index + 1);
                    let containerSCArticle = document.createElement('div');

                    containerSCArticle.setAttribute("id", containerID);
                    containerSCArticle.setAttribute('class', 'article-ad');
                    placeholder.insertAdjacentElement("beforeEnd", containerSCArticle);

                    if (SC = googletag.defineSlot('/36504930/KLY/MOBILE/MERDEKA.COM/SHOWCASE', [
                            [300, 250],
                            [250, 250],
                            [200, 200]
                        ], containerID)) {
                        SC.addService(googletag.pubads()).setTargeting("pagetype", kly.pageType).setTargeting("position", (index + 1));
                        googletag.display(containerID);
                        setTimeout(() => {
                            if (pbjs) {
                                pbjs.setTargetingForGPTAsync(['/36504930/KLY/MOBILE/MERDEKA.COM/SHOWCASE']);
                            }
                        }, 400);
                        googletag.pubads().refresh([SC]);
                    }
                } else {
                    placeholder.remove();
                }
            })
        }

    },
    initiateSCReadPage: function() {
        placeHolderlement = document.querySelectorAll("#div-gpt-ad-sc-paging-placeholder");
        if (placeHolderlement) {
            placeHolderlement.forEach((placeholder, index) => {
                let SC = null;
                let containerID = "gpt-ad-merdeka-sc-" + (index + 1);
                let containerSCArticle = document.createElement('div');

                containerSCArticle.setAttribute("id", containerID);
                containerSCArticle.setAttribute('class', 'article-ad');
                placeholder.insertAdjacentElement("beforeEnd", containerSCArticle);

                if (SC = googletag.defineSlot('/36504930/KLY/MOBILE/MERDEKA.COM/SHOWCASE', [
                        [300, 250],
                        [250, 250],
                        [200, 200]
                    ], containerID)) {
                    SC.addService(googletag.pubads()).setTargeting("pagetype", kly.pageType).setTargeting("position", (index + 1));
                    googletag.display(containerID);
                    setTimeout(() => {
                        if (pbjs) {
                            pbjs.setTargetingForGPTAsync(['/36504930/KLY/MOBILE/MERDEKA.COM/SHOWCASE']);
                        }
                    }, 400);
                    googletag.pubads().refresh([SC]);
                }
            })
        }
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
            tagForAds = _klyObject.gtm.tag.replace(/[^A-Za-z0-9|\- ]/ig, "").klyFiltering("|");
        const bsKeywordList = {
            'adult': ['matcont', 'aduhai', 'kelamin', 'vital', 'anal', 'belahan', 'bercinta', 'bergairah', 'gairah', 'intim', 'bikini', 'bokong', 'boob', 'bra', 'bugil', 'celana', 'ciuman', 'cleavage', 'dada', 'dewasa', 'diremas', 'doggie', 'ejakulasi', 'ereksi', 'erotis', 'foreplay', 'kiss', 'seks', 'gangbang', 'horny', 'hot', 'kamasutra', 'keperawanan', 'perawan', 'kondom', 'kontrasepsi', 'libido', 'lingerie', 'masturbasi', 'mature', 'menggairahkan', 'menggoda', 'mesra', 'miss-v', 'mr-p', 'nakal', 'naughty', 'nipple', 'nipples', 'onani', 'oral', 'oral seks', 'organ', 'orgasme', 'paha', 'pantat', 'panties', 'payudara', 'pelecehan', 'telanjang', 'penetrasi', 'penis', 'perkosa', 'perkosaan', 'pole', 'porno', 'pornoaksi', 'pornografi', 'telentang', 'provokatif', 'putting', 'ranjang', 'sex', 'penetratif', 'seksi', 'seksual', 'sensual', 'seronok', 'doll', 'toys', 'skandal', 'sperma', 'striptease', 'striptis', 'syur', 'terangsang', 'tiduri', 'topless', 'vagina', 'vibrator', 'lendir', 'prostitusi', 'homoseks', 'meraba-raba', 'mesum', 'memerkosa', 'rudapaksa', 'kemaluan', 'kasus asusila', 'pemerkosaan', 'hubungan seksual', 'hubungan intim', 'video porno', 'pelecehan seksual', 'tips seks', 'komunitas swinger', 'fenomena kelainan seksual', 'penyimpangan seks', 'posisi seks', 'obat kuat', 'bentuk payudara', 'implan payudara', 'chat firza-rizieq', 'pemerkosaan anak', 'pencabulan', 'perselingkuhan', 'kisah perselingkuhan', 'razia pasangan mesum', 'seks bebas', 'gangguan jiwa', 'tes keperawanan', 'kontroversi hukuman mati', 'stres dan depresi', 'bunuh diri', 'alat kontrasepsi', 'alat vital pria', 'alergi', 'anatomi vagina', 'anjeng', 'anjing', 'anjlng', 'anjrit', 'anying', 'apa itu kondom', 'artis indonesia bugil', 'artis porno', 'asu', 'babi', 'bahaya masturbasi', 'bajingan', 'bandar ceme', 'bangsat', 'bego', 'bentuk payudara', 'bercinta', 'bercinta saat hamil', 'berhubungan intim', 'bintang film porno', 'bintang porno', 'bitch', 'bocah sd foto mesum', 'bokne', 'bom surabaya 2018', 'boneka seks', 'bullshit', 'bulshit', 'bulu kemaluan', 'cara berhubungan intim', 'cara membuat suami bergairah', 'cara memperbesar penis', 'cara mengatasi ejakulasi dini', 'cara seksual', 'gemar368', 'goblok', 'gue', 'gwe', 'henceut', 'hindu', 'hubungan intim', 'hubungan seksual', 'ibu hamil', 'implan payudara', 'industri film porno', 'cukur bulu kemaluan', 'disfungsi ereksi', 'ejakulasi', 'ejakulasi dini', 'ejakulasi wanita', 'elo', 'entot', 'ereksi', 'ewe', 'fase menstruasi', 'fenomena kelainan seksual', 'foto berhubungan intim', 'foto intim', 'fuck', 'gairah seksual', 'gangguan seks', 'ganja', 'gay', 'gaya bercinta', 'gaya bercinta dalam islam', 'gaya bercinta yang disukai pria', 'gaya seks', 'gejala penyakit', 'intim', 'itil', 'jancok', 'jancuk', 'jenis alat kontrasepsi', 'jerawat', 'jual beli sperma', 'kakek cabul', 'kanibal', 'kanibalisme', 'kanker payudara', 'kecanduan seks', 'kemaluan wanita', 'kencing', 'kesehatan kulit dan kelamin', 'kesehatan payudara', 'kesehatan reproduksi', 'kesehatan wanita', 'khusus deewasa', 'kimpet', 'klitoris', 'kondom', 'kondom pria', 'kontol', 'kontolnya', 'kontrasepsi', 'kontroversi lgbt', 'kristen', 'legalisasi ganja', 'lgbt', 'lonte', 'm3m3k', 'makanan berbahaya', 'makanan sehat', 'masa subur pria', 'masturbasi', 'meki', 'melakukan hubungan intim', 'memek', 'mencukur bulu kemaluan', 'menstruasi', 'model hot', 'model seksi', 'monyet', 'mucikari siswi smp', 'ngentot', 'ngewe', 'nonok', 'obat ejakulasi dini', 'obat pembesar', 'obat pembesar penis terbaik', 'oral seks', 'organ intim wanita', 'orgasme', 'orgasme wanita', 'pakistan', 'payudara kecil', 'payudara wanita', 'pelacur', 'pembesar penis', 'pemerkosaan', 'pengetahuan seks', 'pengobatan alternatif', 'penis', 'penis', 'penis bengkok', 'penis besar', 'penis kecil', 'penis pria', 'penyakit sipilis', 'penyakit vagina', 'penyimpangan seks', 'perawatan vagina', 'perek', 'pornoaksi', 'pornografi', 'posisi bercinta', 'posisi hubungan intim suami istri menurut islam', 'posisi seks', 'posisi seksual', 'pria dewasa', 'pria idaman', 'prostitusi', 'puki', 'puting', 'puting payudara', 'rasisme', 'sbobet', 'seks', 'seks bebas', 'seks oral', 'seksual', 'seksual lelaki dan perempuan', 'seksualitas', 'sex toy', 'shit', 'siklus menstruasi', 'situs poker terpercaya', 'situs porno', 'sperma', 'tai', 'taik', 'taruhan online', 'telanjang', 'terorisme', 'test pack', 'testis', 'tips bercinta', 'tips seks', 'titit', 'toket', 'tolol', 'ukuran normal penis', 'ukuran penis', 'ukuran penis normal', 'ukuran penis orang indonesia', 'vagina', 'vagina gatal', 'vagina wanita', 'vakum pembesar penis', 'viagra', 'video bercinta dengan pasangan', 'video porno', 'video seks', 'virus corona', 'xxxx online', 'hardcore', 'porn', 'porno', 'sex', 'seks', 'dick', 'cock', 'penis', 'drunk', 'mabuk', 'overdose', 'overdosis', 'dewasa', 'adult', 'nude', 'telanjang', 'anal', 'bdsm', 'ass', 'anus', 'rokok', 'cabul', 'erotic', 'lesbian', 'teroris', 'vibrator', 'vagina', 'pembunuh', 'pemerkosaan', 'perbudakan', 'rasis', 'radikal', 'sperma', 'waria', 'kehidupan seks', 'libido', 'gairah seks', 'titik rangsang', 'mimpi seks', 'ganguan jiwa', 'dildo', 'seks toy', 'berhubungan seks', 'berhubungan seksual', 'adegan seks', 'bentuk kelamin', 'kelamin wanita', 'alat kelamin', 'film porno', 'hasrat seksual', 'ukuran vagina', 'rangsang payudara', 'ganguan seksual', 'kekerasan seksual', 'woman on top', 'seks pria dan wanita', 'kursi tantra seks', 'alat bantu seks', 'air mani', 'kesehatan penis', 'fakta seks', 'seks dan pasutri', 'kelainan seks', 'seks dan kriminal', 'mainan dewasa', 'mainan perangsang gairah', 'seks dalam islam', 'seks dan agama', 'mitos seks', 'seksualitas pria', 'seksualitas wanita', 'tante seksi', 'cemani', 'ayam hitam', 'rumah bordil', 'mimpi telanjang', 'foto telanjang', 'adegan erotis', 'wanita telanjang'],
            'war_politics': ['berita hoax', 'ternyata hoax', 'ahed tamimi', 'konflik palestina israel', 'konflik suriah', 'ujaran kebencian', 'g30s', 'kediktatoran arab saudi', 'konflik palestina-israel', 'fpi', 'penembakan', 'anarkisme suporter sepakbola', 'bentrok suporter', 'pengeroyokan', 'penganiayaan', 'begal motor', 'kekerasan pada wartawan', 'bentrokan warga', 'bentrokan', 'pilpres 2019', 'koalisi pilpres 2019', 'koalisi prabowo', 'koalisi jokowi', 'prabowo-sandiaga', 'ratna sarumpaet', 'capres jokowi', 'capres prabowo', 'kebohongan ratna sarumpaet', 'prabowo subianto', 'jemaah ansharut daulah', 'aliran sesat', 'lia eden', 'kisah mualaf', 'penistaan agama', 'suporter tewas', 'ahok gugat cerai veronica tan', 'perang dunia', 'rokok elektrik', 'rusia', 'ukraina', 'vladimir putin', 'perang dunia 3', 'perang rusia', 'senjata rusia', 'nato', 'perang', 'rusia dan ukraina', 'rusia serang ukraina', 'invasi rusia', 'propaganda rusia', 'konflik rusia ukraina', 'presiden rusia', 'presiden ukraina'],
            'drugs_tobacco_alcohol': ['kasus narkoba', 'akibat merokok', 'bahaya merokok', 'berhenti merokok', 'cara berhenti merokok', 'efek berhenti merokok', 'larangan merokok', 'tips berhenti merokok', 'rokok elektrik', 'kanker', 'impotensi', 'merokok', 'perokok', 'rokok', 'tembakau', 'pelanggaran', 'tablet', 'overdosis', 'jantung', 'stroke', 'cancer', 'narkoba', 'djarum', 'ganja', 'bnn', 'drugs', 'kecanduan', 'narkoba', 'alkohol', 'alcohol', 'asap rokok', 'kesehatan paru', 'bahaya rokok', 'bahaya rokok elektrik', 'bahaya berhenti merokok', 'manfaat berhenti merokok', 'dampak merokok', 'narkoba artis', 'sabu', 'jenis alkohol dalam minuman keras', 'jenis alkohol', 'minuman keras', 'rehabilitasi narkoba', 'bahaya narkoba', 'ciri ciri pengguna narkoba', 'penyalahgunaan narkoba', 'jenis jenis narkoba', 'adiktif', 'minuman beralkohol', 'ruu minuman beralkohol', 'kartel narkoa', 'mafia narkoba', 'penyeludupan narkoba', 'remaja narkoba', 'obat psikotropika', 'selebriti narkoba', 'sidang narkoba', 'artis narkoba', 'jenis narkotika'],
            'disaster': ['gempa palu', 'gempa donggala', 'gempa sulawesi tengah', 'pembunuhan', 'tsunami palu', 'penemuan mayat', 'lion air jatuh di karawang', 'lion air jatuh', 'pembunuhan sadis', 'lion air hilang kontak', 'pesawat jatuh', 'pesawat hilang kontak', 'kecelakaan', 'kapal tenggelam di danau toba', 'kecelakaan bus', 'kapal tenggelam', 'kasus tabrak lari', 'menewaskan', 'menewaskan orang', 'mengancam nyawa', 'meninggal', 'meninggal dunia', 'orang mati', 'orang tewas', 'pemakaman', 'petugas penyelamat', 'telah meninggal', 'terbunuh', 'tewas', 'tewaskan', 'tim penyelamat', 'wanita meninggal', 'autopsi', 'belasungkawa', 'bencana', 'bencana besar', 'bunuh orang', 'darurat bencana', 'dilaporkan tewas', 'dimakamkan', 'dipastikan tewas', 'ditemukan mati', 'ditemukan tewas', 'hilangnya nyawa', 'identitas korban', 'inalillahi', 'jasad korban', 'jasadnya', 'jenasah wanita', 'jenazah', 'jenazah pria', 'jenazah teridentifikasi', 'jasad', 'kehilangan hidupnya', 'kehilangan nyawa', 'kehilangan nyawanya', 'kematian', 'korban', 'korban jiwa', 'korban meninggal', 'korban tewas', 'mati', 'mayat', 'mayat korban', 'membunuh', 'membunuh istrinya', 'membunuh mereka', 'membunuh suaminya', 'menemui ajal', 'mengalami koma', 'menghembuskan nafas terakhir', 'menimbulkan korban', 'meninggal akibat sakit', 'menyebabkan kematian', 'meregang nyawa', 'meregggut nyawa', 'modar', 'nyawa hilang', 'nyawa melayang', 'penyebab kematian', 'tak bernyawa', 'tak sadarkan diri', 'terkapar', 'tidak bernyawa', 'tutup usia', 'wafat', 'merenggut nyawa', 'pelayat', 'hilangkan nyawa', 'renggut nyawa', 'keadaan kritis', 'kehilangan darah', 'merenggut jiwa', 'telan nyawa', 'menelan nyawa', 'memakan nyawa', 'dinyatakan meninggal', 'nyawa tak tertolong', 'polusi', 'pollution', 'pemanasan global', 'global warming', 'climate change', 'perubahan iklim', 'polusi udara', 'penyebab polusi udara', 'polusi udara di jakarta', 'penyebab pencemaran udara', 'polusi jakarta', 'bahaya polusi', 'pencemaran udara', 'macam pencemaran lingkungan', '10 macam pencemaran lingkungan', 'penyakit polusi udara', 'penyakit yang disebabkan oleh polusi udara', 'pencemaran lingkungan', 'macam pencemaran lingkungan', '10 macam pencemaran lingkungan', 'limbah pabrik', 'pencemaran air', 'penyebab pencemaran air', 'contoh pencemaran lingkungan', 'dampak pencemaran lingkungan', 'polutan', 'dampak pencemaran udara', 'bahaya pencemaran udara', 'pencemaran sungai', 'pencemaran minyak', 'pencemaran', 'udara jakarta', 'kota paling berpolusi didunia', 'kota paling berpolusi', 'jenis pencemaran lingkungan', 'pencemaran air laut', 'pencemaran sungai brantas', 'pencemaran limbah', 'pencemaran air bersih', 'udara bersih', 'kualitas udara', 'limbah', 'penyebab kerusakan lingkungan', 'kasus penebangan pohon', 'sampah plastik', 'cara mengatasi pencemaran udara', 'cara mengatasi pemanasan global', 'penyebab terjadinya pemanasan global', 'penyebab perubahan iklim global', 'penyebab pemanasan global akibat aktivitas manusia', 'fenomena alam', 'global warming adalah', 'perubahan iklim global', 'krisis iklim', 'cara mengatasi pemanasan global', 'cara mengatasi pemanasan global sebagai pelajar', 'penyebab pemanasan global', 'efek rumah kaca', 'pengertian efek rumah kaca menurut para ahli', 'pengertian efek rumah kaca', 'pengertian pemanasan global', 'pemanasan global adalah', 'cara mencegah pemanasan global', 'penyebab efek rumah kaca', 'efek rumah kaca adalah', 'penyebab global warming', 'cara mencegah global warming', 'cara mencegah pemanasan global', 'penyebab terjadinya pemanasan global dan efek rumah kaca', 'penyebab terjadinya pemanasan global', 'penyebab terjadinya efek rumah kaca', 'penyebab perubahan iklim', 'gas rumah kaca', 'bom bali', 'teror bom', 'bom', 'bom panci', 'bom bunuh diri', 'bom seks', 'bom atom', 'bom gereja', 'bom nuklir', 'bom sarinah', 'isis', 'bom meledak', 'ledakan bom'],
            'epidemic_desease': ['obesitas', 'osteoporosis', 'corona', 'corona di indonesia', 'virus corona', 'virus-corona', 'covid-19', 'wabah corona', 'kematian virus', 'kematian wabah', 'korban terinfeksi', 'virus menyerang', 'wabah', 'penyakit', 'sakit pernapasan', 'sesak', 'korona', 'corona', 'odp', 'pdp', 'virus', 'rumah sakit', 'covid-19', 'virus korona', 'positif korona', 'covid-19', 'terjangkit covid-19', 'terinfeksi virus corona', 'corona', 'corona di indonesia', 'covid 19', 'covid-19', 'infeksi saluran kencing', 'insomnia dan tidur', 'corona', 'covid', 'health', 'corona'],
            'religion': ['15lam', 'al quran', 'al-quran', 'buda', 'budha', 'injil', 'isl4m', 'islam', 'kafir', 'katolik', 'muh4mmad', 'muhammad', 'muhammad saw', 'nabi', 'yesus', 'ismi aisyah', 'ibrahim al-hashimi al-qurayshi,', 'abu bakar al-baghdadi'],
            'gambling': ['agen poker', 'agen sbobet', 'bonus deposit', 'bonus refferal', 'bonus rollingan', 'cashtree', 'judi', 'minimal deposit', 'poker', 'poker online'],
            //'parenting' : ['bayi','baby','nama anak','nama bayi','nama bayi perempuan','nama anak perempuan','nama bayi laki laki','nama anak laki laki','arti nama bayi','arti nama anak', 'bayi muntah','penyebab bayi muntah','asi anak','cara mengeluarkan dahak pada bayi','baby sitter','nama bayi islam','nama anak islam','nama bayi kristen','nama anak kristen', 'nama bayi sansekerta','nama anak sansekerta','baby bump','pijat bayi','spa baby','baby spa','kesehatan bayi','babyologist','nama bayi perempuan unik', 'nama bayi laki laki unik','kelahiran bayi','ucapan kelahiran','kelahiran anak','bayi selebritis','bayi seleb','anak selebritis','anak artis','bayi artis', 'baby shower selebritis','baby shower','gaya baby','anak selebritis indonesia','bayi selebritis indonesia','baby gempi','baby arsy','baby leslar','baby ameena', 'babymoon','babymoon artis','kesehatan bayi dan balita','penyakit bayi','baby dan balita','bayi dan anak','camilan bayi','resep mpasi','mpasi','artis hamil', 'jadwal makan bayi','baby face','bayi 6 bulan','jam tidur bayi','baby bump artis','perawatan bayi','baby walker','perlengkapan bayi','menyusui','bayi tabung', 'keluarga','keluarga artis','ibu anak','perceraian artis','artis bercerai','parenting','bayi kembar','bayi pilek','keluarga penjabat','keluarga dan anak','orang tua', 'tips parenting','keluarga bahagia','keluarga seleb','anak dan balita','kesehatan keluarga','pertumbuhan anak','anak cerdas','anak mandiri','mendidik anak', 'masalah anak','keluarga harmonis']
        };

        /*change this acording to the site page layout*/
        var siteContentObject = document.getElementsByClassName("mdk-body-paragraph");
        var siteContentText = "";

        if (siteContentObject.length) {
            siteContentText = siteContentObject[0].innerText;

            /*removing BACA JUGA box since it unrelated with main content*/
            /*change this acording to the site page layout*/
            var baca_juga_elements = siteContentObject[0].getElementsByClassName("baca-juga-collections__detail");
            for (var i in baca_juga_elements) {
                bacajuga = baca_juga_elements[i].innerText;
                siteContentText = siteContentText.replace(bacajuga, '');
            }
        }
        siteContentText = dfp_keyword.concat(dfp_titles, dfp_desc, tagForAds, siteContentText); //.filter(item => item !== undefined);

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
    }
}

/* DMP CATEGORY LIST */
window.createDMPTracker = function(adsCatList, dfpTracker, macro) {
    window.createCDPTracker(adsCatList, macro);
    parent.window.open(dfpTracker, '_blank');
};
window.createCDPTracker = function(cat, macro) {
    var cName = 'ahoy_visitor=',
        cVisitorId = document.cookie.split(';').find(v => { return v.match(cName); }),
        partnerUID = cVisitorId ? decodeURIComponent(cVisitorId).trim().replace(cName, '') : 0,
        gamMacro = typeof macro === "string" ? JSON.parse(macro) : macro,
        defaultKey = { adunitId: "ads_adunit_id", advertiserId: "ads_advertiser_id", creativeId: "ads_creative_id", lineitemId: "ads_lineitem_id", orderId: "ads_order_id", };
    actionDetails = Object.keys(gamMacro).reduce((obj, k) => Object.assign(obj, defaultKey[k] ? {
            [defaultKey[k]]: gamMacro[k]
        } : {
            [k]: gamMacro[k]
        }), {}),
        cdpData = { action: actionDetails.action ? actionDetails.action : 'ads_click', action_category: cat, action_details: actionDetails.action ? (delete actionDetails.action, actionDetails = actionDetails) : actionDetails, visitor_id: partnerUID };
    /*partnerUID ? window.AhoyEvent.sendPersonalizationUserEvent(cdpData) : '';*/
    (actionDetails.action == 'ads_click') ? (partnerUID ? window.AhoyEvent.sendPersonalizationUserEvent(cdpData) : '') : '';
};
/* DMP CATEGORY LIST */

var isReadPage = kly.pageType === "ReadPage";

var isTrending = 0; /*"trending" === kly.gtm.subCategory;*/
googletag.cmd.push(function() {
    var urlPath = document.URL;
    if (isTrending) {
        document.querySelectorAll("#div-gpt-ad-merdeka-sc-2,#div-gpt-ad-merdeka-sc").forEach((v) => {
            v.parentElement.remove()
        });
    }

    /*SET NEW BRAND SAFETY LOGIC*/
    GAMLibrary.brandSafetyChecker();

    /*DEFINE ALL SLOT*/

    /*OUT OF PAGE SLOTS*/
    if (GAMLibrary.topFrameFixedSize) {
        window.GAMLibrary.topframe = googletag.defineSlot(GAMLibrary.dfpTopframe, [1, 1], 'div-gpt-ad-merdeka-topfrm-oop').addService(googletag.pubads());
    } else {
        window.GAMLibrary.topframe = googletag.defineOutOfPageSlot(GAMLibrary.dfpTopframe, 'div-gpt-ad-merdeka-topfrm-oop').addService(googletag.pubads());
    }

    window.GAMLibrary.rec1 = googletag.defineOutOfPageSlot('/36504930/m.merdeka.com/dfp-recommend-slot-1', 'dfp-recommend-1').addService(googletag.pubads());
    window.GAMLibrary.rec2 = googletag.defineOutOfPageSlot('/36504930/m.merdeka.com/dfp-recommend-slot-2', 'dfp-recommend-2').addService(googletag.pubads());
    window.GAMLibrary.overlay = googletag.defineOutOfPageSlot(GAMLibrary.dfpSlideup, 'div-gpt-ad-dfp-overlay-oop').addService(googletag.pubads());
    window.GAMLibrary.crmHeadline = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/MERDEKA.COM/HEADLINE_CRM', 'div-gpt-ad-merdeka-crm-headline-oop').addService(googletag.pubads());
    window.GAMLibrary.crmOrganic1 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/MERDEKA.COM/ORGANIC_FEED_CRM_1', 'div-gpt-ad-merdeka-crm1-oop').addService(googletag.pubads());
    window.GAMLibrary.crmOrganic2 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/MERDEKA.COM/ORGANIC_FEED_CRM_2', 'div-gpt-ad-merdeka-crm2-oop').addService(googletag.pubads());
    window.GAMLibrary.crmOrganic3 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/MERDEKA.COM/ORGANIC_FEED_CRM_3', 'div-gpt-ad-merdeka-crm3-oop').addService(googletag.pubads());
    window.GAMLibrary.feedboard = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/MERDEKA.COM/FEEDBOARD', 'div-gpt-ad-merdeka-feedboard').addService(googletag.pubads());
    window.GAMLibrary.pictureFirst = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/MERDEKA.COM/CONTENT_CAROUSEL', 'div-gpt-ad-merdeka-picturefirst').addService(googletag.pubads());

    window.GAMLibrary.headline = googletag.defineSlot(GAMLibrary.dfpHeadline, [
        [320, 50],
        [320, 100]
    ], 'div-gpt-ad-merdeka-hl').addService(googletag.pubads());

    if (!isTrending) {
        window.GAMLibrary.showcase2 = googletag.defineSlot(GAMLibrary.scSlot, [
            [300, 250],
            [250, 250],
            [200, 200]
        ], 'div-gpt-ad-merdeka-sc-2').addService(googletag.pubads());
        window.GAMLibrary.showcase1 = googletag.defineSlot(GAMLibrary.scSlot, [
            [300, 250],
            [250, 250],
            [200, 200]
        ], 'div-gpt-ad-merdeka-sc').addService(googletag.pubads());
    }

    window.GAMLibrary.exposer1 = googletag.defineSlot(GAMLibrary.dfpExposer1, [
        [300, 250],
        [300, 600],
        [320, 480],
        [160, 600],
        [250, 250]
    ], 'div-gpt-ad-merdeka-dfp-exposer-slot1-oop').addService(googletag.pubads());

    if (isReadPage) {
        window.GAMLibrary.inreadnative = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/MERDEKA.COM/IN-READ_NATIVE', 'div-gpt-ad-merdeka-in-read-native').addService(googletag.pubads());
        window.GAMLibrary.insertion = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/MERDEKA.COM/INSERTION', 'div-gpt-ad-merdeka-insertion-oop').addService(googletag.pubads());
    } else if (kly.pageType === "Homepage") {
        window.GAMLibrary.advHeadline1 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/MERDEKA.COM/ADVERTORIAL_HEADLINE_1', 'div-gpt-ad-merdeka-advertorial-headline1').addService(googletag.pubads());
        window.GAMLibrary.advHeadline2 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/MERDEKA.COM/ADVERTORIAL_HEADLINE_2', 'div-gpt-ad-merdeka-advertorial-headline2').addService(googletag.pubads());
    }

    /*Bottom Frame Scrolling*/
    GAMLibrary.scrollBottomFrame();
    /*Bottom Frame Scrolling*/

    GAMLibrary.scrollFloatingPin();

    googletag.pubads().addEventListener('slotResponseReceived', function(event) {
        var dfp_slotDelivered = event.slot.getResponseInformation() ? 'block' : 'none'; /* check wheter there is ads or not*/
        var dfp_slotAdUnitPath = event.slot.getSlotId().getAdUnitPath(); /* get adunit path */

        /*check if native ads creative was delivered*/
        if (dfp_slotDelivered == 'block') {
            if (dfp_slotAdUnitPath == GAMLibrary.dfpHeadline) {
                var urlParams = new URLSearchParams(window.location.search);
                var myParam = JSON.parse(urlParams.get('interval'));
                headlineSticky(myParam);
            }
            if (dfp_slotAdUnitPath == GAMLibrary.dfpBottomFrame) {
                document.getElementById("dfp-bframe-cont-transparent") && document.getElementById("dfp-bframe-cont-transparent").setAttribute("style", "position: fixed; bottom: 0; min-height: 50px; background-color: #ECECEC70; width: 100%; text-align: center;display:block; z-index: 999999");
            }
        } else {
            var dfp_slotElementId = event.slot.getSlotId().getDomId();
            if (dfp_slotElementId.match(/newsTag|recommend/)) {
                if (document.getElementById(dfp_slotElementId) && document.getElementById(dfp_slotElementId).getElementsByTagName('iframe')[0] && document.getElementById(dfp_slotElementId).getElementsByTagName('iframe')[0].getAttribute('height') == 1) {
                    document.getElementById(dfp_slotElementId).getElementsByTagName('iframe')[0].style.display = "none";
                }

            }
        }
    });

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

            let _ahoyInterval = setInterval((e) => {
                if (window.AhoyEvent) {
                    window.AhoyEvent.sendPersonalizationUserEvent(cdpData);
                    clearInterval(_ahoyInterval);
                }
            }, 100);
        }
    });
    /* END - Send Impression Tracker Data To CDP */

    googletag.pubads().addEventListener('slotRenderEnded', function(event) {
        var containerId = event.slot.getSlotElementId();
        var containerEl = document.getElementById(containerId);

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

    /*  START TARGETING BLOCK   */
    googletag.pubads().setTargeting("tags", tagForAds);
    googletag.pubads().setTargeting("currentUrl", urlPath);
    googletag.pubads().setTargeting("platform", kly.platform);
    googletag.pubads().setTargeting("type", kly.gtm.type);
    googletag.pubads().setTargeting("pageType", kly.pageType);
    googletag.pubads().setTargeting("channel", kly.channel.full_slug);
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
    googletag.pubads().refresh([window.GAMLibrary.topframe, window.GAMLibrary.rec1, window.GAMLibrary.rec2, window.GAMLibrary.exposer2, window.GAMLibrary.overlay, window.GAMLibrary.crmHeadline, window.GAMLibrary.crmOrganic1, window.GAMLibrary.crmOrganic2, window.GAMLibrary.crmOrganic3, window.GAMLibrary.feedboard, window.GAMLibrary.pictureFirst]);
    if (isReadPage) {
        googletag.pubads().refresh([window.GAMLibrary.inreadnative, window.GAMLibrary.insertion]);
        /*INITIATE ADS ON CONTINOUS PAGE */
        if (isTrending) {
            GAMLibrary.initiateSCReadPageV2();
        } else {
            GAMLibrary.initiateSCReadPage();
        }
    } else if (kly.pageType === "Homepage") {
        googletag.pubads().refresh([window.GAMLibrary.advHeadline1, window.GAMLibrary.advHeadline2]);
    }

});

/* INITIATE PREBID */
var prebidObject = new PrebidInstantiate(1000, 3000, 1000, adUnitsDisplay, adUnitsVideo, priceGranularityConfig);

var gptMMerdekaStyle = document.createElement('style');
gptMMerdekaStyle.textContent = '.div-gpt-ad-merdeka-sc-continous{width:300px;margin:0 auto!important;padding-bottom:50px}.div-gpt-ad-merdeka-sc-multiple-page{width:300px;margin:auto;padding-top:30px}[id^=div-gpt-ad-merdeka-sc-]{display:flex}';
window.onload = function() {
    document.body.appendChild(gptMMerdekaStyle);
};

/** GET MESSAGE FROM SAFEFRAME CONTAINER */
GAMLibrary.onMessageReceivedGPTUpdateCreativeStyle();
/** GET MESSAGE FROM SAFEFRAME CONTAINER */


/* ============ HEADLINE STICKY - DEFAULT 7s ============ */
var headlineStickyInterval = 7,
    headlineStickyStatus = !1,
    headlineStickyPaused = !1,
    headlineStickyCounterStatus = !1;

function headlineSticky(a) {
    null != a && (headlineStickyInterval = a);
    var b = document.getElementById("div-gpt-ad-merdeka-hl"),
        c = document.createElement("div");
    c.setAttribute("id", "div-gpt-ad-merdeka-hl-shadow"), b.parentElement.insertBefore(c, b), injectStickyStyleAndAnimation(), window.addEventListener("scroll", headlineStickyScrollEevent)
}

function headlineStickyScrollEevent() {
    var a = document.getElementById("div-gpt-ad-merdeka-hl").firstElementChild,
        b = document.getElementById("div-gpt-ad-merdeka-hl-shadow").getBoundingClientRect().top;
    document.documentElement.scrollTop || document.body.scrollTop;
    headlineStickyStatus ? 0 >= b ? (a.classList.add("hl-navbar-hanging"), headlineStickyPaused = !1) : (a.classList.remove("hl-active-sticky"), a.classList.remove("hl-navbar-hanging"), a.style.margin = "10px 0", headlineStickyPaused = !0, headlineStickyStatus = !1) : 0 >= b && (a.classList.add("hl-active-sticky"), !headlineStickyCounterStatus && (headlineStickyCounterStatus = !0, removeStickyHeadline(a, !1)), headlineStickyStatus = !0)
}

function removeStickyHeadline(a, b) {
    var c = setInterval(function() {
        headlineStickyPaused || (0 >= headlineStickyInterval ? (a.classList.remove("hl-active-sticky"), a.classList.remove("hl-navbar-hanging"), a.style.margin = "10px 0", clearInterval(c), window.removeEventListener("scroll", headlineStickyScrollEevent)) : headlineStickyInterval--)
    }, 1e3);
    !headlineStickyPaused && b && (clearInterval(c), a.classList.remove("hl-active-sticky"), a.classList.remove("hl-navbar-hanging"))
}

function injectStickyStyleAndAnimation() {
    var a = document.createElement("style");
    a.textContent = "\n\t\t.hl-active-sticky {\n\t\t\tposition: fixed;\n\t\t\ttop: -100%;\n\t\t\tz-index: 9999;\n\t\t\tleft: 50%;\n\t\t\ttransform: translateX(-50%);\n\t\t\tmargin: 0;\n\t\t\ttransition : margin-top .5s ease;\n\t\t\tanimation: hlSlideDown .5s forwards;\n\t\t}\n\n\t\t.hl-navbar-hanging{\n\t\t\tmargin-top : 5px !important;\n\t\t}\n\n\t\t@keyframes hlSlideDown{\n\t\t\t0%{top : -100px;}\n\t\t\t100%{top : 0px;}\n\t\t}\n\t\t.headline_ad__box {display: flex;justify-content: center;align-items: center;}", document.head.appendChild(a)
}
/* ============ HEADLINE STICKY - DEFAULT 7s ============ */

/** GPT END */

var _PARENT_BODY_ = null;
var _PARENT_BODY_TARGET_ = null;
var _TOPFRAME_PARENT_WRAPPER_ = null;
var _TOPFRAME_WRAPPER_ = null;
var _TOPFRAME_STICKY_ = false;
var _TOPFRAME_STICKY_END_ = false;
var _TOPFRAME_STICKY_LAST_SCROLL_ = 0;
var _TOPFRAME_STICKY_LAST_SCROLL_END_ = 0;
var _TOPFRAME_STICKY_SCROLL_SPEED_ = 10;
var _TOPFRAME_STICKY_IS_READY_ = false;
var _turnOff_ = false;
var _IS_IOS_ = parent.window.navigator.platform.match(/iPhone|iPod|iPad/);
var _ORINETATION_ = (_IS_IOS_) ? parent.window.orientation : parent.screen.orientation.angle;

var _TOPFRAME_STICKY_CUSTOM_STYLE_ = document.createElement("style");

if (['ChannelPage', 'TagPage'].indexOf(kly.pageType) == -1) {
    document.addEventListener("DOMContentLoaded", _INIT_STICKY_TOPFRAME_);

    function _INIT_STICKY_TOPFRAME_() {
        //edit start 
        _PARENT_BODY_ = document.querySelector("body");
        _PARENT_BODY_TARGET_ = document.querySelector("main");
        _TOPFRAME_PARENT_WRAPPER_ = document.querySelector("#div-gpt-ad-topfrm-parallax-wrapper");
        _TOPFRAME_WRAPPER_ = document.querySelector("#div-gpt-ad-topfrm-parallax-wrapper");
        //edit end
        _PARENT_BODY_TARGET_.style = '';
        document.addEventListener("scroll", _TOPFRAME_STICKY_SCROLL_);
        document.addEventListener("scroll", _UPDATE_SCROLL_);
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
        if (_TOPFRAME_STICKY_) {
            var _scrolltop_ = document.documentElement.scrollTop;
            if (_scrolltop_ >= 0) {
                _TOPFRAME_STICKY_STYLE_();
                _TOPFRAME_STICKY_TWEAK_();
                _TOPFRAME_STICKY_ = false;
                _TOPFRAME_PARENT_WRAPPER_.classList.add("sticky");
                _TOPFRAME_WRAPPER_.classList.add("sticky");
                _TOPFRAME_STICKY_COUNTDOWN_(7);
                document.removeEventListener("scroll", _TOPFRAME_STICKY_SCROLL_);
                if (document.querySelector('.topframe_is_sticky') !== null) {
                    document.querySelector('.topframe_is_sticky').classList.add('sticky_on'); // new additional
                }
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
            _PARENT_BODY_TARGET_.classList.remove('sticky_on'); // new additional
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
            document.documentElement.scrollTo(0, _TOPFRAME_STICKY_LAST_SCROLL_END_);
        }, 200);
    }

    function _TOPFRAME_STICKY_COUNTDOWN_(_time_) {
        _TOPFRAME_STICKY_LAST_SCROLL_ = document.documentElement.scrollTop;
        var _target_ = document.querySelector(".topframe-sticky-counter");
        var countdown = setInterval(function() {

            _target_.textContent = 'Penawaran sponsor berakhir setelah ( ' + _time_ + ' )';
            if (_time_ <= 0 || _turnOff_) {
                _TOPFRAME_PARENT_WRAPPER_.style.top = '-100vh';
                _TOPFRAME_PARENT_WRAPPER_.style.transition = 'top .5s ease';

                setTimeout(function() {
                    _UNSET_TOPFRAME_STICKY_();
                }, 700);
                clearInterval(countdown);
                _target_.remove();
            }
            _time_--;
        }, 1000);

    }

    function _UPDATE_SCROLL_() {
        if (!_TOPFRAME_STICKY_END_) {
            var scrollTop = document.documentElement.scrollTop;
            _TOPFRAME_STICKY_LAST_SCROLL_END_ = _TOPFRAME_STICKY_LAST_SCROLL_ + (scrollTop / (_TOPFRAME_STICKY_SCROLL_SPEED_ / 4));
            document.querySelector('.topframe_is_sticky') && (document.querySelector('.topframe_is_sticky').style.transform = 'translateY(' + -(_TOPFRAME_STICKY_LAST_SCROLL_END_) + 'px)');
        }
    };

    function _TOPFRAME_STICKY_STYLE_() {
        var _P_ = document.createElement("p");
        _P_.classList.add("topframe-sticky-counter");
        _P_.textContent = "Penawaran sponsor berakhir setelah (7)";
        _TOPFRAME_PARENT_WRAPPER_.appendChild(_P_)
        var _H_ = document.querySelector("body").clientHeight;
        // new additional 
        //update layout.topframe_is_sticky to layout.topframe_is_sticky.sticky_on
        // edit start
        _TOPFRAME_STICKY_CUSTOM_STYLE_.textContent = 'body{height: ' + (_H_ * 20) + 'px;scroll-behavior: smooth;width : 100vw} .layout.topframe_is_sticky.sticky_on::before {content: "";position: relative;height: 110.41666666666667vw !important;display: block;} .topframe_is_sticky{position:fixed ; top : 0px; left:0px;transition: all 1s ease; width: 100vw;} .topframe_is_sticky header{margin-bottom: -12px} .layout__ads{ transition: all 1s ease; } .topframe-sticky-counter {display : none;} .layout__ads.sticky { position: fixed; z-index: 99; height: calc(100vw *(267 / 414) + 25px ); } #div-gpt-ad-topfrm-parallax-wrapper.sticky::after , #div-gpt-ad-topfrm-parallax-wrapper.sticky::before { position: absolute; height: 25px; width: 100vw; left: 0; } #div-gpt-ad-topfrm-parallax-wrapper.sticky::after { content: ""; top: calc(100vw *(267 / 414) ); background: #0072FF; z-index: 100; animation: progress-bar 7s forwards linear; } #div-gpt-ad-topfrm-parallax-wrapper.sticky::before { content: ""; top: calc(100vw *(267 / 414) ); background: #212121; z-index: 99; } .sticky .topframe-sticky-counter { display : block; top: calc((100vw *(267 / 414) ) + 8px); color : #fff; line-height : 14px; z-index: 101; -webkit-animation: webkit-progress-count 7s forwards linear; animation: progress-count 7s forwards linear; width: 100%; margin: 0px; position: absolute; text-align: center; font-family: sans-serif; } div#div-gpt-ad-topfrm-parallax-wrapper, div#div-gpt-ad-topfrm-parallax-wrapper.sticky #div-gpt-ad-merdeka-topfrm-oop iframe { transition: all .3s ease; } div#div-gpt-ad-topfrm-parallax-wrapper.sticky { height: calc(100vw *(267 / 414)) !important; position: fixed !important; top: 0px; z-index : 9; } div#div-gpt-ad-topfrm-parallax-wrapper.sticky #div-gpt-ad-merdeka-topfrm-oop iframe { transform: scale(.55); top: calc((-110.41666666666667vw * .42) / 2) !important; } @keyframes progress-bar{ from {width: 0px;} to{width: 100vw;} }';
        // edit end

        _PARENT_BODY_TARGET_.appendChild(_TOPFRAME_STICKY_CUSTOM_STYLE_);

    }

    function _TOPFRAME_STICKY_TWEAK_() {
        // edit start
        var _CONTAINER_TARGET_ = document.querySelector("main");
        var _FIRST_CHILD_ELEMENT_ = _CONTAINER_TARGET_.firstElementChild;

        _CONTAINER_TARGET_.insertBefore(document.querySelector("header"), _FIRST_CHILD_ELEMENT_);
        // _CONTAINER_TARGET_.appendChild(document.querySelector("footer"));

        if (kly.pageType.toLowerCase() != 'readpage') {
            _CONTAINER_TARGET_.appendChild(document.querySelector("#mdk-to-top"));
            _CONTAINER_TARGET_.appendChild(document.querySelector(".channel-section"));
        }
        // edit end
    }
}
