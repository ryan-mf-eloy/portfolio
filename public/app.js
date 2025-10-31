(function () {
  "use strict";

  // Constants
  const SANDBOX = {
    scriptUrl: "https://mpisandbox.braspag.com.br/Scripts/BP.Mpi.3ds20.min.js",
    tokenEndpoint: "https://mpisandbox.braspag.com.br/v2/auth/token",
    clientId: "dba3a8db-fa54-40e0-8bab-7bfb9b6f2e2e",
    clientSecret: "D/ilRsfoqHlSUChwAMnlyKdDNd7FMsM7cU/vo02REag=",
    establishment: "1006993069",
    merchant: "Loja Exemplo Ltda",
    mcc: "5912",
  };

  const PRODUCTION = {
    scriptUrl: "https://mpi.braspag.com.br/Scripts/BP.Mpi.3ds20.min.js",
    tokenEndpoint: "https://mpi.braspag.com.br/v2/auth/token",
    basicAuth: "OTlmYjUxOTItYmFjNy00NjQ5LThiODMtZjI5NTE0ODkyY2RiOjN4c2hDRkJyTGlmWHI2WHVVYVVkWmhPbFh2MUpNQytvNWNBVnRhSTlMSnM9",
    establishment: "2802837413",
    merchant: "OnlyFans",
    mcc: "5796",
  };

  // State
  let currentTab = "sandbox";
  let cardType = "debit";
  let cachedTokens = {}; // Cache de tokens por ambiente

  // Utils
  function byId(id) {
    return document.getElementById(id);
  }

  function setValue(id, value) {
    const el = byId(id);
    if (!el) return;
    el.value = value == null ? "" : String(value);
  }

  // Tab management
  async function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll(".cielo-tab, .tab").forEach((t) => {
      t.classList.toggle("active", t.dataset.tab === tab);
    });
    document.querySelectorAll(".tab-content").forEach((c) => {
      c.classList.toggle("active", c.id === `tab-${tab}`);
    });

    // Load script and generate token when switching tabs
    const config = tab === "sandbox" ? SANDBOX : PRODUCTION;
    console.log(`🔄 Switching to ${tab} environment`);
    
    try {
      // Generate token for the new environment
      console.log(`🔑 Generating token for ${tab}...`);
      const token = await generateToken(config);
      cachedTokens[tab] = token;
      console.log(`✅ Token generated and cached for ${tab}`);
      
      // Load script
      await loadScript(config.scriptUrl);
      console.log(`✅ Script loaded for ${tab}`);
    } catch (error) {
      console.error(`❌ Error switching to ${tab}:`, error);
    }
  }

  function initTabs() {
    document.querySelectorAll(".cielo-tab, .tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        switchTab(tab.dataset.tab);
      });
    });
  }

  // Card type toggle
  function initCardTypeToggle() {
    document.querySelectorAll(".toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const container = btn.closest(".card-type-toggle");
        container.querySelectorAll(".toggle-btn").forEach((b) => {
          b.classList.toggle("active", b === btn);
        });
        cardType = btn.dataset.type;
      });
    });
  }

  // Script loading
  function loadScript(url) {
    return new Promise((resolve) => {
      // Check if already loaded for this environment
      const existing = document.querySelector(
        `script[data-cielo-3ds][data-env="${currentTab}"]`
      );
      if (existing && existing.getAttribute("data-loaded") === "true") {
        resolve();
        return;
      }

      // Remove old scripts from other environments
      document.querySelectorAll("script[data-cielo-3ds]").forEach((s) => {
        if (s.getAttribute("data-env") !== currentTab) {
          s.remove();
        }
      });

      // If script exists but not loaded, wait for it
      if (existing) {
        const checkInterval = setInterval(() => {
          if (existing.getAttribute("data-loaded") === "true") {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
        setTimeout(() => {
          clearInterval(checkInterval);
          resolve();
        }, 5000); // Timeout after 5s
        return;
      }

      // Create new script
      const s = document.createElement("script");
      s.src = url;
      s.async = true;
      s.setAttribute("data-cielo-3ds", "1");
      s.setAttribute("data-env", currentTab);
      s.onload = () => {
        s.setAttribute("data-loaded", "true");
        resolve();
      };
      s.onerror = () => {
        console.warn("Failed to load 3DS script:", url);
        resolve(); // Continue anyway
      };
      document.head.appendChild(s);
    });
  }

  // Token generation
  function generateToken(config) {
    console.log(
      "🔑 Generating token for:",
      config.tokenEndpoint.includes("sandbox") ? "Sandbox" : "Production"
    );

    // Validate required fields for production
    if (
      config.tokenEndpoint.includes("mpi.braspag.com.br") &&
      !config.tokenEndpoint.includes("sandbox")
    ) {
      const missing = [];
      if (!config.establishment || config.establishment.trim() === "")
        missing.push("EstablishmentCode");
      if (!config.merchant || config.merchant.trim() === "")
        missing.push("MerchantName");
      if (!config.mcc || config.mcc.trim() === "") missing.push("MCC");

      if (missing.length > 0) {
        const errorMsg = `Produção requer os seguintes campos válidos (obtenha do contrato Cielo):\n- ${missing.join(
          "\n- "
        )}\n\nConfigure esses valores no objeto PRODUCTION no código.`;
        console.error("❌ Token generation failed:", errorMsg);
        throw new Error(errorMsg);
      }
    }

    // Use basicAuth if available, otherwise construct from clientId and clientSecret
    let basic;
    if (config.basicAuth) {
      basic = config.basicAuth;
    } else if (config.clientId && config.clientSecret) {
      basic = btoa(`${config.clientId}:${config.clientSecret}`);
    } else {
      throw new Error("BasicAuth ou ClientId/ClientSecret são obrigatórios");
    }

    const requestBody = {
      EstablishmentCode: config.establishment || "1006993069",
      MerchantName: config.merchant || "Loja Exemplo Ltda",
      MCC: config.mcc || "5912",
    };

    console.log("📤 Token request body:", {
      ...requestBody,
      MCC: requestBody.MCC,
    });

    const body = JSON.stringify(requestBody);

    return fetch(config.tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basic}`,
      },
      body: body,
    })
      .then(async (res) => {
        const responseText = await res.text();
        let responseJson;
        try {
          responseJson = JSON.parse(responseText);
        } catch (_) {
          responseJson = { raw: responseText };
        }

        if (!res.ok) {
          const errorMsg = `Token generation failed (${
            res.status
          }): ${JSON.stringify(responseJson)}`;
          console.error("❌ Token API error:", errorMsg);
          throw new Error(errorMsg);
        }

        return responseJson;
      })
      .then((json) => {
        if (!json || !json.access_token) {
          const errorMsg = `Token generation failed: No access_token in response. Response: ${JSON.stringify(
            json
          )}`;
          console.error("❌ Token response error:", errorMsg);
          throw new Error(errorMsg);
        }

        console.log(
          "✅ Token generated successfully, length:",
          json.access_token.length
        );
        return json.access_token;
      })
      .catch((error) => {
        console.error("❌ Token generation error:", error);
        throw error;
      });
  }

  // Map form values to bpmpi classes
  function mapToBpmpi(values, config) {
    const now = Date.now();
    const isSandbox = values.environment === "sandbox";

    // Environment: must be exactly "sandbox" or "production" (SDK reads as string)
    setValue("bpmpi_environment", isSandbox ? "sandbox" : "production");

    // Access token: CRITICAL - must be valid token from OAuth endpoint
    if (!values.accessToken || values.accessToken.trim() === "") {
      console.error("⚠️ Access token is empty! Cannot authenticate.");
      throw new Error("Access token is required");
    }
    setValue("bpmpi_accesstoken", values.accessToken.trim());

    // Required fields for SDK initialization
    setValue("bpmpi_referenceid", values.referenceId || `ref-${now}`);
    setValue("bpmpi_ordernumber", values.orderNumber || String(now));
    setValue("bpmpi_totalamount", values.amount || "1000");
    setValue("bpmpi_currency", values.currency || "986");
    setValue("bpmpi_installments", values.installments || "1");

    // Card data (required for enrollment)
    setValue("bpmpi_cardnumber", (values.cardNumber || "").replace(/\s/g, ""));
    setValue("bpmpi_cardexpirationmonth", values.expMonth || "");
    setValue("bpmpi_cardexpirationyear", values.expYear || "");

    // Authentication enabled
    setValue("bpmpi_auth", "true");

    // Merchant URL: must be HTTPS in production
    const merchantUrl =
      values.merchantUrl ||
      (() => {
        try {
          return window.location.origin || "";
        } catch (_) {
          return "";
        }
      })();
    setValue("bpmpi_merchant_url", merchantUrl);

    // Debug: log mapped values (without sensitive token)
    console.log("🔧 Mapped bpmpi values:", {
      environment: isSandbox ? "sandbox" : "production",
      hasAccessToken: !!values.accessToken && values.accessToken.length > 0,
      tokenLength: values.accessToken ? values.accessToken.length : 0,
      referenceId: values.referenceId || `ref-${now}`,
      orderNumber: values.orderNumber || String(now),
      merchantUrl: merchantUrl,
    });
  }

  // Sandbox flow
  async function runSandboxFlow() {
    const btn = byId("btn-sandbox-run");
    btn.disabled = true;
    btn.textContent = "Autenticando...";

    try {
      // Use cached token if available, otherwise generate new one
      let token = cachedTokens["sandbox"];
      if (!token) {
        console.log("🔑 No cached token, generating new one for sandbox...");
        token = await generateToken(SANDBOX);
        cachedTokens["sandbox"] = token;
      } else {
        console.log("✅ Using cached token for sandbox");
      }

      // Get card number
      const cardNumber =
        byId("sandbox-card-number").value.trim() || "4000000000002503";
      const expParts = "12/2030".split("/");

      // Map to bpmpi
      mapToBpmpi(
        {
          environment: "sandbox",
          accessToken: token,
          cardNumber: cardNumber,
          expMonth: expParts[0],
          expYear: expParts[1],
        },
        SANDBOX
      );

      // Ensure script loaded
      await loadScript(SANDBOX.scriptUrl);

      // Wait a bit for SDK init, then authenticate
      setTimeout(() => {
        if (typeof window.bpmpi_authenticate === "function") {
          window.bpmpi_authenticate();
        }
      }, 600);
    } catch (error) {
      alert("Erro ao gerar token. Verifique o console.");
      console.error(error);
      btn.disabled = false;
      btn.textContent = "Autenticar 3DS";
    }
  }

  // Production flow
  async function runProductionFlow() {
    const btn = byId("btn-prod-run");
    btn.disabled = true;
    btn.textContent = "Autenticando...";

    try {
      // Check if HTTPS
      if (window.location.protocol !== "https:") {
        alert(
          "⚠️ Produção requer HTTPS! Use https://localhost ou um servidor HTTPS válido."
        );
        btn.disabled = false;
        btn.textContent = "Autenticar 3DS";
        return;
      }

      // Use cached token if available, otherwise generate new one
      let token = cachedTokens["production"];
      if (!token) {
        try {
          console.log("🔑 No cached token, generating new one for production...");
          token = await generateToken(PRODUCTION);
          if (!token) {
            throw new Error("Token vazio");
          }
          cachedTokens["production"] = token;
        } catch (tokenError) {
          alert(
            "Erro ao gerar token de produção. Verifique:\n- Credenciais corretas\n- EstablishmentCode válido\n- Servidor HTTPS"
          );
          console.error("Token generation error:", tokenError);
          btn.disabled = false;
          btn.textContent = "Autenticar 3DS";
          return;
        }
      } else {
        console.log("✅ Using cached token for production");
      }

      // Get form values
      const cardNumber = byId("prod-card-number").value.trim();
      const expMonth = String(byId("prod-card-month").value).padStart(2, "0");
      const expYear = byId("prod-card-year").value;

      if (!cardNumber || !expMonth || !expYear) {
        alert("Preencha todos os dados do cartão.");
        btn.disabled = false;
        btn.textContent = "Autenticar 3DS";
        return;
      }

      // Map to bpmpi with HTTPS merchant_url
      const merchantUrl = window.location.origin;
      if (merchantUrl && !merchantUrl.startsWith("https://")) {
        alert("⚠️ Merchant URL deve ser HTTPS em produção!");
        btn.disabled = false;
        btn.textContent = "Autenticar 3DS";
        return;
      }

      // Map to bpmpi BEFORE loading script (so SDK can read values)
      mapToBpmpi(
        {
          environment: "production",
          accessToken: token,
          cardNumber: cardNumber,
          expMonth: expMonth,
          expYear: expYear,
          merchantUrl: merchantUrl,
        },
        PRODUCTION
      );

      // Verify token is set
      const tokenElement = byId("bpmpi_accesstoken");
      if (
        !tokenElement ||
        !tokenElement.value ||
        tokenElement.value.trim() === ""
      ) {
        throw new Error(
          "Token não foi mapeado corretamente para bpmpi_accesstoken"
        );
      }
      console.log(
        "✅ Token mapped to bpmpi_accesstoken:",
        tokenElement.value.substring(0, 20) + "..."
      );

      // Ensure script loaded
      console.log("📦 Loading production script...");
      await loadScript(PRODUCTION.scriptUrl);
      console.log("✅ Production script loaded");

      // Verify bpmpi_config is available and correct
      if (typeof window.bpmpi_config === "function") {
        const config = window.bpmpi_config();
        console.log("✅ bpmpi_config:", config);
      } else {
        console.warn("⚠️ bpmpi_config não está disponível!");
      }

      // Wait for SDK to fully initialize, then authenticate
      let attempts = 0;
      const maxAttempts = 10;
      const checkSDK = setInterval(() => {
        attempts++;
        if (typeof window.bpmpi_authenticate === "function") {
          clearInterval(checkSDK);
          console.log("✅ SDK ready, calling bpmpi_authenticate()");
          window.bpmpi_authenticate();
        } else if (attempts >= maxAttempts) {
          clearInterval(checkSDK);
          alert(
            "SDK não inicializou. Verifique:\n- Script carregado corretamente\n- Token válido\n- Console para erros"
          );
          console.error("❌ SDK not available after", attempts, "attempts");
          btn.disabled = false;
          btn.textContent = "Autenticar 3DS";
        } else {
          console.log(`⏳ Waiting for SDK... (${attempts}/${maxAttempts})`);
        }
      }, 500);
    } catch (error) {
      alert(
        "Erro na autenticação. Verifique o console.\n\nPossíveis causas:\n- Token inválido\n- Domínio não permitido (use HTTPS)\n- Script não carregado"
      );
      console.error("Production flow error:", error);
      btn.disabled = false;
      btn.textContent = "Autenticar 3DS";
    }
  }

  // Result handling
  function normalize3DSResult(input) {
    if (!input || typeof input !== "object") return null;
    const detail =
      input.detail && typeof input.detail === "object" ? input.detail : input;
    return {
      eci: detail.eci || detail.ECI || null,
      cavv: detail.cavv || detail.CAVV || null,
      xid: detail.xid || detail.XID || null,
      referenceId:
        detail.referenceId ||
        detail.referenceID ||
        detail.DirectoryServerTransactionId ||
        null,
      version: detail.version || detail.Version || null,
      status: detail.status || detail.Status || null,
      returnCode: detail.returnCode || detail.ReturnCode || null,
      returnMessage: detail.returnMessage || detail.ReturnMessage || null,
      cardType: cardType,
      storedAt: new Date().toISOString(),
      raw: detail,
    };
  }

  function handle3DSResult(data) {
    const normalized = normalize3DSResult(data);
    if (!normalized) return;

    // Save to localStorage
    try {
      localStorage.setItem("cielo3dsResult", JSON.stringify(normalized));
    } catch (_) {}

    // Show result section
    const resultSection = byId("result-section");
    resultSection.classList.add("show");
    resultSection.scrollIntoView({ behavior: "smooth" });

    // Display JSON
    const resultJson = byId("result-json");
    resultJson.textContent = JSON.stringify(normalized, null, 2);

    // Re-enable buttons
    byId("btn-sandbox-run").disabled = false;
    byId("btn-sandbox-run").textContent = "Autenticar 3DS";
    byId("btn-prod-run").disabled = false;
    byId("btn-prod-run").textContent = "Autenticar 3DS";
  }

  // bpmpi_config
  window.bpmpi_config = function () {
    return {
      Debug: true,
      Environment: currentTab === "sandbox" ? "SDB" : "PRD",
      onSuccess: window.__handle3DSResult,
      onFailure: window.__handle3DSResult,
      onUnenrolled: window.__handle3DSResult,
      onError: window.__handle3DSResult,
    };
  };

  // Copy result
  function initCopyButton() {
    byId("btn-copy-result").addEventListener("click", () => {
      const resultJson = byId("result-json").textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(resultJson).then(() => {
          alert("JSON copiado!");
        });
      } else {
        // Fallback
        const ta = document.createElement("textarea");
        ta.value = resultJson;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          alert("JSON copiado!");
        } catch (_) {}
        document.body.removeChild(ta);
      }
    });
  }

  // Global handler
  window.__handle3DSResult = handle3DSResult;

  // Event listeners for callbacks
  [
    "bpmpi:authentication:success",
    "bpmpi:authentication:completed",
    "bpmpi:auth:success",
    "bpmpi:result",
  ].forEach((evtName) => {
    document.addEventListener(evtName, (e) => {
      handle3DSResult(e.detail || e);
    });
  });

  // Init
  function ready() {
    initTabs();
    initCardTypeToggle();
    initCopyButton();

    byId("btn-sandbox-run").addEventListener("click", runSandboxFlow);
    byId("btn-prod-run").addEventListener("click", runProductionFlow);

    // Load sandbox script automatically since Sandbox tab is active by default
    console.log("📦 Loading sandbox script on page load...");
    loadScript(SANDBOX.scriptUrl)
      .then(() => {
        console.log("✅ Sandbox script loaded successfully");
      })
      .catch((err) => {
        console.warn("⚠️ Error loading sandbox script on load:", err);
      });
  }

  // Ensure script loads on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    // DOM already ready, call immediately
    ready();
  }

  // Also load on window.load as fallback
  window.addEventListener("load", () => {
    // Only load if not already loaded and sandbox tab is active
    const existing = document.querySelector('script[data-cielo-3ds][data-env="sandbox"]');
    if (!existing || existing.getAttribute("data-loaded") !== "true") {
      if (currentTab === "sandbox") {
        console.log("📦 Loading sandbox script on window.load (fallback)...");
        loadScript(SANDBOX.scriptUrl).catch((err) => {
          console.warn("⚠️ Error loading sandbox script on window.load:", err);
        });
      }
    }
  });
})();
