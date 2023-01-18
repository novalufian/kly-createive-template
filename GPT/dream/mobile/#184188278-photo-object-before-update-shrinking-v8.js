/*PROTOTYPE CUSTOM FILTERING*/
String.prototype.klyFiltering = function(delimiter) {
    return this.trim().split(delimiter).map(function(t) { return t.trim().toLowerCase() }).filter(x => x != "");
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
        code: "div-gpt-ad-dream-sc",
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
            { bidder: "innity", params: { zone: 97857, pub: 539 } },
            { bidder: "teads", params: { pageId: 151767, placementId: 167816 } },
            { bidder: 'pubmatic', params: { publisherId: '156536', adSlot: 'Prebid-Dream-Mobile-300x250_1' } },
            { bidder: 'rubicon', params: { accountId: 12534, siteId: 377456, zoneId: 2082386 } },
            { bidder: 'unruly', params: { siteId: 243584 } },
            { bidder: 'medianet', params: { cid: '8CUWX4UX4', crid: '576550861' } },
            { bidder: 'smartadserver', params: { domain: 'https://prg-apac.smartadserver.com', networkId: 4221, siteId: 498331, pageId: 1556523, formatId: 111310 } },
            { bidder: "openx", params: { delDomain: "emtek-d.openx.net", unit: "556894065" } },
            { bidder: "oftmedia", params: { placementId: "27497142" } },
            { bidder: "yahoossp", params: { dcn: '8a9695bc018383b1c995c64cb33d0247', pos: '8a969d80018383b1b722c64cfdb60237' } },
          	{ bidder: "taboola", params: { tagId: 'showcase_homepage_1', publisherId: '1501403', } },
          	{ bidder: "triplelift", params: { inventoryCode: 'Dream_Mobile_300x250_Pubmatic' } },
        ],
    },
    {
        code: "div-gpt-ad-dream-hl",
        mediaTypes: {
            banner: {
                sizes: [
                    [320, 50],
                    [320, 100],
                ],
            },
        },
        bids: [
            { bidder: "innity", params: { zone: 97856, pub: 539 } },
            { bidder: 'pubmatic', params: { publisherId: '156536', adSlot: 'Prebid-Dream-Mobile-320x50_1' } },
            { bidder: 'rubicon', params: { accountId: 12534, siteId: 377456, zoneId: 2082386 } },
            { bidder: 'medianet', params: { cid: '8CUWX4UX4', crid: '888142531' } },
            { bidder: 'smartadserver', params: { domain: 'https://prg-apac.smartadserver.com', networkId: 4221, siteId: 498331, pageId: 1556523, formatId: 111312 } },
            { bidder: "openx", params: { delDomain: "emtek-d.openx.net", unit: "556894061" } },
            { bidder: 'ix', params: { siteId: '802752' } },
            { bidder: "teads", params: { pageId: 153503, placementId: 167815 } },
            { bidder: "oftmedia", params: { placementId: "27497141" } },
            { bidder: "yahoossp", params: { dcn: '8a9695bc018383b1c995c64cb33d0247', pos: '8a96992f018383b1c311c64d7ca10243' } },
            { bidder: "taboola", params: { tagId: 'headline_homepage_1', publisherId: '1501403', } },
          	{ bidder: "triplelift", params: { inventoryCode: 'Dream_HDX_Pubmatic' } },
        ],
    },
    {
        code: "div-gpt-ad-dream-bottomfrm",
        mediaTypes: {
            banner: {
                sizes: [
                    [320, 50],
                    [320, 100],
                ],
            },
        },
        bids: [
            { bidder: "innity", params: { zone: 98055, pub: 539 } },
            { bidder: 'rubicon', params: { accountId: 12534, siteId: 377456, zoneId: 2082386 } },
            { bidder: 'medianet', params: { cid: '8CUWX4UX4', crid: '986414413' } },
            { bidder: 'smartadserver', params: { domain: 'https://prg-apac.smartadserver.com', networkId: 4221, siteId: 498331, pageId: 1556523, formatId: 111312 } },
            { bidder: "openx", params: { delDomain: "emtek-d.openx.net", unit: "556894057" } },
            { bidder: 'ix', params: { siteId: '802740' } },
            { bidder: "teads", params: { pageId: 151767, placementId: 167816 } },
            { bidder: "oftmedia", params: { placementId: "27497143" } },
            { bidder: "yahoossp", params: { dcn: '8a9695bc018383b1c995c64cb33d0247', pos: '8a969d80018383b1b722c64dba480238' } },
            { bidder: "taboola", params: { tagId: 'bottomfrm_homepage_1', publisherId: '1501403', } },
          	{ bidder: "triplelift", params: { inventoryCode: 'Dream_HDX_Pubmatic' } },
        ],
    },
    {
        code: "div-gpt-ad-dream-dfp-exposer-slot1",
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
            { bidder: "innity", params: { zone: 98056, pub: 539 } },
            { bidder: "teads", params: { pageId: 153503, placementId: 167815 } },
            { bidder: 'pubmatic', params: { publisherId: '156536', adSlot: 'Prebid-Dream-Mobile-300x600' } },
            { bidder: 'rubicon', params: { accountId: 12534, siteId: 377456, zoneId: 2082386 } },
            { bidder: 'unruly', params: { siteId: 243584 } },
            { bidder: 'medianet', params: { cid: '8CUWX4UX4', crid: '123558562' } },
            { bidder: 'smartadserver', params: { domain: 'https://prg-apac.smartadserver.com', networkId: 4221, siteId: 498331, pageId: 1556523, formatId: 111311 } },
            { bidder: "openx", params: { delDomain: "emtek-d.openx.net", unit: "556894059" } },
            { bidder: 'ix', params: { siteId: '802753' } },
            { bidder: "oftmedia", params: { placementId: "27497144" } },
            { bidder: "yahoossp", params: { dcn: '8a9695bc018383b1c995c64cb33d0247', pos: '8a96992f018383b1c311c64d40400242' } },
            { bidder: "taboola", params: { tagId: 'exposer_homepage_1', publisherId: '1501403', } },
          	{ bidder: "triplelift", params: { inventoryCode: 'Dream_Mobile_300x250_Pubmatic' } },
        ],
    },
];
var adUnitsVideo = [{
        code: "div-gpt-ad-dream-sc",
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
            { bidder: "spotx", params: { channel_id: 285432, ad_unit: "outstream", outstream_function: spotxOutstreamFunc, }, },
        ],
    },
    {
        code: "div-gpt-ad-dream-hl",
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
            { bidder: "spotx", params: { channel_id: 285432, ad_unit: "outstream", outstream_function: spotxOutstreamFunc, }, },
            { bidder: 'ix', params: { siteId: '802752' } },
        ],
    },
    {
        code: "div-gpt-ad-dream-bottomfrm",
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
                    videoAdUnit: "4045173",
                    adSlot: "kly_prebid_outstream_mobile_dream",
                    outstreamAU: "kly_prebid_outstream_mobile_dream",
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
        code: "div-gpt-ad-dream-dfp-exposer-slot1",
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
            { bidder: 'ix', params: { siteId: '802753' } },
        ],
    },
];

pbjs.bidderSettings = {
	taboola: {storageAllowed: true}
}

pbjs.que = pbjs.que || [];
googletag.cmd = googletag.cmd || [];
/** END - PREBID INIT, CONFIGURATION & GOOGLE INIT   */

/** LOAD PREBID - END */

/** GPT START */
var gpt_gam_site = window.location.hostname.toUpperCase(),
    gpt_gam_ver = 'V3.1-BF-ADS';

/*SET INTERVAL TO AUTO REFRESH BOTTOM FRAME ADS - NEW*/
window.dataLayer = window.dataLayer || [];
window.GAMLibrary = {};
window.GAMLibrary = {
    dfpBottomframe: '/36504930/KLY/MOBILE/DREAM.CO.ID/BOTTOM_FRAME',
    dfpFloatingPin: '/36504930/KLY/MOBILE/DREAM.CO.ID/FLOATING_PIN',
    dfpTopframe: '/36504930/KLY/MOBILE/DREAM.CO.ID/MASTHEAD',
    timedBottomFrm: null,
    timedFloatingPin: null,
    dfpPageNum: 1,
    topFrameFixedSize: 1,
    articleType: {
        "TextTypeArticle": { 'scroll': 50 },
        "VideoGallery": { 'scroll': 50 },
        "PhotoGallery": { 'scroll': 0 },
        "photoObjectLoader": { 'scroll': 50 },
        "default": { 'scroll': 50 },
    },
    setGamBFInterval: function(active = true) {
        if (!active) {
            clearInterval(window.GAMLibrary.gamBFInterval);
            return;
        }
        window.GAMLibrary.gamBFInterval = setInterval(function() {
            document.querySelector(".banner--bottomframe").style.display = "flex";
            document.querySelector("#dfp-spinads") && document.querySelector("#dfp-spinads").parentElement.remove();
            pbjs.setTargetingForGPTAsync(['div-gpt-ad-dream-bottomfrm']);
            googletag.pubads().refresh([window.GAMLibrary.refreshSlot]);
            typeof SPAFreezeBody == 'function' ? SPAFreezeBody(false) : '';
        }, 60000);
    },
    setGamBFCloseBtn: function() {
        let container = document.createElement("div");
        let bottomfrm = document.querySelector(".banner--bottomframe");
        container.innerHTML = ``;
        let btnClose = container.querySelector("a#dfp-bframe-close");
        btnClose.addEventListener("click", () => { bottomfrm.style.setProperty("display", "none"); });
        bottomfrm.insertAdjacentElement("beforeend", btnClose);
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
                    this.timedBottomFrm = googletag.defineSlot(this.dfpBottomframe, [
                        [320, 50],
                        [320, 100]
                    ], 'div-gpt-ad-dream-bottomfrm').addService(googletag.pubads()).setTargeting('pagingNum', '1');
                    setTimeout(() => {
                        if (pbjs) {
                            pbjs.setTargetingForGPTAsync(['div-gpt-ad-dream-bottomfrm']);
                            googletag.pubads().refresh([this.timedBottomFrm]);
                            this.refreshSlot = this.timedBottomFrm;
                            this.setGamBFInterval();
                            this.setGamBFCloseBtn();
                        }
                    }, 400);
                } else {
                    window.removeEventListener("scroll", this.scrollHandler);
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
                    ], 'div-gpt-ad-dream-floating-pin').addService(googletag.pubads()).setTargeting('pagingNum', '1');
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
            _domTarget_.classList.add("interscroller");
            _domTarget_.parentElement.classList.add("interscroller-wrapper");
        }
    },
    exposerInterscrollerStyle: function() {
        var interscrollerStyle = document.createElement("style");
        interscrollerStyle.textContent = ".interscroller-wrapper{min-height: 600px; background-color: var(--bg-gray);} .interscroller{position: sticky; top: 160px;}";
        document.head.appendChild(interscrollerStyle);
        document.querySelector("body").appendChild(interscrollerStyle);
    },
    _SCFlyingCarpetStyle_: function() {
        var _style_ = document.createElement("style");
        _style_.textContent = `div[id*="showcase-page"].flying-carpet { position: relative; clear: both; overflow: hidden; clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%) !important; min-height: 270px; width: 100%; display: flex; justify-content: center; } div[id*="showcase-page"] .ad-content { top: 50%; transform: translateY(-50%); position: fixed; z-index: 2; }`;
        document.querySelector("body").appendChild(_style_)
    },
    _SCFlyingCarpetEffect_: function(event) {
        var _domId_ = event.slot.getSlotId().getDomId();
        var _domTarget_ = document.getElementById(_domId_)
        var _is300x600_ = JSON.stringify(event.size) == '[300,600]'
        if (_is300x600_ && _domId_.includes("sc") || _is300x600_ && _domId_.includes("showcase")) {
            _domTarget_.classList.add("flying-carpet")
            _domTarget_.querySelector("div").classList.add("ad-content")
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
            /*tagForAds = _klyObject.gtm.tag.replace(/[^A-Za-z0-9|\- ]/ig, "").klyFiltering("|");*/
            dfp_tag = _klyObject.gtm.tag || _klyObject.tag && _klyObject.tag.name,
            tagForAds = typeof dfp_tag === 'undefined' ? [] : dfp_tag.replace(/[^A-Za-z0-9|\- ]/ig, "").klyFiltering("|");

        const bsKeywordList = {
            'adult': ['adegan erotis', 'adegan seks', 'aduhai', 'adult', 'affair', 'air mani', 'alat bantu seks', 'alat kelamin', 'alat kontrasepsi', 'alat vital pria', 'alergi', 'anal', 'anatomi vagina', 'anjeng', 'anjing', 'anjlng', 'anjrit', 'anus', 'anying', 'apa itu kondom', 'artis indonesia bugil', 'artis porno', 'ass', 'asu', 'ayam hitam', 'babi', 'bahaya masturbasi', 'bajingan', 'bandar ceme', 'bangsat', 'bdsm', 'bego', 'belahan', 'bentuk kelamin', 'bentuk payudara', 'bercinta', 'bercinta saat hamil', 'bergairah', 'berhubungan intim', 'berhubungan seks', 'berhubungan seksual', 'bersetubuh', 'bikini', 'bintang film porno', 'bintang porno', 'biseksual', 'bitch', 'bocah sd foto mesum', 'body shaming', 'bokne', 'bokong', 'bom surabaya 2018', 'boneka seks', 'boob', 'bra', 'bugil', 'bullshit', 'bulshit', 'bulu kemaluan', 'bunuh diri', 'cabul', 'cara berhubungan intim', 'cara membuat suami bergairah', 'cara memperbesar penis', 'cara mengatasi ejakulasi dini', 'cara seksual', 'celana', 'cemani', 'cemen', 'chat firza-rizieq', 'ciuman', 'cleavage', 'cock', 'cok', 'cukur bulu kemaluan', 'cum', 'dada', 'death', 'dewasa', 'di bawah umur', 'dick', 'dildo', 'diremas', 'disfungsi ereksi', 'doggie', 'doll', 'drunk', 'ejakulasi', 'ejakulasi dini', 'ejakulasi wanita', 'eksotik', 'elo', 'entot', 'ereksi', 'erotic', 'erotis', 'ewe', 'exotic', 'fakta seks', 'fase menstruasi', 'fenomena kelainan seksual', 'fetish', 'film porno', 'foreplay', 'foto berhubungan intim', 'foto intim', 'foto telanjang', 'fuck', 'gairah', 'gairah seks', 'gairah seksual', 'gangbang', 'gangguan jiwa', 'gangguan seks', 'ganguan jiwa', 'ganguan seksual', 'ganja', 'gay', 'gaya bercinta', 'gaya bercinta dalam islam', 'gaya bercinta yang disukai pria', 'gaya seks', 'gejala penyakit', 'gemar368', 'germo', 'goblok', 'gue', 'gwe', 'hardcore', 'hasrat seksual', 'henceut', 'hindu', 'hitam mafia', 'homoseks', 'horny', 'hot', 'hubungan', 'hubungan intim', 'hubungan seksual', 'ibu hamil', 'implan payudara', 'industri film porno', 'intim', 'itil', 'jancok', 'jancuk', 'jenis alat kontrasepsi', 'jerawat', 'jual beli sperma', 'kacau', 'kakek cabul', 'kamasutra', 'kanibal', 'kanibalisme', 'kanker payudara', 'kapalan', 'kasus asusila', 'kebencian', 'kecanduan seks', 'kehidupan seks', 'kekerasan seksual', 'kelainan seks', 'kelamin', 'kelamin wanita', 'kemaluan', 'kemaluan wanita', 'kencing', 'keperawanan', 'keriting', 'kesehatan kulit dan kelamin', 'kesehatan payudara', 'kesehatan penis', 'kesehatan reproduksi', 'kesehatan wanita', 'khusus deewasa', 'kimpet', 'kisah perselingkuhan', 'kiss', 'klitoris', 'komunitas swinger', 'kondom', 'kondom pria', 'kontol', 'kontolnya', 'kontrasepsi', 'kontroversi hukuman mati', 'kontroversi lgbt', 'kotor', 'kotoran', 'kristen', 'kumuh', 'kursi tantra seks', 'legalisasi ganja', 'lemari es', 'lendir', 'lesbian', 'lgbt', 'libido', 'lingerie', 'lolita', 'lonte', 'm3m3k', 'mabuk', 'mahasiswi', 'mainan dewasa', 'mainan perangsang gairah', 'makanan berbahaya', 'makanan sehat', 'masa subur pria', 'masturbasi', 'matcont', 'mature', 'meki', 'melakukan hubungan intim', 'memek', 'memerkosa', 'mencukur bulu kemaluan', 'menggairahkan', 'menggoda', 'mengupas', 'menstruasi', 'menyiangi', 'meraba-raba', 'mesra', 'mesum', 'mimpi seks', 'mimpi telanjang', 'miss-v', 'mitos seks', 'model hot', 'model seksi', 'monyet', 'mr-p', 'mucikari siswi smp', 'nakal', 'naked', 'naughty', 'ngentot', 'ngewe', 'nipple', 'nipples', 'nonok', 'nude', 'obat ejakulasi dini', 'obat kuat', 'obat pembesar', 'obat pembesar penis terbaik', 'onani', 'oral', 'oral seks', 'organ', 'organ intim wanita', 'orgasme', 'orgasme wanita', 'overdose', 'overdosis', 'paha', 'pakistan', 'pamer', 'pantat', 'panties', 'payudara', 'payudara kecil', 'payudara wanita', 'pelacur', 'pelecehan', 'pelecehan seksual', 'pembesar penis', 'pembunuh', 'pembunuhan', 'pemerkosaan', 'pemerkosaan anak', 'pemuda', 'pencabulan', 'penetrasi', 'penetratif', 'pengetahuan seks', 'pengobatan alternatif', 'penis', 'penis bengkok', 'penis besar', 'penis kecil', 'penis pria', 'penyakit sipilis', 'penyakit vagina', 'penyimpangan seks', 'perawan', 'perawatan vagina', 'perbudakan', 'perek', 'perguruan tinggi', 'perkosa', 'perkosaan', 'permen', 'perselingkuhan', 'piss', 'play boy', 'pole', 'porn', 'porno', 'pornoaksi', 'pornografi', 'posisi bercinta', 'posisi hubungan intim suami istri menurut islam', 'posisi seks', 'posisi seksual', 'pria dewasa', 'pria idaman', 'prostitusi', 'provokatif', 'pukang', 'puki', 'puting', 'puting payudara', 'putting', 'radikal', 'raksasa', 'rangsang payudara', 'ranjang', 'rasis', 'rasisme', 'razia pasangan mesum', 'rokok', 'rudapaksa', 'rumah bordil', 'sbobet', 'seks', 'seks bebas', 'seks dalam islam', 'seks dan agama', 'seks dan kriminal', 'seks dan pasutri', 'seks oral', 'seks pria dan wanita', 'seks toy', 'seksi', 'seksual', 'seksual lelaki dan perempuan', 'seksualitas', 'seksualitas pria', 'seksualitas wanita', 'semen', 'sensual', 'seronok', 'sex', 'sex toy', 'sexy', 'shit', 'siklus menstruasi', 'situs poker terpercaya', 'situs porno', 'skandal', 'sperma', 'stres dan depresi', 'strip', 'striptease', 'striptis', 'suicide', 'sundulan', 'swinger', 'syur', 'tai', 'taik', 'tamparan', 'tante seksi', 'taruhan online', 'telanjang', 'telentang', 'terangsang', 'teroris', 'terorisme', 'tes keperawanan', 'test pack', 'testis', 'tiduri', 'tips bercinta', 'tips seks', 'titik rangsang', 'titit', 'toket', 'tolol', 'topless', 'toys', 'ujian', 'ukuran normal penis', 'ukuran penis', 'ukuran penis normal', 'ukuran penis orang indonesia', 'ukuran vagina', 'vagina', 'vagina gatal', 'vagina wanita', 'vakum pembesar penis', 'viagra', 'vibrator', 'video bercinta dengan pasangan', 'video porno', 'video seks', 'virus corona', 'vital', 'wanita telanjang', 'waria', 'woman on top', 'xxx', 'xxxx online'],
            'war_politics': ['ahed tamimi', 'ahok gugat cerai veronica tan', 'aliran sesat', 'anarkis', 'anarkisme suporter sepakbola', 'begal motor', 'bentrok suporter', 'bentrokan', 'bentrokan warga', 'berita hoax', 'capres jokowi', 'capres prabowo', 'fanatik', 'fpi', 'g30s', 'invasi rusia', 'jemaah ansharut daulah', 'kebohongan ratna sarumpaet', 'kediktatoran arab saudi', 'kekerasan pada wartawan', 'killing', 'kisah mualaf', 'koalisi jokowi', 'koalisi pilpres 2019', 'koalisi prabowo', 'konflik palestina israel', 'konflik palestina-israel', 'konflik rusia ukraina', 'konflik suriah', 'lia eden', 'luwu timur', 'nato', 'penembakan', 'penganiayaan', 'pengawal', 'pengeroyokan', 'penistaan agama', 'perang', 'perang di ukraina', 'perang dunia', 'perang dunia 3', 'perang rusia', 'peristiwa', 'pilpres 2019', 'prabowo subianto', 'prabowo-sandiaga', 'presiden rusia', 'presiden ukraina', 'propaganda rusia', 'ratna sarumpaet', 'rokok elektrik', 'rusia', 'rusia dan ukraina', 'rusia serang ukraina', 'senjata rusia', 'serang ukraina', 'serangan', 'suporter tewas', 'taliban', 'ternyata hoax', 'ujaran kebencian', 'ukraina', 'vladimir putin'],
            'drugs_tobacco_alcohol': ['adiktif', 'akibat merokok', 'alcohol', 'alkohol', 'artis narkoba', 'asap rokok', 'bahaya berhenti merokok', 'bahaya merokok', 'bahaya narkoba', 'bahaya rokok', 'bahaya rokok elektrik', 'berhenti merokok', 'bnn', 'cancer', 'candy', 'cara berhenti merokok', 'cbd', 'ciri ciri pengguna narkoba', 'dampak merokok', 'djarum', 'drugs', 'efek berhenti merokok', 'ganja', 'hash', 'impotensi', 'jantung', 'jenis alkohol', 'jenis alkohol dalam minuman keras', 'jenis jenis narkoba', 'jenis narkotika', 'kanker', 'kartel narkoa', 'kasus narkoba', 'kecanduan', 'kesehatan paru', 'larangan merokok', 'mafia narkoba', 'manfaat berhenti merokok', 'merokok', 'minuman beralkohol', 'minuman keras', 'narkoba', 'narkoba artis', 'obat psikotropika', 'overdosis', 'pelanggaran', 'penyalahgunaan narkoba', 'penyeludupan narkoba', 'perokok', 'pot', 'pppa', 'rehabilitasi narkoba', 'remaja narkoba', 'rokok', 'rokok elektrik', 'ruu minuman beralkohol', 'sabu', 'selebriti narkoba', 'sidang narkoba', 'stroke', 'tablet', 'tembakau', 'tips berhenti merokok'],
            'disaster': ['10 macam pencemaran lingkungan', 'autopsi', 'bahaya pencemaran udara', 'bahaya polusi', 'belasungkawa', 'bencana', 'bencana besar', 'bom', 'bom atom', 'bom bali', 'bom bunuh diri', 'bom gereja', 'bom meledak', 'bom nuklir', 'bom panci', 'bom sarinah', 'bom seks', 'bunuh orang', 'cara mencegah global warming', 'cara mencegah pemanasan global', 'cara mengatasi pemanasan global', 'cara mengatasi pemanasan global sebagai pelajar', 'cara mengatasi pencemaran udara', 'climate change', 'contoh pencemaran lingkungan', 'dampak pencemaran lingkungan', 'dampak pencemaran udara', 'darurat bencana', 'dilaporkan tewas', 'dimakamkan', 'dinyatakan meninggal', 'dipastikan tewas', 'ditemukan mati', 'ditemukan tewas', 'efek rumah kaca', 'efek rumah kaca adalah', 'fenomena alam', 'gas rumah kaca', 'gempa donggala', 'gempa palu', 'gempa sulawesi tengah', 'global warming', 'global warming adalah', 'hilangkan nyawa', 'hilangnya nyawa', 'identitas korban', 'inalillahi', 'isis', 'jasad', 'jasad korban', 'jasadnya', 'jenasah wanita', 'jenazah', 'jenazah pria', 'jenazah teridentifikasi', 'jenis pencemaran lingkungan', 'kapal tenggelam', 'kapal tenggelam di danau toba', 'kasus penebangan pohon', 'kasus tabrak lari', 'keadaan kritis', 'kecelakaan', 'kecelakaan bus', 'kehilangan darah', 'kehilangan hidupnya', 'kehilangan nyawa', 'kehilangan nyawanya', 'kematian', 'korban', 'korban jiwa', 'korban meninggal', 'korban tewas', 'kota paling berpolusi', 'kota paling berpolusi didunia', 'krisis iklim', 'kualitas udara', 'ledakan bom', 'limbah', 'limbah pabrik', 'lion air hilang kontak', 'lion air jatuh', 'lion air jatuh di karawang', 'macam pencemaran lingkungan', 'mati', 'mayat', 'mayat korban', 'memakan nyawa', 'membunuh', 'membunuh istrinya', 'membunuh mereka', 'membunuh suaminya', 'menelan nyawa', 'menemui ajal', 'menewaskan', 'menewaskan orang', 'mengalami koma', 'mengancam nyawa', 'menghembuskan nafas terakhir', 'menimbulkan korban', 'meninggal', 'meninggal akibat sakit', 'meninggal dunia', 'menyebabkan kematian', 'meregang nyawa', 'meregggut nyawa', 'merenggut jiwa', 'merenggut nyawa', 'modar', 'nyawa hilang', 'nyawa melayang', 'nyawa tak tertolong', 'orang mati', 'orang tewas', 'pelayat', 'pemakaman', 'pemanasan global', 'pemanasan global adalah', 'pembunuhan', 'pembunuhan sadis', 'pencemaran', 'pencemaran air', 'pencemaran air bersih', 'pencemaran air laut', 'pencemaran limbah', 'pencemaran lingkungan', 'pencemaran minyak', 'pencemaran sungai', 'pencemaran sungai brantas', 'pencemaran udara', 'penemuan mayat', 'pengertian efek rumah kaca', 'pengertian efek rumah kaca menurut para ahli', 'pengertian pemanasan global', 'penyakit polusi udara', 'penyakit yang disebabkan oleh polusi udara', 'penyebab efek rumah kaca', 'penyebab global warming', 'penyebab kematian', 'penyebab kerusakan lingkungan', 'penyebab pemanasan global', 'penyebab pemanasan global akibat aktivitas manusia', 'penyebab pencemaran air', 'penyebab pencemaran udara', 'penyebab perubahan iklim', 'penyebab perubahan iklim global', 'penyebab polusi udara', 'penyebab terjadinya efek rumah kaca', 'penyebab terjadinya pemanasan global', 'penyebab terjadinya pemanasan global dan efek rumah kaca', 'perubahan iklim', 'perubahan iklim global', 'pesawat hilang kontak', 'pesawat jatuh', 'petugas penyelamat', 'pollution', 'polusi', 'polusi jakarta', 'polusi udara', 'polusi udara di jakarta', 'polutan', 'renggut nyawa', 'sampah plastik', 'tak bernyawa', 'tak sadarkan diri', 'telah meninggal', 'telan nyawa', 'terbunuh', 'terkapar', 'teror bom', 'tewas', 'tewaskan', 'tidak bernyawa', 'tim penyelamat', 'tsunami palu', 'tutup usia', 'udara bersih', 'udara jakarta', 'wafat', 'wanita meninggal'],
            'epidemic_desease': ['corona', 'corona di indonesia', 'covid', 'covid 19', 'covid-19', 'doctor', 'dokter', 'health', 'healthy', 'hospital', 'infeksi saluran kencing', 'insomnia dan tidur', 'kematian', 'kematian virus', 'kematian wabah', 'kesehatan', 'korban terinfeksi', 'korona', 'obesitas', 'odp', 'osteoporosis', 'pdp', 'penyakit', 'positif korona', 'rsud', 'rumah sakit', 'sakit pernapasan', 'sehat', 'sesak', 'terinfeksi virus corona', 'terjangkit covid-19', 'terkena', 'virus', 'virus corona', 'virus korona', 'virus menyerang', 'virus-corona', 'wabah', 'wabah corona'],
            'religion': ['15lam', 'abu bakar al-baghdadi', 'al quran', 'al-quran', 'buda', 'budha', 'ibrahim al-hashimi al-qurayshi,', 'injil', 'isl4m', 'islam', 'ismi aisyah', 'jimat', 'kafir', 'katolik', 'muh4mmad', 'muhammad', 'muhammad saw', 'nabi', 'yesus'],
            'gambling': ['agen poker', 'agen sbobet', 'bonus deposit', 'bonus refferal', 'bonus rollingan', 'cashtree', 'judi', 'minimal deposit', 'poker', 'poker online'],
            'parenting': ['anak', 'anak artis', 'anak cerdas', 'anak dan balita', 'anak mandiri', 'anak selebritis', 'anak selebritis indonesia', 'arti nama anak', 'arti nama bayi', 'artis bercerai', 'artis hamil', 'asi anak', 'ayah', 'baby', 'baby ameena', 'baby arsy', 'baby bump', 'baby bump artis', 'baby dan balita', 'baby face', 'baby gempi', 'baby leslar', 'baby shower', 'baby shower selebritis', 'baby sitter', 'baby spa', 'baby walker', 'babymoon', 'babymoon artis', 'babyologist', 'baru lahir', 'bayi', 'bayi 6 bulan', 'bayi artis', 'bayi dan anak', 'bayi kembar', 'bayi muntah', 'bayi pilek', 'bayi seleb', 'bayi selebritis', 'bayi selebritis indonesia', 'bayi tabung', 'camilan bayi', 'cara mengeluarkan dahak pada bayi', 'child', 'children', 'family', 'father', 'gaya baby', 'ibu', 'ibu anak', 'induk', 'jadwal makan bayi', 'jam tidur bayi', 'kehamilan', 'keibuan', 'kelahiran anak', 'kelahiran bayi', 'keluarga', 'keluarga artis', 'keluarga bahagia', 'keluarga dan anak', 'keluarga harmonis', 'keluarga penjabat', 'keluarga seleb', 'kesehatan bayi', 'kesehatan bayi dan balita', 'kesehatan keluarga', 'kid', 'masalah anak', 'mendidik anak', 'menyusui', 'mother', 'mpasi', 'nama anak', 'nama anak islam', 'nama anak kristen', 'nama anak laki laki', 'nama anak perempuan', 'nama anak sansekerta', 'nama bayi', 'nama bayi islam', 'nama bayi kristen', 'nama bayi laki laki', 'nama bayi laki laki unik', 'nama bayi perempuan', 'nama bayi perempuan unik', 'nama bayi sansekerta', 'newborn', 'orang tua', 'parent', 'parenting', 'pendidikan', 'penyakit bayi', 'penyebab bayi muntah', 'perawatan bayi', 'perceraian artis', 'perkembangan janin', 'perlengkapan bayi', 'pertumbuhan anak', 'pijat bayi', 'remaja', 'resep mpasi', 'school', 'sekolah', 'spa baby', 'tips parenting', 'ucapan kelahiran', 'youth']
        };

        /*change this acording to the site page layout*/
        var siteContentObject = document.getElementsByClassName("detail-body");
        var siteContentText = "";

        if (siteContentObject.length) {
            siteContentText = siteContentObject[0].innerText;

            /*removing BACA JUGA box since it unrelated with main content*/
            /*change this acording to the site page layout*/
            var baca_juga_elements = siteContentObject[0].getElementsByClassName("detail__terkait");
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

document.addEventListener("DOMContentLoaded", GAMLibrary.exposerInterscrollerStyle);
document.addEventListener("DOMContentLoaded", GAMLibrary._SCFlyingCarpetStyle_);

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

googletag.cmd.push(function() {
    var urlPath = document.URL;

    /*SET NEW BRAND SAFETY LOGIC*/
    GAMLibrary.brandSafetyChecker();

    /*OUT OF PAGE SLOTS*/
    if (GAMLibrary.topFrameFixedSize) {
        window.GAMLibrary.topframe = googletag.defineSlot(GAMLibrary.dfpTopframe, [1, 1], 'div-gpt-ad-dream-topfrm-oop').addService(googletag.pubads()).setTargeting('pagingNum', '1');
    } else {
        window.GAMLibrary.topframe = googletag.defineOutOfPageSlot(GAMLibrary.dfpTopframe, 'div-gpt-ad-dream-topfrm-oop').addService(googletag.pubads()).setTargeting('pagingNum', '1');
    }

    /*Bottom Frame Scrolling*/
    GAMLibrary.scrollBottomFrame();
    /*Bottom Frame Scrolling*/

    /*GAMLibrary.scrollFloatingPin();*/

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
            window.AhoyEvent.sendPersonalizationUserEvent(cdpData);
        }
    });
    /* END - Send Impression Tracker Data To CDP */

    googletag.pubads().addEventListener('slotRenderEnded', function(event) {
        GAMLibrary.exposerInterscroller(event);
        GAMLibrary._SCFlyingCarpetEffect_(event);

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

    googletag.pubads().setTargeting("IsObjectPage", ["1"]);
    /*  START TARGETING BLOCK   */
    googletag.pubads().setTargeting("tags", tagForAds);
    googletag.pubads().setTargeting("currentUrl", urlPath);
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
    /* SET VISITOR ID AS PUBLISHER PROVIDED ID - START*/
    var cVisitorId = (visId = document.cookie.split("ahoy_visitor")[1]) ? visId.split(';')[0].replace(/[^a-zA-Z0-9]/ig, '') : false;
    if (cVisitorId) {
        googletag.pubads().setPublisherProvidedId(cVisitorId + 'kly');
    }
    /* SET VISITOR ID AS PUBLISHER PROVIDED ID - END*/
    googletag.pubads().setCentering(true);
    googletag.pubads().enableSingleRequest();
    googletag.pubads().collapseEmptyDivs();
    googletag.pubads().disableInitialLoad();
    googletag.enableServices();

    /* REFRESH ON DEMAND */
    googletag.pubads().refresh([window.GAMLibrary.topframe]);

});

/* INITIATE PREBID */
var prebidObject = new PrebidInstantiate(1000, 3000, 1000, adUnitsDisplay, adUnitsVideo, priceGranularityConfig);
/*SHOWADS*/
function showAds(adsContainer, size, adunit) {
    if (adsContainer && size && adunit) {
        if (adunit === "dfp-sc") {
            adunit = "SHOWCASE";
        } else if (adunit === "dfp-headline") {
            adunit = "HEADLINE";
        } else if (adunit === "dfp-exposer") {
            adunit = "EXPOSER";
        }
        /*convert size attribute from string to array*/
        var sizes = [],
            adunitPath = '/36504930/KLY/MOBILE/DREAM.CO.ID/' + adunit,
            adSlot;

        GAMLibrary.dfpPageNum++;
        size.split(",").forEach(function(item, index) {
            if (item == 'fluid') {
                sizes[index] = item;
            } else {
                sizes[index] = item.split("x").map(Number);
            }
        });

        /*making adrequest*/
        googletag.cmd.push(function() {
            adSlot = googletag.defineSlot(adunitPath, sizes, adsContainer)
                .addService(googletag.pubads())
                .setTargeting('pagingNum', GAMLibrary.dfpPageNum);
        });

        /*prebid slots handler*/
        pbjs.que.push(function() {
            pbjs.requestBids({
                timeout: prebidObject.PREBID_TIMEOUT,
                adUnitCodes: [adsContainer],
                bidsBackHandler: function() {
                    pbjs.setTargetingForGPTAsync([adsContainer]);
                    googletag.pubads().refresh([adSlot]);
                }
            });
        });

        /** GET MESSAGE FROM SAFEFRAME CONTAINER */
        GAMLibrary.onMessageReceivedGPTUpdateCreativeStyle();
        /** GET MESSAGE FROM SAFEFRAME CONTAINER */
    }
}

var gptDreamStyle = document.createElement('style');
gptDreamStyle.textContent = '#div-gpt-ad-dream-hl{-webkit-transition:margin .5s;transition:margin .5s;margin-top:0}.dfp-hl-sticky{position:fixed;top:0;min-height:50px;left:50%;margin-left:-160px!important;z-index:99999}';
window.onload = function() {
    document.body.appendChild(gptDreamStyle);
};

var _PARENT_BODY_ = null;
var _PARENT_BODY_TARGET_ = null;
var _TOPFRAME_PARENT_WRAPPER_ = null;
var _TOPFRAME_WRAPPER_ = null;
var _TOPFRAME_STICKY_ = false;
var _TOPFRAME_STICKY_END_ = false;
var _TOPFRAME_STICKY_LAST_SCROLL_ = 0;
var _TOPFRAME_STICKY_LAST_SCROLL_END_ = 0;
var _TOPFRAME_STICKY_SCROLL_SPEED_ = 10;
var _TOPFRAME_STICKY_TIME_ = 7;
var _TOPFRAME_STICKY_IS_READY_ = false;

var _turnOff_ = false;
var _IS_IOS_ = parent.window.navigator.platform.match(/iPhone|iPod|iPad/);
var _ORINETATION_ = (_IS_IOS_) ? parent.window.orientation : parent.screen.orientation.angle;

var _TOPFRAME_STICKY_CUSTOM_STYLE_ = document.createElement("style");

document.addEventListener("DOMContentLoaded", _INIT_STICKY_TOPFRAME_);

function _INIT_STICKY_TOPFRAME_() {
    _PARENT_BODY_ = document.querySelector("body");
    _PARENT_BODY_TARGET_ = document.querySelector("main");
    _TOPFRAME_PARENT_WRAPPER_ = document.querySelector("#div-gpt-ad-topfrm-parallax-wrapper");
    _TOPFRAME_WRAPPER_ = document.querySelector("#div-gpt-ad-topfrm-parallax-wrapper");
    _PARENT_BODY_TARGET_.style = '';
    document.addEventListener("scroll", _TOPFRAME_STICKY_SCROLL_);
    _TOPFRAME_STICKY_IS_READY_ = true;
}

window.addEventListener('scroll', function() {
    if (!_TOPFRAME_STICKY_END_ && _TOPFRAME_STICKY_IS_READY_) {
        var scrollTop = document.documentElement.scrollTop;
        _TOPFRAME_STICKY_UPDATE_SCROLL_(scrollTop)
    }
}, { passive: true });

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
            //_TOPFRAME_STICKY_TWEAK_();
            _TOPFRAME_STICKY_ = false;
            _TOPFRAME_PARENT_WRAPPER_.classList.add("sticky");
            _TOPFRAME_WRAPPER_.classList.add("sticky");
            _TOPFRAME_STICKY_COUNTDOWN_();
            document.removeEventListener("scroll", _TOPFRAME_STICKY_SCROLL_);
            _PARENT_BODY_TARGET_.classList.add('sticky_on'); // new additional
            _PARENT_BODY_TARGET_.classList.add("topframe_is_sticky");
            // document.querySelectorAll('.topframe_is_sticky').moveIt();
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

    _PARENT_BODY_TARGET_.classList.remove('sticky_on');
    _PARENT_BODY_TARGET_.classList.remove("topframe_is_sticky");

    setTimeout(function() {
        document.querySelector("body").style = '';
        _PARENT_BODY_TARGET_.style = '';
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

        _target_.textContent = 'Penawaran sponsor berakhir setelah (' + _TOPFRAME_STICKY_TIME_ + ')';
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

function _TOPFRAME_STICKY_UPDATE_SCROLL_(scrollTop) {
    if (document.querySelectorAll('.topframe_is_sticky')) {
        _TOPFRAME_STICKY_LAST_SCROLL_END_ = _TOPFRAME_STICKY_LAST_SCROLL_ + (scrollTop / (_TOPFRAME_STICKY_SCROLL_SPEED_ / 4));
        document.querySelector('.topframe_is_sticky').style.transform = 'translateY(' + -(_TOPFRAME_STICKY_LAST_SCROLL_END_) + 'px)';
    }
};

function _TOPFRAME_STICKY_STYLE_() {
    var _P_ = document.createElement("p");
    _P_.classList.add("topframe-sticky-counter");
    _P_.textContent = "Penawaran sponsor berakhir setelah (7)";
    _TOPFRAME_PARENT_WRAPPER_.appendChild(_P_)
    var _H_ = document.querySelector("body").clientHeight;
    _TOPFRAME_STICKY_CUSTOM_STYLE_.textContent = 'body{height: ' + (_H_ * 20) + 'px;scroll-behavior: smooth;width : 100vw} .topframe_is_sticky.sticky_on::before {content: "";position: relative;height: 110.41666666666667vw !important;display: block;} .topframe_is_sticky{position:fixed ; top : 0px; left:0px;transition: all 1s ease; width: 100vw;} .layout__ads{ transition: all 1s ease; } .topframe-sticky-counter {display : none;} .layout__ads.sticky { position: fixed; z-index: 99; height: calc(100vw *(267 / 414) + 25px ); } #div-gpt-ad-topfrm-parallax-wrapper.sticky::after , #div-gpt-ad-topfrm-parallax-wrapper.sticky::before { position: absolute; height: 25px; width: 100vw; left: 0; } #div-gpt-ad-topfrm-parallax-wrapper.sticky::after { content: ""; top: calc(100vw *(267 / 414) ); background: #0072FF; z-index: 100; animation: progress-bar 7s forwards linear; } #div-gpt-ad-topfrm-parallax-wrapper.sticky::before { content: ""; top: calc(100vw *(267 / 414) ); background: #212121; z-index: 99; } .sticky .topframe-sticky-counter { display : block; top: calc((100vw *(267 / 414) ) + 8px); color : #fff; line-height : 14px; z-index: 101; -webkit-animation: webkit-progress-count 7s forwards linear; animation: progress-count 7s forwards linear; width: 100%; margin: 0px; position: absolute; text-align: center; font-family: sans-serif; } div#div-gpt-ad-topfrm-parallax-wrapper, div#div-gpt-ad-topfrm-parallax-wrapper.sticky #div-gpt-ad-dream-topfrm-oop iframe { transition: all .3s ease; } div#div-gpt-ad-topfrm-parallax-wrapper.sticky { height: calc(100vw *(267 / 414) + 25px) !important; position: fixed !important; top: 0px; z-index : 99999; } div#div-gpt-ad-topfrm-parallax-wrapper.sticky #div-gpt-ad-dream-topfrm-oop iframe { transform: scale(.55); top: calc((-110.41666666666667vw * .42) / 2) !important; } @keyframes progress-bar{ from {width: 0px;} to{width: 100vw;} }';
    _PARENT_BODY_TARGET_.appendChild(_TOPFRAME_STICKY_CUSTOM_STYLE_);

}

function _TOPFRAME_STICKY_TWEAK_() {
    var _WRAPPER_DREAM_ = document.querySelector("main");
    _WRAPPER_DREAM_.insertBefore(document.querySelector("header"), _WRAPPER_DREAM_.querySelector(".container"));
    googletag.pubads().refresh([window.GAMLibrary.topframe]);
}