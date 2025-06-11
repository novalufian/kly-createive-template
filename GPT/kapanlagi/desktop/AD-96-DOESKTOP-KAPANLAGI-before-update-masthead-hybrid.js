[%REMOVE_ADSENSE%]

var gptadslots = [];
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
/** END - PREBID INIT, CONFIGURATION & GOOGLE INIT   */
/** LOAD PREBID - END */

/*PROTOTYPE CUSTOM FILTERING*/
String.prototype.klyFiltering = function(delimiter) {
    return this.replace(/[\"\']/g, "").trim().split(delimiter).map(function(t) {
        return t.trim().toLowerCase()
    }).filter(function(x) {
        return x != "";
    });
};

/*SET INTERVAL TO AUTO REFRESH BOTTOM FRAME ADS - NEW*/
window.GAMLibrary = {};
window.GAMLibrary = {
    gamImmersive: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/IMMERSIVE',
    gamTopFrame: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/TOP_FRAME',
    gamBottomFrame: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/BOTTOM_FRAME',
    gamSkinad: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/SKINAD',
    gamBillboard: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/MASTHEAD',
    gamBalloon: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/BALLOON',
    gamNewsTag1: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/NEWS_TAG_1',
    gamNewsTag2: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/NEWS_TAG_2',
    // gamRecommend2: '/36504930/www.kapanlagi.com/dfp-recommend-slot-2',
    // gamRecommend3: '/36504930/www.kapanlagi.com/dfp-recommend-slot-3',
    // gamRecommend9: '/36504930/www.kapanlagi.com/dfp-recommend-slot-9',
    gamHeadlineCRM: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/HEADLINE_CRM',
    gamOrganicFeedCRM1: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/ORGANIC_FEED_CRM_1',
    gamOrganicFeedCRM2: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/ORGANIC_FEED_CRM_2',
    gamOrganicFeedCRM3: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/ORGANIC_FEED_CRM_3',
  	gamSlideUp: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/SLIDE_UP',
    gamAdvertorialHL1: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/ADVERTORIAL_HEADLINE_1',
    gamAdvertorialHL2: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/ADVERTORIAL_HEADLINE_2',
    gamShowcase: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/SHOWCASE',
    gamHalfpage1: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/HALFPAGE_1',
    // gamHalfpage2: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/HALFPAGE_2',
    gamLeaderboard: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/LEADERBOARD',
  	gamInterstitial: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/INTERSTITIAL',
  	gamPictureFirst: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/CONTENT_CAROUSEL',
  	gamInreadNative: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/IN-READ_NATIVE',
    gamInsertion: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/INSERTION',
  	gamWidget: '/36504930/KLY/DESKTOP/KAPANLAGI.COM/WIDGET',
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
    initiateSCReadPage: function() {
        var parentElement = document.querySelector(".body-paragraph.clearfix.mainpart"),
            pagingElement = parentElement ? parentElement.querySelectorAll(".body-paragraph.pagging_on") : 0;

        if (pagingElement) {
            pagingElement.forEach((element, index) => {
                let SC = null;
                if (index % 2 !== 0) {
                    let containerID = "gpt-ad-kapanlagi-sc-" + (index + 1);
                    let scPagingPlaceholder = element.querySelector("#div-gpt-ad-sc-paging-placeholder");
                    let containerSCArticle = document.createElement('div');
                    containerSCArticle.setAttribute("id", containerID);
                    containerSCArticle.setAttribute('class', 'article-ad');

                    if (scPagingPlaceholder) {
                        scPagingPlaceholder.insertAdjacentElement("beforeEnd", containerSCArticle);
                    }
                    
                    if ( document.querySelector(`#${containerID}`) && (SC = googletag.defineSlot(GAMLibrary.gamShowcase, [
                            [300, 250],
                            [250, 250]
                        ], containerID)) ) {
                        SC.addService(googletag.pubads()).setTargeting("pagetype", kly.pageType).setTargeting("position", (index + 1));
                        googletag.display(containerID);
                        googletag.pubads().refresh([SC]);
                    }
                }
            })
        }
    },
    userAgent: navigator.userAgent.toLowerCase(),
    GAMisTablet: /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(this.userAgent),
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
tagForAds = typeof dfp_tag === 'undefined' ? [] :  dfp_tag.replace(/[^A-Za-z0-9|\- ]/ig, "").klyFiltering("|");
const bsKeywordList = {
    [%brandSafetyKeyword%]
};

        /*change this acording to the site page layout*/
        var siteContentObject = document.getElementsByClassName("body-paragraph");
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
      
      siteContentText = dfp_keyword.concat(dfp_titles,' ', dfp_desc,' ', tagForAds,' ', siteContentText);
      
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
  	bfInjectStyle : function () {
        var btmfrm = document.querySelector("#div-gpt-ad-kapanlagi-bottomfrm-oop");
        if (!btmfrm) return;

        var btmfrmPlaceholder = document.createElement('div');
            btmfrmPlaceholder.id = 'div-gpt-ad-bottomfrm-placeholder';

        var btnMinimize = document.createElement("span");
            btnMinimize.setAttribute("id", "bottomframe-toggle");
            btnMinimize.innerHTML = `Hide Ads <img src="https://cdns.klimg.com/d.kapanlaginetwork.com/banner/asset/img/arrow-down-w.png" alt="icon" class="toggle-img">`;

        btnMinimize.addEventListener('click', function(event) {
            if (!btmfrmPlaceholder.classList.contains('shrink')) {
                btmfrmPlaceholder.classList.add('shrink');
                btnMinimize.innerHTML = `Show Ads <img src="https://cdns.klimg.com/d.kapanlaginetwork.com/banner/asset/img/arrow-up-w.png" alt="icon" class="toggle-img">`;
            } else {
                btmfrmPlaceholder.classList.remove('shrink');
                btnMinimize.innerHTML = `Hide Ads <img src="https://cdns.klimg.com/d.kapanlaginetwork.com/banner/asset/img/arrow-down-w.png" alt="icon" class="toggle-img">`;

            }
        });

        var style = document.createElement("style");
        style.textContent = `
            #div-gpt-ad-bottomfrm-placeholder {
                position: sticky;
                bottom: 0;
                z-index: 9999;
                transition: bottom 0.1s;
                text-align: center;
            }
            #div-gpt-ad-bottomfrm-placeholder.shrink {
                bottom: 0 !important;
            }
            #div-gpt-ad-kapanlagi-bottomfrm-oop{
                bottom: initial;
            }   
            #div-gpt-ad-bottomfrm-placeholder #div-gpt-ad-kapanlagi-bottomfrm-oop{
                margin-top: 10px;
            }
            #div-gpt-ad-bottomfrm-placeholder.shrink #div-gpt-ad-kapanlagi-bottomfrm-oop{
                max-height: 0;
                min-height: 0;
            }
            #bottomframe-toggle {
                background: #878787;
                border-radius: 30px;
                padding: 6px 10px;
                font-size: 10px;
                line-height: 15px;
                color: #fff;
                font-weight: 700;
                cursor: pointer;
            }
            .toggle-img {
                width: 10px;
            }
        `;
        
        btmfrm.parentNode.insertBefore(btmfrmPlaceholder, btmfrm);
        btmfrmPlaceholder.appendChild(style);
        btmfrmPlaceholder.appendChild(btnMinimize);
        btmfrmPlaceholder.appendChild(btmfrm);
    },
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

/* DMP CATEGORY LIST */
window.createDMPTracker = function(adsCatList, dfpTracker, macro) {
    parent.window.open(dfpTracker, '_blank');
};
/* DMP CATEGORY LIST */

googletag.cmd.push(function() {
    var urlPath = document.URL;
    
  	/*SET NEW BRAND SAFETY LOGIC*/
    GAMLibrary.brandSafetyChecker();

    window.GAMLibrary.immersive = googletag.defineOutOfPageSlot(GAMLibrary.gamImmersive, 'div-gpt-ad-kapanlagi-immersive-oop').addService(googletag.pubads());
    window.GAMLibrary.leaderboard = googletag.defineSlot(GAMLibrary.gamLeaderboard, [
        [970, 90],
        [728, 90],
        [970, 250]
    ], 'div-gpt-ad-kapanlagi-lb').addService(googletag.pubads());
    window.GAMLibrary.halfpage1 = googletag.defineSlot(GAMLibrary.gamHalfpage1, [
        [300, 600],
        [300, 250],
        [160, 600]
    ], 'div-gpt-ad-kapanlagi-sc1').addService(googletag.pubads());
    // window.GAMLibrary.halfpage2 = googletag.defineSlot(GAMLibrary.gamHalfpage2, [[300, 600],[300, 250],[160, 600]], 'div-gpt-ad-kapanlagi-hp2').addService(googletag.pubads());
    window.GAMLibrary.showcase = googletag.defineSlot(GAMLibrary.gamShowcase, [
        [300, 250],
        [250, 250]
    ], 'div-gpt-ad-kapanlagi-sc2').addService(googletag.pubads());

    window.GAMLibrary.newstag1 = googletag.defineOutOfPageSlot(GAMLibrary.gamNewsTag1, 'div-gpt-ad-kapanlagi-newsTag1-oop').addService(googletag.pubads());
    window.GAMLibrary.newstag2 = googletag.defineOutOfPageSlot(GAMLibrary.gamNewsTag2, 'div-gpt-ad-kapanlagi-newsTag2-oop').addService(googletag.pubads());
    // window.GAMLibrary.recommend2 = googletag.defineOutOfPageSlot(GAMLibrary.gamRecommend2, 'div-gpt-ad-kapanlagi-recommend-slot-2-oop').addService(googletag.pubads());
    // window.GAMLibrary.recommend3 = googletag.defineOutOfPageSlot(GAMLibrary.gamRecommend3, 'div-gpt-ad-kapanlagi-recommend-slot-3-oop').addService(googletag.pubads());
    // window.GAMLibrary.recommend9 = googletag.defineOutOfPageSlot(GAMLibrary.gamRecommend9, 'div-gpt-ad-kapanlagi-recommend-slot-9-oop').addService(googletag.pubads());
    window.GAMLibrary.balloon = googletag.defineOutOfPageSlot(GAMLibrary.gamBalloon, 'div-gpt-ad-kapanlagi-lFloating-oop').addService(googletag.pubads()); /*MATURE CONTENT FILTERING*/
    window.GAMLibrary.organicFeedCRM1 = googletag.defineOutOfPageSlot(GAMLibrary.gamOrganicFeedCRM1, 'div-gpt-ad-kapanlagi-crm1-oop').addService(googletag.pubads());
	window.GAMLibrary.organicFeedCRM2 = googletag.defineOutOfPageSlot(GAMLibrary.gamOrganicFeedCRM2, 'div-gpt-ad-kapanlagi-crm2-oop').addService(googletag.pubads());
	window.GAMLibrary.organicFeedCRM3 = googletag.defineOutOfPageSlot(GAMLibrary.gamOrganicFeedCRM3, 'div-gpt-ad-kapanlagi-crm3-oop').addService(googletag.pubads());

	if(document.querySelector('#div-gpt-ad-kapanlagi-mgid-inarticle'))
	  	window.GAMLibrary.slideup = googletag.defineSlot(GAMLibrary.gamSlideUp, [1, 1], 'div-gpt-ad-kapanlagi-mgid-inarticle').addService(googletag.pubads());
  	// window.GAMLibrary.slideup = googletag.defineOutOfPageSlot(GAMLibrary.gamSlideUp, 'div-gpt-ad-kapanlagi-slide-up-oop').addService(googletag.pubads());
  	
  	window.GAMLibrary.pictureFirst = googletag.defineOutOfPageSlot(GAMLibrary.gamPictureFirst, 'div-gpt-ad-kapanlagi-picturefirst').addService(googletag.pubads());
  	window.GAMLibrary.widget = googletag.defineOutOfPageSlot(GAMLibrary.gamWidget, 'div-gpt-ad-kapanlagi-widget').addService(googletag.pubads());
  	if (kly.pageType !== "ReadPage") {
        window.GAMLibrary.headlineCRM = googletag.defineOutOfPageSlot(GAMLibrary.gamHeadlineCRM, 'div-gpt-ad-kapanlagi-crm-headline-oop').addService(googletag.pubads());
    } else {
        window.GAMLibrary.inreadnative = googletag.defineOutOfPageSlot(GAMLibrary.gamInreadNative, 'div-gpt-ad-kapanlagi-in-read-native').addService(googletag.pubads());
      
      	window.GAMLibrary.insertion = googletag.defineSlot(GAMLibrary.gamInsertion, [1, 1], 'div-gpt-ad-kapanlagi-mgid-underarticle').addService(googletag.pubads());
        // window.GAMLibrary.insertion = googletag.defineOutOfPageSlot(GAMLibrary.gamInsertion, 'div-gpt-ad-kapanlagi-insertion-oop').addService(googletag.pubads());
    }
    if (kly.pageType === "Homepage") {
        window.GAMLibrary.advertHL1 = googletag.defineOutOfPageSlot(GAMLibrary.gamAdvertorialHL1, 'div-gpt-ad-kapanlagi-advertorial-headline1').addService(googletag.pubads());
        window.GAMLibrary.advertHL2 = googletag.defineOutOfPageSlot(GAMLibrary.gamAdvertorialHL2, 'div-gpt-ad-kapanlagi-advertorial-headline2').addService(googletag.pubads());
    }
  	/* INTERSTITIAL ADS */
    window.GAMLibrary.interstitial = googletag.defineOutOfPageSlot(GAMLibrary.gamInterstitial, googletag.enums.OutOfPageFormat.INTERSTITIAL);
    window.GAMLibrary.interstitial ? window.GAMLibrary.interstitial.addService(googletag.pubads()) : '';
    /* INTERSTITIAL ADS */

    googletag.pubads().addEventListener('slotRenderEnded', function(event) {
        /* START LB AND BILLBOARD RENDERRING */
        var dfp_slotElementId = event.slot.getSlotId().getDomId();
        var containerId = event.slot.getSlotElementId();
        var containerEl = document.getElementById(containerId);

        if (containerId.match(/(div-gpt-ad-kapanlagi-crm\d)/ig)) {
            document.querySelectorAll('li[id^="crm-organic-feed-"]').forEach(function(el) {
                (!el.querySelector('.crm-filled')) ? el.remove(): '';
            })
        }
        if (event.slot == window.GAMLibrary.immersive) {
            if (event.isEmpty) {
                gam_billboard = googletag.defineOutOfPageSlot(GAMLibrary.gamBillboard, 'div-gpt-ad-kapanlagi-billboard-oop').addService(googletag.pubads());
                gam_topfrm = googletag.defineOutOfPageSlot(GAMLibrary.gamTopFrame, 'div-gpt-ad-kapanlagi-topfrm-oop').addService(googletag.pubads());
                gam_bottomfrm = googletag.defineSlot(GAMLibrary.gamBottomFrame, [[970, 90], [728, 90], [468, 60]], 'div-gpt-ad-kapanlagi-bottomfrm-oop').addService(googletag.pubads());

                /* EXCLUDE SKINAD IN TABLET */
                if (!GAMLibrary.GAMisTablet) {
                    gam_skinad = googletag.defineOutOfPageSlot(GAMLibrary.gamSkinad, 'div-gpt-ad-kapanlagi-skinad-oop').addService(googletag.pubads());
                    googletag.pubads().refresh([gam_billboard, gam_topfrm, gam_bottomfrm, gam_skinad]);
                } else {
                    googletag.pubads().refresh([gam_billboard, gam_topfrm, gam_bottomfrm]);
                }
              
              	/* STICKY BOTTOM FRAME TWEAK */
                document.querySelector("#div-gpt-ad-kapanlagi-bottomfrm-oop").style = "position: sticky; bottom: 0; z-index: 9999;";
            }
        }

        if (containerEl !== null) {
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
        }
    });

    /*  START TARGETING BLOCK   */
    googletag.pubads().setTargeting("tags", tagForAds);
    googletag.pubads().setTargeting("articleTitle", kly.gtm.articleTitle);
	googletag.pubads().setTargeting("articlePath", window.location.pathname);
    googletag.pubads().setTargeting("platform", kly.platform);
    googletag.pubads().setTargeting("type", kly.gtm.type);
    googletag.pubads().setTargeting("pageType", kly.pageType);
    googletag.pubads().setTargeting("channel", kly.gtm.subCategory);
    googletag.pubads().setTargeting("audience", kly.gtm.audience ? kly.gtm.audience.split("|") : "false");
    googletag.pubads().setTargeting("isAdvertorial", typeof(isAdvertorial = kly.article && kly.article.isAdvertorial.toString()) === "undefined" ? "false" : isAdvertorial);
    googletag.pubads().setTargeting("isMultipage", typeof(isMultipage = kly.article && kly.article.isMultipage.toString()) === "undefined" ? "false" : isMultipage);
    googletag.pubads().setTargeting("articleId", kly.gtm.articleId.toString());
    googletag.pubads().setTargeting("pagingNum", typeof(pageParam = kly.gtm.pageParam && kly.gtm.pageParam.toString()) === "undefined" ? "false" : pageParam);
    googletag.pubads().setTargeting("site", kly.site);
    googletag.pubads().setTargeting("age", typeof(age = kly.gtm.age) === "undefined" ? "false" : kly.gtm.age.toString());
    googletag.pubads().setTargeting("gender", typeof(gender = kly.gtm.gender) === "undefined" ? "false" : kly.gtm.gender.toString());
    googletag.pubads().setTargeting("subcategory", kly.gtm.subCategory);
    /*  END TARGETING BLOCK   */

    googletag.pubads().setCentering(true);
    googletag.pubads().enableSingleRequest();
    googletag.pubads().disableInitialLoad();
    googletag.enableServices();
  
  	/*INITIATE ADS ON CONTINOUS PAGE */
    GAMLibrary.initiateSCReadPage();

    //googletag.pubads().refresh([window.GAMLibrary.interstitial, window.GAMLibrary.leaderboard, window.GAMLibrary.halfpage1, window.GAMLibrary.showcase, window.GAMLibrary.immersive, window.GAMLibrary.newstag1, window.GAMLibrary.newstag2, window.GAMLibrary.recommend2, window.GAMLibrary.recommend3, window.GAMLibrary.recommend9, window.GAMLibrary.balloon, window.GAMLibrary.slideup, window.GAMLibrary.pictureFirst, window.GAMLibrary.widget]);

    googletag.pubads().refresh([window.GAMLibrary.interstitial, window.GAMLibrary.leaderboard, window.GAMLibrary.halfpage1, window.GAMLibrary.showcase, window.GAMLibrary.immersive, window.GAMLibrary.newstag1, window.GAMLibrary.newstag2, window.GAMLibrary.balloon, window.GAMLibrary.slideup, window.GAMLibrary.pictureFirst, window.GAMLibrary.widget]);
    
  	setTimeout(() => {
		googletag.pubads().refresh([window.GAMLibrary.organicFeedCRM1, window.GAMLibrary.organicFeedCRM2, window.GAMLibrary.organicFeedCRM3]);
	}, 3000);
  
    if (kly.pageType !== "ReadPage") {
        googletag.pubads().refresh([window.GAMLibrary.headlineCRM]);
    } else {
        googletag.pubads().refresh([window.GAMLibrary.inreadnative, window.GAMLibrary.insertion]);
    }
    
    if (kly.pageType === "Homepage") {
        googletag.pubads().refresh([window.GAMLibrary.advertHL1, window.GAMLibrary.advertHL2]);
    }
  
  	GAMLibrary.bfInjectStyle();
});

/** GET MESSAGE FROM SAFEFRAME CONTAINER */
GAMLibrary.onMessageReceivedGPTUpdateCreativeStyle();
/** GET MESSAGE FROM SAFEFRAME CONTAINER */

var HeavyAdsResolver = new GAMLibrary.HeavyAdsResolver();

/*TWEAK HOMEPAGE CRM*/
setTimeout(function() { document.querySelectorAll('li[id^="crm-organic-feed-"]').forEach(function(e) { e.querySelector(".crm-filled") || e.remove() }) }, 7e3);
