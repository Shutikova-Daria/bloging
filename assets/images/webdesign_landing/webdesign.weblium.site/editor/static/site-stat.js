(function () {
  /**
   * @param func {function}
   * @param wait {number=}
   * @returns {function(...[*]=)}
   */ function a(a, b = 100) {
    let c;
    return function (...d) {
      clearTimeout(c),
        (c = setTimeout(() => {
          a.apply(this, d);
        }, b));
    };
  }
  function b(a) {
    a || (a = window.location.search);
    const b = a.substr(1),
      c = {};
    return (
      !b.length ||
        b.split("&").forEach((a) => {
          const b = a.split("=");
          c[b[0]] = decodeURIComponent(b[1]);
        }),
      c
    );
  }
  function c() {
    let a = new Date().getTime(),
      b = (performance && performance.now && 1e3 * performance.now()) || 0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (d) => {
      var c = Math.floor;
      let e = 16 * Math.random(); // eslint-disable-next-line no-bitwise
      return (
        0 < a ? ((e = 0 | (a + e) % 16), (a = c(a / 16))) : ((e = 0 | (b + e) % 16), (b = c(b / 16))),
        ("x" === d ? e : 8 | (3 & e)).toString(16)
      );
    });
  }
  const d = new (function () {
    const d = window.API_URL || "http://localhost:3000",
      e = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"],
      f = "__site-stat__"; // 30 mins according to Google metrics
    /**
     * @param key {string=} optional
     */ /**
     * @param key {string}
     * @param value {string|number}
     */ /**
     * @param url {string} - without domain
     * @param body {object}
     */ (this.sessionId = null),
      (this.isDebug = !1),
      (this.state = { referrer: "", utmTags: {} }),
      (this.getDataFromStorage = (a) => {
        if (!localStorage.getItem(f)) return null;
        try {
          const b = JSON.parse(localStorage.getItem(f));
          return a ? b[a] : b;
        } catch (a) {
          return console.warn("Could'nt load initial data", a), null;
        }
      }),
      (this.saveDataToStorage = (a, b) => {
        try {
          const c = this.getDataFromStorage();
          localStorage.setItem(f, JSON.stringify({ ...(c || {}), [a]: b }));
        } catch (a) {
          console.warn("Could'nt save data to storage", a);
        }
      }),
      (this.checkSessionTime = () => {
        const a = this.getDataFromStorage("lasActivityTime");
        if (a) {
          const b = Date.now();
          b - a >= 1800000 && this.createSession(!1);
        }
        this.saveDataToStorage("lasActivityTime", Date.now()), this.log("lasActivityTime has been saved");
      }),
      (this.onMouseMove = () => {
        this.checkSessionTime();
      }),
      (this.initEventListeners = () => {
        const b = a(this.onMouseMove, 200);
        document.addEventListener("mousemove", b), this.log("Event listeners have been initialized");
      }),
      (this.sendApiRequest = (a, b) => {
        this.isDebug && console.group("ApiRequest"), this.log("URL:", a), this.log("BODY:", b);
        const c = new XMLHttpRequest();
        c.open("POST", a),
          (c.withCredentials = !0),
          (c.crossDomain = !0),
          c.setRequestHeader("Content-Type", "application/json;charset=UTF-8"),
          (c.onload = () => {
            this.log("XHR status", c.status), this.log("XHR response", c.response);
          }),
          (c.onerror = (a) => {
            this.log("Network Error", a);
          }),
          (b.path = document.location.pathname),
          c.send(JSON.stringify(b)),
          this.isDebug && console.groupEnd();
      }),
      (this.createSession = (a) => {
        (this.sessionId = c()),
          this.saveDataToStorage("sessionId", this.sessionId),
          this.sendApiRequest(`${d}/api/website/session/save`, {
            session: this.sessionId,
            referrer: this.state.referrer,
            increment_pageview: !!a,
            ...this.state.utmTags,
          }),
          this.log("New session has been created");
      }),
      (this.sendPageView = () => {
        this.sendApiRequest(`${d}/api/website/session/save`, { session: this.sessionId, increment_pageview: !0 }),
          this.log("Page view has been sent");
      }),
      (this.getUtmTags = () => {
        const a = this.getDataFromStorage("utmTags");
        if (a) return a;
        const c = b();
        return (
          (this.state.utmTags = Object.keys(c)
            .filter((a) => -1 < e.indexOf(a))
            .reduce((a, b) => ({ ...a, [b]: c[b] }), {})),
          this.saveDataToStorage("utmTags", this.state.utmTags),
          this.log("utmTags parsed", this.state.utmTags),
          this.state.utmTags
        );
      }),
      (this.initState = () => {
        const a = this.getDataFromStorage();
        return (
          (this.state.utmTags = this.getUtmTags()),
          a
            ? ((this.state.referrer = a.referrer), void this.log("State has been filled from storage", this.state))
            : void ((this.state.referrer = document.referrer || ""),
              this.saveDataToStorage("referrer", this.state.referrer),
              this.log("State has been initialized", this.state))
        );
      }),
      (this.initSession = () => {
        const a = this.getDataFromStorage("sessionId");
        return a
          ? ((this.sessionId = a), void this.sendPageView())
          : void (
              // PageView will be created with new session
              this.createSession(!0)
            );
      }),
      (this.init = () => {
        this.initState(),
          this.initSession(),
          this.initEventListeners(),
          setTimeout(this.checkSessionTime, 0),
          this.log("SiteStatistics initialized"),
          this.log(this),
          (window.wlStat = this);
      }),
      (this.log = (...a) => {
        this.isDebug && console.info(...a);
      });
  })();
  d.init();
})();
